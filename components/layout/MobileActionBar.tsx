"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { OpenStatus } from "@/components/ui/OpenStatus";

/**
 * The thumb bar. On a phone the two things people come to a cafe site for are
 * "is it open" and "take me there", so once the hero is behind them both sit at
 * the bottom of the screen, where a thumb already is.
 *
 * It stays out of the way at the top of the page, where the hero already makes
 * the same offer, and again once the footer is on screen, where the address and
 * phone are printed large. Nothing is ever covered at the end of the page.
 *
 * Phones and tablets only. On a desktop the header carries both actions.
 */
export function MobileActionBar() {
  const [pastHero, setPastHero] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setPastHero(window.scrollY > window.innerHeight * 0.6));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const footer = document.querySelector("footer");
    const io = footer
      ? new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting), {
          rootMargin: "0px 0px -40px 0px",
        })
      : null;
    if (footer && io) io.observe(footer);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const visible = pastHero && !footerInView;

  return (
    <aside
      aria-label="Quick actions"
      inert={!visible}
      data-visible={visible}
      className={[
        "on-ink fixed inset-x-0 bottom-0 z-40 border-t-2 border-paper/15 lg:hidden",
        "pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5",
        "transition-[transform,visibility] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        visible ? "visible translate-y-0" : "invisible translate-y-full",
      ].join(" ")}
    >
      <div className="wrap flex items-center gap-3">
        <p className="min-w-0 flex-1 text-[13px] font-semibold leading-tight">
          <OpenStatus stacked fallback="Open 7 AM daily" />
        </p>
        {/* A phone glyph needs no word next to it, and the room it frees is
            what lets the open status fit on a 375px screen. */}
        <a
          href={site.phone.href}
          data-event="phone_click"
          data-event-location="mobile_bar"
          className="btn btn-secondary h-12 w-12 shrink-0 p-0"
        >
          <PhoneIcon />
          <span className="sr-only">Call {site.phone.display}</span>
        </a>
        <a
          href={site.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-event="directions_click"
          data-event-location="mobile_bar"
          className="btn btn-onphoto min-h-12 shrink-0 px-4"
        >
          <ArrowIcon />
          Directions
        </a>
      </div>
    </aside>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="shrink-0">
      <path
        d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="shrink-0">
      <path d="M3 11 21 3l-8 18-2-8z" fill="currentColor" />
    </svg>
  );
}
