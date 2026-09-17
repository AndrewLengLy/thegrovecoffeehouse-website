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
import { BandLine } from "@/components/motion/BandLine";
import { ScaleReveal } from "@/components/motion/ScaleReveal";

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
    body: "Outlets, chairs worth sitting in, and nobody clearing your table at the ninety minute mark.",
  },
  {
    title: "Meeting one person",
    body: "Quiet enough to talk. Order at the counter, take a table, stay past the second cup.",
  },
  {
    title: "A stop mid ride",
    body: "Sierra College Blvd is a regular route. Outdoor seating means you can sit where the bike is.",
  },
  {
    title: "Breakfast that is not a drive through",
    body: "Avocado toast, bagels, scones, and a pastrami sandwich when it is closer to lunch.",
  },
];

export default function VisitPage() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <JsonLd data={breadcrumbs([{ name: "Visit", path: "/visit" }])} />
      <div className="wrap section pb-10">
        <SplitHeading as="h1" onLoad className="t-hero max-w-[12ch]">
          Where we are, when we are here
        </SplitHeading>

        <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">
          <p className="t-body text-muted md:col-span-5">
            We are on Sierra College Blvd in Roseville, in Suite 100. Open at
            seven every day of the week.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row md:col-span-6 md:col-start-7 md:justify-end">
            <a
              href={site.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-event="directions_click"
              data-event-location="visit_page_hero"
              className="btn btn-primary"
            >
              Get directions
            </a>
            <a
              href={site.phone.href}
              data-event="phone_click"
              data-event-location="visit_page_hero"
              className="btn btn-secondary tabular-nums"
            >
              Call {site.phone.display}
            </a>
          </div>
        </div>
      </div>

      {/* Full bleed band. The container breaks here on purpose. */}
      <div className="relative h-[36svh] min-h-[260px] w-full overflow-hidden md:h-[48svh]">
        <ScaleReveal>
        <Photo
          src={null}
          fill
          sizes="100vw"
          width={2400}
          height={1200}
          alt="The front of The Grove Coffee House on Sierra College Blvd"
          brief="The storefront from the parking lot, so people recognise it on arrival. Wide, landscape."
        />
        </ScaleReveal>
      </div>

      <section className="rule-top">
        <div className="wrap section grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <h2 className="t-h2">Getting here</h2>
            <Reveal className="measure">
              <address className="mt-6 not-italic">
                <span className="t-item block">{site.address.street}</span>
                <span className="t-item block text-muted">
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                </span>
              </address>

              <h3 className="t-label mt-8 text-muted-strong">Parking</h3>
              {/* TODO(andrew): confirm the parking situation and the plaza name
                  with the owners, then replace this with the specifics. */}
              <p className="t-body mt-2 text-ink">
                There is a parking lot in front of the retail center. We are in
                Suite 100.
              </p>

              <h3 className="t-label mt-8 text-muted-strong">On two wheels</h3>
              <p className="t-body mt-2 text-ink">
                Sierra College Blvd is a regular route and riders stop in often.
                Outdoor seating means you can sit where you can see the bike.
              </p>

              <h3 className="t-label mt-8 text-muted-strong">Accessibility</h3>
              {/* TODO(andrew): confirm step free entry, accessible restroom, and
                  accessible parking with the owners before launch. Guessing at
                  an accessibility claim is worse than saying nothing, because a
                  wrong answer strands somebody in the car park. */}
              <p className="t-body mt-2 text-ink">
                Call us on {site.phone.display} and we will tell you exactly what
                the entrance and the seating are like before you drive over.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="t-h2">Hours</h2>
            <HoursList className="mt-6" />
            <p className="mt-3 max-w-[46ch] text-[14px] leading-snug text-muted">{hoursCaveat}</p>

            <div className="frame mt-8">
              <iframe
                src={site.mapEmbedUrl}
                title={`Map showing ${site.name} at ${site.addressLine}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[300px] w-full border-0 md:h-[420px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="rule-top">
        <div className="wrap section">
          <div className="band">
            <h2 className="t-label">Good for</h2>
            <BandLine />
            <span className="t-index text-muted-strong">04</span>
          </div>
          <Reveal as="ul" className="mt-8 list-none border-t border-ink">
            {goodFor.map((g, i) => (
              <li
                key={g.title}
                className="grid grid-cols-[2.25rem_1fr] gap-x-3 border-b border-line py-5 md:grid-cols-[3rem_minmax(0,18rem)_minmax(0,1fr)] md:gap-x-8"
              >
                <span className="t-index pt-1 text-muted-strong">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-item">{g.title}</h3>
                <p className="col-start-2 mt-2 text-[15px] leading-[1.6] text-muted md:col-start-3 md:mt-0.5">
                  {g.body}
                </p>
              </li>
            ))}
          </Reveal>

          <Link href="/menu" className="btn btn-primary mt-10">
            See the menu
          </Link>
        </div>
      </section>

      <Faq />
    </>
  );
}
