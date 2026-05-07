import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "VibeGuide — Tour the world with a real local";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #6c4cf1 0%, #8b5cf6 50%, #a78bfa 100%)",
          padding: 80,
          color: "white",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative blob */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.12)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(239,68,68,0.25)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 56 }}>✨</div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 900,
              letterSpacing: -1,
            }}
          >
            VibeGuide
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            gap: 18,
          }}
        >
          <div
            style={{
              fontSize: 84,
              fontWeight: 900,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 980,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Not a tour. A vibe.
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              opacity: 0.92,
              maxWidth: 900,
              lineHeight: 1.3,
              display: "flex",
            }}
          >
            VibeNow ⚡ matches you with a real local in 60 seconds. VibeSquad
            ✨ — roll deep, pay less.
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 16,
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "10px 20px",
                borderRadius: 999,
                display: "flex",
              }}
            >
              📱 vibeguideapp.com
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "10px 20px",
                borderRadius: 999,
                display: "flex",
              }}
            >
              🌍 12+ cities
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "10px 20px",
                borderRadius: 999,
                display: "flex",
              }}
            >
              ⭐ 4.9 from 50K+ travelers
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
