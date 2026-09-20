import { Photo } from "@/components/ui/Photo";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ScaleReveal } from "@/components/motion/ScaleReveal";

/**
 * The third space pitch. Reviews of this cafe keep mentioning the same things:
 * outlets, seating inside and out, people staying, cyclists stopping in. The
 * room is half of what is being sold, so it gets a section of its own.
 *
 * The facts sit in a ruled plate rather than a row of chips. Chips are software
 * furniture; a plate is what is screwed to the wall of a shop.
 */

const plate = [
  ["Power", "Outlets you can actually reach"],
  ["Seating", "Inside and outside"],
  ["Laptops", "Welcome, all morning"],
  ["Bikes", "Riders stop in. Sit where you can see it"],
];

export function TheRoom() {
  return (
    <section id="the-room" className="rule-top scroll-mt-2">
      <div className="wrap section pb-0 md:pb-0">
        <div className="grid gap-8 md:grid-cols-12">
          <SplitHeading as="h2" className="t-h2 md:col-span-7">
            Stay as long as you like
          </SplitHeading>

          <Reveal className="md:col-span-5 md:col-start-8">
            <p className="t-body">
              There are outlets, there are chairs worth sitting in, and nobody is
              going to hover while you finish. People work here for whole
              mornings. People read here. People come in off a ride and sit
              outside with the bike.
            </p>
            <dl className="mt-7 border-t border-chalk">
              {plate.map(([k, v]) => (
                <div key={k} className="flex gap-4 border-b border-line py-2.5">
                  <dt className="t-label w-[5.5rem] shrink-0 pt-[3px] text-muted-strong">{k}</dt>
                  <dd className="text-[15px] leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* Full bleed. The container breaks here on purpose. */}
      {/* On a phone the wide shot leads and the two portraits sit side by side
          under it, instead of three full width frames stacked a screen and a
          half deep. */}
      <Reveal className="mt-12 grid grid-cols-2 gap-px bg-line md:mt-16 md:grid-cols-[1.6fr_1fr_1fr]">
        <div className="relative col-span-2 aspect-[16/10] md:col-span-1 md:aspect-auto md:min-h-[420px]">
          <ScaleReveal>
          <Photo
            src={null}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            width={1600}
            height={1000}
            alt="Seating inside The Grove Coffee House with people working at tables"
            brief="Wide shot of the interior seating, ideally with people working. Show the outlets and the light."
          />
          </ScaleReveal>
        </div>
        <div className="relative aspect-[4/5] md:aspect-auto">
          <ScaleReveal>
          <Photo
            src={null}
            fill
            sizes="(min-width: 768px) 25vw, 100vw"
            width={900}
            height={1100}
            alt="Outdoor seating at the front of The Grove Coffee House"
            brief="The outdoor seating out front. Portrait crop."
          />
          </ScaleReveal>
        </div>
        <div className="relative aspect-[4/5] md:aspect-auto">
          <ScaleReveal>
          <Photo
            src={null}
            fill
            sizes="(min-width: 768px) 25vw, 100vw"
            width={900}
            height={1100}
            alt="A drink and a plate on a table at The Grove Coffee House"
            brief="A drink and food on a table in the room, shot at the table. Portrait crop."
          />
          </ScaleReveal>
        </div>
      </Reveal>
    </section>
  );
}
