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
          Three years on Sierra College Blvd
        </SplitHeading>
        <p className="t-body mt-8 max-w-[46ch] text-muted">
          We opened in the summer of 2023, and this August we turned three.
          Three years of coffee runs, matcha dates, study sessions and catch
          ups, and a lot of familiar faces. It is still just us: one family,
          one room on Sierra College Blvd.
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
            <h2 className="t-h2 md:col-span-5">More than a coffee shop</h2>
            <div className="md:col-span-6 md:col-start-7">
              <Reveal>
                <p className="t-body">
                  Three years in, the part we are proudest of is not on the menu. It
                  is the familiar faces, the friendships that started here, and
                  everyone who brought someone along or told a friend about us.
                  The Grove became more than a coffee shop because of you, and
                  we are grateful for it.
                </p>
                <p className="t-body mt-4">
                  It is also why the board keeps changing. We put on what tastes
                  right for the season, and when something has had its run we
                  make room for the next one. The list in spring is never the
                  list in October.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="rule-top">
        <div className="wrap section">
          <div className="grid gap-8 md:grid-cols-12">
            <h2 className="t-h2 md:col-span-5">There is a lot on the board</h2>
            <div className="md:col-span-6 md:col-start-7">
              <Reveal>
                <p className="t-body">
                  In one small room in Roseville you will find a gulab jamun latte
                  with cardamom, rose and saffron, a baklava latte with orange
                  blossom and honey, a Spanish latte on condensed milk, a
                  Mexican mocha with cayenne in it, and a matcha list eight
                  drinks long.
                </p>
                <p className="t-body mt-4">
                  Those drinks are on the board because the people making them
                  wanted them there, and because you keep ordering them. Some
                  evenings the same room fills up for a music night instead.
                </p>
                <Link href="/menu" className="btn btn-secondary mt-8">
                  See the whole board
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
              enough that we can drive out and see them, which means the coffee
              arrives fresh and we always know who roasted it.
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
