"use client";

import { useEffect, useState } from "react";
import { Photo } from "@/components/ui/Photo";

export type Slide = {
  src: string | null;
  alt: string;
  brief: string;
  width: number;
  height: number;
};

/**
 * A print that slowly changes to the next one, the way the reference's opening
 * photograph does. The caller sets the aspect ratio on className.
 *
 * It only cycles once at least two slides have real photographs. Until then it
 * shows the first slot alone, because a cross fade between two empty frames
 * says nothing. It never cycles under reduced motion, and it pauses while the
 * tab is hidden so it does not jump three slides when you come back.
 */
export function Slideshow({
  slides,
  className = "",
  sizes,
  priority = false,
  tone = "light",
  interval = 5200,
}: {
  slides: Slide[];
  className?: string;
  sizes?: string;
  priority?: boolean;
  tone?: "light" | "dark";
  interval?: number;
}) {
  const real = slides.filter((s) => s.src);
  const shown = real.length >= 2 ? real : slides.slice(0, 1);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (shown.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setActive((i) => (i + 1) % shown.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [shown.length, interval]);

  return (
    <div className={`print ${className}`}>
      {shown.map((s, i) => (
        <div
          key={s.brief}
          className="slide absolute inset-0"
          data-active={i === active}
          aria-hidden={i === active ? undefined : true}
        >
          <Photo
            src={s.src}
            fill
            priority={priority && i === 0}
            sizes={sizes}
            width={s.width}
            height={s.height}
            alt={s.alt}
            brief={s.brief}
            tone={tone}
          />
        </div>
      ))}
    </div>
  );
}
