import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { Frame } from "@/components/motion/Frame";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The first thing under the photograph, set the way the lodge sets its own
 * opening: a tiny label in the far left column, a long light sentence across
 * the right half, and under it two photographs in an offset pair. The large
 * one sits on the right; the small one starts lower on the left and drifts at
 * a different speed, so the two slide past each other as the page moves.
 *
 * Both photographs are from the shop's Instagram: the Snick-err Treat that
 * opened the fall board on 22 September 2026, and the three fall drinks in a
 * carrier, posted with their names on the photo on 23 September 2026.
 */
export function Welcome() {
  return (
    <section aria-labelledby="welcome-heading" className="relative">
      <div className="wrap section grid gap-y-10 md:grid-cols-12 md:gap-x-8">
        <h2 id="welcome-heading" className="t-caps md:col-span-3">
          Welcome to The Grove
        </h2>
        <Reveal travel={16} className="md:col-span-8 md:col-start-5 lg:col-span-6 lg:col-start-7">
          <p className="t-statement">
            We are a family owned coffee house on Sierra College Blvd in
            Roseville. For three years this little room has been home to coffee
            runs, matcha dates, study sessions, catch ups and a lot of familiar
            faces.
          </p>
        </Reveal>

        <div className="md:col-span-4 md:row-start-2 lg:col-span-3">
          <Reveal travel={16}>
            <p className="t-body max-w-[34ch] text-[16px]">
              The board changes with the seasons, the food is made to sit down
              with, and the beans come from {site.roaster.name}, roasted just
              down the road in {site.roaster.location}.
            </p>
            <div className="mt-5">
              <Link href="/our-story" className="btn">
                Our story
              </Link>
            </div>
          </Reveal>
        </div>

        <figure className="md:col-span-7 md:col-start-6 md:row-span-2 md:row-start-2 lg:col-span-6 lg:col-start-7">
          <Frame className="aspect-[4/5] w-full">
            <Image
              src="/photos/snick-err-treat.jpg"
              alt="The Snick-err Treat, an iced drink under cold foam and crushed peanuts, on a wood board with Snickers bars and coffee beans"
              fill
              sizes="(min-width: 1024px) 48vw, (min-width: 768px) 56vw, 100vw"
              className="object-cover"
            />
          </Frame>
          <figcaption className="mt-3 flex items-baseline justify-between gap-4">
            <span className="t-h3 text-[19px]">The Snick-err Treat</span>
            <span className="t-script text-[22px] leading-none text-grove">new for fall</span>
          </figcaption>
        </figure>

        <figure className="md:col-span-4 md:row-start-3 md:mt-24 lg:col-span-4 lg:mt-40">
          <Frame className="aspect-square w-full" drift={10}>
            <Image
              src="/photos/fall-trio.jpg"
              alt="Three fall drinks in a cardboard carrier, labelled Witches Brew, Basic Witch and Sweater Weather"
              fill
              sizes="(min-width: 1024px) 32vw, (min-width: 768px) 32vw, 100vw"
              className="object-cover"
            />
          </Frame>
          <figcaption className="mt-3 max-w-[36ch]">
            <span className="t-h3 block text-[19px]">Witches Brew, Basic Witch and Sweater Weather</span>
            <Link href="/menu#seasonal" className="t-caps link-slide mt-2 inline-flex min-h-6 items-center">
              On the fall board now
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
