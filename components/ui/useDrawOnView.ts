"use client";

import { useEffect, useRef } from "react";

/**
 * Marks a hand drawn element as drawn the first time it is on screen, which is
 * what starts its line animation in globals.css. One observer per drawing, and
 * it disconnects once it has fired, so a page of doodles costs nothing after
 * the first pass.
 */
export function useDrawOnView<T extends Element>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.setAttribute("data-drawn", "true");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.setAttribute("data-drawn", "true");
        io.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
