/**
 * JSON-LD'yi <script> içine güvenli gömmek için serialize eder.
 *
 * JSON.stringify "<" karakterini kaçırmaz; veri içinde "</script>" geçerse
 * script context'i erken kapanıp DOM XSS oluşabilir. Bu helper "<", ">" ve "&"
 * karakterlerini unicode-escape ederek bunu engeller. Çıktı hâlâ geçerli JSON
 * ve geçerli JSON-LD'dir (Google bunu sorunsuz okur).
 *
 * Kullanım:
 *   <script type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }} />
 */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
