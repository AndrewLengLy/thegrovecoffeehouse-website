import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The room, as one wide print with the words set into its lower left corner,
 * the way the reference runs its standing Friday feature. Reviews of this cafe
 * keep mentioning the same things: outlets, seating inside and out, people
 * staying, riders stopping in. The room is half of what is being sold.
 *
 * The gradient is doing accessibility work. Paper type over an unknown
 * photograph cannot be assumed to pass contrast, so the corner under the words
 * is taken down to 80% wine, which clears AA over a near white photograph.
 *
 * TODO(andrew): once the real photograph is in, re-check the type against it.
 */
export function TheRoom() {
  return (
    <section id="the-room" aria-labelledby="room-heading" className="scroll-mt-2">
      <div className="wrap py-10 md:py-14">
        <div className="print relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[1376/557]">
          <Photo
            src={null}
            fill
            tone="dark"
            sizes="100vw"
            width={2400}
            height={972}
            alt="Seating inside The Grove Coffee House with people working at tables"
            brief="Wide shot of the interior seating, ideally with people working. Show the outlets and the light."
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top_right,rgb(58_16_14/0.82),rgb(58_16_14/0.45)_38%,transparent_65%)]"
          />
          <Reveal travel={16} className="absolute bottom-0 left-0 max-w-[36rem] p-5 text-paper md:p-8">
            <h2 id="room-heading" className="t-feature">
              Stay as long as you like
            </h2>
            <p className="t-caps mt-3">Outlets, seats inside and out, no clock</p>
            <p className="t-body mt-2 max-w-[48ch]">
              Settle in and stay. People spend whole mornings here working and
              studying, or catching up with a friend. Riders come in off Sierra
              College Blvd and sit outside where they can see the bike.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
