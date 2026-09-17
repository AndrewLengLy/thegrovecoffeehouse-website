import Link from "next/link";
import { site } from "@/lib/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { HoursList } from "@/components/ui/HoursList";

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
            {/* Two columns on a phone. Four short links do not need a screen
                of their own. */}
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 md:grid-cols-1">
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
            <HoursList tone="ink" className="mt-4" />
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

      {/* The fascia's baseline sits a hair above the bottom of its box, so the
          rule below needs its own air or it reads as underlining the letters. */}
      <div className="wrap mt-5 md:mt-8">
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
