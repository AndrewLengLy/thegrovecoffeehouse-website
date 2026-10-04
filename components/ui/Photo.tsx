import Image from "next/image";
import { Doodle, type DoodleName } from "@/components/ui/Doodle";

/**
 * Every photographic slot on the site.
 *
 * The design depends on real photography of the room, the drinks and the
 * people, and most of it has not arrived. Rather than dressing the site in
 * stock images of somebody else's cafe, an unfilled slot renders as an
 * illustration: a loose wash of the board's matcha green with one of the
 * site's line drawings on it. It holds the exact aspect ratio, so the page lays
 * out correctly at every breakpoint today, and dropping a real file in is a one
 * line change.
 *
 * The brief for the missing photograph always travels with the slot in
 * data-brief. It is printed on the slot in development only, so the client
 * preview reads as finished while the shot list stays one inspect away.
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
  /** What photograph belongs here, so the client knows exactly what to send. */
  brief: string;
  /** Dark placeholders sit behind light text and match its contrast behaviour. */
  tone?: "light" | "dark";
  /** The drawing an empty slot shows. */
  doodle?: DoodleName;
};

const SHOW_BRIEF = process.env.NODE_ENV === "development";

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
  doodle = "cup",
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
      data-tone={tone}
      data-intended-alt={alt}
      data-brief={brief}
      data-size={`${width}x${height}`}
      aria-hidden="true"
      style={fill ? undefined : { aspectRatio: `${width} / ${height}` }}
      className={
        "flex h-full w-full flex-col items-start justify-end gap-1 overflow-hidden p-4 text-left " +
        (fill ? "absolute inset-0 " : "relative ") +
        (tone === "dark" ? "text-paper/80 " : "bg-paper-deep text-ink-soft ") +
        className
      }
    >
      {/* Kept off the dark slot, where the words sit on top of it. */}
      {tone === "light" && (
        <Doodle
          name={doodle}
          className="absolute left-1/2 top-1/2 h-[46%] max-h-56 w-[46%] max-w-56 -translate-x-1/2 -translate-y-1/2"
        />
      )}
      {SHOW_BRIEF && (
        <>
          <span className="t-nav relative text-[10px]">Photograph needed</span>
          <span className="t-note relative max-w-[36ch]">{brief}</span>
          <span className="t-note relative text-[11px] tabular-nums">
            {width} x {height}
          </span>
        </>
      )}
    </div>
  );
}
