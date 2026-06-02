import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";

/**
 * Basit yasal-metin markdown render'ı. Düz string alır:
 *  - "# " → sayfa H1 (ilk satır; ama biz title prop'u veriyoruz, # satırlarını H2 sayarız)
 *  - "## " → bölüm başlığı
 *  - "### " → alt başlık
 *  - "* " veya "- " → liste maddesi
 *  - "---" → ayraç (atlanır)
 *  - "**bold**" ve [text](url) inline render edilir
 * Site ile tutarlı Navbar + MainFooter ekler.
 */

function renderInline(text: string, keyBase: string) {
  // [text](url) ve **bold** — basit, güvenli parse.
  const nodes: React.ReactNode[] = [];
  let rest = text;
  let i = 0;
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/;
  const boldRe = /\*\*([^*]+)\*\*/;

  while (rest.length > 0) {
    const link = linkRe.exec(rest);
    const bold = boldRe.exec(rest);
    // hangisi önce geliyor
    const linkIdx = link ? link.index : Infinity;
    const boldIdx = bold ? bold.index : Infinity;

    if (linkIdx === Infinity && boldIdx === Infinity) {
      nodes.push(rest);
      break;
    }
    if (linkIdx < boldIdx && link) {
      if (link.index > 0) nodes.push(rest.slice(0, link.index));
      const href = link[2];
      nodes.push(
        <a key={`${keyBase}-l${i++}`} href={href} className="text-[#6C4CF1] font-semibold hover:underline">
          {link[1]}
        </a>
      );
      rest = rest.slice(link.index + link[0].length);
    } else if (bold) {
      if (bold.index > 0) nodes.push(rest.slice(0, bold.index));
      nodes.push(<strong key={`${keyBase}-b${i++}`}>{bold[1]}</strong>);
      rest = rest.slice(bold.index + bold[0].length);
    }
  }
  return nodes;
}

export default function LegalMarkdown({
  title,
  subtitle,
  body,
}: {
  title: string;
  subtitle?: string;
  body: string;
}) {
  const lines = body.split("\n");
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];
  let k = 0;

  const flushList = () => {
    if (listItems.length === 0) return;
    const items = [...listItems];
    blocks.push(
      <ul key={`ul${k++}`} className="list-disc pl-5 space-y-1.5 my-3">
        {items.map((it, j) => (
          <li key={j}>{renderInline(it, `li${k}-${j}`)}</li>
        ))}
      </ul>
    );
    listItems = [];
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const t = line.trim();
    if (t === "" ) { flushList(); continue; }
    if (t === "---") { flushList(); continue; }
    if (t.startsWith("### ")) {
      flushList();
      blocks.push(<h3 key={`h3${k++}`} className="font-bold text-[15px] mt-5 mb-1.5 text-[#0A0A0F]">{renderInline(t.slice(4), `h3${k}`)}</h3>);
    } else if (t.startsWith("## ")) {
      flushList();
      blocks.push(<h2 key={`h2${k++}`} className="font-black text-lg mt-8 mb-2 text-[#0A0A0F]">{renderInline(t.slice(3), `h2${k}`)}</h2>);
    } else if (t.startsWith("# ")) {
      flushList();
      blocks.push(<h2 key={`h1${k++}`} className="font-black text-lg mt-8 mb-2 text-[#0A0A0F]">{renderInline(t.slice(2), `h1${k}`)}</h2>);
    } else if (t.startsWith("* ") || t.startsWith("- ")) {
      listItems.push(t.slice(2));
    } else {
      flushList();
      blocks.push(<p key={`p${k++}`} className="my-2">{renderInline(t, `p${k}`)}</p>);
    }
  }
  flushList();

  return (
    <main className="min-h-screen bg-white text-[#0A0A0F]">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 pt-28 pb-16">
        <h1 className="text-3xl font-black mb-2">{title}</h1>
        {subtitle && <p className="text-sm text-neutral-400 mb-10">{subtitle}</p>}
        <div className="text-sm text-neutral-700 leading-7">{blocks}</div>
      </div>
      <MainFooter />
    </main>
  );
}
