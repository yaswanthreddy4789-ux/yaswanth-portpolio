import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#070707",
          color: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
          {site.initials}
          <span style={{ color: "#c8ff2e" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
          <span>Building Digital</span>
          <span>Experiences</span>
          <span style={{ color: "#c8ff2e" }}>That Perform.</span>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#9d9d9d" }}>
          {`${site.name} · ${site.title}`}
        </div>
      </div>
    ),
    size,
  );
}
