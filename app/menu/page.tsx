import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/lib/site";
import {
  CATEGORY_BLURB,
  CATEGORY_LABEL,
  CATEGORY_ORDER,
  extras,
  itemsInCategory,
  menuCaveat,
  milkOptions,
  addOnLines,
} from "@/lib/menu";
import { MenuRow } from "@/components/ui/MenuRow";
import { MenuBlock } from "@/components/ui/MenuBlock";
import { Reveal } from "@/components/motion/Reveal";
import { TrackMenuView } from "@/components/ConversionEvents";
import { JsonLd } from "@/components/JsonLd";
import { absolute, breadcrumbs } from "@/lib/seo";
import { MenuJumpBar } from "@/components/ui/MenuJumpBar";
import { PageHead } from "@/components/ui/PageHead";
import { Wash } from "@/components/ui/Wash";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The full menu at The Grove Coffee House in Roseville. Seasonal drinks, espresso, matcha, and a real food menu including avocado toast, bagels, and the pastrami sandwich.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Menu | The Grove Coffee House",
    description:
      "Every drink and every plate, in one place. Seasonal board, espresso, matcha, and real food.",
    url: `${site.url}/menu`,
  },
};

/** The whole board as schema.org Menu, so an answer engine can quote an item
    and its price without guessing. Items without a confirmed price carry no
    offer rather than an invented one. */
function menuSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": absolute("/menu#menu"),
    name: `${site.name} menu`,
    url: absolute("/menu"),
    inLanguage: "en-US",
    hasMenuSection: CATEGORY_ORDER.map((c) => ({
      "@type": "MenuSection",
      name: CATEGORY_LABEL[c],
      description: CATEGORY_BLURB[c],
      hasMenuItem: itemsInCategory(c).map((i) => ({
        "@type": "MenuItem",
        "@id": absolute(`/menu#${i.slug}`),
        name: i.name,
        description: i.whatsInIt,
        ...(i.price
          ? { offers: { "@type": "Offer", price: i.price, priceCurrency: "USD", availability: "https://schema.org/InStock" } }
          : {}),
      })),
    })),
  };
}

export default function MenuPage() {
  return (
    <>
      <TrackMenuView location="menu_page" />
      <JsonLd data={menuSchema()} />
      <JsonLd data={breadcrumbs([{ name: "Menu", path: "/menu" }])} />

      <PageHead label="Menu" title="The whole board" />

      {/* The caveat on the left and the way in on the right. A menu you have
          to hunt through is halfway back to the problem this page exists to
          solve. */}
      <div className="wrap grid gap-10 pb-16 md:grid-cols-12 md:gap-x-8 md:pb-24">
        <p className="t-body max-w-[40ch] md:col-span-4">{menuCaveat}</p>
        <nav id="menu-index" aria-label="Menu sections" className="md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
          <ul className="border-t border-pencil">
            {CATEGORY_ORDER.map((c) => (
              <li key={c}>
                <a
                  href={`#${c}`}
                  className="group flex min-h-11 items-baseline justify-between gap-4 border-b border-pencil py-3 transition-colors duration-micro hover:text-brick"
                >
                  <span className="t-h3 text-[24px] md:text-[28px]">{CATEGORY_LABEL[c]}</span>
                  <span className="t-price text-[14px] text-brick-deep">
                    {String(itemsInCategory(c).length).padStart(2, "0")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <MenuJumpBar
        indexId="menu-index"
        endId="menu-end"
        sections={CATEGORY_ORDER.filter((c) => itemsInCategory(c).length > 0).map((c) => ({
          id: c,
          label: CATEGORY_LABEL[c],
        }))}
      />

      {CATEGORY_ORDER.map((category) => {
        const items = itemsInCategory(category);
        if (items.length === 0) return null;

        /* scroll-mt-12 on top of the page's scroll padding clears the header
           and the jump bar together. */
        return (
          <section key={category} id={category} aria-labelledby={`${category}-heading`} className="scroll-mt-12 overflow-x-clip">
            <div className="wrap">
              <hr className="rule" />
            </div>
            <div className="wrap grid gap-8 py-14 md:py-20 lg:grid-cols-12">
              {/* Matcha heads its section on a wash of green, the way it does
                  on the board. Only behind the heading: the resting drinks in
                  the list are set in the soft ink, which the wash would take
                  under AA. */}
              <div className="relative lg:col-span-4">
                {category === "matcha" && (
                  <Wash className="absolute -inset-x-6 -inset-y-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] max-w-[30rem]" />
                )}
                <h2 id={`${category}-heading`} className="t-h2 relative">
                  {CATEGORY_LABEL[category]}
                </h2>
                <p className="t-body relative mt-3 max-w-[38ch]">{CATEGORY_BLURB[category]}</p>
              </div>

              <Reveal
                as="ul"
                each={0.06}
                className="grid list-none gap-x-12 gap-y-7 sm:grid-cols-2 lg:col-span-8 lg:gap-x-16"
              >
                {items.map((item) => (
                  <MenuRow key={item.slug} item={item} />
                ))}
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* Straight off the bottom of the board in the shop. */}
      <section id="menu-end" aria-label="Milk, extras and roaster">
        <div className="wrap">
          <hr className="rule" />
        </div>
        <div className="wrap grid gap-10 py-14 sm:grid-cols-2 md:py-20 lg:grid-cols-3 lg:gap-16">
          <MenuBlock title="Milk options" headingLevel="h2" lines={addOnLines(milkOptions)} />
          <MenuBlock title="Extras" headingLevel="h2" lines={addOnLines(extras)} />
          <div>
            <h2 className="t-board">Roasted by</h2>
            <p className="t-item mt-4">{site.roaster.name}</p>
            <p className="t-note mt-1">{site.roaster.location}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="order-heading" className="on-sand relative">
        <div className="wrap section grid gap-8 md:grid-cols-12 md:gap-x-8">
          <p className="t-caps md:col-span-3">Ordering</p>
          <div className="md:col-span-8 md:col-start-5 lg:col-span-6 lg:col-start-7">
          <h2 id="order-heading" className="t-statement-lg">
            Not sure what to order?
          </h2>
            <p className="t-body mt-5 max-w-[46ch]">
              Tell whoever is on bar what you usually go for and how sweet you like
              it, and they will find you something. It is the best part of
              ordering in person.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={site.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-event="directions_click"
                data-event-location="menu_footer"
                className="btn"
              >
                Get directions
              </a>
              <a
                href={site.phone.href}
                data-event="phone_click"
                data-event-location="menu_footer"
                className="btn btn-ghost tabular-nums"
              >
                {site.phone.display}
              </a>
              <Link href="/visit" className="btn btn-ghost">
                Hours and parking
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
