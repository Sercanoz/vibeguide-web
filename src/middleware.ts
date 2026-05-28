import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en","tr","de","fr","hr","ro","zh","ru","es","ko","el","ja","bg","sr","it","ar","nl","pl","uk","id","pt"] as const;
type Locale = (typeof LOCALES)[number];

function detectLocale(req: NextRequest): Locale {
  // 1. Cookie
  const cookie = req.cookies.get("vg_locale")?.value;
  if (cookie && (LOCALES as readonly string[]).includes(cookie)) return cookie as Locale;

  // 2. Accept-Language header
  const accept = req.headers.get("accept-language") ?? "";
  for (const part of accept.split(",")) {
    const lang = part.split(";")[0].trim().slice(0, 2).toLowerCase();
    if ((LOCALES as readonly string[]).includes(lang)) return lang as Locale;
  }

  return "en";
}

export function middleware(req: NextRequest) {
  const locale = detectLocale(req);
  const res = NextResponse.next();
  res.headers.set("x-locale", locale);
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|favicon|.*\\..*).*)"],
};
