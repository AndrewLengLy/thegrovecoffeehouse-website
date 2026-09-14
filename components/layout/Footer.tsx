import Link from "next/link";
import { site, hours } from "@/lib/site";
import { Wordmark } from "@/components/ui/Wordmark";

const explore = [
  { href: "/menu", label: "The board" },
  { href: "/#the-room", label: "The room" },
  { href: "/#the-beans", label: "The beans" },
  { href: "/our-story", label: "Our story" },
];

export function Footer() {
  return (
    <footer className="on-ink">
      <div className="wrap pt-16 md:pt-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <h2 className="t-label text-paper/70">Come sit with us</h2>
            <address className="mt-4 not-italic">
              <a
                href={site.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-event="directions_click"
                data-event-location="footer"
                className="link-slide t-item inline-block"
              >
                9260 Sierra College Blvd STE 100
              </a>
              <span className="t-item mt-1 block text-paper/60">
                Roseville, CA 95661
              </span>
              <a
                href={site.phone.href}
                data-event="phone_click"
                data-event-location="footer"
                className="link-slide t-item mt-4 inline-flex min-h-[28px] items-center tabular-nums"
              >
                {site.phone.display}
              </a>
            </address>
          </div>

          <nav aria-label="Explore" className="md:col-span-3">
            <h2 className="t-label text-paper/70">Explore</h2>
            <ul className="mt-4 space-y-1">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="link-slide inline-flex min-h-[28px] items-center py-1 text-[16px]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="t-label text-paper/70">Hours</h2>
            <dl className="mt-4 border-t border-paper/25">
              {hours.map((h) => (
                <div
                  key={h.label}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-paper/15 py-2.5"
                >
                  <dt className="t-label text-paper/70" style={{ fontSize: "10px" }}>
                    {h.label}
                  </dt>
                  <dd className="text-[15px] tabular-nums">{h.time}</dd>
                </div>
              ))}
            </dl>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              data-event="instagram_click"
              data-event-location="footer"
              className="link-slide mt-5 inline-flex min-h-[28px] items-center py-1 text-[16px]"
            >
              Instagram {site.instagram.handle}
            </a>
          </div>
        </div>
      </div>

      {/* The fascia. Painted across the full width, not a small logo lockup. */}
      <div className="mt-14 px-3 md:mt-20" aria-hidden="true">
        <Wordmark variant="huge" title={null} onDark className="text-paper" />
      </div>

      <div className="wrap">
        <div className="flex flex-col gap-2 border-t border-paper/25 py-5 text-[13px] text-paper/60 md:flex-row md:items-center md:justify-between">
          <p>{site.name}. Family owned in Roseville, California.</p>
          <p>
            Built by{" "}
            <a
              href="https://paraboxdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-slide"
            >
              Parabox Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
