import Link from "next/link";
import { itemsInCategory, milkOptions, addOnLines, type MenuItem } from "@/lib/menu";
import { MenuBlock, type MenuLine } from "@/components/ui/MenuBlock";
import { site } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The board, printed. The lodge opens its lodges section with a tiny label and
 * one long sentence across the page, and then the lodges. This does the same
 * for the menu: the label, the sentence, and then the board itself in four
 * columns set the way the board in the shop sets it, red typewriter heads,
 * dotted leaders out to the prices, and matcha on its wash of green.
 *
 * Everything here reads from lib/menu.ts, so it can never disagree with the
 * menu page.
 */

function line(i: MenuItem, withNote = false): MenuLine {
  return {
    name: i.name,
    price: i.price ? `$${i.price}` : undefined,
    note: withNote ? i.whatsInIt : undefined,
    href: `/menu#${i.slug}`,
  };
}

const onBoard = (i: MenuItem) => i.available && !i.offBoard;

export function MenuPreview() {
  const seasonal = itemsInCategory("seasonal").filter((i) => i.available);
  const coffee = itemsInCategory("coffee").filter(onBoard);
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
            Espresso every way, a matcha list eight drinks long, the favorites
            people drive here for, and a seasonal board we change with the
            weather.
          </p>
        </Reveal>

        <Reveal className="mt-14 grid items-start gap-12 sm:grid-cols-2 sm:gap-x-10 md:mt-20 lg:grid-cols-4 lg:gap-x-12">
          {/* What is new leads. */}
          <MenuBlock title="Fall specials" lines={seasonal.map((i) => line(i, true))} />
          <MenuBlock title="The favorites" lines={favorites.map((i) => line(i, true))} />
          <MenuBlock title="Matcha" wash lines={matcha.map((i) => line(i, true))} />
          {/* The everyday list waits for the menu page on a phone. */}
          <div className="hidden flex-col gap-12 sm:flex">
            <MenuBlock title="Coffee" lines={coffee.map((i) => line(i))} />
            <MenuBlock title="Milk options" lines={addOnLines(milkOptions)} />
          </div>
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
