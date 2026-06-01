import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "VibeGuide — Local tour guides in Turkey";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-end", background: "linear-gradient(135deg, #0A0A0F 0%, #1a1030 50%, #0A0A0F 100%)", padding: "64px", fontFamily: "sans-serif" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 600, height: 600, background: "radial-gradient(circle, rgba(108,76,241,0.3) 0%, transparent 70%)", borderRadius: "50%", display: "flex" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(108,76,241,0.2)", border: "1px solid rgba(108,76,241,0.4)", borderRadius: 100, padding: "8px 16px", marginBottom: 24 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
          <span style={{ color: "#A78BFA", fontSize: 16, fontWeight: 700 }}>Istanbul · Cappadocia · Ephesus</span>
        </div>
        <div style={{ fontSize: 64, fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 20, display: "flex", flexDirection: "column" }}>
          <span>Find your vibe.</span>
          <span style={{ color: "#A78BFA" }}>Live the city.</span>
        </div>
        <p style={{ fontSize: 22, color: "rgba(255,255,255,0.5)", margin: 0, maxWidth: 700, lineHeight: 1.5 }}>Verified local guides · Instant matching · Real local experiences</p>
        <div style={{ position: "absolute", bottom: 48, right: 64, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 28, fontWeight: 900, color: "white" }}>VibeGuide 🧭</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
