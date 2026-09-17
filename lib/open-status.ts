"use client";

import { useSyncExternalStore } from "react";
import { hours } from "@/lib/site";

/**
 * Whether the shop is open, worked out in the shop's own time zone rather than
 * the visitor's. Somebody checking from Chicago before a trip still needs
 * Roseville's clock.
 *
 * This only ever runs in the browser. The server has no idea when the page will
 * be read, so it renders the fallback and the status replaces it after
 * hydration, which keeps the static HTML honest and avoids a mismatch.
 */

const TZ = "America/Los_Angeles";
const WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
/** Inside this many minutes of closing, "open" becomes "closing soon". */
const CLOSING_SOON = 30;

export type OpenStatus = {
  state: "open" | "closing" | "closed";
  /** Short headline, e.g. "Open now". */
  label: string;
  /** The time that matters next, e.g. "until 5 PM". */
  detail: string;
  /** Today's weekday name in Roseville, to mark today's row in the hours. */
  weekday: string;
};

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "17:00" to "5 PM", "07:30" to "7:30 AM". */
export function shortTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${h12}:${String(m).padStart(2, "0")} ${suffix}` : `${h12} ${suffix}`;
}

export function openStatus(now: Date): OpenStatus {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const part = (t: string) => parts.find((p) => p.type === t)?.value ?? "";

  const weekday = part("weekday");
  const minutes = Number(part("hour")) * 60 + Number(part("minute"));
  const today = hours.find((r) => r.days.includes(weekday));

  if (today) {
    const opens = toMinutes(today.opens);
    const closes = toMinutes(today.closes);
    if (minutes >= opens && minutes < closes) {
      const soon = closes - minutes <= CLOSING_SOON;
      return {
        state: soon ? "closing" : "open",
        label: soon ? "Closing soon" : "Open now",
        detail: `until ${shortTime(today.closes)}`,
        weekday,
      };
    }
    if (minutes < opens) {
      return { state: "closed", label: "Closed", detail: `opens ${shortTime(today.opens)}`, weekday };
    }
  }

  // Past closing, or a day with no hours: find the next day that opens.
  const start = WEEK.indexOf(weekday);
  for (let i = 1; i <= 7; i++) {
    const day = WEEK[(start + i) % 7];
    const row = hours.find((r) => r.days.includes(day));
    if (row) {
      const when = i === 1 ? "tomorrow" : day;
      return { state: "closed", label: "Closed", detail: `opens ${shortTime(row.opens)} ${when}`, weekday };
    }
  }

  return { state: "closed", label: "Closed", detail: "call for hours", weekday };
}

/* A one minute clock. The snapshot is the current minute, a primitive, so React
   only re-renders when the minute actually changes. The server snapshot is 0,
   which callers treat as "not known yet". */
const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 20_000);
  return () => window.clearInterval(id);
};
const minuteNow = () => Math.floor(Date.now() / 60_000);
const minuteOnServer = () => 0;

export function useOpenStatus(): OpenStatus | null {
  const minute = useSyncExternalStore(subscribe, minuteNow, minuteOnServer);
  return minute ? openStatus(new Date(minute * 60_000)) : null;
}
