import { site, hours, hoursCaveat } from "@/lib/site";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { BandLine } from "@/components/motion/BandLine";

/**
 * The location block, complete rather than padded. Address, hours with the
 * weekend difference stated plainly, a real caveat about holidays, a directions
 * link, a phone tap, and a map. No contact form: on a cafe site the actions are
 * "come here" and "call", and a form is a slower version of both.
 */
export function VisitBlock({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="visit" className="rule-top scroll-mt-24">
      <div className="wrap section">
        <div className="band">
          <span className="t-label">Visit</span>
          <BandLine />
          <span className="t-label text-muted-strong">Roseville, California</span>
        </div>

        <div className="mt-8 grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6">
            <SplitHeading
              as={headingLevel}
              className={headingLevel === "h1" ? "t-display" : "t-h2"}
            >
              Come sit with us
            </SplitHeading>

            <Reveal className="mt-8">
              <address className="not-italic">
                <span className="t-item block">{site.address.street}</span>
                <span className="t-item block text-muted">
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                </span>
              </address>

              {/* TODO(andrew): add the plaza name and the landmark to look for
                  once the client confirms what is on the signage. */}
              <p className="mt-3 text-[15px] text-muted">
                Suite 100, in the retail center on Sierra College Blvd.
              </p>

              <dl className="mt-8 border-t-2 border-ink">
                {hours.map((h) => (
                  <div
                    key={h.label}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-3"
                  >
                    <dt className="t-label text-muted-strong">{h.label}</dt>
                    <dd className="text-[16px] tabular-nums">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 max-w-[46ch] text-[14px] leading-snug text-muted">{hoursCaveat}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={site.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event="directions_click"
                  data-event-location="visit_block"
                  className="btn btn-primary"
                >
                  Get directions
                </a>
                <a
                  href={site.phone.href}
                  data-event="phone_click"
                  data-event-location="visit_block"
                  className="btn btn-secondary tabular-nums"
                >
                  {site.phone.display}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-6">
            <div className="frame h-full">
              {/* Lazy so the map never competes with the page for load time. */}
              <iframe
                src={site.mapEmbedUrl}
                title={`Map showing ${site.name} at ${site.addressLine}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0 md:h-full md:min-h-[480px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
