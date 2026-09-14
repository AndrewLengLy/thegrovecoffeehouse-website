"use client";

import { useState } from "react";

/**
 * The "now pouring" band.
 *
 * CSS transform only, duplicated track for a seamless loop, paused on hover and
 * on focus within, and a plain scrollable row under reduced motion so the
 * content stays reachable rather than frozen mid phrase.
 *
 * Most separators are a small dot. Exactly one is a leaf, and the leaf is a
 * door. Nothing announces it and nothing on the page depends on it being found.
 * It carries an accessible name so that a keyboard or screen reader user is not
 * shut out of it, but no visible label and no tooltip, so the secret survives
 * for everyone looking at the screen.
 */

function Dot() {
  return (
    <span aria-hidden="true" className="mx-6 inline-block h-[5px] w-[5px] shrink-0 rotate-45 bg-paper/50 md:mx-8" />
  );
}

function Leaf({ className = "" }: { className?: string }) {
  /* The same sprout as the site mark: a stem with one leaf either side.
     Solid on both leaves so it reads as a plant rather than a tick. */
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      <path d="M12 21.5V10.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" fill="none" />
      <g transform="translate(16.5 9.5) rotate(-38)">
        <path d="M-6 0Q0 -4.3 6 0Q0 4.3 -6 0Z" fill="currentColor" />
      </g>
      <g transform="translate(7.6 13.6) rotate(38)">
        <path d="M-5 0Q0 -3.6 5 0Q0 3.6 -5 0Z" fill="currentColor" />
      </g>
    </svg>
  );
}

export function Marquee({ phrases }: { phrases: string[] }) {
  const [found, setFound] = useState(false);

  const Row = ({ duplicate = false }: { duplicate?: boolean }) => (
    <div className="marquee-row flex shrink-0 items-center" aria-hidden={duplicate ? "true" : undefined}>
      {phrases.map((p, i) => (
        <span key={p} className="marquee-item flex shrink-0 items-center">
          <span className="t-label whitespace-nowrap text-paper" style={{ fontSize: "13px" }}>{p}</span>
          {/* One leaf per loop, and it is the only one that does anything. */}
          {i === 1 && !duplicate ? (
            <button
              type="button"
              onClick={() => setFound((v) => !v)}
              aria-expanded={found}
              aria-controls="grove-note"
              /* relative so the visually hidden label cannot escape into the
                 page and widen the document from inside the wide track */
              className="relative mx-5 inline-flex h-11 w-11 items-center justify-center rounded-full text-paper transition-transform duration-fast ease-out-back hover:scale-110 md:mx-7"
              style={{ transform: found ? "rotate(-12deg) scale(1.1)" : undefined }}
            >
              <span className="sr-only">A note from the grove</span>
              <Leaf />
            </button>
          ) : i === 1 ? (
            <span className="mx-5 inline-flex h-11 w-11 items-center justify-center text-paper md:mx-7">
              <Leaf />
            </span>
          ) : (
            <Dot />
          )}
        </span>
      ))}
    </div>
  );

  return (
    <section aria-label="Now pouring" className="on-ink border-y-2 border-ink py-3.5">
      <h2 className="sr-only">Now pouring</h2>
      <div className="marquee">
        <div className="marquee-track">
          <Row />
          <Row duplicate />
        </div>
      </div>

      {/* The reward. Small, warm, and entirely optional. */}
      <div
        id="grove-note"
        hidden={!found}
        className="wrap"
      >
        <p className="mx-auto mt-4 max-w-[46ch] border-2 border-paper bg-paper px-6 py-5 text-center text-[17px] leading-[1.5] text-ink">
          {/* TODO(andrew): if the owners want a real line from the family here,
              swap this copy. It makes no factual claim as written. */}
          A grove is a small stand of trees that somebody planted on purpose, then
          kept. Thanks for looking closely.
        </p>
      </div>
    </section>
  );
}
