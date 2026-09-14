import Link from "next/link";
import { announcement } from "@/lib/menu";

/**
 * A painted band across the top of the window. It names the drink that is
 * actually on the board and sends people to it. A bar that says nothing may as
 * well not be there.
 */
export function Announcement() {
  return (
    <div className="on-green">
      <div className="wrap flex flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2.5 text-center">
        <p className="t-label" style={{ fontSize: "11px" }}>
          {announcement.line}
        </p>
        <Link
          href={announcement.href}
          className="link-slide t-label inline-flex min-h-[26px] items-center py-1"
          style={{ fontSize: "11px" }}
        >
          {announcement.linkLabel}
        </Link>
      </div>
    </div>
  );
}
