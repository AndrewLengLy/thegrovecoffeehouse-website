/**
 * The Open Graph card, 1200x630, designed rather than auto generated.
 *
 * Set the way the menu board in the shop is set: the name in the green script
 * with its coffee stain and a sketch of beans, the fine print in the board's
 * red typewriter.
 *
 * The font files in app/_og are static TTFs taken with fontTools out of the
 * latin subsets next/font already serves to the browser, so the card is set in
 * exactly the faces the site is set in. Satori cannot resolve variable axes, so
 * handing it a variable file renders nothing at all: EB Garamond Italic is its
 * wght 400 instance, and Damion and Courier Prime are static to begin with and
 * only decompressed out of their woff2.
 */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "The Grove Coffee House, a family owned coffee house on Sierra College Blvd in Roseville, California";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The tokens from globals.css. Satori reads no stylesheet. */
const PAPER = "#f2ecd9";
const INK = "#1f453a";
const GROVE = "#2e7560";
const BRICK = "#b53530";
const BRICK_DEEP = "#9c2b27";
const DOODLE = "#3d8a70";
const PENCIL = "#c9877c";
const STAIN = "#8b5a2b";

/* The cup from components/ui/Doodle.tsx, fully drawn and standing still. */
const CUP = [
  "M30 139C52 146 108 146 130 139",
  "M44 136.5C62 133 98 133 116 136.5",
  "M49 89C50 103 52 118 55 128C56.5 133 60 134.5 66 134.5H95C100.5 134.5 104 133 105.5 128C108 118 110 103 111 89",
  "M49 89C60 95 100 95 111 89C100 84 60 84 49 89Z",
  "M110 98C124 95 128 115 106 121",
  "M53 108C68 111.5 92 111.5 107 108",
  "M80 91C79 80 82 70 80 58C79 52 80 47 81 43",
  "M80.5 67C72 66 63 60 59 50C68 49 77 55 80.5 66",
  "M80.5 57C86 49 95 44 106 43C103 53 93 59 81 58",
  "M63 78C58 71 67 67 62 60",
  "M98 78C93 71 102 67 97 60",
];

function Cup({ size: s }: { size: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 160 160">
      {CUP.map((d) => (
        <path key={d} d={d} fill="none" stroke={DOODLE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      <path d="M84 40a3 3 0 1 1-6 0a3 3 0 1 1 6 0Z" fill={DOODLE} />
    </svg>
  );
}

/* The sketch of beans beside the name on the board, as in Wordmark. */
function Beans({ width }: { width: number }) {
  const bean = (x: number, y: number, r: number) => (
    <g key={`${x}${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
      <ellipse rx="12" ry="8" fill="none" stroke={INK} strokeWidth="1.5" />
      <path d="M-10 1.5C-5 -3.5 4 3.5 10 -1.5" fill="none" stroke={INK} strokeWidth="1.1" strokeLinecap="round" />
    </g>
  );
  return (
    <svg width={width} height={(width * 42) / 64} viewBox="0 0 64 42">
      {[bean(16, 26, -28), bean(36, 13, 14), bean(47, 30, -8)]}
    </svg>
  );
}

/* The board's coffee stain, without the roughening filter Satori cannot run. */
function Stain({ width }: { width: number }) {
  return (
    <svg width={width} height={(width * 160) / 220} viewBox="0 0 220 160">
      <ellipse cx="74" cy="74" rx="46" ry="44" fill="none" stroke={STAIN} strokeWidth="5" opacity="0.28" />
      <ellipse cx="74" cy="74" rx="41" ry="39" fill="none" stroke={STAIN} strokeWidth="1.4" opacity="0.18" />
      <path
        fill={STAIN}
        opacity="0.3"
        d="M122 38c14-8 34-6 40 6 5 10-4 16 2 26 7 11 25 8 26 20 1 10-14 14-26 10-10-3-15-12-25-8-9 4-6 18-17 20-12 2-16-12-10-22 5-9 16-10 14-20-2-9-15-10-16-19-1-6 5-10 12-13z"
      />
      <path fill={STAIN} opacity="0.26" d="M160 94c6 10 8 22 5 32-2 6-8 6-9 0-1-9 1-20 4-32z" />
      <circle cx="193" cy="52" r="3.2" fill={STAIN} opacity="0.4" />
      <circle cx="112" cy="22" r="2.4" fill={STAIN} opacity="0.36" />
    </svg>
  );
}

export default async function OpengraphImage() {
  const [script, serif, mono] = await Promise.all([
    readFile(join(process.cwd(), "app/_og/Damion-400.ttf")),
    readFile(join(process.cwd(), "app/_og/EBGaramond-Italic-400.ttf")),
    readFile(join(process.cwd(), "app/_og/CourierPrime-400.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
          color: INK,
          fontFamily: "Courier",
        }}
      >
        {/* The strip across the top of every page. */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 46,
            background: BRICK,
            color: PAPER,
            fontFamily: "Garamond",
            fontStyle: "italic",
            fontSize: 24,
          }}
        >
          family owned, on Sierra College Blvd in Roseville
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 72px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
            <div style={{ display: "flex", position: "absolute", left: -40, top: -44 }}>
              <Stain width={230} />
            </div>
            {/* Two lines, the way the board sets it. */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Damion",
                fontSize: 112,
                lineHeight: 1,
                color: GROVE,
              }}
            >
              <div style={{ display: "flex" }}>The Grove Coffee</div>
              <div style={{ display: "flex", alignItems: "center", paddingLeft: 150 }}>
                House
                <div style={{ display: "flex", marginLeft: 18, marginTop: 14 }}>
                  <Beans width={96} />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontFamily: "Garamond",
                fontStyle: "italic",
                fontSize: 38,
                lineHeight: 1.1,
              }}
            >
              Coffee runs, matcha dates, long mornings.
            </div>
          </div>

          <Cup size={230} />
        </div>

        {/* A red rule, then the address in the board's typewriter. */}
        <div style={{ display: "flex", flexDirection: "column", padding: "0 72px 48px" }}>
          <div style={{ display: "flex", height: 2, background: PENCIL }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
              fontSize: 24,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <div style={{ display: "flex", color: BRICK_DEEP }}>9260 Sierra College Blvd STE 100</div>
            <div style={{ display: "flex", background: BRICK, color: PAPER, padding: "6px 14px 4px" }}>
              Open 7 AM, every day
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Damion", data: script, style: "normal", weight: 400 },
        { name: "Garamond", data: serif, style: "italic", weight: 400 },
        { name: "Courier", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
