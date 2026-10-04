import Link from "next/link";
import { site } from "@/lib/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { HoursList } from "@/components/ui/HoursList";
import { OpenStatus } from "@/components/ui/OpenStatus";

const sitemap = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/our-story", label: "Our story" },
  { href: "/#events", label: "Events" },
  { href: "/visit", label: "Visit" },
];

const linkCls = "inline-flex min-h-7 items-center transition-opacity hover:opacity-70";

/**
 * The page ends on a field of olive, the chairs' colour, the way the lodge
 * ends on its own. It opens with the one thing every page is really asking,
 * come and see us, then the hours, the address and the links in small columns,
 * and the name set large in the board's script across the foot.
 */
export function Footer() {
  return (
    <footer className="on-olive overflow-x-clip">
      <div className="wrap pb-8 pt-20 md:pt-28">
        <div className="grid gap-y-8 md:grid-cols-12 md:gap-x-8">
          <p className="t-caps md:col-span-3">Come see us</p>
          <div className="md:col-span-8 md:col-start-5 lg:col-span-7 lg:col-start-6">
            <p className="t-statement-lg max-w-[26ch]">
              We are on Sierra College Blvd in Roseville, and the coffee is on
              at seven every day of the week.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={site.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-event="directions_click"
                data-event-location="footer"
                className="btn btn-light btn-lg"
              >
                Get directions
              </a>
              <a
                href={site.phone.href}
                data-event="phone_click"
                data-event-location="footer"
                className="btn btn-ghost min-h-11 tabular-nums"
              >
                Call {site.phone.display}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-10 sm:grid-cols-2 md:mt-28 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <h2 className="t-caps">Find us</h2>
            <address className="mt-4 text-[16px] not-italic leading-[1.4]">
              <a
                href={site.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-event="directions_click"
                data-event-location="footer_address"
                className="inline-block py-0.5 hover:underline hover:underline-offset-2"
              >
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </a>
            </address>
            <p className="t-note mt-3">
              <OpenStatus fallback="Open 7 AM, every day" />
            </p>
          </div>

          <div className="lg:col-span-4">
            <h2 className="t-caps">Hours</h2>
            <HoursList tone="forest" className="mt-4" />
          </div>

          <nav aria-label="Site map" className="lg:col-span-2 lg:col-start-9">
            <h2 className="t-caps">Explore</h2>
            <ul className="mt-3 text-[16px]">
              {sitemap.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="t-caps">Follow</h2>
            {/* The Grove has no mailing list and posts everything on Instagram
                first, so this is where the lodge's newsletter box would be. */}
            <ul className="mt-3 text-[16px]">
              <li>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event="instagram_click"
                  data-event-location="footer"
                  className={linkCls}
                >
                  Instagram
                </a>
              </li>
              <li>
                <a href={site.listings.yelp} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Yelp
                </a>
              </li>
              <li>
                <a
                  href={site.phone.href}
                  data-event="phone_click"
                  data-event-location="footer_follow"
                  className={`${linkCls} tabular-nums`}
                >
                  {site.phone.display}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <Wordmark size="large" onDark className="max-w-full" />
        </div>

        <div className="t-note mt-8 flex flex-col gap-3 border-t border-paper/30 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {site.name} 2026 <span aria-hidden="true">/</span> Family owned in Roseville, CA
          </p>
          <div className="flex items-center gap-6">
            <a href="https://paraboxdigital.com" target="_blank" rel="noopener noreferrer" className={linkCls}>
              Site by Parabox Digital
            </a>
            <a href="#" className={linkCls}>
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
