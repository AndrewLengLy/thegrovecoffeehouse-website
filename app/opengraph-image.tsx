/**
 * The Open Graph card, 1200x630, designed rather than auto generated.
 *
 * The two font files in app/_og are static instances pinned out of the Google
 * variable originals with fontTools. Satori cannot resolve variable axes, so
 * handing it a variable file renders nothing at all.
 */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "The Grove Coffee House, a family owned coffee house on Sierra College Blvd in Roseville, California";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [display, body] = await Promise.all([
    readFile(join(process.cwd(), "app/_og/Fraunces-600.ttf")),
    readFile(join(process.cwd(), "app/_og/Inter-400.ttf")),
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
          background: "#FAF7F2",
          padding: "64px 72px",
          fontFamily: "Inter",
          color: "#1C1A17",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#2F5D3F",
              color: "#FAF7F2",
              borderRadius: 999,
              padding: "10px 22px",
              fontSize: 22,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Roseville, California
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #8C7B60",
              color: "#6B6459",
              borderRadius: 999,
              padding: "10px 22px",
              fontSize: 22,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Family owned
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Fraunces",
              fontSize: 118,
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>The Grove</span>
            <span style={{ color: "#2F5D3F" }}>Coffee House</span>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#6B6459" }}>
            Seasonal drinks, real food, and room to stay a while.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "2px solid #DED5C7",
            paddingTop: 28,
            fontSize: 26,
            color: "#1C1A17",
          }}
        >
          <div style={{ display: "flex" }}>9260 Sierra College Blvd STE 100</div>
          <div style={{ display: "flex", color: "#8A4A19" }}>Open 7:00 AM daily</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: display, style: "normal", weight: 600 },
        { name: "Inter", data: body, style: "normal", weight: 400 },
      ],
    },
  );
}
