// GA4 olayları — rezervasyon hunisi (hangi adımda vazgeçiliyor?).
// gtag public/vg-init.js'te tanımlı; consent mode varsayılan "denied" → kullanıcı
// çerezleri kabul etmeden GA çerezsiz ping gönderir, kişisel veri yok.
// Olay adları mümkünse GA4 önerilenleri (view_item, begin_checkout, add_payment_info,
// purchase); huniye özgü adımlar özel ad. Parametrelere PII KOYMA (ad, e-posta, telefon).

type Params = Record<string, string | number | boolean | undefined | object[]>;

export function track(event: string, params: Params = {}): void {
  try {
    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    w.gtag?.("event", event, params);
  } catch {
    /* analytics asla akışı bozmamalı */
  }
}

/** GA4 e-ticaret "items" dizisi için tur özeti. */
export function tourItem(t: { id: number; title: string; category?: string; basePrice?: number; city?: string }, price?: number) {
  return {
    item_id: String(t.id),
    item_name: t.title,
    item_category: t.category ?? "tour",
    item_variant: t.city,
    price: price ?? t.basePrice,
  };
}
