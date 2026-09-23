"use client";

import { useDrawOnView } from "@/components/ui/useDrawOnView";

/**
 * The hand drawn rule between sections.
 *
 * A pencil line across the full width, a little uneven, with a second fainter
 * pass beside it the way a real pencil line catches the paper. It stretches to
 * any width without the stroke thickening, and draws itself in from the left
 * the first time it scrolls into view.
 */
export function Squiggle({ className = "" }: { className?: string }) {
  const ref = useDrawOnView<SVGSVGElement>();

  return (
    <svg
      ref={ref}
      data-draw
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={`block h-[18px] w-full text-pencil ${className}`}
    >
      <path
        className="draw"
        pathLength={1}
        d="M1 14.5C38 12.2 71 15.8 118 13.9S214 10.6 262 12.8 356 16.9 409 14.2 497 9.8 553 11.6 648 16.4 702 14.1 790 10.3 846 11.9 948 15.8 1003 13.4 1100 10.6 1142 12.6 1186 14.2 1199 13.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        className="draw"
        pathLength={1}
        style={{ ["--i" as string]: 2 }}
        d="M40 15.6C96 13.8 150 16.1 214 14.6S330 12.4 388 15.1 470 12.2 540 12.9 640 17.2 712 15.2 820 11.8 880 13.1 990 16.4 1060 14.3 1150 12.2 1170 13.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.55"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
