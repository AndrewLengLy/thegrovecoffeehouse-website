import Link from "next/link";
import { itemsInCategory, type MenuItem } from "@/lib/menu";
import { MenuBlock, type MenuLine } from "@/components/ui/MenuBlock";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The board, printed: the label, and then the board itself in three
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
        <Reveal className="mt-8 grid items-start gap-12 sm:grid-cols-2 sm:gap-x-10 md:mt-10 lg:grid-cols-3 lg:gap-x-16">
          {/* What is new leads. */}
          <MenuBlock title="Fall specials" lines={seasonal.map((i) => line(i))} />
          <MenuBlock title="The favorites" lines={favorites.map((i) => line(i))} />
          <MenuBlock title="Matcha" wash lines={matcha.map((i) => line(i))} />
        </Reveal>

        <Link href="/menu" className="btn btn-lg mt-12 md:mt-16">
          See the whole menu
        </Link>
      </div>
    </section>
  );
}
