import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "VibeGuide — Don't Just Visit Istanbul. Enter It.";
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
          background: "#0A0A0F",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Purple ambient glow top-left */}
        <div style={{
          position: "absolute", top: -160, left: -160,
          width: 640, height: 640, borderRadius: "50%",
          background: "rgba(108,76,241,0.35)",
          filter: "blur(120px)", display: "flex",
        }} />
        {/* Pink glow bottom-right */}
        <div style={{
          position: "absolute", bottom: -120, right: -80,
          width: 480, height: 480, borderRadius: "50%",
          background: "rgba(236,72,153,0.2)",
          filter: "blur(100px)", display: "flex",
        }} />

        {/* Left content */}
        <div style={{
          display: "flex", flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px", flex: 1, position: "relative", zIndex: 1,
        }}>
          {/* Logo row */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: "linear-gradient(135deg,#6C4CF1,#8B5CF6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26,
            }}>🧭</div>
            <div style={{
              fontSize: 32, fontWeight: 900, color: "white",
              letterSpacing: -1,
            }}>VibeGuide</div>
            <div style={{
              marginLeft: 12,
              background: "rgba(16,185,129,0.15)",
              border: "1px solid rgba(16,185,129,0.4)",
              borderRadius: 999, padding: "4px 14px",
              fontSize: 14, fontWeight: 700, color: "#10B981",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "#10B981", display: "flex",
              }} />
              Live in Turkey
            </div>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{
              fontSize: 76, fontWeight: 900, lineHeight: 1.0,
              letterSpacing: -3, color: "white",
              display: "flex", flexDirection: "column",
            }}>
              <span>Don't Just Visit</span>
              <span style={{
                background: "linear-gradient(90deg,#6C4CF1,#8B5CF6,#EC4899)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}>Istanbul.</span>
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 68 }}>Enter It.</span>
            </div>

            {/* Sub */}
            <div style={{
              fontSize: 22, color: "rgba(255,255,255,0.45)",
              fontWeight: 500, maxWidth: 520, lineHeight: 1.5,
              display: "flex",
            }}>
              Verified local guides · Instant matching · No tourist traps
            </div>
          </div>

          {/* Bottom pills */}
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { icon: "⚡", label: "VibeNow · 60s match" },
              { icon: "👥", label: "VibeSquad · Group tours" },
              { icon: "📅", label: "Private tours" },
            ].map((p) => (
              <div key={p.label} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 999, padding: "10px 20px",
                fontSize: 17, fontWeight: 700, color: "rgba(255,255,255,0.7)",
              }}>
                <span>{p.icon}</span>
                <span>{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — phone-like card */}
        <div style={{
          width: 320, display: "flex", flexDirection: "column",
          justifyContent: "center", padding: "48px 48px 48px 0",
          position: "relative", zIndex: 1,
        }}>
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 28, padding: "28px 24px",
            display: "flex", flexDirection: "column", gap: 14,
          }}>
            {/* Cities */}
            {[
              { flag: "🇹🇷", city: "Istanbul", status: "24 guides online", col: "#6C4CF1" },
              { flag: "🎈", city: "Cappadocia", status: "12 guides online", col: "#10B981" },
              { flag: "🏛️", city: "Ephesus", status: "8 guides online", col: "#F59E0B" },
            ].map((c) => (
              <div key={c.city} style={{
                display: "flex", alignItems: "center", gap: 12,
                background: "rgba(255,255,255,0.04)",
                borderRadius: 16, padding: "12px 14px",
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: `${c.col}22`,
                  border: `1px solid ${c.col}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20,
                }}>{c.flag}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "white" }}>{c.city}</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>{c.status}</span>
                </div>
                <div style={{
                  marginLeft: "auto",
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#10B981", display: "flex",
                }} />
              </div>
            ))}

            {/* Rating */}
            <div style={{
              marginTop: 4,
              display: "flex", justifyContent: "space-between",
              padding: "14px 16px",
              background: "linear-gradient(135deg,rgba(108,76,241,0.2),rgba(139,92,246,0.1))",
              border: "1px solid rgba(108,76,241,0.3)",
              borderRadius: 16,
            }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: "white" }}>4.9★</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>Rating</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: "white" }}>60s</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>Match time</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: "white" }}>100%</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
