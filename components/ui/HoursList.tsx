"use client";

import { hours } from "@/lib/site";
import { useOpenStatus } from "@/lib/open-status";

/**
 * The hours, the same way everywhere they appear: the days in grotesque
 * capitals, the times in typewriter figures, a pencil rule between them.
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
  tone?: "paper" | "wine";
  className?: string;
}) {
  const status = useOpenStatus();
  const rule = tone === "wine" ? "border-paper/30" : "border-pencil/50";

  return (
    <dl className={`border-t ${rule} ${className}`}>
      {hours.map((h) => {
        const today = status ? h.days.includes(status.weekday) : false;
        return (
          <div key={h.label} className={`flex items-baseline justify-between gap-4 border-b py-2.5 ${rule}`}>
            <dt className="t-item flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
              {h.label}
              {today && <span className="tag tag-season text-[10px]">Today</span>}
            </dt>
            <dd className="t-price shrink-0 text-[15px]">{h.time}</dd>
          </div>
        );
      })}
    </dl>
  );
}
