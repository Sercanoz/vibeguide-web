import path from "node:path";
import { fileURLToPath } from "node:url";

// `base` açıkça proje klasörü: Turbopack'in PostCSS worker'ı farklı bir çalışma
// dizininde koşunca Tailwind `@import "tailwindcss"`'i üst klasörde (D:\Projeler)
// arıyordu → "Can't resolve 'tailwindcss' in 'D:\Projeler'".
const projectDir = path.dirname(fileURLToPath(import.meta.url));

const config = {
  plugins: {
    "@tailwindcss/postcss": { base: projectDir },
  },
};

export default config;
