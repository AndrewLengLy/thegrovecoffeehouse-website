import Image from "next/image";
import { site } from "@/lib/site";

/**
 * The name, however it is currently available.
 *
 * When the client's real logo file is in place (see site.logo) this renders it.
 * Until then it sets the name in the site's own signage face rather than
 * inventing a mark or shipping a photograph of the one framed inside the shop.
 *
 * Two variants:
 *   inline  header and small placements
 *   huge    the footer fascia, painted across the full width
 */

type Props = {
  variant?: "inline" | "huge";
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
          (variant === "huge" ? "block h-auto w-full" : "block h-8 w-auto md:h-9 ") + className
        }
      />
    );
  }

  if (variant === "huge") {
    /* The fascia. Measured, not stretched.
     *
     * "THE GROVE" in this face has an advance of 3.8645 times the font size, so
     * the viewBox is set to exactly that ratio and the SVG is scaled to the
     * container width. The type then fills edge to edge at any viewport with its
     * real letterforms and its real letterfit. textLength would have got the
     * same width by distorting the glyphs or by blowing the tracking apart, and
     * either one makes this disagree with the wordmark in the header.
     */
    return (
      <svg
        viewBox="0 0 386.45 78"
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
          fontWeight="700"
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
