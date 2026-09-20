import { site } from "@/lib/site";
import { recentEvents, formatEventDate, EVENT_KIND_LABEL } from "@/lib/events";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { BandLine } from "@/components/motion/BandLine";

/**
 * Things that happen here. Music nights, the birthday, a candle drop. Every row
 * is sourced to the shop's own Instagram post, and the section is honest about
 * the fact that the next one gets posted there first.
 */
export function Events() {
  return (
    <section id="events" className="rule-top scroll-mt-2">
      <div className="wrap section">
        <div className="band">
          <span className="t-label">Things that happen here</span>
          <BandLine />
          <span className="t-label text-muted-strong">Posted on Instagram first</span>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">
          <SplitHeading as="h2" className="t-h2 md:col-span-6 lg:col-span-7">
            Some evenings the room fills up
          </SplitHeading>
          <p className="t-body text-muted md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
            Music nights, birthdays, and the occasional candle drop. Here is what
            has been on lately, and where you will hear about the next one
            first.
          </p>
        </div>

        <Reveal as="ol" className="mt-10 list-none border-t border-chalk" each={0.06}>
          {recentEvents.map((e) => {
            const d = formatEventDate(e);
            return (
              <li
                key={e.slug}
                className="grid grid-cols-[4.5rem_1fr] gap-x-4 border-b border-line py-6 md:grid-cols-[6rem_minmax(0,20rem)_minmax(0,1fr)_auto] md:gap-x-8"
              >
                <time dateTime={e.date} className="block">
                  <span className="t-h3 block leading-none">{d.day}</span>
                  <span className="t-label mt-1 block text-muted-strong">
                    {d.month} {d.year}
                  </span>
                </time>

                <div>
                  <span className="tag tag-rest">{EVENT_KIND_LABEL[e.kind]}</span>
                  <h3 className="t-item mt-2">{e.title}</h3>
                  {e.time && <p className="mt-1 text-[15px] text-muted">From {e.time}</p>}
                </div>

                <p className="col-span-2 col-start-1 mt-3 text-[15px] leading-[1.55] md:col-span-1 md:col-start-3 md:mt-0.5">
                  {e.blurb}
                </p>

                <a
                  href={e.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event="instagram_click"
                  data-event-location={`event_${e.slug}`}
                  /* self-start: as a grid item the link would otherwise stretch
                     to the full row height and hang its underline far below
                     the words on a wide screen. */
                  className="link-slide t-label col-start-2 mt-2 inline-flex min-h-[28px] items-center self-start justify-self-start text-muted-strong md:col-start-4 md:mt-0.5 md:justify-self-end"
                >
                  See the post
                </a>
              </li>
            );
          })}
        </Reveal>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] text-muted">
            We post the next one on Instagram before anywhere else, so follow
            along there.
          </p>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            data-event="instagram_click"
            data-event-location="events_section"
            className="btn btn-secondary"
          >
            {/* The handle is 22 characters of capitals, which breaks badly in
                a phone width button. The short label says the same thing. */}
            <span className="sm:hidden">Follow on Instagram</span>
            <span className="hidden sm:inline">Follow {site.instagram.handle}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
