// VibeGuide rezervasyon modları — SEO + anlatım sayfaları için içerik.
// 3 mod: VibeNow (anlık), VibeSquad (grup), Private (özel tam gün).
// Her biri /vibenow, /vibesquad, /private adresinde ayrı sunucu-render sayfa.
// screenshots: kullanıcı uygulamadan çekip /public/screens/ altına koyunca dolar;
// boşken ekran-görüntüsü bölümü gizli kalır.

import type { Locale } from "./i18n";
import { MODE_CONTENT_I18N, MODE_UI } from "./modes-i18n";

export type ModeStep = { title: string; desc: string };
export type ModeBenefit = { title: string; desc: string };
export type ModeFaq = { q: string; a: string };

// Bir modun çevrilebilir alanları (locale override için).
export type ModeContent = {
  tagline: string;
  heroSub: string;
  steps: ModeStep[];
  benefits: ModeBenefit[];
  faqs: ModeFaq[];
  ctaTitle: string;
};

export type Mode = {
  slug: "vibenow" | "vibesquad" | "private" | "vibeask";
  name: string;
  emoji: string;
  color: string; // marka aksanı (hex)
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  heroSub: string;
  steps: ModeStep[];
  benefits: ModeBenefit[];
  faqs: ModeFaq[];
  ctaTitle: string;
  screenshots: string[]; // /screens/<file> — boşsa bölüm gizli
};

export const MODES: Mode[] = [
  {
    slug: "vibenow",
    name: "VibeNow",
    emoji: "⚡",
    color: "#6C4CF1",
    tagline: "Tap. Match. Go.",
    metaTitle: "VibeNow — Instant Local Tour Guides On Demand",
    metaDescription:
      "VibeNow matches you with a verified local guide in about 60 seconds. No planning, no waiting — open the app, pick a spot and explore with a real local.",
    heroSub:
      "The fastest way to explore. Open the app, choose where you are, and match with a verified local guide nearby — usually in under a minute.",
    steps: [
      { title: "Open the app", desc: "Choose VibeNow and share where you'd like to explore." },
      { title: "Match in ~60s", desc: "A verified guide nearby accepts your request in real time." },
      { title: "Meet your local", desc: "See their location live and meet within minutes." },
      { title: "Explore & pay in-app", desc: "Walk the city with a real local. Pay securely, no cash." },
    ],
    benefits: [
      { title: "No planning needed", desc: "Spontaneous? Just open and go — made for travellers who hate rigid schedules." },
      { title: "Real-time location", desc: "Watch your guide approach on the map, like a ride app for local experts." },
      { title: "Transparent price", desc: "See the price before you confirm. No tourist-trap surprises." },
    ],
    faqs: [
      { q: "How fast is VibeNow really?", a: "Most matches happen in under a minute when guides are online nearby. The app shows who's available before you request." },
      { q: "What if no guide is available?", a: "If nobody's free right now, the app tells you immediately and suggests a VibeSquad group or a Private tour instead." },
      { q: "How do I pay?", a: "Securely in the app — no cash needed, and you see the price up front." },
    ],
    ctaTitle: "Ready to explore right now?",
    screenshots: [],
  },
  {
    slug: "vibesquad",
    name: "VibeSquad",
    emoji: "👥",
    color: "#059669",
    tagline: "Join the squad. Split the cost.",
    metaTitle: "VibeSquad — Affordable Small-Group Local Tours",
    metaDescription:
      "VibeSquad puts you in a small group with travellers on the same route and a verified local guide — the most affordable way to explore a city with a real local.",
    heroSub:
      "Travelling on a budget or love meeting people? Join a small group on the same route, share one local guide, and split the cost.",
    steps: [
      { title: "Pick a squad", desc: "Browse open groups by city and time, or start your own." },
      { title: "Join & split", desc: "A verified local guide leads the group; the cost is shared." },
      { title: "Meet up", desc: "Gather at the meeting point and set off together." },
      { title: "Explore together", desc: "See the city with a real local and fellow travellers." },
    ],
    benefits: [
      { title: "Most affordable", desc: "Sharing one guide makes VibeSquad the cheapest way to explore with a local." },
      { title: "Meet travellers", desc: "Social by design — explore alongside people on the same route." },
      { title: "Still a real local", desc: "No scripted bus tour. A verified local leads every squad." },
    ],
    faqs: [
      { q: "How big is a squad?", a: "Small groups, so the guide can still give everyone attention — not a 50-person bus tour." },
      { q: "Can I start my own squad?", a: "Yes — create a group for a route and time, and other travellers can join you." },
      { q: "Why is it cheaper?", a: "Because the cost of one local guide is shared across the group." },
    ],
    ctaTitle: "Find your squad",
    screenshots: [],
  },
  {
    slug: "private",
    name: "Private Tours",
    emoji: "💎",
    color: "#EC4899",
    tagline: "Your local. Your day.",
    metaTitle: "Private Tours — Your Own Local Guide for a Full Day",
    metaDescription:
      "Book a verified local guide just for you or your group — a full, personalised day in the city. Choose your guide, plan the perfect day, no scripts, no crowds.",
    heroSub:
      "Want it all to yourself? Book a verified local guide for a full day, tailored to exactly what you want to see.",
    steps: [
      { title: "Choose your guide", desc: "Browse verified local guides and pick the right fit." },
      { title: "Plan the day", desc: "Tell them your interests; they craft a personalised route." },
      { title: "Meet & explore", desc: "A full day in the city, just for you or your group." },
      { title: "Pay securely in-app", desc: "One price, agreed up front. No cash, no surprises." },
    ],
    benefits: [
      { title: "Fully personalised", desc: "The day is built around your interests and pace — nobody else's." },
      { title: "Just your group", desc: "Private means private — only you and your guide." },
      { title: "Deepest experience", desc: "More time, more stories, more of the city only locals know." },
    ],
    faqs: [
      { q: "Can I customise the route?", a: "Yes — that's the point. Tell your guide your interests and they plan around them." },
      { q: "Is it good for families?", a: "Ideal — a private guide adapts the pace and content for kids, seniors, anyone." },
      { q: "How far ahead should I book?", a: "Private tours are planned, so book ahead to secure your preferred guide and day." },
    ],
    ctaTitle: "Plan your private day",
    screenshots: [],
  },
  {
    slug: "vibeask",
    name: "VibeAsk",
    emoji: "💡",
    color: "#6C4CF1",
    tagline: "A local in your pocket. Free.",
    metaTitle: "VibeAsk — Ask a Real Local Anything, Free",
    metaDescription:
      "Lost? Curious? Wondering if a price is fair? Message a real, licensed local guide for free — instant answers, no tour required. Only on VibeGuide.",
    heroSub:
      "You don't always need a tour — sometimes you just need a local who actually knows. Ask anything, get a real answer in minutes. Completely free.",
    steps: [
      { title: "Tap VibeAsk", desc: "Right from the home screen — no booking, no commitment." },
      { title: "Ask anything", desc: "“What can I eat nearby?” “How do I get to Topkapı?” “Is this place worth it?” Type it, send a photo, or voice note." },
      { title: "A real local replies", desc: "A verified local guide answers you personally — usually within minutes." },
      { title: "Explore with confidence", desc: "No tourist traps, no guessing. And if you want more, your local can show you in person." },
    ],
    benefits: [
      { title: "Actually free", desc: "No fee, no catch. Ask before you ever book anything. This is how you meet your city." },
      { title: "A real human, not AI", desc: "Not a chatbot. A licensed local who lives there and knows what tourists never find." },
      { title: "Beat the tourist traps", desc: "Check a price, dodge a scam, find the real spot — a local in your corner, instantly." },
    ],
    faqs: [
      { q: "Is VibeAsk really free?", a: "Yes. Ask a local guide anything at no cost — it's our way of welcoming you to the city." },
      { q: "Who answers my questions?", a: "A real, verified local guide — not a bot. Someone who actually lives there and knows it inside out." },
      { q: "What can I ask?", a: "Anything travel-related: food spots, fair prices, directions, what's worth it, what's open, hidden gems — whatever's on your mind." },
      { q: "Do I have to book a tour?", a: "Never. VibeAsk is free help with no strings attached. If you love it, you can always book a tour later — but you don't have to." },
    ],
    ctaTitle: "Ask a local. Free, right now.",
    screenshots: [],
  },
];

const BY_SLUG = new Map<string, Mode>(MODES.map((m) => [m.slug, m]));

export function getMode(slug: string): Mode | undefined {
  return BY_SLUG.get(slug);
}

/** Locale'e göre modun çevrilebilir alanlarını uygular (yoksa en fallback). */
export function localizeMode(mode: Mode, locale: string): Mode {
  const t = MODE_CONTENT_I18N[mode.slug]?.[locale as Locale];
  return t ? { ...mode, ...t } : mode;
}

export function ctaSub(locale: string): string {
  return (MODE_UI[locale as Locale] ?? MODE_UI.en).ctaSub;
}

export const MODE_CTA_SUB = MODE_UI.en.ctaSub;
