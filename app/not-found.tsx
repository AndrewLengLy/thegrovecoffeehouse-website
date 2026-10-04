import Link from "next/link";
import { site } from "@/lib/site";
import { Doodle } from "@/components/ui/Doodle";
import { CoffeeStain } from "@/components/ui/CoffeeStain";

export default function NotFound() {
  return (
    <section className="wrap section grid gap-6 overflow-x-clip md:grid-cols-12 md:gap-8">
      <div className="md:col-span-7 lg:col-span-6">
        <p className="t-nav text-ink-soft">404, not found</p>
        <h1 className="t-display mt-3">We cannot find that page</h1>
        <p className="t-body mt-4 max-w-[46ch]">
          It has either moved or never existed. Most people are here for the
          menu, so that is a good place to start.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link href="/menu" className="btn">
            See the menu
          </Link>
          <Link href="/" className="btn btn-ghost">
            Back to the home page
          </Link>
          <a
            href={site.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-event="directions_click"
            data-event-location="not_found"
            className="btn btn-ghost"
          >
            Get directions
          </a>
        </div>

        <p className="t-body mt-8 max-w-[46ch]">
          Still stuck? Give us a call on{" "}
          <a
            href={site.phone.href}
            data-event="phone_click"
            data-event-location="not_found"
            className="link-slide tabular-nums"
          >
            {site.phone.display}
          </a>{" "}
          and we will point you in the right direction.
        </p>
      </div>

      <div aria-hidden="true" className="relative flex items-center justify-center md:col-span-4 md:col-start-9">
        <CoffeeStain className="absolute h-40 w-56 md:h-52 md:w-72" />
        <Doodle name="cup" className="relative h-36 w-36 md:h-48 md:w-48" />
      </div>
    </section>
  );
}
