/**
 * One column of a printed menu, the way the reference sets it: an italic head,
 * then each item in grotesque capitals with its price in typewriter figures at
 * a fixed column, and a line of fine print under the ones that need it.
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
  className = "",
}: {
  title: string;
  lines: MenuLine[];
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const H = headingLevel;
  return (
    <div className={className}>
      <H className="t-h3 text-[21px]">{title}</H>
      {/* A linked line is 24px tall to meet the target size, and the gap is
          taken in by the same 4px so every line keeps the printed rhythm. */}
      <ul className="mt-4 flex flex-col gap-y-[5px]">
        {lines.map((l) => (
          <li key={l.name} className="grid min-h-6 grid-cols-[minmax(0,1fr)_4.5rem] items-baseline gap-x-4">
            <span className="t-item">
              {l.href ? (
                <a href={l.href} className="inline-flex min-h-6 items-center hover:text-brick">
                  {l.name}
                </a>
              ) : (
                l.name
              )}
            </span>
            <span className="t-price">{l.price ?? "Ask"}</span>
            {l.note && <span className="t-note col-span-1 -mt-0.5 max-w-[34ch]">{l.note}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
