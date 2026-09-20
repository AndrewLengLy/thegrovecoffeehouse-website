/**
 * The Open Graph card, 1200x630, designed rather than auto generated.
 *
 * The font files in app/_og are static instances pinned out of the originals
 * with fontTools. Satori cannot resolve variable axes, so handing it a variable
 * file renders nothing at all: BigShoulders-800.ttf is the wght 800 instance
 * pinned from the variable original, and IBMPlexMono-500.ttf is the static
 * Medium decompressed out of its woff2. Both are the same latin subsets
 * next/font already serves to the browser, so the card is set in exactly the
 * faces the site is set in.
 */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "The Grove Coffee House, a family owned coffee house on Sierra College Blvd in Roseville, California";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The site's sprout, the same geometry as GroveMark and the app icon, drawn at
   the 24 unit viewBox those use. Satori renders plain paths and transforms. */
function Sprout({ size: s, color }: { size: number; color: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24">
      <path d="M12 21.5V10.5" stroke={color} strokeWidth="1.9" strokeLinecap="round" fill="none" />
      <g transform="translate(16.5 9.5) rotate(-38)">
        <path d="M-6 0Q0 -4.3 6 0Q0 4.3 -6 0Z" fill={color} />
      </g>
      <g transform="translate(7.6 13.6) rotate(38)">
        <path d="M-5 0Q0 -3.6 5 0Q0 3.6 -5 0Z" fill={color} />
      </g>
    </svg>
  );
}

export default async function OpengraphImage() {
  const [display, mono] = await Promise.all([
    readFile(join(process.cwd(), "app/_og/BigShoulders-800.ttf")),
    readFile(join(process.cwd(), "app/_og/IBMPlexMono-500.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1F1E1B",
          padding: "58px 68px",
          fontFamily: "PlexMono",
          color: "#E8E4DC",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#E08A3C",
              color: "#141310",
              padding: "9px 18px",
              fontSize: 20,
              letterSpacing: "0.12em",
            }}
          >
            ROSEVILLE, CALIFORNIA
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #7A7264",
              color: "#B8B0A1",
              padding: "9px 18px",
              fontSize: 20,
              letterSpacing: "0.12em",
            }}
          >
            FAMILY OWNED
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* The fascia, set the way the header sets it: condensed, uppercase,
              tight. Two lines, because on one this runs 9.5755 times the font
              size and a card 1064 units wide would have to drop to 101 to hold
              it. Stacked, the limit is "COFFEE HOUSE" at 5.1477, so 128 has
              room to spare and the sprout gets the end of the first line. */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "BigShoulders",
              fontSize: 128,
              lineHeight: 0.86,
              letterSpacing: "-0.02em",
            }}
          >
            THE GROVE
            <div style={{ display: "flex", marginLeft: 20 }}>
              <Sprout size={76} color="#E08A3C" />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "BigShoulders",
              fontSize: 128,
              lineHeight: 0.86,
              letterSpacing: "-0.02em",
            }}
          >
            COFFEE HOUSE
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 26,
              color: "#A49B8B",
              letterSpacing: "-0.01em",
            }}
          >
            Seasonal drinks, real food, and room to stay a while.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #3A372F",
            paddingTop: 24,
            fontSize: 22,
            letterSpacing: "0.1em",
            color: "#E8E4DC",
          }}
        >
          <div style={{ display: "flex" }}>9260 SIERRA COLLEGE BLVD STE 100</div>
          <div style={{ display: "flex", color: "#E08A3C" }}>OPEN 7:00 AM DAILY</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "BigShoulders", data: display, style: "normal", weight: 800 },
        { name: "PlexMono", data: mono, style: "normal", weight: 500 },
      ],
    },
  );
}
