import { site } from "@/lib/site";
import { recentEvents, eventStamp, EVENT_KIND_LABEL } from "@/lib/events";
import { Reveal } from "@/components/motion/Reveal";
import { Doodle } from "@/components/ui/Doodle";

/**
 * Things that happen here, as a list in the lodge's manner: the label on the
 * left, and on the right each entry on its own hairline, the date in small
 * capitals, the title in the light serif, and a link to the post it came from.
 * The newest one is open, with its few lines.
 *
 * Every entry is sourced to the shop's own Instagram post, and the section is
 * honest that the next one gets posted there first.
 */
export function Events() {
  const [latest, ...earlier] = recentEvents;

  return (
    <section id="events" aria-labelledby="events-heading" className="relative scroll-mt-2 overflow-x-clip">
      <div className="wrap section grid gap-y-10 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-3">
          <h2 id="events-heading" className="t-caps">
            Lately at The Grove
          </h2>
          <Doodle name="guitar" className="mt-10 hidden h-28 w-28 md:block" />
        </div>

        <div className="md:col-span-8 md:col-start-5 lg:col-span-7 lg:col-start-6">
          <p className="t-statement max-w-[30ch]">
            Music nights, birthdays and the odd pop up. The next one goes up on
            Instagram first. Would you come to another music night?
          </p>

          <Reveal as="ol" each={0.06} className="mt-12 border-t border-pencil">
            <li className="border-b border-pencil py-7">
              <p className="t-caps text-ink-soft">
                {eventStamp(latest)} <span aria-hidden="true">/</span> {EVENT_KIND_LABEL[latest.kind]}
              </p>
              <h3 className="t-h2 mt-3">{latest.title}</h3>
              <p className="t-body mt-3 max-w-[56ch] text-[16px]">{latest.blurb}</p>
              <a
                href={latest.source}
                target="_blank"
                rel="noopener noreferrer"
                data-event="instagram_click"
                data-event-location={`event_${latest.slug}`}
                className="btn btn-sand mt-5"
              >
                See the post
              </a>
            </li>
            {earlier.map((e) => (
              <li
                key={e.slug}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 border-b border-pencil py-6"
              >
                <div>
                  <p className="t-caps text-ink-soft">
                    {eventStamp(e)} <span aria-hidden="true">/</span> {EVENT_KIND_LABEL[e.kind]}
                  </p>
                  <h3 className="t-h3 mt-2 text-[24px] md:text-[28px]">{e.title}</h3>
                </div>
                <a
                  href={e.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event="instagram_click"
                  data-event-location={`event_${e.slug}`}
                  className="t-nav link-slide inline-flex min-h-8 items-center"
                >
                  See the post
                </a>
              </li>
            ))}
          </Reveal>

          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            data-event="instagram_click"
            data-event-location="events_section"
            className="btn mt-8"
          >
            Follow along
          </a>
        </div>
      </div>
    </section>
  );
}
