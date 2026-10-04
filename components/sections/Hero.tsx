import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { HeroIntro } from "@/components/sections/HeroIntro";

/**
 * The opening photograph, bled to every edge the way the lodge site opens on
 * its river, with the headline in thin capitals across it and stepped in line
 * by line. The header sits over it, see through, until it scrolls away.
 *
 * The photograph is the shop's own, from their Instagram on 12 July 2026: the
 * summer lineup on a ledge against the block wall outside, a matcha with dried
 * jasmine at the front. It is the largest file they have published, and the
 * dark wall gives the words somewhere to sit. On a phone the whole portrait
 * frame shows; wider, it is cropped to the row of cups.
 *
 * The gradient is doing accessibility work. Paper type over the pale concrete
 * at the foot of the frame would fail, so the lower half is taken down far
 * enough that the paragraph clears 4.5:1 over the lightest part of the ledge.
 *
 * Under the photograph is a field of olive with the name on it in the board's
 * script. Only the intro ever shows it (HeroIntro.tsx).
 */
export function Hero() {
  return (
    <section
      data-hero
      aria-labelledby="hero-heading"
      className="on-photo relative -mt-[var(--header-h,72px)] h-[100svh] min-h-[620px] overflow-hidden bg-olive text-paper"
    >
      <p
        data-hero-mark
        aria-hidden="true"
        className="t-script absolute inset-x-0 top-[19%] text-center text-[34px] leading-none text-paper sm:text-[44px]"
      >
        The Grove Coffee House
      </p>

      <div data-hero-window className="absolute inset-0 overflow-hidden">
        <div data-hero-image className="absolute inset-0 will-change-transform">
          <Image
            src="/photos/drinks-lineup.jpg"
            alt="A row of The Grove's iced drinks lined up on a ledge against a dark block wall, a matcha with dried jasmine flowers at the front"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_62%] md:object-[50%_68%]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(14_30_24/0.86)_0%,rgb(14_30_24/0.62)_34%,rgb(14_30_24/0.22)_68%,rgb(14_30_24/0.38)_100%)] md:bg-[linear-gradient(to_top,rgb(14_30_24/0.82)_0%,rgb(14_30_24/0.5)_40%,rgb(14_30_24/0.2)_75%,rgb(14_30_24/0.36)_100%)]"
        />
      </div>

      <div className="wrap relative flex h-full flex-col justify-end pb-16 pt-[calc(var(--header-h,72px)+32px)] md:pb-20">
        <h1
          id="hero-heading"
          className="t-display text-[clamp(38px,10.4vw,164px)] leading-[0.9] md:text-[clamp(64px,8.6vw,164px)]"
        >
          <Line>Coffee runs,</Line>{" "}
          <Line className="md:pl-[22%]">matcha dates,</Line>{" "}
          <Line className="md:pl-[9%]">long mornings.</Line>
        </h1>

        <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-12 md:items-end">
          <p data-hero-fade className="t-caps hidden md:col-span-4 md:block">
            Family owned on Sierra College Blvd
            <br />
            Roseville, California
          </p>
          <div className="md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-8">
            <p data-hero-fade className="max-w-[40ch] text-[17px] leading-[1.4] md:text-[18px]">
              A seasonal board we change with the weather, real food all day,
              and beans roasted just down the road in Sacramento. Pull up a
              chair and stay a while.
            </p>
            <div data-hero-fade className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-4">
              <Link href="/menu" className="btn btn-light btn-lg">
                See the menu
              </Link>
              <a
                href={site.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-event="directions_click"
                data-event-location="hero"
                className="btn btn-ghost min-h-11 text-[14px]"
              >
                Get directions
              </a>
            </div>
            <p data-hero-fade className="t-note mt-5">
              <OpenStatus fallback="Open 7 AM, every day" />
            </p>
          </div>
        </div>
      </div>

      <HeroIntro />
    </section>
  );
}

/** One line of the headline inside its own mask, so it can rise into view.
    The mask is padded so the commas and the tops of the capitals are never
    shaved by the tight line height. */
function Line({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.1em] pt-[0.04em] -mb-[0.1em] ${className}`}>
      <span data-hero-line className="block">
        {children}
      </span>
    </span>
  );
}
