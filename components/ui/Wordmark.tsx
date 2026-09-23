import Image from "next/image";
import { site } from "@/lib/site";
import { GroveMark } from "@/components/ui/GroveMark";

/**
 * The name, however it is currently available.
 *
 * When the client's real logo file is in place (see site.logo) this renders it.
 * Until then it sets the name in the site's italic serif, with the sprout
 * tucked against the last letter the way the reference's flourish trails off
 * its script. It does not pretend to be the brush script mark on the board in
 * the shop, which we still do not have a file for.
 */

type Props = {
  className?: string;
  /** The accessible name. Null when an adjacent element already names it. */
  title?: string | null;
  /** Sitting on wine, so the reversed logo is used if there is one. */
  onDark?: boolean;
};

export function Wordmark({ className = "", title = "The Grove Coffee House", onDark = false }: Props) {
  const file = onDark ? (site.logo.srcOnDark ?? site.logo.src) : site.logo.src;

  if (file) {
    return (
      <Image
        src={file}
        alt={title ?? ""}
        width={site.logo.width}
        height={site.logo.height}
        priority
        className={`block h-11 w-auto md:h-14 ${className}`}
      />
    );
  }

  return (
    <span className={`relative inline-flex items-start ${className}`}>
      {title === null ? null : <span className="sr-only">{title}</span>}
      <span
        aria-hidden="true"
        className="font-[family-name:var(--font-serif)] text-[34px] italic leading-none tracking-[-0.02em] md:text-[42px]"
      >
        The Grove
      </span>
      <GroveMark
        weight={1.6}
        className={`-ml-0.5 -mt-1 h-5 w-5 shrink-0 md:h-6 md:w-6 ${onDark ? "text-paper" : "text-doodle"}`}
      />
    </span>
  );
}
