import { ImageResponse } from "next/og";
export const alt =
  "Nestora Interiors — Beautiful Homes, Thoughtfully Designed. Hyderabad.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OG() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#293e33",
        color: "#f3edde",
        padding: "70px",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 23,
          letterSpacing: 7,
          color: "#d4bd89",
        }}
      >
        NESTORA INTERIORS
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 72,
          lineHeight: 1.15,
          marginTop: 45,
        }}
      >
        Beautiful Homes.
      </div>
      <div style={{ display: "flex", fontSize: 72, lineHeight: 1.15 }}>
        Thoughtfully Designed.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 22,
          marginTop: 45,
          color: "#d4bd89",
        }}
      >
        Personalized home interiors · Hyderabad
      </div>
    </div>,
    size,
  );
}
