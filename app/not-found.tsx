import Link from "next/link";
import { site } from "@/lib/site";
import { BandLine } from "@/components/motion/BandLine";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="band">
          <span className="t-label">404</span>
          <BandLine />
          <span className="t-label text-muted-strong">Not found</span>
        </div>
        <h1 className="t-hero mt-8 max-w-[12ch]">This page wandered off the path</h1>
        <p className="t-body mt-8 max-w-[46ch] text-muted">
          Whatever was here has moved or never existed. The menu is the thing
          most people are looking for, so start there.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/menu" className="btn btn-primary">
            See the menu
          </Link>
          <Link href="/" className="btn btn-secondary">
            Back to the home page
          </Link>
          <a
            href={site.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-event="directions_click"
            data-event-location="not_found"
            className="btn btn-secondary"
          >
            Get directions
          </a>
        </div>

        <p className="mt-10 text-[15px] text-muted">
          Still stuck. Call us on{" "}
          <a
            href={site.phone.href}
            data-event="phone_click"
            data-event-location="not_found"
            className="link-slide font-semibold text-accent tabular-nums"
          >
            {site.phone.display}
          </a>{" "}
          and we will point you at it.
        </p>
      </div>
    </section>
  );
}
