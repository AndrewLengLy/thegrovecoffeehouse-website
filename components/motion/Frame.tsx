"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  /** Sizing and aspect ratio for the frame. */
  className?: string;
  /** How far the photograph drifts inside its frame, in percent each way. 0 for none. */
  drift?: number;
};

/**
 * A photograph in a frame, the way the lodge site sets every image.
 *
 * The first time it scrolls into view the frame opens upward from its bottom
 * edge while the photograph inside settles from a slight zoom. After that the
 * photograph drifts a little against the page as it passes, slower than the
 * scroll, which is what gives the offset pairs their depth.
 *
 * The photograph sits in an inner layer a little taller than the frame, so the
 * drift never shows an edge. Nothing is hidden until JavaScript has run, and
 * under reduced motion nothing moves at all.
 */
export function Frame({ children, className = "", drift = 7 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const inner = el?.querySelector<HTMLElement>("[data-frame-inner]");
      if (!el || !inner) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          },
        );
        gsap.fromTo(
          inner,
          { scale: 1.16 },
          {
            scale: 1,
            duration: 1.8,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          },
        );
        if (drift) {
          gsap.fromTo(
            inner,
            { yPercent: -drift },
            {
              yPercent: drift,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`print ${className}`}>
      <div data-frame-inner className="absolute inset-x-0 -bottom-[10%] -top-[10%]">
        {children}
      </div>
    </div>
  );
}
