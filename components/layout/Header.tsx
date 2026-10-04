"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { site } from "@/lib/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { OpenStatus } from "@/components/ui/OpenStatus";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/our-story", label: "Our story" },
  { href: "/#events", label: "Events" },
  { href: "/visit", label: "Visit" },
];

type Theme = "over" | "solid" | "open";

export function Header() {
  const pathname = usePathname();

  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  /* Over the home page photograph until it has scrolled away. The server
     knows the path, so the first paint is already right. */
  const [overHero, setOverHero] = useState(pathname === "/");

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

  /* Whether the header is sitting on the hero photograph. Read from the page
     rather than the path, so it is true exactly while the photograph is under
     it and false the moment it has scrolled past. */
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      const hero = document.querySelector("[data-hero]");
      const h = headerRef.current?.offsetHeight ?? 72;
      setOverHero(!!hero && hero.getBoundingClientRect().bottom > h + 1);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

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
    setOverHero(pathname === "/");
  }

  /* The header's height changes with the width and when the fonts swap in, so
     it is measured and published on <html>, where the menu jump bar, the
     mobile panel, the hero and scroll-padding-top all read it. */
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

  const theme: Theme = open ? "open" : overHero ? "over" : "solid";
  const light = theme !== "solid";

  /* No display here. Each use sets its own, because a shared inline-flex
     beats a caller's `hidden` in the cascade and puts desktop-only links in
     the phone header on top of the name. */
  const navLink =
    "t-nav min-h-8 items-center transition-opacity duration-micro hover:opacity-60 " +
    "aria-[current=page]:underline aria-[current=page]:decoration-1 aria-[current=page]:underline-offset-[6px]";

  /* Laid out the way the lodge lays out its header: the name in the middle,
     with small capitals out to either side. On a phone the name moves to the
     left and the menu opens over the page. */
  return (
    <header
      ref={headerRef}
      data-theme={theme}
      className={[
        "site-header sticky top-0 z-50",
        tucked ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <div className="wrap grid grid-cols-[1fr_auto] items-center gap-6 py-3 md:py-4 xl:grid-cols-[1fr_auto_1fr]">
        <nav aria-label="Main" className="hidden items-center gap-7 xl:flex">
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
        </nav>

        <Link href="/" aria-label={`${site.name}, home`} className="justify-self-start xl:justify-self-center">
          <Wordmark title={null} onDark={light} />
        </Link>

        <div className="flex items-center justify-end gap-6">
          <p className="t-note hidden whitespace-nowrap 2xl:block">
            <OpenStatus fallback="Open 7 AM, every day" />
          </p>
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
            className={`btn hidden xl:inline-flex ${light ? "btn-light" : ""}`}
          >
            Directions
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="t-nav inline-flex min-h-11 items-center gap-2.5 xl:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true">{open ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="relative block h-2.5 w-5">
              <span
                className={`absolute inset-x-0 top-0 h-px bg-current transition-transform duration-base ${open ? "translate-y-[5px] rotate-45" : ""}`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-base ${open ? "-translate-y-[4px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Panel. Rendered only when open so nothing is reachable behind it. */}
      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="on-olive panel-in fixed inset-x-0 bottom-0 z-50 overflow-y-auto xl:hidden"
          style={{ top: "var(--header-h, 72px)" }}
        >
          <nav aria-label="Main" className="wrap flex min-h-full flex-col pb-10 pt-8">
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={close}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className="block py-2 text-[46px] font-[260] leading-[1.05] tracking-[-0.02em] [font-variation-settings:'SOFT'_50] aria-[current=page]:text-matcha sm:text-[56px]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto grid gap-8 pt-12 sm:grid-cols-2">
              <div>
                <p className="t-caps">Find us</p>
                <a
                  href={site.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event="directions_click"
                  data-event-location="mobile_nav"
                  className="mt-3 block text-[17px] leading-snug"
                >
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                </a>
                <p className="t-note mt-3">
                  <OpenStatus fallback="Open 7 AM, every day" />
                </p>
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="t-caps">Say hello</p>
                <a
                  href={site.phone.href}
                  data-event="phone_click"
                  data-event-location="mobile_nav"
                  className="mt-2 inline-flex min-h-11 items-center text-[17px] tabular-nums"
                >
                  {site.phone.display}
                </a>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event="instagram_click"
                  data-event-location="mobile_nav"
                  className="inline-flex min-h-11 items-center text-[17px]"
                >
                  Instagram {site.instagram.handle}
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
