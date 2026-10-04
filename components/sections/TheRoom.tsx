import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { Photo } from "@/components/ui/Photo";
import { Frame } from "@/components/motion/Frame";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The room, and who roasts for us, set the way the lodge sets its story: the
 * label on the left, a long sentence on the right, and under it a pair of
 * prints, the second smaller, lower, and carrying its own few lines and a
 * link. Reviews of this cafe keep mentioning the same things, outlets, seats
 * inside and out, people staying, riders stopping in, so that is what the
 * sentence says.
 *
 * The room is the photograph from the shop's joe.coffee listing: olive chairs,
 * wood tables, the red ceiling grid. It is 800px square, so it is never set
 * wider than about half the page. The roaster's slot waits for a photograph of
 * the bar and carries the board's beans until then.
 */
export function TheRoom() {
  return (
    <section id="the-room" aria-labelledby="room-heading" className="scroll-mt-2">
      <div className="wrap section grid gap-y-10 md:grid-cols-12 md:gap-x-8">
        <h2 id="room-heading" className="t-caps md:col-span-3">
          Stay a while
        </h2>
        <Reveal travel={16} className="md:col-span-8 md:col-start-5 lg:col-span-6 lg:col-start-7">
          <p className="t-statement">
            Outlets, seats inside and out, and nobody watching the clock. People
            spend whole mornings here working and studying, or catching up with
            a friend over a second cup.
          </p>
        </Reveal>

        <div className="md:col-span-4 md:row-start-2 md:self-end lg:col-span-3">
          <Reveal travel={16}>
            <p className="t-body max-w-[34ch] text-[16px]">
              Riders come in off Sierra College Blvd most days and sit out
              front, where they can keep an eye on the bike.
            </p>
            <div className="mt-5">
              <Link href="/visit" className="btn">
                Plan a visit
              </Link>
            </div>
          </Reveal>
        </div>

        <figure className="md:col-span-8 md:col-start-5 md:row-start-2 lg:col-span-4 lg:col-start-6">
          <Frame className="aspect-[4/5] w-full">
            <Image
              src="/photos/grove-interior.jpg"
              alt="Inside The Grove Coffee House: olive green chairs at warm wood tables under a red ceiling grid, with plants on the shelves and big front windows"
              fill
              sizes="(min-width: 1024px) 34vw, (min-width: 768px) 66vw, 100vw"
              className="object-cover"
            />
          </Frame>
          <figcaption className="t-script mt-3 text-[22px] leading-none text-grove">Pull up a chair</figcaption>
        </figure>

        <article className="md:col-span-6 md:col-start-7 md:row-start-3 lg:col-span-3 lg:col-start-10 lg:row-start-2 lg:mt-32">
          <Frame className="aspect-[4/5] w-full" drift={10}>
            <Photo
              src={null}
              fill
              sizes="(min-width: 1024px) 24vw, 50vw"
              width={1000}
              height={1250}
              alt="An espresso being pulled at The Grove Coffee House"
              brief="Coffee being made at the bar. A portafilter or a pour, hands in frame. Portrait crop."
              doodle="beans"
            />
          </Frame>
          <h3 className="t-h3 mt-4 text-[20px]">Beans from {site.roaster.name}</h3>
          <p className="t-body mt-2 max-w-[38ch] text-[16px]">
            Roasted just down the road in {site.roaster.location}. Buying from
            people we can drive out and see means the coffee arrives fresh, and
            we always know who roasted it.
          </p>
          <a href={site.roaster.url} target="_blank" rel="noopener noreferrer" className="btn btn-sand mt-4">
            Visit them
          </a>
        </article>
      </div>
    </section>
  );
}
