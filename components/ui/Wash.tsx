import { useId } from "react";

/**
 * The wash of green watercolour the matcha list sits on at the bottom of the
 * menu board. A few overlapping pools of matcha, their edges pushed around by
 * a displacement filter and softened, so it reads as paint that bled rather
 * than a shape. It stretches to whatever box it is placed in, behind the
 * content. Decoration only, hidden from assistive technology.
 */
export function Wash({ className = "" }: { className?: string }) {
  const id = `wash${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg
      viewBox="0 0 400 240"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none text-matcha ${className}`}
    >
      <defs>
        <filter id={id} x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="4" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="46" />
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>
      <g filter={`url(#${id})`} fill="currentColor">
        <ellipse cx="200" cy="122" rx="176" ry="94" opacity="0.42" />
        <ellipse cx="140" cy="96" rx="112" ry="70" opacity="0.24" />
        <ellipse cx="280" cy="152" rx="104" ry="62" opacity="0.2" />
        <ellipse cx="318" cy="70" rx="44" ry="30" opacity="0.22" />
      </g>
    </svg>
  );
}
