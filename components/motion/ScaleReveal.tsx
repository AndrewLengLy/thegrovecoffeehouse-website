"use client";

import { useRef } from "react";
import { gsap, useGSAP, whenFontsReady } from "@/lib/gsap";

/**
 * Scroll recipe 3, the image scale reveal. Photography arrives by settling from
 * 1.06 to 1 rather than sliding, because scale reads better than translate on
 * imagery. The wrapper clips, so nothing pushes layout. Under reduced motion it
 * is a plain fade.
 */
export function ScaleReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = ref.current;
      const img = wrap?.firstElementChild as HTMLElement | null;
      if (!wrap || !img) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(img, { scale: 1.06, opacity: 0, willChange: "transform, opacity" });
        whenFontsReady().then(() => {
          gsap.to(img, {
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "power4.out",
            scrollTrigger: { trigger: wrap, start: "top 85%", once: true },
            onComplete: () => gsap.set(img, { clearProps: "will-change" }),
          });
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(img, { scale: 1, opacity: 0 });
        gsap.to(img, {
          opacity: 1,
          duration: 0.2,
          scrollTrigger: { trigger: wrap, start: "top 85%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`relative h-full w-full overflow-hidden ${className}`}>
      <div className="relative h-full w-full" data-reveal>
        {children}
      </div>
    </div>
  );
}
