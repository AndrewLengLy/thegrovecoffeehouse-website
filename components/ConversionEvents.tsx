"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * One delegated listener for every conversion event on the site.
 *
 * The alternative is turning each link into a client component, which would
 * push a "use client" boundary into the header, the footer, and every section
 * that contains a phone number. This keeps all of that server rendered and
 * costs a single listener. Anything that should be counted carries
 * data-event="<stable_name>".
 */
export function ConversionEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-event]");
      if (!el) return;
      const name = el.dataset.event;
      if (!name) return;
      track(name, el.dataset.eventLocation ? { location: el.dataset.eventLocation } : undefined);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

/** Fires once when a page that counts as a menu view renders. */
export function TrackMenuView({ location }: { location: string }) {
  useEffect(() => {
    track("menu_view", { location });
  }, [location]);
  return null;
}
