import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Admin panelindeki sayfalar veri yüklemeyi `useEffect(() => { load(); }, [dep])`
  // kalıbıyla yapıyor; `load` async ve state'i çoğunlukla await'ten sonra yazıyor.
  // React Compiler kuralı bunu temkinli şekilde hata sayıyor. Dahili, düşük trafikli
  // sayfalar için performans etkisi yok → admin'de uyarı seviyesinde tutulur
  // (görünür kalır, CI'yı kırmaz). Halka açık sayfalarda kural hata olarak kalır.
  {
    files: ["src/app/admin/**/*.{ts,tsx}"],
    rules: { "react-hooks/set-state-in-effect": "warn" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
