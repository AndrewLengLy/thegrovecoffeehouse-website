"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger, whenFontsReady } from "@/lib/gsap";
import { MenuCard } from "@/components/ui/MenuCard";
import type { MenuItem } from "@/lib/menu";

/**
 * The signature scroll moment. One per page, and this is it.
 *
 * Two behaviours, chosen by viewport:
 *
 *   1024px and up  the section pins and the seasonal lineup scrubs sideways
 *   below 1024px   a native sideways swipe with snap points, a progress rule,
 *                  and previous and next buttons
 *
 * The small screen version used to be a stacked column, which put fourteen
 * cards and roughly three thousand pixels of scrolling between the hero and
 * the rest of the page. A native scroller costs nothing on a mid range phone,
 * shows the next card peeking in so the gesture is obvious, and keeps the page
 * the length it should be.
 *
 * Under reduced motion the pin never engages at any width, so the rail falls
 * back to the native scroller and reads as finished rather than broken.
 */
export function SeasonalRail({ items }: { items: MenuItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({ index: 0, progress: 0, atStart: true, atEnd: false });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /* The pinned horizontal pass. Desktop only, and only when the visitor has
         not asked for less motion. */
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        const viewport = viewportRef.current;
        if (!track || !section || !viewport) return;

        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

        /* A pin with nothing to travel through is a broken pin: the section
           sticks, the visitor scrolls, and nothing happens. If the track already
           fits, or there are too few cards to be worth the pass, fall through to
           the plain reveal below. */
        if (distance() <= 0 || items.length < 4) {
          gsap.set(track.querySelectorAll("[data-rail-item]"), { opacity: 1, y: 0 });
          return;
        }

        section.dataset.pinned = "true";

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none", // a curve on a scrub fights the user's scroll and reads as lag
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        /* Keyboard and screen reader users can land on something that is
           currently translated off screen. Map the focused card back to the
           window scroll position that brings it into view. */
        const onFocusIn = (e: FocusEvent) => {
          const card = (e.target as HTMLElement)?.closest<HTMLElement>("[data-rail-item]");
          const st = tween.scrollTrigger;
          if (!card || !st) return;
          const total = distance();
          if (total <= 0) return;
          const progress = Math.min(1, Math.max(0, card.offsetLeft / total));
          window.scrollTo({ top: st.start + progress * (st.end - st.start), behavior: "auto" });
        };

        track.addEventListener("focusin", onFocusIn);

        whenFontsReady().then(() => ScrollTrigger.refresh());

        return () => {
          track.removeEventListener("focusin", onFocusIn);
          delete section.dataset.pinned;
        };
      });

      /* Below the pin, or under reduced motion, the cards in view arrive with a
         short stagger. Nothing is hidden and nothing waits on a pin. */
      mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        const track = trackRef.current;
        if (!track) return;
        const cards = track.querySelectorAll("[data-rail-item]");
        if (!cards.length) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
          gsap.set(cards, { opacity: 1, x: 0 });
          return;
        }

        gsap.set(cards, { opacity: 0, x: 40 });
        gsap.to(cards, {
          opacity: 1,
          x: 0,
          duration: 0.64,
          ease: "power4.out",
          stagger: { each: 0.09, amount: 0.5 },
          scrollTrigger: { trigger: track, start: "top 85%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [items.length] },
  );

  /* Where the native scroller is. Drives the counter, the progress rule and
     whether each button can do anything. */
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    let frame = 0;
    const measure = () => {
      const max = viewport.scrollWidth - viewport.clientWidth;
      const left = viewport.scrollLeft;
      const cards = Array.from(track.children) as HTMLElement[];
      const origin = cards[0]?.offsetLeft ?? 0;
      let index = 0;
      cards.forEach((c, i) => {
        if (c.offsetLeft - origin <= left + 8) index = i;
      });
      if (max > 0 && left >= max - 4) index = cards.length - 1;
      setPosition({
        index,
        progress: max > 0 ? left / max : 0,
        atStart: left <= 4,
        atEnd: max <= 0 || left >= max - 4,
      });
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    frame = requestAnimationFrame(measure);
    viewport.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const card = track?.children[0] as HTMLElement | undefined;
    if (!viewport || !track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    viewport.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: reduced ? "auto" : "smooth" });
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  /* The full height, vertically centred band only makes sense when the section
     is actually pinned. When the pin is skipped, because the track already fits
     or the visitor asked for less motion, the same styles would leave a screen
     of empty paper above the cards. data-pinned is set by the pin branch above
     and drives that layout from CSS. */
  return (
    <div ref={sectionRef} data-rail-section>
      <div
        ref={viewportRef}
        data-rail-viewport
        /* tabindex and a label make the sideways scroller reachable and
           announced. Below the pin it is a real scroll region, so arrow keys
           move it. */
        tabIndex={0}
        role="group"
        aria-label="Seasonal menu, scroll sideways for more"
        className={[
          "wrap",
          "max-lg:no-scrollbar max-lg:snap-x max-lg:snap-mandatory max-lg:overflow-x-auto",
          "max-lg:overscroll-x-contain max-lg:scroll-px-5 md:max-lg:scroll-px-8",
          "lg:overflow-hidden",
        ].join(" ")}
      >
        <div ref={trackRef} className="flex gap-4 md:gap-6">
          {items.map((item, i) => (
            <div
              key={item.slug}
              data-rail-item
              className="w-[82%] max-w-[340px] shrink-0 snap-start md:w-[330px] md:max-w-none lg:w-[360px]"
            >
              <MenuCard item={item} index={i} />
            </div>
          ))}
        </div>
      </div>

      <div data-rail-controls className="wrap mt-5 flex items-center gap-4 md:mt-6 lg:hidden">
        <p className="t-index shrink-0 tabular-nums text-muted-strong" aria-hidden="true">
          <span className="text-chalk">{pad(position.index + 1)}</span> / {pad(items.length)}
        </p>
        <div className="relative h-[2px] min-w-0 flex-1 bg-line" aria-hidden="true">
          <div
            className="absolute inset-y-0 left-0 w-full origin-left bg-ember"
            style={{ transform: `scaleX(${Math.max(0.04, position.progress)})` }}
          />
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={position.atStart}
            className="inline-flex h-11 w-11 items-center justify-center border-2 border-chalk transition-opacity duration-micro disabled:opacity-30"
          >
            <span className="sr-only">Previous drink</span>
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={position.atEnd}
            className="inline-flex h-11 w-11 items-center justify-center border border-chalk bg-chalk text-ground transition-opacity duration-micro disabled:opacity-30"
          >
            <span className="sr-only">Next drink</span>
            <Chevron dir="right" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path
        d={dir === "left" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="square"
      />
    </svg>
  );
}
