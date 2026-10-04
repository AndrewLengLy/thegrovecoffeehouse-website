import Link from "next/link";
import { menu, type MenuItem } from "@/lib/menu";
import { Photo } from "@/components/ui/Photo";
import type { DoodleName } from "@/components/ui/Doodle";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The lodge lists its lodges as a row of tall prints, each with its name set
 * under it in the light serif. This is that row for four of the favorites:
 * a tall panel each, the name under it, a line of what is
 * in it in the board's typewriter, and the price in red.
 *
 * Until each drink has its photograph, each panel carries one of the board's
 * green drawings instead, a different one for each so the row does not read
 * as four copies of one empty frame.
 */
const SLUGS = ["gulab-jamun-latte", "baklava-latte", "biscoff-banana-matcha", "spanish-latte"];

const DRAWN: DoodleName[] = ["cup", "beans", "drinks", "sapling"];

const picks = SLUGS.map((s) => menu.find((i) => i.slug === s)).filter(
  (i): i is MenuItem => Boolean(i),
);

export function Favorites() {
  return (
    <section aria-labelledby="favorites-heading">
      <div className="wrap section grid gap-y-10 md:grid-cols-12 md:gap-x-8">
        <h2 id="favorites-heading" className="t-caps md:col-span-3">
          The favorites
        </h2>
        <div className="md:col-span-8 md:col-start-5 lg:col-span-6 lg:col-start-7">
          <p className="t-statement">
            The ones people drive here for. Gulab jamun with cardamom, rose and
            saffron, baklava with orange blossom and honey, and a few more our
            regulars swear by. Which one is yours?
          </p>
          <Link href="/menu#favorites" className="btn btn-sand mt-6">
            See all the favorites
          </Link>
        </div>

        <Reveal as="ul" className="grid grid-cols-2 gap-x-4 gap-y-10 md:col-span-12 md:mt-8 md:gap-x-6 lg:grid-cols-4">
          {picks.map((item, i) => (
            <li key={item.slug}>
              <Link href={`/menu#${item.slug}`} className="group block">
                <div className="print aspect-[3/4]">
                  <Photo
                    src={null}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    width={1000}
                    height={1333}
                    alt={`${item.name} at The Grove Coffee House`}
                    brief={`${item.name}, on a table in the shop, shot from a little above. Portrait.`}
                    doodle={DRAWN[i % DRAWN.length]}
                    className="transition-transform duration-slow ease-out-quart group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <h3 className="t-h3 text-[19px] transition-colors group-hover:text-brick md:text-[21px]">
                    {item.name}
                  </h3>
                  {item.price && <span className="t-price shrink-0 text-[14px] text-brick-deep">${item.price}</span>}
                </div>
              </Link>
              <p className="t-note mt-1.5 max-w-[34ch] text-ink-soft">{item.whatsInIt}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
