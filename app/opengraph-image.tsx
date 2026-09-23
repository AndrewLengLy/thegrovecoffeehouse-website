/**
 * The Open Graph card, 1200x630, designed rather than auto generated.
 *
 * The font files in app/_og are static instances pinned with fontTools out of
 * the latin subsets next/font already serves to the browser, so the card is set
 * in exactly the faces the site is set in. Satori cannot resolve variable axes,
 * so handing it a variable file renders nothing at all: EB Garamond Italic and
 * Hanken Grotesk are their wght 400 instances, and Courier Prime is static to
 * begin with and only decompressed out of its woff2.
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
const INK = "#5f1e1b";
const BRICK = "#b53530";
const DOODLE = "#c4453e";
const PENCIL = "#a08274";

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

export default async function OpengraphImage() {
  const [serif, mono, grotesk] = await Promise.all([
    readFile(join(process.cwd(), "app/_og/EBGaramond-Italic-400.ttf")),
    readFile(join(process.cwd(), "app/_og/CourierPrime-400.ttf")),
    readFile(join(process.cwd(), "app/_og/HankenGrotesk-400.ttf")),
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                fontFamily: "Garamond",
                fontStyle: "italic",
                fontSize: 170,
                lineHeight: 0.95,
                letterSpacing: "-0.015em",
              }}
            >
              The Grove
              <div style={{ display: "flex", marginLeft: 6, marginTop: 4 }}>
                <Sprout size={64} color={DOODLE} />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 18,
                fontFamily: "Garamond",
                fontStyle: "italic",
                fontSize: 40,
                lineHeight: 1.1,
              }}
            >
              Coffee runs, matcha dates, long mornings.
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 18,
                fontFamily: "Hanken",
                fontSize: 24,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
              }}
            >
              Coffee house, Roseville, California
            </div>
          </div>

          <Cup size={250} />
        </div>

        {/* A pencil rule, then the address in typewriter capitals. */}
        <div style={{ display: "flex", flexDirection: "column", padding: "0 72px 48px" }}>
          <svg width={1056} height={18} viewBox="0 0 1200 24" preserveAspectRatio="none">
            <path
              d="M1 14.5C38 12.2 71 15.8 118 13.9S214 10.6 262 12.8 356 16.9 409 14.2 497 9.8 553 11.6 648 16.4 702 14.1 790 10.3 846 11.9 948 15.8 1003 13.4 1100 10.6 1142 12.6 1186 14.2 1199 13.1"
              fill="none"
              stroke={PENCIL}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
              fontSize: 24,
              textTransform: "uppercase",
            }}
          >
            <div style={{ display: "flex" }}>9260 Sierra College Blvd STE 100</div>
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
        { name: "Garamond", data: serif, style: "italic", weight: 400 },
        { name: "Courier", data: mono, style: "normal", weight: 400 },
        { name: "Hanken", data: grotesk, style: "normal", weight: 400 },
      ],
    },
  );
}
