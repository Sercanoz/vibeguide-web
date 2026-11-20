"use client";

// Kök layout dahil her şey çöktüğünde gösterilir. Hata Sentry'ye gönderilir
// (DSN yoksa Sentry kapalıdır, yalnız bu ekran görünür).
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#fff", color: "#0A0A0F" }}>
        <main style={{ maxWidth: 480, margin: "0 auto", padding: "120px 24px", textAlign: "center" }}>
          <h1 style={{ fontSize: 28, fontWeight: 400, margin: 0 }}>Something went wrong</h1>
          <p style={{ marginTop: 12, color: "#525252", lineHeight: 1.6 }}>
            Please try again. If the problem continues, contact support@vibeguideapp.com.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: 24, height: 44, padding: "0 24px", borderRadius: 999, border: 0, background: "#5B3FD9", color: "#fff", fontSize: 15, cursor: "pointer" }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
