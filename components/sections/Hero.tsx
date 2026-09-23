import Link from "next/link";
import { site } from "@/lib/site";
import { Slideshow, type Slide } from "@/components/ui/Slideshow";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { Doodle } from "@/components/ui/Doodle";

/**
 * The opening print, matted inside the gutter and slowly changing, with the
 * headline set beneath it rather than over it. Nothing is laid on top of the
 * photograph, so no scrim is needed and the photograph is seen whole.
 *
 * TODO(andrew): three photographs belong here. The room first, then a drink
 * on the counter, then people at a table. Add each one's path as `src` and the
 * slideshow starts cycling on its own once two are in.
 */
const slides: Slide[] = [
  {
    src: null,
    alt: "The main room at The Grove Coffee House, with tables, seating and daylight",
    brief:
      "Landscape photograph of the room itself, shot wide, with people in it if possible. Daylight, tables and seating visible.",
    width: 2400,
    height: 1212,
  },
  {
    src: null,
    alt: "Two drinks from the seasonal board on the counter at The Grove",
    brief: "Two drinks on the counter, shot close with the room soft behind them. Landscape.",
    width: 2400,
    height: 1212,
  },
  {
    src: null,
    alt: "Friends catching up over coffee at a table at The Grove",
    brief: "People at a table with their drinks, candid, shot from across the room. Landscape.",
    width: 2400,
    height: 1212,
  },
];

export function Hero() {
  return (
    <section>
      <div className="wrap pt-1 md:pt-2">
        <Slideshow
          slides={slides}
          priority
          sizes="100vw"
          className="aspect-[4/5] sm:aspect-[3/2] lg:aspect-[1376/695]"
        />
      </div>

      <div className="wrap grid gap-6 pb-10 pt-6 md:grid-cols-12 md:gap-8 md:pb-12 md:pt-7">
        <SplitHeading as="h1" onLoad className="t-display md:col-span-6 lg:col-span-5">
          Coffee runs, matcha dates, long mornings.
        </SplitHeading>

        <div aria-hidden="true" className="hidden justify-center lg:col-span-2 lg:flex">
          <Doodle name="cup" className="-mt-2 h-28 w-28" />
        </div>

        <Reveal onLoad travel={8} each={0.05} className="md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
          <p className="t-body max-w-[48ch]">
            A seasonal board we change with the weather, real food all day, and
            beans roasted just down the road in Sacramento. Pull up a chair and
            stay a while.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link href="/menu" className="btn">
              See the menu
            </Link>
            <a
              href={site.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-event="directions_click"
              data-event-location="hero"
              className="btn btn-ghost"
            >
              Get directions
            </a>
          </div>
          <p className="t-note mt-4 text-ink-soft">
            <OpenStatus fallback="Open 7 AM, every day" />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
