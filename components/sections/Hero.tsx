import Link from "next/link";
import { site } from "@/lib/site";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { Doodle } from "@/components/ui/Doodle";
import { PinBoard, type Pin } from "@/components/ui/PinBoard";

/**
 * The opening banner.
 *
 * A field of forest green, the chairs' colour, with the room's red ceiling grid
 * drawn faintly across it. The headline is the board's script at full size in
 * cream, and on the right three of the shop's own photographs are pinned up
 * like prints that can be picked up and moved: the summer lineup against the
 * block wall, the Snick-err Treat that opened the fall board, and the room
 * itself. The banner ends on a torn paper edge into the page below.
 *
 * Every photograph here is the shop's own. The two drinks are from their
 * Instagram (12 July and 22 September 2026); the room is from their joe.coffee
 * listing and is only 800px square, so it is the smallest print in the stack.
 */
const prints: Pin[] = [
  {
    src: "/photos/drinks-lineup.jpg",
    alt: "A row of The Grove's iced drinks lined up on a ledge against a dark block wall, a matcha with dried jasmine flowers at the front",
    width: 1350,
    height: 1800,
    tilt: -4,
    sizes: "(min-width: 1024px) 380px, 58vw",
    priority: true,
    place: "absolute left-0 top-0 w-[58%] lg:left-[2%]",
  },
  {
    src: "/photos/snick-err-treat.jpg",
    alt: "The Snick-err Treat, an iced drink under cold foam and crushed peanuts, on a wood board with Snickers bars and coffee beans",
    width: 1441,
    height: 1800,
    tilt: 5,
    caption: "New for fall",
    sizes: "(min-width: 1024px) 300px, 46vw",
    place: "absolute right-0 top-[10%] w-[46%]",
  },
  {
    src: "/photos/grove-interior.jpg",
    alt: "Inside The Grove Coffee House: olive green chairs at warm wood tables under a red ceiling grid, with plants on the shelves and big front windows",
    width: 800,
    height: 800,
    tilt: 3,
    caption: "Pull up a chair",
    sizes: "(min-width: 1024px) 300px, 48vw",
    /* Kept left of the Snick-err print so it never covers that caption. */
    place: "absolute bottom-6 left-[3%] w-[48%]",
  },
];

export function Hero() {
  return (
    <section className="on-forest relative overflow-hidden">
      {/* The red ceiling grid of the room, faint, fading out toward the words. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgb(181_53_48/0.38)_1.5px,transparent_1.5px),linear-gradient(90deg,rgb(181_53_48/0.38)_1.5px,transparent_1.5px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_75%_90%_at_85%_20%,black,transparent_75%)] md:[background-size:88px_88px]"
      />

      <div className="wrap relative grid gap-10 pb-16 pt-8 sm:gap-12 md:pt-14 lg:min-h-[640px] lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-24 lg:pt-12">
        <div className="relative lg:col-span-7">
          <Link
            href="/menu#snick-err-treat"
            className="t-caps inline-flex min-h-8 items-center gap-2.5 text-matcha transition-colors duration-micro hover:text-paper"
          >
            <span className="tag tag-season">New</span>
            The Snick-err Treat is on the fall board
          </Link>

          <SplitHeading
            as="h1"
            onLoad
            className="t-display mt-4 max-w-[13ch] text-[clamp(54px,6.4vw,118px)] leading-[0.98] text-paper sm:mt-5"
          >
            Coffee runs, matcha dates, long mornings.
          </SplitHeading>

          <Reveal onLoad travel={8} each={0.05} className="mt-5 sm:mt-6">
            <p className="t-body max-w-[44ch] text-[18px] text-paper/90 md:text-[19px]">
              A seasonal board we change with the weather, real food all day, and
              beans roasted just down the road in Sacramento. Pull up a chair and
              stay a while.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href="/menu" className="btn btn-light min-h-12 px-5 text-[15px]">
                See the menu
              </Link>
              <a
                href={site.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-event="directions_click"
                data-event-location="hero"
                className="btn btn-ghost min-h-12 text-[15px] text-paper hover:text-matcha"
              >
                Get directions
              </a>
            </div>
            <p className="t-note mt-5 text-matcha">
              <OpenStatus fallback="Open 7 AM, every day" />
            </p>
          </Reveal>

          <Doodle name="beans" className="absolute -bottom-16 right-4 hidden h-24 w-24 text-paper/70 lg:block" />
        </div>

        {/* The prints, pinned inside a fixed box so the stack keeps its
            composition at every width. They can be dragged anywhere in the
            banner. */}
        <Reveal
          onLoad
          travel={24}
          className="relative mx-auto h-[420px] w-full max-w-[520px] sm:h-[600px] lg:col-span-5 lg:h-[620px] lg:max-w-none"
        >
          <PinBoard pins={prints} />
          {/* On a phone the stack leaves its lower right corner open. */}
          <Doodle name="beans" className="absolute bottom-8 right-4 h-20 w-20 text-paper/70 lg:hidden" />
          <p className="t-note absolute bottom-0 right-0 text-matcha">
            Go on, move the photos around.
          </p>
        </Reveal>
      </div>

      {/* A torn paper edge into the page. */}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -bottom-px block h-6 w-full text-paper md:h-9"
      >
        <path
          fill="currentColor"
          d="M0 40V22l38-6 44 9 51-11 36 7 58-12 47 10 33-4 61 9 42-13 55 8 39-5 63 12 48-9 36 4 57-11 44 9 52-6 39 8 61-10 45 7 34-5 58 11 46-8 41 5 55-10 38 6 49-7 42 9 54-11 37 7L1440 20V40z"
        />
      </svg>
    </section>
  );
}
