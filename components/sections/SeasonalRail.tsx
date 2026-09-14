"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, whenFontsReady } from "@/lib/gsap";
import { MenuCard } from "@/components/ui/MenuCard";
import type { MenuItem } from "@/lib/menu";

/**
 * The signature scroll moment. One per page, and this is it.
 *
 * Three behaviours, chosen by viewport, because a pinned horizontal pass is
 * expensive on a mid range Android and confusing on a small screen:
 *
 *   1024px and up  the section pins and the seasonal lineup scrubs sideways
 *   768 to 1023px  a native horizontal scroller with snap points
 *   below 768px    a plain stacked column with a staggered reveal
 *
 * Under reduced motion the pin never engages at any width, so the rail falls
 * back to the native scroller and reads as finished rather than broken.
 */
export function SeasonalRail({ items }: { items: MenuItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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

      /* Below the pin, or under reduced motion, the cards arrive with a plain
         staggered reveal. Nothing is hidden and nothing waits on a pin. */
      mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        const track = trackRef.current;
        if (!track) return;
        const cards = track.querySelectorAll("[data-rail-item]");
        if (!cards.length) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
          gsap.set(cards, { opacity: 1, y: 0 });
          return;
        }

        gsap.set(cards, { opacity: 0, y: 24 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.64,
          ease: "power4.out",
          stagger: { each: 0.09, amount: 0.6 },
          scrollTrigger: { trigger: track, start: "top 85%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [items.length] },
  );

  /* The full height, vertically centred band only makes sense when the section
     is actually pinned. When the pin is skipped, because the track already fits
     or the visitor asked for less motion, the same styles would leave a screen
     of empty paper above the cards. data-pinned is set by the pin branch below
     and drives that layout from CSS. */
  return (
    <div ref={sectionRef} data-rail-section>
      <div
        ref={viewportRef}
        data-rail-viewport
        /* tabindex and a label make the horizontal scroller reachable and
           announced. Below the pin it is a real scroll region. */
        tabIndex={0}
        role="group"
        aria-label="Seasonal menu, scroll sideways for more"
        className={[
          "wrap",
          "max-lg:snap-x max-lg:snap-mandatory",
          "max-md:overflow-visible md:max-lg:overflow-x-auto",
          "lg:overflow-hidden",
        ].join(" ")}
      >
        <div
          ref={trackRef}
          className={[
            "flex flex-col gap-5",
            "md:flex-row md:gap-6",
            "md:pb-4", // room for the scrollbar on the native scroller
          ].join(" ")}
        >
          {items.map((item, i) => (
            <div
              key={item.slug}
              data-rail-item
              className="w-full shrink-0 snap-start md:w-[330px] lg:w-[360px]"
            >
              <MenuCard item={item} index={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
