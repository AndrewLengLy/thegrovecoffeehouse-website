import Link from "next/link";
import { menu, type MenuItem } from "@/lib/menu";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Four drinks set out like a shop shelf: a square print each, the name in
 * capitals under it, a line of fine print and the price. The reference uses
 * this row for its merch. The Grove has no merch, and what it does have that
 * nobody else nearby has is these.
 */
const SLUGS = ["gulab-jamun-latte", "baklava-latte", "biscoff-banana-matcha", "spanish-latte"];

const picks = SLUGS.map((s) => menu.find((i) => i.slug === s)).filter(
  (i): i is MenuItem => Boolean(i),
);

export function Favorites() {
  return (
    <section aria-labelledby="favorites-heading">
      <div className="wrap section">
        <div className="flex items-end justify-between gap-6">
          <h2 id="favorites-heading" className="t-h2">
            The ones people drive here for
          </h2>
          <Link href="/menu#favorites" className="btn shrink-0">
            See all
          </Link>
        </div>

        <Reveal as="ul" className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 lg:grid-cols-4">
          {picks.map((item) => (
            <li key={item.slug} className="text-center">
              <Link href={`/menu#${item.slug}`} className="group block">
                <div className="print aspect-square">
                  <Photo
                    src={null}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    width={1000}
                    height={1000}
                    alt={`${item.name} at The Grove Coffee House`}
                    brief={`${item.name}, on a table in the shop, shot from a little above. Square.`}
                  />
                </div>
                <h3 className="t-item mt-3 group-hover:text-brick">{item.name}</h3>
              </Link>
              <p className="t-note mx-auto mt-1 max-w-[32ch]">{item.whatsInIt}</p>
              {item.price && <p className="t-note mt-2">${item.price}</p>}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
