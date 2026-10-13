import type { Metadata } from "next";

import { site, hoursCaveat } from "@/lib/site";
import { HoursList } from "@/components/ui/HoursList";
import { Reveal } from "@/components/motion/Reveal";
import { PageHead } from "@/components/ui/PageHead";
import { Faq } from "@/components/sections/Faq";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/faq";
import { breadcrumbs } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "How to find The Grove Coffee House at 9260 Sierra College Blvd STE 100 in Roseville. Hours, parking and accessibility.",
  alternates: { canonical: "/visit" },
  openGraph: {
    title: "Visit | The Grove Coffee House",
    description:
      "Directions, parking and hours. 9260 Sierra College Blvd STE 100, Roseville.",
    url: `${site.url}/visit`,
  },
};

export default function VisitPage() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <JsonLd data={breadcrumbs([{ name: "Visit", path: "/visit" }])} />

      <PageHead label="Visit" title="Where to find us">
        <p className="t-statement">
          We are on Sierra College Blvd in Roseville, in Suite 100, with parking
          right out front. The coffee is on at seven, every day of the week.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={site.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-event="directions_click"
            data-event-location="visit_page_hero"
            className="btn btn-lg"
          >
            Get directions
          </a>
          <a
            href={site.phone.href}
            data-event="phone_click"
            data-event-location="visit_page_hero"
            className="btn btn-ghost min-h-11 tabular-nums"
          >
            Call {site.phone.display}
          </a>
        </div>
      </PageHead>

      {/* The map is this page's photograph: wide, and toned toward the paper
          so it sits with the rest of the site. */}
      <div className="wrap">
        <div className="print">
          <iframe
            src={site.mapEmbedUrl}
            title={`Map showing ${site.name} at ${site.addressLine}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[360px] w-full border-0 grayscale-[.4] sepia-[.25] md:h-[520px]"
          />
        </div>
      </div>

      <section aria-label="Getting here and hours">
        <div className="wrap section grid gap-12 lg:grid-cols-12 lg:gap-8">
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

          </div>
        </div>
      </section>

      <div className="wrap">
        <hr className="rule" />
      </div>
      <Faq />
    </>
  );
}
