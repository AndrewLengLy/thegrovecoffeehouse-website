"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { site } from "@/lib/site";
import { GroveMark } from "@/components/ui/GroveMark";
import { Wordmark } from "@/components/ui/Wordmark";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/#the-room", label: "The room" },
  { href: "/our-story", label: "Our story" },
  { href: "/visit", label: "Visit" },
];

export function Header() {
  const pathname = usePathname();

  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* Scroll recipe 11. The board is tall, so on the way down it gets out of the
     way at every width, not just on a phone, and comes back on the way up. */
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          setHidden(self.direction === 1 && self.scroll() > 400);
        },
      });
      return () => st.kill();
    });

    // Under reduced motion the header never moves.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      setHidden(false);
    });

    return () => mm.revert();
  });

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  /* Close the panel on navigation. Adjusting state during render when the path
     changes is React's replacement for a setState inside an effect, which
     would paint the open panel on the new page for one frame first. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  /* The fascia is type scaled to the viewport, so the header's height is a
     function of the window width and cannot be written down as a constant.
     It is measured and published on <html> instead, where the menu jump bar,
     the mobile panel and scroll-padding-top all read it. A ResizeObserver
     rather than a resize listener, because the height also changes when a
     font finally swaps in. */
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const publish = () => {
      document.documentElement.style.setProperty("--header-h", `${Math.round(el.offsetHeight)}px`);
    };
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Published on <html> so anything fixed under the header (the menu jump
     bar) can follow it up and down without a shared React context. */
  const tucked = hidden && !open;
  useEffect(() => {
    document.documentElement.dataset.header = tucked ? "hidden" : "shown";
  }, [tucked]);

  /* Focus containment. A menu that lets the keyboard wander into the page
     behind it is one of the most common accessibility failures on a small
     business site, and it is cheap to get right. */
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    if (!panel) return;

    const selector =
      'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';
    const focusables = () => Array.from(panel.querySelectorAll<HTMLElement>(selector));

    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        previouslyFocused?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  /* min-h-7 with the padding to fill it: a 12px label is a 16px tall box, and
     a 16px tall tap target fails WCAG 2.2 target size. The row's own padding
     comes down by the same amount, so the tape is the height it looks. */
  /* Sizing only, never display: these strings are combined with "hidden
     lg:inline-flex" and friends, and an unprefixed display utility in here
     would sit at the same specificity as the hidden it is meant to lose to. */
  const tapeItem = "min-h-7 items-center py-1.5";
  const navLink =
    `t-label ${tapeItem} text-ember transition-colors duration-micro hover:text-chalk ` +
    "aria-[current=page]:underline aria-[current=page]:decoration-1 aria-[current=page]:underline-offset-[6px]";
  const utilityLink = `t-label ${tapeItem} text-muted-strong transition-colors duration-micro hover:text-chalk`;

  /* The board. The name painted edge to edge, with the nav on a strip of tape
     directly beneath it. Nothing floats over the hero photograph: light
     chrome over an unknown image cannot be guaranteed to meet contrast, and a
     scrim heavy enough to fix that would dull the top of every hero on the
     site. */
  return (
    <header
      ref={headerRef}
      className={[
        "sticky top-0 z-50 bg-ground",
        "transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
        tucked ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      {/* Fascia. Full bleed on purpose: the letters run to both edges, which
          is the one thing this reference does that a centred column cannot. */}
      <Link href="/" aria-label={`${site.name}, home`} className="block pt-2 md:pt-2.5">
        {/* The relative box wraps the SVG alone, so the sprig is sized against
            the lettering rather than against the lettering plus padding. */}
        <span className="relative block">
          <Wordmark variant="fascia" title={null} className="text-chalk" />
          {/* The mark sits in the gap between GROVE and COFFEE. 43% is that
              gap's centre for this string, measured off the same advance the
              viewBox is built from. The gap is narrower than the mark, so the
              leaves carry over the E and the C the way the reference's flower
              carries over its own wordmark. */}
          <GroveMark
            weight={2.2}
            className="absolute left-[43%] top-1/2 h-[128%] w-auto -translate-x-1/2 -translate-y-1/2 text-ember"
          />
        </span>
      </Link>

      {/* The tape. Every item spread across the full width. */}
      <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-1 md:px-4">
        <nav aria-label="Main" className="contents">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${navLink} hidden lg:inline-flex`}
              aria-current={pathname === l.href ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <a
          href={site.phone.href}
          data-event="phone_click"
          data-event-location="header"
          className={`${utilityLink} hidden tabular-nums lg:inline-flex`}
        >
          {site.phone.display}
        </a>
        <a
          href={site.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-event="directions_click"
          data-event-location="header"
          className={`${utilityLink} hidden lg:inline-flex`}
        >
          Get directions
        </a>

        {/* Under lg the tape carries the two things people actually came for
            and the way into everything else. */}
        <Link href="/menu" className={`${navLink} inline-flex lg:hidden`} aria-current={pathname === "/menu" ? "page" : undefined}>
          Menu
        </Link>
        <a
          href={site.phone.href}
          data-event="phone_click"
          data-event-location="header"
          className={`${utilityLink} inline-flex tabular-nums lg:hidden`}
        >
          {site.phone.display}
        </a>
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="t-label inline-flex min-h-11 items-center gap-2 text-chalk lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true">{open ? "Close" : "More"}</span>
          <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true" focusable="false">
            <path
              d={open ? "M2 1 L16 11 M16 1 L2 11" : "M0 1 H18 M0 6 H18 M0 11 H18"}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </button>
      </div>

      {/* Panel. Rendered only when open so nothing is reachable behind it. */}
      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="fixed inset-x-0 bottom-0 z-50 overflow-y-auto border-t border-line bg-ground text-chalk lg:hidden"
          style={{ top: "var(--header-h, 116px)" }}
        >
          <nav aria-label="Main" className="wrap flex flex-col gap-1 py-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={close}
                aria-current={pathname === l.href ? "page" : undefined}
                className="t-item border-b border-line py-4 aria-[current=page]:text-ember"
              >
                {l.label}
              </Link>
            ))}

            <a
              href={site.phone.href}
              data-event="phone_click"
              data-event-location="mobile_nav"
              className="t-label flex min-h-12 items-center border-b border-line py-4 tabular-nums text-muted-strong"
            >
              {site.phone.display}
            </a>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              data-event="instagram_click"
              data-event-location="mobile_nav"
              className="t-label flex min-h-12 items-center border-b border-line py-4 text-muted-strong"
            >
              Instagram {site.instagram.handle}
            </a>

            <a
              href={site.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-event="directions_click"
              data-event-location="mobile_nav"
              className="btn btn-primary mt-6"
            >
              Get directions
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
