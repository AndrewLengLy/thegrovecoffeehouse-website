import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/lib/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs } from "@/lib/seo";
import { ScaleReveal } from "@/components/motion/ScaleReveal";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "The Grove Coffee House is a family owned, independent coffee house on Sierra College Blvd in Roseville, California, pouring Chocolate Fish Coffee Roasters.",
  alternates: { canonical: "/our-story" },
  openGraph: {
    title: "Our story | The Grove Coffee House",
    description:
      "A family owned, independent coffee house on Sierra College Blvd in Roseville, California.",
    url: `${site.url}/our-story`,
  },
};

/**
 * Everything on this page is either confirmed fact or the site's own framing.
 * Family owned and independent, the address, the roaster, and the drinks that
 * are genuinely on their board. Nothing here claims a founding narrative,
 * because only the owners have one.
 *
 * Known from their own posts: opened summer 2023 (they turned three on
 * 20 August 2026), they hold music nights, and the drinks range is theirs.
 *
 * TODO(andrew): when they are ready to tell it, ask for these and this page
 * gets a proper middle section:
 *   1. Who opened The Grove, and what they did before it
 *   2. Why Roseville, and why this building on Sierra College Blvd
 *   3. Who in the family works in the shop and what each of them does
 *   4. Whether they want to be named on the site, or stay as "the family"
 *   5. Where the gulab jamun, baklava and Vietnamese coffee drinks came from
 *   6. Who writes the seasonal board, and how far ahead
 */
export default function OurStoryPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Our story", path: "/our-story" }])} />
      <div className="wrap section pb-10">
        <SplitHeading as="h1" onLoad className="t-hero max-w-[11ch]">
          How the grove got planted
        </SplitHeading>
        <p className="t-body mt-8 max-w-[46ch] text-muted">
          The Grove opened in the summer of 2023 and turned three in August
          2026, with cake. It is family owned and independent. No group behind
          it, no regional office, no second location waiting in a spreadsheet.
          One room on Sierra College Blvd, run by the people who own it.
        </p>
      </div>

      <div className="relative h-[36svh] min-h-[260px] w-full overflow-hidden md:h-[48svh]">
        <ScaleReveal>
        <Photo
          src={null}
          fill
          sizes="100vw"
          width={2400}
          height={1200}
          alt="The family who own and run The Grove Coffee House, behind the counter"
          brief="The owners and staff, in the room, working. Candid rather than posed. This is the most important photograph on the site after the hero."
        />
        </ScaleReveal>
      </div>

      <section className="rule-top">
        <div className="wrap section">
          <div className="grid gap-8 md:grid-cols-12">
            <h2 className="t-h2 md:col-span-5">Why we called it The Grove</h2>
            <div className="md:col-span-6 md:col-start-7">
              <Reveal>
                <p className="t-body">
                  A grove is a small stand of trees that somebody planted on
                  purpose and then kept. It is not a forest. Nobody stumbled into
                  it. Somebody chose the spot, put things in the ground, and came
                  back to look after them.
                </p>
                <p className="t-body mt-4">
                  That is roughly how the drinks list works too. Things go on the
                  board because they are good right now, and come off when the
                  season turns. The list in spring is not the list in October.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="rule-top">
        <div className="wrap section">
          <div className="grid gap-8 md:grid-cols-12">
            <h2 className="t-h2 md:col-span-5">The board covers some ground</h2>
            <div className="md:col-span-6 md:col-start-7">
              <Reveal>
                <p className="t-body">
                  On one board, in one small room in Roseville, there is a gulab
                  jamun latte with cardamom, rose and saffron, a baklava latte
                  with orange blossom and honey, a Spanish latte on condensed
                  milk, a Mexican mocha with cayenne in it, and a matcha list
                  eight drinks long.
                </p>
                <p className="t-body mt-4">
                  That is not a theme anybody imposed. It is what happens when
                  the people making the drinks are allowed to put what they know
                  on the menu, and the regulars keep asking for it. Some
                  evenings the same room turns into a music night.
                </p>
                <Link href="/menu" className="btn btn-secondary mt-8">
                  Read the whole board
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="on-green">
        <div className="wrap section">
          <div className="grid gap-8 md:grid-cols-12">
            <h2 className="t-h2 md:col-span-5">Who roasts for us</h2>
            <p className="t-body text-chalk/90 md:col-span-6 md:col-start-7">
              We pour {site.roaster.name} out of {site.roaster.location}. Close
              enough to drive to, which is the whole point. Coffee arrives fresh
              and there is a person on the other end of it.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={site.roaster.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-onphoto"
            >
              Visit {site.roaster.name}
            </a>
            <a
              href={site.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-event="directions_click"
              data-event-location="our_story_footer"
              className="btn btn-secondary"
            >
              Get directions
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
