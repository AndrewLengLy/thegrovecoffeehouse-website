import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { Doodle } from "@/components/ui/Doodle";

/**
 * The room, as one wide print with the words set into its lower left corner.
 * Reviews of this cafe keep mentioning the same things: outlets, seating inside
 * and out, people staying, riders stopping in. The room is half of what is
 * being sold.
 *
 * Until the photograph arrives the print is a forest green field, the chairs'
 * green, with a table drawn on it in paper. The gradient is doing accessibility
 * work once a photograph is in: paper type over an unknown photograph cannot be
 * assumed to pass contrast, so the corner under the words is taken down to 82%
 * forest, which clears AA over a near white photograph.
 *
 * TODO(andrew): once the real photograph is in, set ROOM_PHOTO and re-check the
 * type against it.
 */
const ROOM_PHOTO: string | null = null;

export function TheRoom() {
  return (
    <section id="the-room" aria-labelledby="room-heading" className="scroll-mt-2">
      <div className="wrap py-10 md:py-14">
        <div className="print relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[1376/557]">
          <Photo
            src={ROOM_PHOTO}
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
            className="absolute inset-0 bg-[linear-gradient(to_top_right,rgb(20_46_38/0.82),rgb(20_46_38/0.45)_38%,transparent_65%)]"
          />
          {/* Up in the corner on a phone, where the words fill the lower half;
              centred on the right once the print is wide. */}
          {!ROOM_PHOTO && (
            <Doodle
              name="table"
              className="absolute right-5 top-5 h-32 w-32 text-paper/85 sm:right-[8%] sm:top-1/2 sm:h-52 sm:w-52 sm:-translate-y-1/2 lg:h-64 lg:w-64"
            />
          )}
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
