import { useId } from "react";

/**
 * The coffee stain from the corner of the menu board in the shop: a cup ring,
 * a splash, a drip and a little spatter, in a thin coffee brown. The edges are
 * roughened with a displacement filter so no two curves look drawn with a
 * compass. Decoration only, hidden from assistive technology.
 */
export function CoffeeStain({ className = "" }: { className?: string }) {
  const id = `stain${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg
      viewBox="0 0 220 160"
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none text-stain ${className}`}
    >
      <defs>
        <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="8" />
        </filter>
      </defs>
      <g filter={`url(#${id})`} fill="currentColor">
        {/* The ring a cup leaves, darker at its rim the way a dried stain is. */}
        <ellipse cx="74" cy="74" rx="46" ry="44" fill="none" stroke="currentColor" strokeWidth="5" opacity="0.3" />
        <ellipse cx="74" cy="74" rx="41" ry="39" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.2" />
        {/* The splash, with a drip running off it. */}
        <path
          opacity="0.34"
          d="M122 38c14-8 34-6 40 6 5 10-4 16 2 26 7 11 25 8 26 20 1 10-14 14-26 10-10-3-15-12-25-8-9 4-6 18-17 20-12 2-16-12-10-22 5-9 16-10 14-20-2-9-15-10-16-19-1-6 5-10 12-13z"
        />
        <path opacity="0.28" d="M160 94c6 10 8 22 5 32-2 6-8 6-9 0-1-9 1-20 4-32z" />
        <circle cx="193" cy="52" r="3.2" opacity="0.42" />
        <circle cx="204" cy="68" r="1.8" opacity="0.4" />
        <circle cx="112" cy="22" r="2.4" opacity="0.38" />
        <circle cx="178" cy="138" r="2" opacity="0.36" />
        <circle cx="136" cy="118" r="1.4" opacity="0.4" />
      </g>
    </svg>
  );
}
