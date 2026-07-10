import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VibeGuide — Tour the world with a real local",
    short_name: "VibeGuide",
    description:
      "Match a real local guide in 60 seconds. VibeNow ⚡ for solo, VibeSquad ✨ for groups.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#6c4cf1",
    icons: [
      // /icon ve /apple-icon route'ları 404 veriyordu — gerçek dosyalar .png uzantılı.
      { src: "/icon.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/vibeguide-icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
