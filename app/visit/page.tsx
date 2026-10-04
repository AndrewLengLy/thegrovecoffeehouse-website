import type { Metadata } from "next";
import Link from "next/link";

import { site, hoursCaveat } from "@/lib/site";
import { HoursList } from "@/components/ui/HoursList";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Faq } from "@/components/sections/Faq";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/faq";
import { breadcrumbs } from "@/lib/seo";
import { Squiggle } from "@/components/ui/Squiggle";
import { Doodle } from "@/components/ui/Doodle";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "How to find The Grove Coffee House at 9260 Sierra College Blvd STE 100 in Roseville. Hours, parking, accessibility, and what the room is good for.",
  alternates: { canonical: "/visit" },
  openGraph: {
    title: "Visit | The Grove Coffee House",
    description:
      "Directions, parking, hours, and what the room is good for. 9260 Sierra College Blvd STE 100, Roseville.",
    url: `${site.url}/visit`,
  },
};

const goodFor = [
  {
    title: "A morning of work",
    body: "Outlets, comfortable seating, and nobody watching the clock. Stay as long as the work takes.",
  },
  {
    title: "Meeting one person",
    body: "Quiet enough to hear each other. Order at the counter, find a table, and stay for the second cup.",
  },
  {
    title: "A stop mid ride",
    body: "Riders come in off Sierra College Blvd most days. Refuel, take a seat outside, and get back on it.",
  },
  {
    title: "Breakfast worth sitting down for",
    body: "Avocado toast, bagels, scones, and a pastrami sandwich once it is closer to lunch.",
  },
];

export default function VisitPage() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <JsonLd data={breadcrumbs([{ name: "Visit", path: "/visit" }])} />

      <div className="wrap section grid gap-6 md:grid-cols-12 md:gap-8">
        <SplitHeading as="h1" onLoad className="t-display md:col-span-6 lg:col-span-5">
          Where to find us
        </SplitHeading>

        <div aria-hidden="true" className="hidden justify-center lg:col-span-2 lg:flex">
          <Doodle name="table" className="-mt-2 h-28 w-28" />
        </div>

        <Reveal onLoad travel={8} className="md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
          <p className="t-body max-w-[48ch]">
            We are on Sierra College Blvd in Roseville, in Suite 100, with
            parking right out front. The coffee is on at seven, every day of
            the week.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={site.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-event="directions_click"
              data-event-location="visit_page_hero"
              className="btn"
            >
              Get directions
            </a>
            <a
              href={site.phone.href}
              data-event="phone_click"
              data-event-location="visit_page_hero"
              className="btn btn-ghost tabular-nums"
            >
              Call {site.phone.display}
            </a>
          </div>
        </Reveal>
      </div>

      <div className="wrap">
        <div className="print relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[2/1]">
          <Photo
            src={null}
            fill
            priority
            sizes="100vw"
            width={2400}
            height={1200}
            alt="The front of The Grove Coffee House on Sierra College Blvd"
            brief="The storefront from the parking lot, so people recognise it on arrival. Wide, landscape."
            doodle="sapling"
          />
        </div>
      </div>

      <section aria-label="Getting here and hours" className="mt-10 md:mt-14">
        <div className="wrap">
          <Squiggle />
        </div>
        <div className="wrap section grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="t-h2">Getting here</h2>
            <Reveal>
              <address className="mt-5 not-italic">
                <span className="t-item block">{site.address.street}</span>
                <span className="t-item mt-1 block">
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                </span>
              </address>

              <h3 className="t-caps mt-7 text-brick-deep">Parking</h3>
              {/* TODO(andrew): confirm the parking situation and the plaza name
                  with the owners, then replace this with the specifics. */}
              <p className="t-body mt-1.5 max-w-[48ch]">
                There is a parking lot in front of the retail center, and we are in
                Suite 100.
              </p>

              <h3 className="t-caps mt-7 text-brick-deep">On two wheels</h3>
              <p className="t-body mt-1.5 max-w-[48ch]">
                Plenty of riders stop in off Sierra College Blvd. There is seating out
                front, so you can sit where you can keep an eye on the bike.
              </p>

              <h3 className="t-caps mt-7 text-brick-deep">Accessibility</h3>
              {/* TODO(andrew): confirm step free entry, accessible restroom, and
                  accessible parking with the owners before launch. Guessing at
                  an accessibility claim is worse than saying nothing, because a
                  wrong answer strands somebody in the car park. */}
              <p className="t-body mt-1.5 max-w-[48ch]">
                Give us a call on{" "}
                <a
                  href={site.phone.href}
                  data-event="phone_click"
                  data-event-location="visit_accessibility"
                  className="link-slide tabular-nums"
                >
                  {site.phone.display}
                </a>{" "}
                and we will tell you exactly what the entrance and the seating are
                like before you make the drive.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="t-h2">Hours</h2>
            <HoursList className="mt-5" />
            <p className="t-note mt-3 max-w-[52ch] text-ink-soft">{hoursCaveat}</p>

            <div className="print mt-8">
              <iframe
                src={site.mapEmbedUrl}
                title={`Map showing ${site.name} at ${site.addressLine}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[300px] w-full border-0 sepia-[.35] md:h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="good-for-heading">
        <div className="wrap">
          <Squiggle />
        </div>
        <div className="wrap section grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="good-for-heading" className="t-h2">
              What the room is good for
            </h2>
            <Link href="/menu" className="btn mt-4">
              See the menu
            </Link>
          </div>

          <Reveal
            as="ul"
            each={0.06}
            className="grid list-none gap-x-12 gap-y-7 sm:grid-cols-2 lg:col-span-8 lg:gap-x-16"
          >
            {goodFor.map((g, i) => (
              <li key={g.title}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="t-item">{g.title}</h3>
                  <span aria-hidden="true" className="t-price text-[14px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="t-body mt-1.5 max-w-[46ch]">{g.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <div className="wrap">
        <Squiggle />
      </div>
      <Faq />
    </>
  );
}
