"use client";

/**
 * Single GSAP registration point. Plugins register once at module scope so a
 * component never has to think about it, and every animation runs through
 * useGSAP with a scope so ScrollTriggers clean themselves up on unmount. In the
 * App Router, navigation remounts components, and orphaned ScrollTriggers
 * accumulate until scrolling visibly stutters.
 */

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export { gsap, useGSAP, ScrollTrigger, SplitText };

/**
 * Webfonts change line breaking and element positions. Waiting on
 * document.fonts.ready before splitting or measuring avoids both a wrong split
 * and a stale ScrollTrigger position.
 *
 * The race matters: a headline held at opacity 0 while fonts resolve is a
 * direct hit to Largest Contentful Paint. The cap guarantees content appears
 * quickly even on a slow font load, and SplitText autoSplit re-splits correctly
 * if the fonts land afterwards.
 */
export function whenFontsReady(cap = 150): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  const ready = document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve();
  const timeout = new Promise<void>((resolve) => setTimeout(resolve, cap));
  return Promise.race([ready, timeout]);
}

/** True when the visitor has asked for less motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
