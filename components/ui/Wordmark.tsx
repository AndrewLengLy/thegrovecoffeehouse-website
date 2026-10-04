import Image from "next/image";
import { site } from "@/lib/site";

/**
 * The name, set the way the menu board in the shop sets it.
 *
 * When the client's real logo file is in place (see site.logo) this renders
 * it. Until then it sets "The Grove Coffee House" in Damion, the closest free
 * match to the board's green script, in the board's green, with the sketch of
 * coffee beans that sits beside it on the board. It is a faithful setting of
 * their mark, not the file itself, so the file still replaces it on arrival.
 */

type Props = {
  className?: string;
  /** The accessible name. Null when an adjacent element already names it. */
  title?: string | null;
  /** Sitting on the forest, so the reversed logo is used if there is one. */
  onDark?: boolean;
  /** The header's size, or the large setting at the foot of the page. */
  size?: "header" | "large";
};

export function Wordmark({
  className = "",
  title = "The Grove Coffee House",
  onDark = false,
  size = "header",
}: Props) {
  const file = onDark ? (site.logo.srcOnDark ?? site.logo.src) : site.logo.src;
  const large = size === "large";

  if (file) {
    return (
      <Image
        src={file}
        alt={title ?? ""}
        width={site.logo.width}
        height={site.logo.height}
        priority={!large}
        className={`block w-auto ${large ? "h-20 md:h-28" : "h-10 md:h-12"} ${className}`}
      />
    );
  }

  return (
    <span className={`relative inline-flex items-center gap-2 ${className}`}>
      {title === null ? null : <span className="sr-only">{title}</span>}
      <span
        aria-hidden="true"
        className={
          "font-[family-name:var(--font-script)] [-webkit-text-stroke:0.012em_currentColor] " +
          (onDark ? "text-paper " : "text-grove ") +
          /* Large, it wraps onto a second line on a phone the way the board
             sets it, "The Grove Coffee" over "House". */
          (large
            ? "text-[clamp(52px,9.2vw,172px)] leading-[1.02]"
            : "whitespace-nowrap text-[24px] leading-none sm:text-[27px] md:text-[31px]")
        }
      >
        The Grove Coffee House
      </span>
      <Beans
        className={
          "shrink-0 " +
          (onDark ? "text-paper/75 " : "text-ink ") +
          (large ? "hidden h-[0.6em] w-[0.9em] text-[clamp(52px,9.2vw,172px)] sm:block" : "hidden h-7 w-10 sm:block")
        }
      />
    </span>
  );
}

/** The sketch of beans beside the name on the board. */
export function Beans({ className = "" }: { className?: string }) {
  const bean = (x: number, y: number, r: number) => (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <ellipse rx="12" ry="8" />
      <path d="M-10 1.5C-5 -3.5 4 3.5 10 -1.5" strokeWidth="1.1" />
    </g>
  );

  return (
    <svg
      viewBox="0 0 64 42"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
    >
      {bean(16, 26, -28)}
      {bean(36, 13, 14)}
      {bean(47, 30, -8)}
    </svg>
  );
}
