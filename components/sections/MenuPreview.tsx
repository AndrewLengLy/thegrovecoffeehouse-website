import Link from "next/link";
import { itemsInCategory, milkOptions, addOnLines, type MenuItem } from "@/lib/menu";
import { MenuBlock, type MenuLine } from "@/components/ui/MenuBlock";
import { Slideshow } from "@/components/ui/Slideshow";
import { Reveal } from "@/components/motion/Reveal";
import { Doodle } from "@/components/ui/Doodle";

/**
 * The board, printed. A short introduction and a portrait print on the left,
 * then the menu itself in two columns, the way the reference opens its menu on
 * the home page rather than hiding it a click away. Everything here reads from
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
    <section id="seasonal" aria-labelledby="board-heading" className="relative scroll-mt-2">
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
          <Slideshow
            className="mt-5 aspect-[336/444] w-full max-w-[420px]"
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 420px, 100vw"
            slides={[
              {
                src: null,
                alt: "A drink from the seasonal board at The Grove, held up in the light",
                brief: "Portrait shot of one drink from the current seasonal board, held in hand. Natural light.",
                width: 1000,
                height: 1320,
              },
            ]}
          />
          <Link href="/menu" className="btn mt-5">
            See the whole menu
          </Link>
        </div>

        <Reveal className="grid gap-10 sm:grid-cols-2 sm:gap-x-10 lg:col-span-8 lg:col-start-5 lg:gap-x-16">
          <div className="flex flex-col gap-10">
            <MenuBlock title="Coffee" lines={coffee.map((i) => line(i))} />
            <MenuBlock title="Fall specials" lines={seasonal.map((i) => line(i, true))} />
            <MenuBlock title="Milk options" lines={addOnLines(milkOptions)} />
          </div>
          <div className="flex flex-col gap-10">
            <MenuBlock title="The favorites" lines={favorites.map((i) => line(i, true))} />
            <MenuBlock title="Matcha" lines={matcha.map((i) => line(i, true))} />
          </div>
        </Reveal>
      </div>

      <Doodle
        name="drinks"
        className="absolute -bottom-6 right-4 h-20 w-20 md:right-12 md:h-24 md:w-24"
      />
    </section>
  );
}
