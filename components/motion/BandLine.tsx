"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * The rule in a signage band draws itself from the left as the band comes into
 * view. One transform, once, and it makes every section header feel placed
 * rather than pasted. With JavaScript off the CSS never hides it.
 */
export function BandLine() {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(el, {
          scaleX: 1,
          duration: 0.64,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { scaleX: 1 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return <span ref={ref} className="band-line" aria-hidden="true" />;
}
