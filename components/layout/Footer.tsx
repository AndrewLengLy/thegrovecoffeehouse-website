import Link from "next/link";
import { site, hours } from "@/lib/site";
import { Doodle } from "@/components/ui/Doodle";
import { Wordmark } from "@/components/ui/Wordmark";
import { CoffeeStain } from "@/components/ui/CoffeeStain";

const sitemap = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/our-story", label: "Our story" },
  { href: "/#events", label: "Events" },
  { href: "/visit", label: "Visit" },
];

export function Footer() {
  return (
    /* The page ends on the forest of the chairs, under the name set large the
       way it heads the board, stain and all. */
    <footer className="on-forest">
      <div className="wrap pb-10 pt-10 md:pt-14">
        <div className="relative mb-12 md:mb-16">
          <CoffeeStain className="absolute -left-4 -top-8 h-28 w-40 text-paper opacity-50 md:-top-10 md:h-36 md:w-52" />
          <Wordmark size="large" onDark className="relative max-w-full" />
        </div>
        <div className="grid gap-10 md:grid-cols-12 md:gap-6">
          {/* Where the reference asks for an email address. The Grove has no
              mailing list, and it posts everything on Instagram first, so this
              sends people there instead of collecting an address nobody reads. */}
          <div className="md:col-span-4 lg:col-span-3">
            <p className="text-[17px] leading-[1.3]">
              New drinks and the next music night go up on Instagram first.
              Follow along and you will hear about them before anyone.
            </p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              data-event="instagram_click"
              data-event-location="footer"
              className="group mt-5 flex min-h-11 items-end justify-between gap-4 border-b border-paper/70 pb-2"
            >
              <span className="text-[16px] opacity-80 transition-opacity group-hover:opacity-100">
                {site.instagram.handle}
              </span>
              <span className="t-nav">Follow</span>
            </a>
          </div>

          <div className="md:col-span-4 md:col-start-7 lg:col-span-3 lg:col-start-7">
            <h2 className="t-nav text-[11px]">Contact</h2>
            <address className="mt-4 text-[16px] not-italic leading-[1.35]">
              <a
                href={site.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-event="directions_click"
                data-event-location="footer"
                className="hover:underline hover:underline-offset-2"
              >
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </a>
              <br />
              {hours.map((h) => (
                <span key={h.label} className="block">
                  {h.label}, {h.time}
                </span>
              ))}
              <a
                href={site.phone.href}
                data-event="phone_click"
                data-event-location="footer"
                className="inline-flex min-h-6 items-center tabular-nums hover:underline hover:underline-offset-2"
              >
                {site.phone.display}
              </a>
            </address>
            <ul className="mt-4 text-[16px] leading-[1.35]">
              <li>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event="instagram_click"
                  data-event-location="footer_contact"
                  className="inline-flex min-h-6 items-center hover:underline hover:underline-offset-2"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={site.listings.yelp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-6 items-center hover:underline hover:underline-offset-2"
                >
                  Yelp
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Site map" className="md:col-span-2 md:col-start-11">
            <h2 className="t-nav text-[11px]">Site map</h2>
            <ul className="mt-4 text-[16px] leading-[1.35]">
              {sitemap.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-6 items-center hover:underline hover:underline-offset-2">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex items-end justify-between md:mt-20">
          {/* Back to top, spelled down the side of a drawing the way the
              reference spells it round its own. */}
          <a
            href="#"
            className="group relative grid h-[150px] w-[130px] grid-cols-[18px_1fr_18px] grid-rows-[auto_1fr_auto] md:h-[170px] md:w-[150px]"
          >
            <span className="sr-only">Back to top</span>
            <span aria-hidden="true" className="t-nav col-start-1 row-start-1 flex flex-col text-[15px] leading-[1.25]">
              <span>B</span>
              <span>A</span>
              <span>C</span>
              <span>K</span>
            </span>
            <Doodle
              name="sapling"
              className="col-start-2 row-span-3 row-start-1 h-full w-full text-paper transition-transform duration-base group-hover:-translate-y-1"
            />
            <span aria-hidden="true" className="t-nav col-start-3 row-start-2 flex flex-col self-center text-[15px] leading-[1.25]">
              <span>T</span>
              <span>O</span>
            </span>
            <span aria-hidden="true" className="t-nav col-start-1 row-start-3 flex flex-col text-[15px] leading-[1.25]">
              <span>T</span>
              <span>O</span>
              <span>P</span>
            </span>
          </a>

          {/* The maker's seal, where the reference carries its own. */}
          <a
            href="https://paraboxdigital.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-paper/80 text-[22px] italic leading-none transition-colors hover:bg-paper hover:text-forest md:h-[68px] md:w-[68px]"
          >
            <span aria-hidden="true" className="-mt-1">pd</span>
            <span className="sr-only">Site by Parabox Digital</span>
          </a>
        </div>
      </div>

      <div className="on-brick">
        <p className="wrap t-nav py-2 text-center text-[11px] leading-snug">
          Copyright {site.name} 2026 <span aria-hidden="true">|</span> Family owned in Roseville,
          CA <span aria-hidden="true">|</span> Site by Parabox Digital
        </p>
      </div>
    </footer>
  );
}
