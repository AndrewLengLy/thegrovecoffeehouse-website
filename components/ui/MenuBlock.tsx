import { Wash } from "@/components/ui/Wash";

/**
 * One column of the menu, set the way the board in the shop sets it: the head
 * in spaced red typewriter capitals, then each item in typewriter capitals with
 * a dotted leader running out to its price in red, and a line of fine print
 * under the ones that need it. The matcha column sits on a wash of green, as
 * it does on the board.
 *
 * An item with no price says "Ask". It is a drink we know is poured but do not
 * have a confirmed price for, and quoting a number we do not have is worse.
 */

export type MenuLine = {
  name: string;
  price?: string;
  note?: string;
  /** Anchor on the menu page, when the line stands for a full entry there. */
  href?: string;
};

export function MenuBlock({
  title,
  lines,
  headingLevel = "h3",
  wash = false,
  className = "",
}: {
  title: string;
  lines: MenuLine[];
  headingLevel?: "h2" | "h3";
  /** Sit the column on the board's green watercolour. */
  wash?: boolean;
  className?: string;
}) {
  const H = headingLevel;
  return (
    <div className={`relative ${className}`}>
      {wash && <Wash className="absolute -inset-x-6 -inset-y-5 h-[calc(100%+2.5rem)] w-[calc(100%+3rem)]" />}
      <H className="t-board relative">{title}</H>
      {/* A linked line is 24px tall to meet the target size, and the gap is
          taken in by the same 4px so every line keeps the printed rhythm. */}
      <ul className="relative mt-3 flex flex-col gap-y-[5px] border-t border-brick/50 pt-3">
        {lines.map((l) => (
          <li key={l.name} className="grid min-h-6 grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-2">
            <span className="t-item flex min-w-0 items-baseline gap-2">
              {l.href ? (
                <a href={l.href} className="inline-flex min-h-6 items-center hover:text-brick">
                  {l.name}
                </a>
              ) : (
                l.name
              )}
              <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-ink/40" />
            </span>
            <span className="t-price text-brick-deep">{l.price ?? "Ask"}</span>
            {l.note && (
              <span className={`t-note col-span-2 -mt-0.5 max-w-[40ch] ${wash ? "text-ink" : "text-ink-soft"}`}>
                {l.note}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
