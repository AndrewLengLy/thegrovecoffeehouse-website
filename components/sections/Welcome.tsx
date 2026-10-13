import Image from "next/image";
import Link from "next/link";
import { Frame } from "@/components/motion/Frame";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The first thing under the photograph: the label, the welcome and the way to
 * the story on the left, and on the right the two newest fall photographs side
 * by side, their tops level with the label so the eye reads straight across.
 * On a phone the text comes first and the two photographs share one row.
 *
 * Both photographs are from the shop's Instagram: the Snick-err Treat that
 * opened the fall board on 22 September 2026, and the three fall drinks in a
 * carrier, posted with their names on the photo on 23 September 2026.
 */
export function Welcome() {
  return (
    <section aria-labelledby="welcome-heading" className="relative">
      <div className="wrap section grid gap-y-10 md:grid-cols-12 md:items-center md:gap-x-8">
        <Reveal travel={16} className="md:col-span-5 lg:col-span-4">
          <h2 id="welcome-heading" className="t-caps">
            Welcome to The Grove
          </h2>
          <p className="t-statement mt-5">
            We are a family owned coffee house on Sierra College Blvd in
            Roseville. For three years this little room has been home to coffee
            runs, matcha dates, study sessions, catch ups and a lot of familiar
            faces.
          </p>
          <div className="mt-7">
            <Link href="/our-story" className="btn">
              Our story
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 items-start gap-4 md:col-span-7 md:gap-6 lg:col-span-7 lg:col-start-6">
          <figure>
            <Frame className="aspect-[4/5] w-full">
              <Image
                src="/photos/snick-err-treat.jpg"
                alt="The Snick-err Treat, an iced drink under cold foam and crushed peanuts, on a wood board with Snickers bars and coffee beans"
                fill
                sizes="(min-width: 1024px) 28vw, (min-width: 768px) 28vw, 50vw"
                className="object-cover"
              />
            </Frame>
            <figcaption className="mt-3">
              <span className="t-h3 block text-[17px] md:text-[19px]">The Snick-err Treat</span>
              <span className="t-script text-[20px] leading-none text-grove">new for fall</span>
            </figcaption>
          </figure>

          <figure className="mt-12 md:mt-20">
            <Frame className="aspect-square w-full" drift={10}>
              <Image
                src="/photos/fall-trio.jpg"
                alt="Three fall drinks in a cardboard carrier, labelled Witches Brew, Basic Witch and Sweater Weather"
                fill
                sizes="(min-width: 1024px) 28vw, (min-width: 768px) 28vw, 50vw"
                className="object-cover"
              />
            </Frame>
            <figcaption className="mt-3">
              <span className="t-h3 block text-[17px] md:text-[19px]">Witches Brew, Basic Witch and Sweater Weather</span>
              <Link href="/menu#seasonal" className="t-caps link-slide mt-2 inline-flex min-h-6 items-center">
                On the fall board
              </Link>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
