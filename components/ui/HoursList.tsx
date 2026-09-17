"use client";

import { hours } from "@/lib/site";
import { useOpenStatus } from "@/lib/open-status";

/**
 * The hours, the same way everywhere they appear.
 *
 * The time never wraps and always sits on the right. The label is the part
 * allowed to break, so on a narrow phone "Saturday and Sunday" goes to two
 * lines instead of pushing the time under itself on one row but not the other.
 *
 * Today's row is marked once the browser knows what day it is in Roseville.
 */
export function HoursList({
  tone = "paper",
  className = "",
}: {
  tone?: "paper" | "ink";
  className?: string;
}) {
  const status = useOpenStatus();
  const onInk = tone === "ink";

  return (
    <dl className={`${onInk ? "border-t border-paper/25" : "border-t-2 border-ink"} ${className}`}>
      {hours.map((h) => {
        const today = status ? h.days.includes(status.weekday) : false;
        return (
          <div
            key={h.label}
            className={`flex items-baseline justify-between gap-4 border-b py-3 ${
              onInk ? "border-paper/15" : "border-line"
            }`}
          >
            <dt
              className={`t-label flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 ${
                onInk ? "text-paper/70" : "text-muted-strong"
              }`}
            >
              {h.label}
              {today && (
                <span
                  className={`tag px-1.5 py-0 text-[10px] ${
                    onInk ? "bg-paper text-ink" : "bg-ink text-paper"
                  }`}
                >
                  Today
                </span>
              )}
            </dt>
            <dd className={`shrink-0 whitespace-nowrap tabular-nums ${onInk ? "text-[15px]" : "text-[16px] text-ink"}`}>
              {h.time}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
