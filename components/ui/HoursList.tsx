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
  tone = "ground",
  className = "",
}: {
  /** "ground" is the charcoal page. "concrete" is the light footer field. */
  tone?: "ground" | "concrete";
  className?: string;
}) {
  const status = useOpenStatus();
  const onConcrete = tone === "concrete";

  return (
    <dl className={`${onConcrete ? "border-t-2 border-deep" : "border-t-2 border-chalk"} ${className}`}>
      {hours.map((h) => {
        const today = status ? h.days.includes(status.weekday) : false;
        return (
          <div
            key={h.label}
            className={`flex items-baseline justify-between gap-4 border-b py-3 ${
              onConcrete ? "border-deep/20" : "border-line"
            }`}
          >
            <dt
              className={`t-label flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 ${
                onConcrete ? "text-deep/70" : "text-muted-strong"
              }`}
            >
              {h.label}
              {today && (
                <span className="tag tag-season px-1.5 py-0 text-[10px]">Today</span>
              )}
            </dt>
            <dd
              className={`shrink-0 whitespace-nowrap tabular-nums ${
                onConcrete ? "text-[15px] text-deep" : "text-[16px] text-chalk"
              }`}
            >
              {h.time}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
