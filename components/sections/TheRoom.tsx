import Image from "next/image";
import Link from "next/link";
import { Frame } from "@/components/motion/Frame";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The room, the mirror of the welcome above it: the photograph on the left and
 * the label, the sentence and the way to the visit page on the right, both
 * centred on one line. Reviews of this cafe keep mentioning the same things,
 * outlets, seats inside and out, people staying, so that is what the sentence
 * says.
 *
 * The room is the photograph from the shop's joe.coffee listing: olive chairs,
 * wood tables, the red ceiling grid. It is 800px square, so it is shown square
 * and never wider than about half the page.
 */
export function TheRoom() {
  return (
    <section id="the-room" aria-labelledby="room-heading" className="scroll-mt-2">
      <div className="wrap section grid gap-y-10 md:grid-cols-12 md:items-center md:gap-x-8">
        <Reveal travel={16} className="md:order-2 md:col-span-5 md:col-start-8">
          <h2 id="room-heading" className="t-caps">
            Stay a while
          </h2>
          <p className="t-statement mt-5">
            Outlets, seats inside and out, and nobody watching the clock. People
            spend whole mornings here working and studying, or catching up with
            a friend over a second cup.
          </p>
          <div className="mt-7">
            <Link href="/visit" className="btn">
              Plan a visit
            </Link>
          </div>
        </Reveal>

        <figure className="md:order-1 md:col-span-6 lg:col-span-6">
          <Frame className="aspect-square w-full">
            <Image
              src="/photos/grove-interior.jpg"
              alt="Inside The Grove Coffee House: olive green chairs at warm wood tables under a red ceiling grid, with plants on the shelves and big front windows"
              fill
              sizes="(min-width: 768px) 46vw, 100vw"
              className="object-cover"
            />
          </Frame>
          <figcaption className="t-script mt-3 text-[22px] leading-none text-grove">Pull up a chair</figcaption>
        </figure>
      </div>
    </section>
  );
}
