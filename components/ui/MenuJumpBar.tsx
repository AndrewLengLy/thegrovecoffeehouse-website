"use client";

import { useEffect, useRef, useState } from "react";

type Section = { id: string; label: string };

/**
 * The menu is long, and on a phone it is very long. The index at the top of the
 * page is the way in, but it is gone after the first flick, so this bar takes
 * over once the index has scrolled away and keeps every section one tap away.
 * It names the section you are in, and it leaves again once the categories end.
 *
 * It rides directly under the header and moves up into the header's place when
 * the header hides on the way down (see data-header in Header.tsx).
 */
export function MenuJumpBar({
  sections,
  indexId,
  endId,
}: {
  sections: Section[];
  /** The in-page index this bar takes over from. */
  indexId: string;
  /** Marks where the categories stop. */
  endId: string;
}) {
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const rowRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const index = document.getElementById(indexId);
    const end = document.getElementById(endId);
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    let frame = 0;
    const measure = () => {
      const pastIndex = index ? index.getBoundingClientRect().bottom < 0 : true;
      const beforeEnd = end ? end.getBoundingClientRect().top > 160 : true;
      setShown(pastIndex && beforeEnd);

      // The section whose top has passed the line under the bar.
      let current: string | null = null;
      for (const el of targets) {
        if (el.getBoundingClientRect().top <= 170) current = el.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    frame = requestAnimationFrame(measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections, indexId, endId]);

  // Keep the current chip in view inside the sideways row.
  useEffect(() => {
    const row = rowRef.current;
    if (!row || !active) return;
    const chip = row.querySelector<HTMLElement>(`[data-for="${active}"]`);
    if (!chip) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollTo({ left: chip.offsetLeft - 16, behavior: reduced ? "auto" : "smooth" });
  }, [active]);

  return (
    <nav aria-label="Jump to a section" className="jumpbar" data-shown={shown} inert={!shown}>
      <div className="wrap">
        <ul
          ref={rowRef}
          className="no-scrollbar -mx-2 flex gap-1 overflow-x-auto overscroll-x-contain px-2 py-2"
        >
          {sections.map((s) => {
            const current = s.id === active;
            return (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  data-for={s.id}
                  aria-current={current ? "true" : undefined}
                  className={[
                    "t-label inline-flex min-h-10 items-center whitespace-nowrap border-2 px-3",
                    "transition-colors duration-micro",
                    current
                      ? "border-chalk bg-chalk text-ground"
                      : "border-transparent text-chalk hover:border-chalk",
                  ].join(" ")}
                >
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
