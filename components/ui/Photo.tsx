import Image from "next/image";

/**
 * Every photographic slot on the site.
 *
 * The design depends on real photography of the room, the drinks and the staff,
 * and we do not have it yet. Rather than dressing the site in stock images of
 * somebody else's cafe, an unfilled slot renders as a placeholder that holds the
 * exact aspect ratio and states which photograph belongs there and at what size.
 * The page therefore lays out correctly at every breakpoint today, and dropping
 * a real file in is a one line change.
 */

export type PhotoProps = {
  src?: string | null;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Fill its parent instead of flowing at its intrinsic size. */
  fill?: boolean;
  /** Shown on the placeholder so the client knows exactly what to send. */
  brief: string;
  /** Dark placeholders sit behind light text and match its contrast behaviour. */
  tone?: "light" | "dark";
};

export function Photo({
  src = null,
  alt,
  width,
  height,
  priority = false,
  sizes,
  className = "",
  fill = false,
  brief,
  tone = "light",
}: PhotoProps) {
  if (src) {
    if (fill) {
      return (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "100vw"}
          className={`object-cover ${className}`}
        />
      );
    }
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={className}
      />
    );
  }

  // The placeholder is not the photograph, so it carries no alt text and is
  // hidden from assistive technology. The intended alt travels with the slot.
  return (
    <div
      role="presentation"
      data-photo-placeholder
      data-intended-alt={alt}
      aria-hidden="true"
      style={fill ? undefined : { aspectRatio: `${width} / ${height}` }}
      className={
        "flex h-full w-full flex-col gap-1.5 p-5 " +
        (fill
          ? "absolute inset-0 items-end justify-start pt-24 text-right "
          : "items-start justify-end text-left ") +
        (tone === "dark" ? "bg-ink text-paper/75 " : "bg-surface text-muted-strong ") +
        className
      }
    >
      <span className="t-label" style={{ fontSize: "10px" }}>
        Photograph needed
      </span>
      {/* On a small screen a full shot brief sitting behind the hero headline
          collides with it. The label stays, the detail waits for room. */}
      <span
        className={
          "max-w-[36ch] text-[13px] leading-snug " + (fill ? "hidden md:block" : "")
        }
      >
        {brief}
      </span>
      <span className={"text-[11px] tabular-nums " + (fill ? "hidden md:block" : "")}>
        {width} x {height}
      </span>
    </div>
  );
}
