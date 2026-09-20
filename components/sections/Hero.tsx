import Link from "next/link";
import { site, hours } from "@/lib/site";
import { Photo } from "@/components/ui/Photo";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { OpenStatus } from "@/components/ui/OpenStatus";

/**
 * Full bleed, edge to edge, no max width. The room, not a latte flat lay.
 *
 * The scrim is doing accessibility work, not decoration. Light text over an
 * unknown photograph cannot be assumed to pass contrast, so the gradient reaches
 * 85% ink behind the lettering, which clears AA even over a photograph that is
 * close to white at that point.
 *
 * TODO(andrew): once the real hero photograph is in, re-check the headline and
 * button contrast against it rather than trusting the scrim maths alone.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[74svh] flex-col justify-end overflow-hidden md:min-h-[82svh]">
      <div className="absolute inset-0 -z-20">
        <Photo
          src={null}
          fill
          tone="dark"
          priority
          sizes="100vw"
          width={2400}
          height={1600}
          alt="The main room at The Grove Coffee House, with tables, seating and daylight"
          brief="Landscape photograph of the room itself, shot wide, with people in it if possible. Daylight, tables and seating visible. Not a latte flat lay."
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[78%] bg-gradient-to-t from-deep/95 via-deep/70 to-transparent"
      />

      <div className="wrap on-deep bg-transparent pb-10 pt-28 text-chalk md:pb-14">
        <SplitHeading as="h1" onLoad className="t-hero max-w-[13ch]">
          Coffee runs, matcha dates, long mornings.
        </SplitHeading>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="t-body max-w-[42ch] text-chalk/90">
            A seasonal board we change with the weather, real food all day, and
            beans roasted just down the road in Sacramento.
          </p>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link href="/menu" className="btn btn-onphoto">
              See the menu
            </Link>
            <a
              href={site.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-event="directions_click"
              data-event-location="hero"
              className="btn btn-secondary"
            >
              Get directions
            </a>
          </div>
        </div>
      </div>

      {/* The plate under the window: the facts a passer by wants. The first
          one answers the question people actually have, which is not "when do
          you open" but "are you open right now". */}
      <div className="on-deep border-t border-chalk/25">
        <Reveal
          as="dl"
          onLoad
          travel={8}
          each={0.05}
          className="wrap grid grid-cols-2 gap-x-4 gap-y-4 py-5 md:grid-cols-4 md:gap-0 md:divide-x md:divide-chalk/20 md:py-4"
        >
          {[
            {
              k: "Right now",
              v: <OpenStatus fallback="Open 7:00 AM, every day" />,
            },
            { k: "Weekdays", v: hours[0].time },
            { k: "Weekends", v: hours[1].time },
            {
              k: "Find us",
              v: (
                <a
                  href={site.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event="directions_click"
                  data-event-location="hero_plate"
                  className="link-slide inline-flex min-h-6 items-center"
                >
                  Sierra College Blvd
                </a>
              ),
            },
          ].map(({ k, v }, i) => (
            <div key={k} className={i > 0 ? "md:pl-6" : ""}>
              <dt className="t-label text-chalk/60" style={{ fontSize: "10px" }}>
                {k}
              </dt>
              <dd className="mt-1 text-[15px] leading-snug text-chalk">{v}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
