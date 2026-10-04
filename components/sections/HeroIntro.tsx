"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * The hero's opening, and its parallax.
 *
 * The first time the home page opens in a visit it starts as a field of olive,
 * the chairs' colour, with the name in the board's script and a small window of
 * the photograph in the middle, the way the lodge site opens. The window opens
 * out to fill the screen while the photograph settles from a slight zoom, the
 * name lifts away, and the headline rises line by line before the rest fades
 * up. About two and a half seconds, once.
 *
 * The starting states are set in globals.css under `.js-motion:not(.intro-seen)`
 * so they are in place before the first paint, and this only animates out of
 * them. When it finishes it marks the document `intro-seen` and the CSS stops
 * applying. A later visit in the same session gets that class from the head
 * script, so the photograph is simply there.
 *
 * Renders nothing. It finds its hero by walking up from an empty marker.
 */
export function HeroIntro() {
  const marker = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const hero = marker.current?.closest<HTMLElement>("[data-hero]");
    if (!hero) return;

    const root = document.documentElement;
    const windowEl = hero.querySelector<HTMLElement>("[data-hero-window]");
    const image = hero.querySelector<HTMLElement>("[data-hero-image]");
    const mark = hero.querySelector<HTMLElement>("[data-hero-mark]");
    const lines = hero.querySelectorAll<HTMLElement>("[data-hero-line]");
    const fades = hero.querySelectorAll<HTMLElement>("[data-hero-fade]");
    const header = document.querySelector<HTMLElement>(".site-header");

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      /* The photograph drifts slower than the page as the hero scrolls away. */
      if (image) {
        gsap.to(image, {
          yPercent: 14,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
        });
      }

      if (root.classList.contains("intro-seen")) return;
      try {
        sessionStorage.setItem("grove-intro", "1");
      } catch {}

      const done = () => {
        root.classList.add("intro-seen");
        gsap.set([windowEl, mark, ...lines, ...fades, header].filter(Boolean), {
          clearProps: "clipPath,opacity,transform",
        });
      };

      const tl = gsap.timeline({ onComplete: done });
      if (windowEl) {
        tl.fromTo(
          windowEl,
          { clipPath: "inset(30% 37% 30% 37%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" },
          0.45,
        );
      }
      if (image) tl.fromTo(image, { scale: 1.3 }, { scale: 1, duration: 1.7, ease: "expo.inOut" }, 0.45);
      if (mark) tl.to(mark, { opacity: 0, y: -14, duration: 0.5, ease: "power2.in" }, 0.5);
      /* y is pinned to 0 on both ends: GSAP reads the CSS starting state,
         translateY(105%), as a pixel offset, and would otherwise carry it
         through the whole tween and hold the line below its mask. */
      tl.fromTo(
        lines,
        { y: 0, yPercent: 105 },
        { y: 0, yPercent: 0, duration: 1.05, ease: "expo.out", stagger: 0.1 },
        1.25,
      );
      tl.fromTo(
        fades,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08 },
        1.6,
      );
      if (header) tl.fromTo(header, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, 1.55);
    });

    return () => mm.revert();
  });

  return <span ref={marker} hidden />;
}
