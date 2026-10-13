import Link from "next/link";
import { itemsInCategory, type MenuItem } from "@/lib/menu";
import { MenuBlock, type MenuLine } from "@/components/ui/MenuBlock";
import { site } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The board, printed. The lodge opens its lodges section with a tiny label and
 * one long sentence across the page, and then the lodges. This does the same
 * for the menu: the label, the sentence, and then the board itself in three
 * columns set the way the board in the shop sets it, red typewriter heads,
 * dotted leaders out to the prices, and matcha on its wash of green. The
 * everyday coffee list, milks and extras wait for the menu page.
 *
 * Everything here reads from lib/menu.ts, so it can never disagree with the
 * menu page.
 */

function line(i: MenuItem): MenuLine {
  return {
    name: i.name,
    price: i.price ? `$${i.price}` : undefined,
    note: i.whatsInIt,
    href: `/menu#${i.slug}`,
  };
}

const onBoard = (i: MenuItem) => i.available && !i.offBoard;

export function MenuPreview() {
  const seasonal = itemsInCategory("seasonal").filter((i) => i.available);
  const favorites = itemsInCategory("favorites").filter(onBoard).slice(0, 6);
  const matcha = itemsInCategory("matcha").filter(onBoard).slice(0, 5);

  return (
    <section id="seasonal" aria-labelledby="board-heading" className="relative scroll-mt-2 overflow-x-clip">
      <div className="wrap section">
        <h2 id="board-heading" className="t-caps">
          On the board
        </h2>
        <Reveal travel={16} className="mt-6 md:mt-8">
          <p className="t-statement-lg max-w-[24ch] md:max-w-[30ch]">
            A seasonal board we change with the weather, the favorites people
            drive here for, and a matcha list eight drinks long.
          </p>
        </Reveal>

        <Reveal className="mt-14 grid items-start gap-12 sm:grid-cols-2 sm:gap-x-10 md:mt-20 lg:grid-cols-3 lg:gap-x-16">
          {/* What is new leads. */}
          <MenuBlock title="Fall specials" lines={seasonal.map((i) => line(i))} />
          <MenuBlock title="The favorites" lines={favorites.map((i) => line(i))} />
          <MenuBlock title="Matcha" wash lines={matcha.map((i) => line(i))} />
        </Reveal>

        <div className="mt-14 flex flex-col items-start gap-5 md:mt-20 md:flex-row md:items-center md:justify-between">
          <Link href="/menu" className="btn btn-lg">
            See the whole menu
          </Link>
          <p className="t-note max-w-[44ch] text-ink-soft">
            Roasted by {site.roaster.name}, {site.roaster.location}.
          </p>
        </div>
      </div>
    </section>
  );
}
