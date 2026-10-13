import { site } from "@/lib/site";
import { PinBoard, type Pin } from "@/components/ui/PinBoard";

/**
 * The shop's newest photographs, set like every other section: the label, the
 * heading and the way to Instagram on the left, and on the right the prints in
 * one staggered row, each drifting a little at its own speed. Every one of them
 * can be picked up and moved (PinBoard.tsx).
 *
 * The prints are the shop's own fall photographs: the Snick-err Treat and the
 * Dracula Fizz from @thegrovecoffeehouse916 (22 and 23 September 2026), and a
 * cup in the room from their joe.coffee listing.
 *
 * The first print in the list is the one the interaction gate drags left and
 * down, so it sits in the middle of the row with paper on both sides.
 */
/* All three are set to one 4:5 frame so the row reads as a set; width and
   height here only give the print its aspect ratio. */
const pins: Pin[] = [
  {
    src: "/photos/dracula-fizz.jpg",
    alt: "The Dracula Fizz, a red iced drink of pomegranate and rosemary topped with sparkling fizz and a sprig of rosemary, on a wood board",
    width: 4,
    height: 5,
    caption: "dracula fizz",
    sizes: "(min-width: 768px) 20vw, 32vw",
    place: "order-2 mt-10 md:mt-16",
    drift: 24,
  },
  {
    src: "/photos/cup-in-the-room.jpg",
    alt: "A hot coffee in a paper cup held up inside The Grove, olive green chairs and wood tables behind it",
    width: 4,
    height: 5,
    sizes: "(min-width: 768px) 20vw, 32vw",
    place: "order-3 mt-4 md:mt-6",
    drift: 36,
  },
  {
    src: "/photos/snick-err-board.jpg",
    alt: "The Snick-err Treat, an iced coffee under peanut butter cold foam and crushed peanuts, on a wood board with Snickers bars and coffee beans",
    width: 4,
    height: 5,
    caption: "snick-err treat",
    sizes: "(min-width: 768px) 20vw, 32vw",
    place: "order-1",
    drift: 12,
  },
];

export function FromInstagram() {
  return (
    <section aria-labelledby="insta-heading" className="relative overflow-x-clip">
      <div className="wrap section grid gap-y-10 md:grid-cols-12 md:items-center md:gap-x-8">
        <div className="md:col-span-4">
          <p className="t-caps">{site.instagram.handle}</p>
          <h2 id="insta-heading" className="t-h2 mt-4">
            Fresh from our Instagram
          </h2>
          <p className="t-body mt-4 max-w-[36ch] text-[16px]">
            What is pouring this fall. Which one are you trying first?
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

        <div className="grid grid-cols-3 items-start gap-3 md:col-span-8 md:col-start-5 md:gap-6 lg:col-span-7 lg:col-start-6">
          <PinBoard pins={pins} />
        </div>
      </div>
    </section>
  );
}
