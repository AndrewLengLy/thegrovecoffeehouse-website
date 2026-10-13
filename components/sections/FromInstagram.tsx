import { site } from "@/lib/site";
import { PinBoard, type Pin } from "@/components/ui/PinBoard";

/**
 * A heading in the middle of the page with small prints scattered round it,
 * each drifting at its own speed, the way the lodge sets its conservation
 * section. Every one of them can be picked up and moved (PinBoard.tsx).
 *
 * The prints are the shop's own fall photographs: the Dracula Fizz and the
 * Snick-err Treat from @thegrovecoffeehouse916 (23 and 22 September 2026), and
 * a cup in the room from their joe.coffee listing.
 *
 * The first print in the list is the one the interaction gate drags, so it is
 * placed with room to move to its left and below at every width.
 */
const pins: Pin[] = [
  {
    src: "/photos/dracula-fizz.jpg",
    alt: "The Dracula Fizz, a red iced drink of pomegranate and rosemary topped with sparkling fizz and a sprig of rosemary, on a wood board",
    width: 760,
    height: 1350,
    caption: "dracula fizz",
    sizes: "(min-width: 1024px) 200px, 46vw",
    place: "absolute right-0 top-[24%] w-[46%] sm:right-[4%] sm:top-[20%] sm:w-[32%] lg:right-[7%] lg:top-[4%] lg:w-[200px]",
    drift: 40,
  },
  {
    src: "/photos/cup-in-the-room.jpg",
    alt: "A hot coffee in a paper cup held up inside The Grove, olive green chairs and wood tables behind it",
    width: 800,
    height: 1067,
    sizes: "(min-width: 1024px) 180px, 42vw",
    place: "absolute left-[10%] top-[60%] w-[42%] sm:left-[14%] sm:top-[56%] sm:w-[30%] lg:left-[19%] lg:top-[60%] lg:w-[180px]",
    drift: 70,
  },
  {
    src: "/photos/snick-err-board.jpg",
    alt: "The Snick-err Treat, an iced coffee under peanut butter cold foam and crushed peanuts, on a wood board with Snickers bars and coffee beans",
    width: 1080,
    height: 1349,
    caption: "snick-err treat",
    sizes: "(min-width: 1024px) 190px, 44vw",
    place: "absolute left-0 top-0 w-[44%] sm:left-[2%] sm:top-[2%] sm:w-[32%] lg:left-[5%] lg:top-[8%] lg:w-[190px]",
    drift: 30,
  },
];

export function FromInstagram() {
  return (
    <section aria-labelledby="insta-heading" className="relative overflow-x-clip">
      <div className="wrap section">
        <div className="relative lg:h-[760px]">
          <div className="pointer-events-none relative z-30 lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center">
            <div className="pointer-events-auto mx-auto max-w-[30rem] text-center">
              <p className="t-caps">{site.instagram.handle}</p>
              <h2 id="insta-heading" className="t-h2 mt-4">
                Fresh from our Instagram
              </h2>
              <p className="t-body mx-auto mt-4 max-w-[36ch] text-[16px]">
                What is pouring this fall. Go on, move them around. Which one
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

          <div className="relative mt-12 h-[560px] sm:h-[680px] lg:absolute lg:inset-0 lg:mt-0 lg:h-auto">
            <PinBoard pins={pins} />
          </div>
        </div>
      </div>
    </section>
  );
}
