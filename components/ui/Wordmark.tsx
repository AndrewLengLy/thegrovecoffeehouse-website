import Image from "next/image";
import { site } from "@/lib/site";

/**
 * The name, however it is currently available.
 *
 * When the client's real logo file is in place (see site.logo) this renders it.
 * Until then it sets the name in the site's own signage face rather than
 * inventing a mark or shipping a photograph of the one framed inside the shop.
 *
 * Three variants:
 *   inline  small placements
 *   huge    the footer fascia, "THE GROVE" across the full width
 *   fascia  the header board, the full name across the full width
 */

type Props = {
  variant?: "inline" | "huge" | "fascia";
  className?: string;
  /** The accessible name. Null when an adjacent element already names it. */
  title?: string | null;
  /** Sitting on ink or green, so the reversed logo is used if there is one. */
  onDark?: boolean;
};

export function Wordmark({
  variant = "inline",
  className = "",
  title = "The Grove Coffee House",
  onDark = false,
}: Props) {
  const file = onDark ? (site.logo.srcOnDark ?? site.logo.src) : site.logo.src;

  if (file) {
    return (
      <Image
        src={file}
        alt={title ?? ""}
        width={site.logo.width}
        height={site.logo.height}
        priority={variant === "inline"}
        className={
          (variant === "inline" ? "block h-8 w-auto md:h-9 " : "block h-auto w-full") + className
        }
      />
    );
  }

  /* The header board. The full business name, measured the same way as the
   * footer fascia below: "THE GROVE COFFEE HOUSE" at weight 800 has an advance
   * of 9.5755 times the font size, measured against the loaded face, so the
   * viewBox is set to exactly that ratio and the type fills the viewport edge
   * to edge with its real letterfit at any width. Short names make tall
   * fascias, which is why this one carries the whole name and the footer,
   * which can afford the height, carries just "THE GROVE".
   */
  if (variant === "fascia") {
    return (
      <svg
        viewBox="0 0 957.55 78"
        overflow="visible"
        className={`block w-full ${className}`}
        role={title ? "img" : "presentation"}
        aria-label={title ?? undefined}
        aria-hidden={title ? undefined : true}
        focusable="false"
      >
        <text
          x="0"
          y="74"
          fontFamily="var(--font-shoulders), Arial Narrow, sans-serif"
          fontSize="100"
          fontWeight="800"
          fill="currentColor"
        >
          THE GROVE COFFEE HOUSE
        </text>
      </svg>
    );
  }

  if (variant === "huge") {
    /* The fascia. Measured, not stretched.
     *
     * "THE GROVE" in this face at weight 800 has an advance of 3.9918 times the
     * font size, so
     * the viewBox is set to exactly that ratio and the SVG is scaled to the
     * container width. The type then fills edge to edge at any viewport with its
     * real letterforms and its real letterfit. textLength would have got the
     * same width by distorting the glyphs or by blowing the tracking apart, and
     * either one makes this disagree with the wordmark in the header.
     */
    return (
      <svg
        viewBox="0 0 399.18 78"
        /* Round letters overshoot the cap height by a unit or so. Let them. */
        overflow="visible"
        className={`block w-full ${className}`}
        role={title ? "img" : "presentation"}
        aria-label={title ?? undefined}
        aria-hidden={title ? undefined : true}
        focusable="false"
      >
        <text
          x="0"
          y="74"
          fontFamily="var(--font-shoulders), Arial Narrow, sans-serif"
          fontSize="100"
          fontWeight="800"
          fill="currentColor"
        >
          THE GROVE
        </text>
      </svg>
    );
  }

  return (
    <span className={`inline-flex items-baseline gap-[0.35em] ${className}`}>
      {title === null ? null : <span className="sr-only">{title}</span>}
      <span
        aria-hidden="true"
        className="font-[family-name:var(--font-sign)] text-[26px] font-bold uppercase leading-none tracking-[-0.01em]"
      >
        The Grove
      </span>
      <span
        aria-hidden="true"
        className="t-label hidden text-[10px] tracking-[0.18em] opacity-70 sm:inline"
      >
        Roseville
      </span>
    </span>
  );
}
