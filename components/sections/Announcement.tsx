"use client";

import Link from "next/link";
import { useState } from "react";
import { announcement } from "@/lib/menu";

/**
 * The red strip across the top of every page. One line, set small and in lower
 * case like a note, naming what is on the board and sending people to it.
 *
 * It can be closed. It stays closed for the rest of the visit only: it is the
 * one place the site says what changed this season, so a returning visitor
 * should see it again.
 */
export function Announcement() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <aside aria-label="Announcement" className="on-brick relative">
      <p className="wrap flex min-h-[30px] items-center justify-center px-10 py-1 text-center text-[14px] leading-tight lowercase">
        <Link href={announcement.href} className="inline-flex min-h-6 items-center hover:underline hover:underline-offset-2">
          {announcement.line} {announcement.linkLabel}
        </Link>
      </p>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center md:right-5"
      >
        <span className="sr-only">Close announcement</span>
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" focusable="false">
          <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>
    </aside>
  );
}
