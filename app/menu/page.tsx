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
} from "@/lib/menu";
import { MenuRow } from "@/components/ui/MenuRow";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { TrackMenuView } from "@/components/ConversionEvents";
import { JsonLd } from "@/components/JsonLd";
import { absolute, breadcrumbs } from "@/lib/seo";
import { BandLine } from "@/components/motion/BandLine";
import { MenuJumpBar } from "@/components/ui/MenuJumpBar";

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

      <div className="wrap section pb-8 md:pb-10">
        <SplitHeading as="h1" onLoad className="t-hero max-w-[11ch]">
          The whole board
        </SplitHeading>

        <div className="mt-8 grid gap-6 md:grid-cols-12">
          <p className="t-body text-muted md:col-span-5">{menuCaveat}</p>

          {/* Jump links. A menu you have to hunt through is halfway back to the
              problem this page exists to solve. */}
          <nav id="menu-index" aria-label="Menu sections" className="md:col-span-6 md:col-start-7">
            <ul className="border-t border-ink">
              {CATEGORY_ORDER.map((c) => (
                <li key={c}>
                  <a
                    href={`#${c}`}
                    className="group flex items-baseline justify-between gap-4 border-b border-line py-2.5 transition-colors duration-micro hover:text-accent"
                  >
                    <span className="t-label">{CATEGORY_LABEL[c]}</span>
                    <span className="t-index text-muted-strong">
                      {String(itemsInCategory(c).length).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
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

        /* scroll-mt-12 on top of the page's 5rem scroll padding clears the
           header and the jump bar together. */
        return (
          <section key={category} id={category} className="rule-top scroll-mt-12">
            <div className="wrap py-10 md:py-14">
              <div className="band">
                <h2 className="t-label">{CATEGORY_LABEL[category]}</h2>
                <BandLine />
                <span className="t-index text-muted-strong">
                  {String(items.length).padStart(2, "0")}
                </span>
              </div>
              <p className="t-body measure mt-4 text-muted">{CATEGORY_BLURB[category]}</p>

              <Reveal as="ul" className="mt-8 list-none">
                {items.map((item, i) => (
                  <MenuRow key={item.slug} item={item} index={i} />
                ))}
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* Straight off the bottom of the board in the shop. */}
      <section id="menu-end" className="rule-top">
        <div className="wrap py-10 md:py-14">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="band">
                <h2 className="t-label">Milk</h2>
                <BandLine />
              </div>
              <ul className="mt-4">
                {milkOptions.map((m) => (
                  <li key={m} className="border-b border-line py-2 text-[15px]">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-4 md:col-start-6">
              <div className="band">
                <h2 className="t-label">Extras</h2>
                <BandLine />
              </div>
              <ul className="mt-4">
                {extras.map((e) => (
                  <li key={e} className="border-b border-line py-2 text-[15px]">
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-3 md:col-start-10">
              <div className="band">
                <h2 className="t-label">Roasted by</h2>
                <BandLine />
              </div>
              <p className="t-item mt-4">Chocolate Fish Coffee Roasters</p>
              <p className="mt-2 text-[15px] text-muted">Sacramento</p>
            </div>
          </div>
        </div>
      </section>

      <section className="on-green">
        <div className="wrap section">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <h2 className="t-h2 md:col-span-6">Not sure what to order</h2>
            <p className="t-body text-paper/90 md:col-span-5 md:col-start-8">
              Tell whoever is on bar what you usually drink and how sweet you like
              it. That is the fastest route to the right cup, and it is the part
              of this a website cannot do for you.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={site.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-event="directions_click"
              data-event-location="menu_footer"
              className="btn btn-onphoto"
            >
              Get directions
            </a>
            <a
              href={site.phone.href}
              data-event="phone_click"
              data-event-location="menu_footer"
              className="btn btn-secondary tabular-nums"
            >
              {site.phone.display}
            </a>
            <Link href="/visit" className="btn btn-secondary">
              Hours and parking
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
