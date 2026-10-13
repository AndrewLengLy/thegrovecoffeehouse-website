/**
 * Things that happen at The Grove.
 *
 * Every entry here is taken from a post on the shop's own Instagram
 * (@thegrovecoffeehouse916), with the source linked, and the copy stays close to
 * what they wrote. Nothing is a standing schedule: the music night post ended
 * with "Would you like to see another music night?", so the honest framing is
 * "this is the kind of thing that happens here, the next one is posted first on
 * Instagram", not a calendar.
 *
 * TODO(andrew): ask the owners whether music night is becoming regular, and
 * whether they want upcoming events listed here ahead of Instagram.
 */

export type EventKind = "music" | "celebration" | "craft";

export type GroveEvent = {
  slug: string;
  title: string;
  kind: EventKind;
  /** ISO date. For a multi day event, the first day. */
  date: string;
  /** ISO date of the last day, for multi day events. */
  endDate?: string;
  time?: string;
  blurb: string;
  /** The Instagram post it came from. */
  source: string;
};

export const EVENT_KIND_LABEL: Record<EventKind, string> = {
  music: "Music night",
  celebration: "Celebration",
  craft: "Craft night",
};

export const events: GroveEvent[] = [
  /* The post gives no date for the night itself, so this is the date it was
     posted, the week it happened. */
  {
    slug: "crafts-and-gupshup-2026-09",
    title: "Crafts & Gupshup",
    kind: "craft",
    date: "2026-09-29",
    blurb:
      "Our first Crafts & Gupshup: an evening of making things and talking, with good food and one question at the middle of it, what makes us bloom?",
    source: "https://www.instagram.com/thegrovecoffeehouse916/reel/Dd4mzKIybXu/",
  },
  {
    slug: "third-birthday-2026",
    title: "The Grove turns three",
    kind: "celebration",
    date: "2026-08-21",
    endDate: "2026-08-24",
    blurb:
      "Three years on Sierra College Blvd, marked with cake and two birthday drinks: a cookie butter latte with a raspberry surprise, and a blueberry vanilla matcha under strawberry frosting foam. Special drinks were 13 percent off all weekend.",
    source: "https://www.instagram.com/thegrovecoffeehouse916/p/DcRoqEOynZK/",
  },
  {
    slug: "music-night-2026-06",
    title: "Sounds of Music",
    kind: "music",
    date: "2026-06-26",
    time: "7:00 PM",
    blurb:
      "An evening of live performers in the room, with drink inspired candles on the counter. Afterwards the shop asked whether people wanted another one. The answer, judging by the comments, was yes.",
    source: "https://www.instagram.com/thegrovecoffeehouse916/reel/DaIxzMbIi8w/",
  },
];

/** Newest first. */
export const recentEvents = [...events].sort((a, b) => (a.date < b.date ? 1 : -1));

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "21 Aug" or "21 to 24 Aug". Built by hand so the server and client agree. */
export function formatEventDate(e: GroveEvent): { day: string; month: string; year: string } {
  const [y, m, d] = e.date.split("-").map(Number);
  let day = String(d);
  if (e.endDate) {
    const [, em, ed] = e.endDate.split("-").map(Number);
    day = em === m ? `${d} to ${ed}` : `${d} ${MONTHS[m - 1]} to ${ed}`;
  }
  return { day, month: MONTHS[m - 1], year: String(y) };
}

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** "2026.08.21 Friday", or "2026.08.21 to 08.24" for a run of days. Computed
    in UTC from the ISO date so the server and the browser print the same day. */
export function eventStamp(e: GroveEvent): string {
  const [y, m, d] = e.date.split("-");
  const start = `${y}.${m}.${d}`;
  if (e.endDate) {
    const [, em, ed] = e.endDate.split("-");
    return `${start} to ${em}.${ed}`;
  }
  const day = new Date(Date.UTC(Number(y), Number(m) - 1, Number(d))).getUTCDay();
  return `${start} ${WEEKDAYS[day]}`;
}
