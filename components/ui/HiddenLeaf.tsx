"use client";

import { useState } from "react";
import { GroveMark } from "@/components/ui/GroveMark";

/**
 * A leaf in the margin that is also a door. Nothing announces it and nothing
 * on the page depends on it being found. It carries an accessible name, so a
 * keyboard or screen reader user is not shut out of it, but no visible label
 * and no tooltip, so the secret survives for everyone looking at the screen.
 */
export function HiddenLeaf({ className = "" }: { className?: string }) {
  const [found, setFound] = useState(false);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setFound((v) => !v)}
        aria-expanded={found}
        aria-controls="grove-note"
        className="relative inline-flex h-11 w-11 items-center justify-center text-doodle transition-transform duration-fast hover:scale-110"
        style={{ transform: found ? "rotate(-12deg) scale(1.1)" : undefined }}
      >
        <span className="sr-only">A note from us</span>
        <GroveMark className="h-6 w-6" />
      </button>

      <div id="grove-note" hidden={!found}>
        {/* TODO(andrew): if the owners want a real line from the family here,
            swap this copy. The only claim it makes is the three years, which
            /our-story states too and their own birthday post confirms. */}
        <p className="mt-3 max-w-[34ch] border border-ink/40 px-5 py-4 text-[17px] italic leading-[1.35]">
          You found the leaf. Thank you for looking closely, and thank you for
          three years of coffee runs. See you at The Grove.
        </p>
      </div>
    </div>
  );
}
