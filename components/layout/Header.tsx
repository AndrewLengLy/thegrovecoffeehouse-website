"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { site } from "@/lib/site";
import { Wordmark } from "@/components/ui/Wordmark";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/#the-room", label: "The room" },
  { href: "/our-story", label: "Our story" },
  { href: "/visit", label: "Visit" },
];

export function Header() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* Scroll recipe 11. The header changes state past the hero and, on small
     screens, gets out of the way on the way down and returns on the way up. */
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          setScrolled(self.scroll() > 80);
          setHidden(self.direction === 1 && self.scroll() > 400);
        },
      });
      return () => st.kill();
    });

    // Under reduced motion the header never hides. It only changes surface.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          setScrolled(self.scroll() > 80);
          setHidden(false);
        },
      });
      return () => st.kill();
    });

    return () => mm.revert();
  });

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Close the panel on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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

  /* The header sits in flow under the announcement strip rather than floating
     over the hero photograph. Light chrome over an unknown photograph cannot be
     guaranteed to meet contrast, and a scrim heavy enough to fix that would
     dull the top of every hero image on the site. */
  return (
    <header
      ref={headerRef}
      className={[
        "sticky top-0 z-50 border-b bg-paper text-ink",
        "transition-[transform,border-color] duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
        scrolled ? "border-ink" : "border-line",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <div className="wrap flex h-[68px] items-center justify-between gap-4 md:h-[76px]">
        <Link
          href="/"
          className="shrink-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ transform: scrolled ? "scale(0.94)" : "scale(1)", transformOrigin: "left center" }}
        >
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="t-label inline-flex min-h-[28px] items-center border-b-2 border-transparent transition-colors duration-micro hover:border-ink aria-[current=page]:border-ink"
              aria-current={pathname === l.href ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={site.phone.href}
            data-event="phone_click"
            data-event-location="header"
            className="t-label inline-flex min-h-[28px] items-center border-b-2 border-transparent tabular-nums transition-colors duration-micro hover:border-ink"
          >
            {site.phone.display}
          </a>
          <a
            href={site.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-event="directions_click"
            data-event-location="header"
            className="btn btn-primary"
          >
            Get directions
          </a>
        </div>

        {/* Menu is one tap from anywhere, including on mobile before the panel opens. */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/menu" className="btn btn-primary">
            Menu
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex h-12 w-12 items-center justify-center border-2 border-current"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true" focusable="false">
              <path
                d={open ? "M2 2 L18 12 M18 2 L2 12" : "M0 1 H20 M0 7 H20 M0 13 H20"}
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Panel. Rendered only when open so nothing is reachable behind it. */}
      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="fixed inset-x-0 top-[68px] bottom-0 z-50 overflow-y-auto border-t border-ink bg-paper text-ink md:top-[76px] lg:hidden"
        >
          <nav aria-label="Main" className="wrap flex flex-col gap-1 py-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={close}
                aria-current={pathname === l.href ? "page" : undefined}
                className="t-item border-b border-line py-4"
              >
                {l.label}
              </Link>
            ))}

            <a
              href={site.phone.href}
              data-event="phone_click"
              data-event-location="mobile_nav"
              className="t-label flex min-h-12 items-center border-b border-line py-4 tabular-nums"
            >
              {site.phone.display}
            </a>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              data-event="instagram_click"
              data-event-location="mobile_nav"
              className="t-label flex min-h-12 items-center border-b border-line py-4"
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
