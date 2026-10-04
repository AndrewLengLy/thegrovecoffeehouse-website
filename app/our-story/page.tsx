import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { site } from "@/lib/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { PageHead } from "@/components/ui/PageHead";
import { Frame } from "@/components/motion/Frame";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbs } from "@/lib/seo";
import { Doodle } from "@/components/ui/Doodle";

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

      <PageHead label="Our story" title="Three years on Sierra College Blvd">
        <p className="t-statement">
          We opened in the summer of 2023, and this August we turned three. It
          is still just us: one family, one room on Sierra College Blvd.
        </p>
        <p className="t-body mt-5 max-w-[48ch]">
          Three years of coffee runs, matcha dates, study sessions and catch
          ups, and a lot of familiar faces.
        </p>
      </PageHead>

      {/* An offset pair. The room stands in on the left until the owners send
          the photograph of themselves the right hand slot is waiting for. */}
      <div className="wrap grid gap-8 md:grid-cols-12 md:gap-x-8">
        <figure className="md:col-span-7">
          <Frame className="aspect-[4/3] w-full">
            <Image
              src="/photos/grove-interior.jpg"
              alt="Inside The Grove Coffee House: olive green chairs at warm wood tables under a red ceiling grid, with plants on the shelves and big front windows"
              fill
              priority
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover"
            />
          </Frame>
          <figcaption className="t-script mt-3 text-[22px] leading-none text-grove">The room</figcaption>
        </figure>
        <div className="md:col-span-4 md:col-start-9 md:mt-40">
          <Frame className="aspect-[3/4] w-full" drift={10}>
            <Photo
              src={null}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              width={1200}
              height={1600}
              alt="The family who own and run The Grove Coffee House, behind the counter"
              brief="The owners and staff, in the room, working. Candid rather than posed. This is the most important photograph on the site after the hero."
              doodle="table"
            />
          </Frame>
        </div>
      </div>

      <section aria-labelledby="more-heading">
        <div className="wrap section grid gap-6 md:grid-cols-12 md:gap-x-8">
          <h2 id="more-heading" className="t-h2 md:col-span-5">
            More than a coffee shop
          </h2>
          <Reveal className="md:col-span-6 md:col-start-7">
            <p className="t-body max-w-[52ch]">
              Three years in, the part we are proudest of is not on the menu. It
              is the familiar faces, the friendships that started here, and
              everyone who brought someone along or told a friend about us. The
              Grove became more than a coffee shop because of you, and we are
              grateful for it.
            </p>
            <p className="t-body mt-4 max-w-[52ch]">
              It is also why the board keeps changing. We put on what tastes
              right for the season, and when something has had its run we make
              room for the next one. The list in spring is never the list in
              October.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="board-heading">
        <div className="wrap section grid gap-6 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-5">
            <h2 id="board-heading" className="t-h2">
              There is a lot on the board
            </h2>
            <Doodle name="guitar" className="mt-10 hidden h-28 w-28 md:block" />
          </div>
          <Reveal className="md:col-span-6 md:col-start-7">
            <p className="t-body max-w-[52ch]">
              In one small room in Roseville you will find a gulab jamun latte
              with cardamom, rose and saffron, a baklava latte with orange
              blossom and honey, a Spanish latte on condensed milk, a Mexican
              mocha with cayenne in it, and a matcha list eight drinks long.
            </p>
            <p className="t-body mt-4 max-w-[52ch]">
              Those drinks are on the board because the people making them
              wanted them there, and because you keep ordering them. Some
              evenings the same room fills up for a music night instead.
            </p>
            <Link href="/menu" className="btn mt-4">
              See the whole board
            </Link>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="roaster-heading">
        <div className="wrap section grid gap-6 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-5">
            <h2 id="roaster-heading" className="t-h2">
              Who roasts for us
            </h2>
            <p className="t-caps mt-3">
              {site.roaster.name}, {site.roaster.location}
            </p>
          </div>
          <Reveal className="md:col-span-6 md:col-start-7">
            <p className="t-body max-w-[52ch]">
              We pour {site.roaster.name} out of {site.roaster.location}. Close
              enough that we can drive out and see them, which means the coffee
              arrives fresh and we always know who roasted it.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a href={site.roaster.url} target="_blank" rel="noopener noreferrer" className="btn">
                Visit Chocolate Fish
              </a>
              <a
                href={site.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-event="directions_click"
                data-event-location="our_story_footer"
                className="btn btn-ghost"
              >
                Get directions
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
