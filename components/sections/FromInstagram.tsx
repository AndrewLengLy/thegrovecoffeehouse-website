import { site } from "@/lib/site";
import { PinBoard, type Pin } from "@/components/ui/PinBoard";

/**
 * A heading in the middle of the page with small prints scattered round it,
 * each drifting at its own speed, the way the lodge sets its conservation
 * section. The prints are the shop's own summer photographs, and the gaps
 * between them are sand tiles with the board's green drawings. Every one of
 * them can be picked up and moved (PinBoard.tsx).
 *
 * The three photographs are from @thegrovecoffeehouse916, posted 12 July 2026.
 * Those drinks are off the board now, so they are described by what is in the
 * cup rather than named.
 *
 * The first print in the list is the one the interaction gate drags, so it is
 * placed with room to move to its left and below at every width.
 */
const pins: Pin[] = [
  {
    src: "/photos/summer-pink-coffee-foam.jpg",
    alt: "An iced drink from the summer board, pink milk under a whipped coffee foam running down the cup",
    width: 1199,
    height: 1600,
    caption: "summer board",
    sizes: "(min-width: 1024px) 200px, 46vw",
    place: "absolute right-0 top-[24%] w-[46%] sm:right-[4%] sm:top-[20%] sm:w-[32%] lg:right-[7%] lg:top-[4%] lg:w-[200px]",
    drift: 40,
  },
  {
    src: "/photos/summer-purple-green-foam.jpg",
    alt: "An iced purple drink from the summer board under a thick pale green cold foam",
    width: 1200,
    height: 1600,
    sizes: "(min-width: 1024px) 170px, 42vw",
    place: "absolute left-[10%] top-[60%] w-[42%] sm:left-[14%] sm:top-[56%] sm:w-[30%] lg:left-[19%] lg:top-[60%] lg:w-[170px]",
    drift: 70,
  },
  {
    src: "/photos/summer-layered-green.jpg",
    alt: "An iced drink from the summer board, green over orange under a pale foam with black sesame seeds, against a block wall",
    width: 1200,
    height: 1600,
    sizes: "(min-width: 1024px) 180px, 44vw",
    place: "absolute left-0 top-0 w-[44%] sm:left-[2%] sm:top-[2%] sm:w-[32%] lg:left-[5%] lg:top-[8%] lg:w-[180px]",
    drift: 30,
  },
  {
    src: null,
    doodle: "cup",
    alt: "",
    width: 1,
    height: 1,
    sizes: "130px",
    place: "absolute right-[6%] top-[3%] w-[30%] sm:right-[10%] sm:top-0 sm:w-[20%] lg:left-[31%] lg:right-auto lg:top-[2%] lg:w-[130px]",
    drift: 90,
  },
  {
    src: null,
    doodle: "beans",
    alt: "",
    width: 4,
    height: 3,
    sizes: "170px",
    place: "absolute left-[3%] top-[41%] w-[36%] sm:left-[40%] sm:top-[38%] sm:w-[24%] lg:left-auto lg:right-[3%] lg:top-[60%] lg:w-[180px]",
    drift: 50,
  },
  {
    src: null,
    doodle: "sapling",
    alt: "",
    width: 1,
    height: 1,
    sizes: "120px",
    place: "absolute right-[8%] top-[72%] w-[30%] sm:right-[12%] sm:top-[76%] sm:w-[18%] lg:right-auto lg:left-[58%] lg:top-[80%] lg:w-[120px]",
    drift: 110,
  },
];

export function FromInstagram() {
  return (
    <section aria-labelledby="insta-heading" className="relative overflow-x-clip">
      <div className="wrap section">
        <div className="relative lg:h-[880px]">
          <div className="pointer-events-none relative z-30 lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center">
            <div className="pointer-events-auto mx-auto max-w-[30rem] text-center">
              <p className="t-caps">{site.instagram.handle}</p>
              <h2 id="insta-heading" className="t-h2 mt-4">
                Fresh from our Instagram
              </h2>
              <p className="t-body mx-auto mt-4 max-w-[36ch] text-[16px]">
                What has been pouring lately. Go on, move them around. Which one
                are you trying first?
              </p>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                data-event="instagram_click"
                data-event-location="instagram_board"
                className="btn mt-6"
              >
                Follow along
              </a>
            </div>
          </div>

          <div className="relative mt-12 h-[620px] sm:h-[760px] lg:absolute lg:inset-0 lg:mt-0 lg:h-auto">
            <PinBoard pins={pins} />
          </div>
        </div>
      </div>
    </section>
  );
}
