import Link from "next/link";
import { itemsInCategory, milkOptions, addOnLines, type MenuItem } from "@/lib/menu";
import { MenuBlock, type MenuLine } from "@/components/ui/MenuBlock";
import { site } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { Doodle } from "@/components/ui/Doodle";

/**
 * The board, printed. A short introduction on the left, then the menu itself
 * in two columns set the way the board in the shop sets it, matcha on its wash
 * of green, rather than hiding it a click away. Everything here reads from
 * lib/menu.ts, so it can never disagree with the menu page.
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
      <div className="wrap section grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <h2 id="board-heading" className="t-h2">
            What is on the board
          </h2>
          <p className="t-body mt-3 max-w-[40ch]">
            Espresso done every way, a matcha list eight drinks long, the
            favorites people drive here for, and a seasonal board we change
            with the weather.
          </p>
          <Link href="/menu" className="btn mt-5">
            See the whole menu
          </Link>
          <Doodle name="drinks" className="mt-8 hidden h-36 w-36 lg:block" />
          <p className="t-note mt-8 max-w-[34ch] text-ink-soft">
            Roasted by {site.roaster.name}, {site.roaster.location}.
          </p>
        </div>

        <Reveal className="grid gap-10 sm:grid-cols-2 sm:gap-x-10 lg:col-span-8 lg:col-start-5 lg:gap-x-16">
          <div className="flex flex-col gap-10">
            {/* What is new leads, above the everyday list. */}
            <MenuBlock title="Fall specials" lines={seasonal.map((i) => line(i, true))} />
            {/* The everyday list waits for the menu page on a phone. */}
            <MenuBlock title="Coffee" className="hidden sm:block" lines={coffee.map((i) => line(i))} />
            {/* On a phone the preview is already long, and the menu page has these. */}
            <MenuBlock title="Milk options" className="hidden sm:block" lines={addOnLines(milkOptions)} />
          </div>
          <div className="flex flex-col gap-10">
            <MenuBlock title="The favorites" lines={favorites.map((i) => line(i, true))} />
            <MenuBlock title="Matcha" wash lines={matcha.map((i) => line(i, true))} />
          </div>
        </Reveal>

        {/* A way on at the foot of the lists, where a phone reader ends up. */}
        <Link href="/menu" className="btn min-h-11 justify-self-start px-4 sm:hidden">
          Coffee, tea and the whole menu
        </Link>
      </div>
    </section>
  );
}
