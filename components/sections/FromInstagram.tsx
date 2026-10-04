import { site } from "@/lib/site";
import { PinBoard, type Pin } from "@/components/ui/PinBoard";
import { Wash } from "@/components/ui/Wash";

/**
 * A board of the shop's own photographs, pinned up like prints and free to be
 * moved around, with the way to the rest of them on Instagram.
 *
 * All four are from @thegrovecoffeehouse916. The fall three were posted on
 * 23 September 2026 with their names on the photo. The summer three were
 * posted on 12 July 2026 and are off the board now, so they are described by
 * what is in the cup rather than named.
 */
const pins: Pin[] = [
  {
    src: "/photos/fall-trio.jpg",
    alt: "Three fall drinks in a cardboard carrier, labelled Witches Brew, Basic Witch and Sweater Weather",
    width: 992,
    height: 992,
    tilt: -3,
    caption: "Serving spells",
    sizes: "(min-width: 1024px) 24vw, 46vw",
    place: "lg:mt-10",
  },
  {
    src: "/photos/summer-layered-green.jpg",
    alt: "An iced drink from the summer board, green over orange under a pale foam with black sesame seeds, against a block wall",
    width: 1200,
    height: 1600,
    tilt: 4,
    sizes: "(min-width: 1024px) 22vw, 46vw",
    place: "mt-8 lg:mt-0",
  },
  {
    src: "/photos/summer-pink-coffee-foam.jpg",
    alt: "An iced drink from the summer board, pink milk under a whipped coffee foam running down the cup",
    width: 1199,
    height: 1600,
    tilt: -5,
    caption: "Summer board",
    sizes: "(min-width: 1024px) 22vw, 46vw",
    place: "lg:mt-16",
  },
  {
    src: "/photos/summer-purple-green-foam.jpg",
    alt: "An iced purple drink from the summer board under a thick pale green cold foam",
    width: 1200,
    height: 1600,
    tilt: 3,
    sizes: "(min-width: 1024px) 22vw, 46vw",
    place: "mt-8 lg:mt-4",
  },
];

export function FromInstagram() {
  return (
    <section aria-labelledby="insta-heading" className="relative overflow-x-clip">
      <div className="wrap section">
        <div className="relative flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <Wash className="absolute -left-8 -top-8 h-[calc(100%+4rem)] w-[min(34rem,100%)]" />
          <div className="relative">
            <h2 id="insta-heading" className="t-h2">
              Fresh from our Instagram
            </h2>
            <p className="t-body mt-3 max-w-[46ch]">
              What has been pouring lately, straight from{" "}
              {site.instagram.handle}. Go on, move them around. Which one are
              you trying first?
            </p>
          </div>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            data-event="instagram_click"
            data-event-location="instagram_board"
            className="btn relative min-h-11 px-4"
          >
            Follow along
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 pb-6 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-10">
          <PinBoard pins={pins} />
        </div>
      </div>
    </section>
  );
}
