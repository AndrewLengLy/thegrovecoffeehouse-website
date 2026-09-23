import { site } from "@/lib/site";
import { recentEvents, eventStamp, EVENT_KIND_LABEL } from "@/lib/events";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { Doodle } from "@/components/ui/Doodle";

/**
 * Things that happen here, set the way the reference sets its next event: a
 * square print on the left, and on the right the date stamp, a big italic
 * title, a few lines and a tag to follow. The rest of what has been on lately
 * sits under it as a short list.
 *
 * Every entry is sourced to the shop's own Instagram post, and the section is
 * honest that the next one gets posted there first.
 */
export function Events() {
  const [latest, ...earlier] = recentEvents;

  return (
    <section id="events" aria-labelledby="events-heading" className="relative scroll-mt-2">
      <div className="wrap section grid gap-8 md:grid-cols-2 md:gap-10">
        <div className="print aspect-square">
          <Photo
            src={null}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            width={1400}
            height={1400}
            alt="The room full of people during an evening at The Grove Coffee House"
            brief="The room during a music night or the birthday weekend, full of people. Square crop."
          />
        </div>

        <div className="flex flex-col md:pl-4 lg:pl-8">
          <h2 id="events-heading" className="t-caps">
            Lately at The Grove
            <span className="block">{eventStamp(latest)}</span>
          </h2>

          <Reveal travel={16} className="mt-10 md:mt-auto">
            <h3 className="t-display">{latest.title}</h3>
            <p className="t-body mt-3 max-w-[46ch]">{latest.blurb}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={latest.source}
                target="_blank"
                rel="noopener noreferrer"
                data-event="instagram_click"
                data-event-location={`event_${latest.slug}`}
                className="btn"
              >
                See the post
              </a>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                data-event="instagram_click"
                data-event-location="events_section"
                className="btn btn-ghost"
              >
                Follow along
              </a>
            </div>
          </Reveal>

          <div className="mt-10 md:mb-auto md:mt-14">
            <p className="t-caps">Also lately</p>
            <ul className="mt-3 max-w-[34rem]">
              {earlier.map((e) => (
                <li
                  key={e.slug}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 border-t border-pencil/50 py-3 last:border-b"
                >
                  <div>
                    <p className="t-note">
                      {eventStamp(e)} <span aria-hidden="true">/</span> {EVENT_KIND_LABEL[e.kind]}
                    </p>
                    <h3 className="t-h3 mt-1 text-[21px]">{e.title}</h3>
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
            </ul>
          </div>
        </div>
      </div>

      <Doodle
        name="guitar"
        className="absolute bottom-6 right-4 hidden h-24 w-24 md:block md:right-10 lg:h-28 lg:w-28"
      />
    </section>
  );
}
