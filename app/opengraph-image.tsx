/**
 * The Open Graph card, 1200x630, designed rather than auto generated.
 *
 * Set the way the home page opens: the shop's own photograph of the summer
 * lineup against the block wall, taken down at the foot so the words hold,
 * the headline across it in thin capitals stepped line by line, the name in
 * the board's green script up in the corner, and the address in the board's
 * typewriter.
 *
 * The font files in app/_og are static TTFs taken with fontTools out of the
 * latin subsets next/font already serves to the browser, so the card is set in
 * exactly the faces the site is set in. Satori cannot resolve variable axes, so
 * handing it a variable file renders nothing at all: Fraunces is pinned at
 * wght 280, opsz 144 and SOFT 50, the setting of the hero, and Damion and
 * Courier Prime are static to begin with and only decompressed out of their
 * woff2. hero-card.jpg is the hero photograph cropped to the card in advance,
 * so the route reads 80KB rather than the full file.
 */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "The Grove Coffee House, a family owned coffee house on Sierra College Blvd in Roseville, California";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The tokens from globals.css. Satori reads no stylesheet. */
const PAPER = "#f4efe7";
const INK = "#1f453a";

export default async function OpengraphImage() {
  const [script, serif, mono, photo] = await Promise.all([
    readFile(join(process.cwd(), "app/_og/Damion-400.ttf")),
    readFile(join(process.cwd(), "app/_og/Fraunces-280.ttf")),
    readFile(join(process.cwd(), "app/_og/CourierPrime-400.ttf")),
    readFile(join(process.cwd(), "app/_og/hero-card.jpg")),
  ]);
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  const line = (text: string, indent: number) => (
    <div style={{ display: "flex", paddingLeft: indent }}>{text}</div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: INK,
          color: PAPER,
          fontFamily: "Courier",
        }}
      >
        <img src={src} width={1200} height={630} alt="" style={{ position: "absolute", inset: 0 }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(to top, rgba(14,30,24,0.86) 0%, rgba(14,30,24,0.55) 45%, rgba(14,30,24,0.3) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "44px 60px 48px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", fontFamily: "Damion", fontSize: 46, lineHeight: 1 }}>
              The Grove Coffee House
            </div>
            <div style={{ display: "flex", fontSize: 20, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Roseville, California
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Fraunces",
                fontSize: 104,
                lineHeight: 0.92,
                letterSpacing: "-0.025em",
                textTransform: "uppercase",
              }}
            >
              {line("Coffee runs,", 0)}
              {line("matcha dates,", 150)}
              {line("long mornings.", 60)}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 34,
                fontSize: 22,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              <div style={{ display: "flex" }}>9260 Sierra College Blvd STE 100</div>
              <div style={{ display: "flex", background: PAPER, color: INK, padding: "8px 14px 6px", borderRadius: 2 }}>
                Open 7 AM, every day
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Damion", data: script, style: "normal", weight: 400 },
        { name: "Fraunces", data: serif, style: "normal", weight: 300 },
        { name: "Courier", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
