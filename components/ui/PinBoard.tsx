"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Small prints scattered round a heading, the way the lodge scatters its
 * wildlife round "Preserving Life's Balance", each drifting at its own speed
 * as the page moves. Here they can also be picked up and moved, which is the
 * part that is The Grove's: press on one and it straightens and comes to the
 * front; drag it anywhere inside its section and it stays where it was put.
 *
 * The move is the CSS `translate` property on the card, and the drift is a
 * transform on the figure around it, so the two never fight over one
 * property. On a touch screen the card allows vertical panning
 * (`touch-action: pan-y`), so a finger dragged up or down still scrolls the
 * page, and one moved sideways picks the print up. The prints are decoration
 * on top of content the page already carries, so they are not keyboard stops.
 */

export type Pin = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Degrees. Zero sits square, the lodge's way. */
  tilt?: number;
  /** A word or two under the print, in the board's script. */
  caption?: string;
  sizes: string;
  priority?: boolean;
  /** Classes placing the figure: absolute in a scatter, or a grid cell. */
  place: string;
  /** How far it drifts against the scroll, in px each way. */
  drift?: number;
};

export function PinBoard({ pins }: { pins: Pin[] }) {
  const scope = useRef<HTMLDivElement>(null);
  // Stacking order. The last print touched is on top.
  const [order, setOrder] = useState(() => pins.map((_, i) => i));
  const lift = (i: number) =>
    setOrder((o) => (o[o.length - 1] === i ? o : [...o.filter((x) => x !== i), i]));

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The scatter is packed tighter on a narrow screen, so it drifts less.
        const k = window.innerWidth < 1024 ? 0.35 : 1;
        scope.current?.querySelectorAll<HTMLElement>("[data-drift]").forEach((fig) => {
          const d = (Number(fig.dataset.drift) || 0) * k;
          if (!d) return;
          gsap.fromTo(
            fig,
            { y: d },
            {
              y: -d,
              ease: "none",
              scrollTrigger: { trigger: fig.closest("section") ?? fig, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    /* `contents`, so each figure is placed by the section's own layout. */
    <div ref={scope} className="contents">
      {pins.map((p, i) => (
        <DragPrint key={p.src} p={p} z={10 + order.indexOf(i)} onLift={() => lift(i)} />
      ))}
    </div>
  );
}

type Drag = {
  id: number;
  sx: number;
  sy: number;
  x: number;
  y: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, Math.min(a, b)), Math.max(a, b));

function DragPrint({ p, z, onLift }: { p: Pin; z: number; onLift: () => void }) {
  const card = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const drag = useRef<Drag | null>(null);
  const [held, setHeld] = useState(false);

  function down(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const el = card.current;
    if (!el) return;
    // Kept inside the section it belongs to, so a print can never be lost.
    const bounds = (el.closest("section") ?? document.body).getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const { x, y } = pos.current;
    drag.current = {
      id: e.pointerId,
      sx: e.clientX,
      sy: e.clientY,
      x,
      y,
      minX: x + bounds.left - r.left,
      maxX: x + bounds.right - r.right,
      minY: y + bounds.top - r.top,
      maxY: y + bounds.bottom - r.bottom,
    };
    // Keeps the move coming even if the finger outruns the card. A pointer the
    // browser no longer tracks cannot be captured, and the drag still works.
    try {
      el.setPointerCapture(e.pointerId);
    } catch {}
    setHeld(true);
    onLift();
  }

  function move(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    const el = card.current;
    if (!d || !el || e.pointerId !== d.id) return;
    const x = clamp(d.x + e.clientX - d.sx, d.minX, d.maxX);
    const y = clamp(d.y + e.clientY - d.sy, d.minY, d.maxY);
    pos.current = { x, y };
    el.style.translate = `${x}px ${y}px`;
  }

  function up(e: React.PointerEvent<HTMLDivElement>) {
    if (drag.current?.id !== e.pointerId) return;
    drag.current = null;
    setHeld(false);
  }

  return (
    <figure className={p.place} style={{ zIndex: z }} data-drift={p.drift ?? 0}>
      <div
        ref={card}
        data-pin
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        style={{ ["--tilt" as string]: held ? "0deg" : `${p.tilt ?? 0}deg` }}
        className={
          "relative touch-pan-y select-none transition-[rotate,scale,box-shadow] duration-base ease-out-quart " +
          "rotate-[var(--tilt)] " +
          (held
            ? "scale-[1.06] cursor-grabbing shadow-[0_30px_50px_-18px_rgb(31_69_58/0.45)]"
            : "cursor-grab shadow-none lg:hover:scale-[1.03]")
        }
      >
        <div
          className="print relative overflow-hidden"
          style={{ aspectRatio: `${p.width} / ${p.height}` }}
        >
          <Image
            src={p.src}
            alt={p.alt}
            fill
            priority={p.priority}
            sizes={p.sizes}
            draggable={false}
            className="pointer-events-none object-cover"
          />
        </div>
        {p.caption && (
          <figcaption className="t-script pointer-events-none pt-2 text-[19px] leading-none text-grove sm:text-[21px]">
            {p.caption}
          </figcaption>
        )}
      </div>
    </figure>
  );
}
