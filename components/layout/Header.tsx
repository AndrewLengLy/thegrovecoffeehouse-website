"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { site } from "@/lib/site";
import { Wordmark } from "@/components/ui/Wordmark";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/our-story", label: "Our story" },
  { href: "/#events", label: "Events" },
  { href: "/visit", label: "Visit" },
];

export function Header() {
  const pathname = usePathname();

  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* Scroll recipe 11. On the way down the header gets out of the way at every
     width, and comes back on the way up. */
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

  /* The header's height changes with the width and when the fonts swap in, so
     it is measured and published on <html>, where the menu jump bar, the
     mobile panel and scroll-padding-top all read it. */
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

  /* No display here. Each use sets its own, because a shared inline-flex
     beats a caller's `hidden` in the cascade and puts desktop-only links in
     the phone header on top of the name. */
  const navLink =
    "t-nav min-h-8 items-center transition-colors duration-micro hover:text-brick " +
    "aria-[current=page]:underline aria-[current=page]:decoration-1 aria-[current=page]:underline-offset-[5px]";

  /* Laid out the way the reference lays out its header: the name, a two line
     italic note beside it, the navigation straight after in typewriter
     capitals, and the two practical links pushed to the far right. */
  return (
    <header
      ref={headerRef}
      className={[
        "paper sticky top-0 z-50",
        "transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
        tucked ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <div className="wrap flex items-center justify-between gap-6 py-3 md:py-4">
        <div className="flex min-w-0 items-center gap-5 xl:gap-6">
          <Link href="/" aria-label={`${site.name}, home`} className="shrink-0">
            <Wordmark title={null} />
          </Link>
          <p className="hidden text-[14px] italic leading-[1.15] 2xl:block">
            Coffee runs &amp; matcha dates.
            <br />
            Roseville, EST 2023
          </p>

          <nav aria-label="Main" className="ml-2 hidden items-center gap-6 xl:flex 2xl:ml-8 2xl:gap-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`${navLink} inline-flex`}
                aria-current={pathname === l.href ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              data-event="instagram_click"
              data-event-location="header"
              className={`${navLink} inline-flex`}
            >
              Instagram
            </a>
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-6">
          <a
            href={site.phone.href}
            data-event="phone_click"
            data-event-location="header"
            className={`${navLink} hidden tabular-nums xl:inline-flex`}
          >
            {site.phone.display}
          </a>
          <a
            href={site.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-event="directions_click"
            data-event-location="header"
            className={`${navLink} hidden xl:inline-flex`}
          >
            Directions
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="t-nav inline-flex min-h-11 items-center gap-2 xl:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      {/* Panel. Rendered only when open so nothing is reachable behind it. */}
      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="paper fixed inset-x-0 bottom-0 z-50 overflow-y-auto xl:hidden"
          style={{ top: "var(--header-h, 84px)" }}
        >
          <nav aria-label="Main" className="wrap flex flex-col py-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={close}
                aria-current={pathname === l.href ? "page" : undefined}
                className="t-display border-b border-pencil/40 py-4 aria-[current=page]:text-brick"
                style={{ fontSize: "40px" }}
              >
                {l.label}
              </Link>
            ))}

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={site.phone.href}
                data-event="phone_click"
                data-event-location="mobile_nav"
                className="t-nav inline-flex min-h-11 items-center tabular-nums"
              >
                {site.phone.display}
              </a>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                data-event="instagram_click"
                data-event-location="mobile_nav"
                className="t-nav inline-flex min-h-11 items-center"
              >
                Instagram {site.instagram.handle}
              </a>
              <a
                href={site.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-event="directions_click"
                data-event-location="mobile_nav"
                className="btn mt-2 self-start"
              >
                Get directions
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
