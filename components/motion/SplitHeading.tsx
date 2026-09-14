"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, whenFontsReady } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "p";
  /** Hero headings animate on load. Everything else waits for scroll. */
  onLoad?: boolean;
};

/**
 * Scroll recipe 2, the masked line reveal. Each line sits inside an
 * overflow-hidden wrapper and travels 100% of its own height. It is the single
 * highest value motion pattern available, and it is also the easiest to overuse:
 * the hero headline and one section heading per page, never body copy.
 *
 * aria: "auto" keeps the heading readable to screen readers by labelling the
 * container and hiding the line fragments.
 */
export function SplitHeading({ children, className, as = "h2", onLoad = false }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const Tag = as;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        whenFontsReady().then(() => {
          gsap.set(el, { opacity: 1 });
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            aria: "auto",
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 100,
                duration: 0.9,
                ease: "expo.out",
                stagger: 0.08,
                delay: onLoad ? 0.05 : 0,
                scrollTrigger: onLoad
                  ? undefined
                  : { trigger: el, start: "top 85%", once: true },
              }),
          });
        });
      });

      // No split at all under reduced motion. The heading is simply present.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { opacity: 1 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className} data-split>
      {children}
    </Tag>
  );
}
