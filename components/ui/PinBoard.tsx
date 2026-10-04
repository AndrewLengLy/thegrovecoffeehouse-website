"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/**
 * Photographs pinned up like prints, each one free to be picked up and moved.
 *
 * Press on a print and it straightens and comes to the front; drag it anywhere
 * inside its section and let go, and it stays where it was put. The move is
 * the CSS `translate` property on the card, which composes with the reveal's
 * transform on the figure and the card's own `rotate`, so none of the three
 * fight over one property.
 *
 * On a touch screen the card allows vertical panning (`touch-action: pan-y`),
 * so a finger dragged up or down still scrolls the page, and one moved sideways
 * picks the print up. The prints are decoration on top of content the page
 * already carries, so they are not keyboard stops.
 */

export type Pin = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Degrees. Each print sits a little crooked, the way it would be pinned. */
  tilt: number;
  caption?: string;
  sizes: string;
  priority?: boolean;
  /** Classes placing the figure: absolute in a collage, or a grid cell. */
  place: string;
};

export function PinBoard({ pins }: { pins: Pin[] }) {
  // Stacking order. The last print touched is on top.
  const [order, setOrder] = useState(() => pins.map((_, i) => i));
  const lift = (i: number) =>
    setOrder((o) => (o[o.length - 1] === i ? o : [...o.filter((x) => x !== i), i]));

  return (
    <>
      {pins.map((p, i) => (
        <DragPrint key={p.src} p={p} z={10 + order.indexOf(i)} onLift={() => lift(i)} />
      ))}
    </>
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
    <figure className={p.place} style={{ zIndex: z }}>
      <div
        ref={card}
        data-pin
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        style={{ ["--tilt" as string]: held ? "0deg" : `${p.tilt}deg` }}
        className={
          "relative touch-pan-y select-none bg-paper p-2 transition-[rotate,scale,box-shadow] duration-base ease-out-quart sm:p-2.5 " +
          "rotate-[var(--tilt)] " +
          (held
            ? "scale-[1.05] cursor-grabbing shadow-[0_34px_50px_-14px_rgb(0_0_0/0.6)]"
            : "cursor-grab shadow-[0_22px_40px_-14px_rgb(0_0_0/0.55)] lg:hover:scale-[1.02]")
        }
      >
        {/* A strip of tape holding it up. */}
        <span
          aria-hidden="true"
          className="absolute -top-3 left-1/2 z-10 h-6 w-16 -translate-x-1/2 -rotate-3 bg-matcha/70 mix-blend-multiply sm:w-20"
        />
        <div className="relative overflow-hidden" style={{ aspectRatio: `${p.width} / ${p.height}` }}>
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
          <figcaption className="px-1 pt-1.5 font-[family-name:var(--font-script)] text-[20px] leading-none text-grove sm:text-[24px]">
            {p.caption}
          </figcaption>
        )}
      </div>
    </figure>
  );
}
