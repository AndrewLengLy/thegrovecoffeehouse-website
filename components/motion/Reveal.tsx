"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, whenFontsReady } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Tall sections fire too early at the default threshold. */
  late?: boolean;
  as?: "div" | "section" | "ul" | "ol" | "dl";
  /** Above the fold: run on load instead of on scroll. */
  onLoad?: boolean;
  /** Travel in px. 24 for cards and blocks, 16 for copy, 8 for small UI. */
  travel?: 24 | 16 | 8;
  /** Stagger per child in seconds. Cards 0.09, rows 0.06, small UI 0.05. */
  each?: 0.09 | 0.06 | 0.05;
};

/**
 * Scroll recipe 1, the workhorse. Staggers this element's direct children in as
 * the visitor reaches them, or on load for anything above the fold. Content
 * stays server rendered: this wrapper only animates children it is handed.
 */
export function Reveal({
  children,
  className,
  late = false,
  as = "div",
  onLoad = false,
  travel = 24,
  each = 0.09,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as "div";

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = Array.from(el.children);
      if (targets.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(targets, { y: travel, opacity: 0 });
        whenFontsReady().then(() => {
          gsap.to(targets, {
            y: 0,
            opacity: 1,
            duration: onLoad ? 0.4 : 0.64,
            ease: "power4.out",
            delay: onLoad ? 0.1 : 0,
            stagger: { each, amount: 0.6 },
            scrollTrigger: onLoad
              ? undefined
              : { trigger: el, start: late ? "top 70%" : "top 85%", once: true },
          });
          if (!onLoad) ScrollTrigger.refresh();
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(targets, { y: 0, opacity: 1 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={className} data-reveal-group>
      {children}
    </Tag>
  );
}
