"use client";

import { useCurrency } from "./CurrencyProvider";

/**
 * Fiyat gösterimi. Seçili para baz ile aynıysa (veya kur hazır değilse) mevcut
 * "1500 TRY" görünümü korunur — hiçbir şey bozulmaz. Aksi halde "≈ €38".
 * Fragment döndürür, çağıranın stilini (span/class) etkilemez.
 */
export default function Price({
  amount,
  currency = "TRY",
}: {
  amount: number;
  currency?: string;
}) {
  const { display } = useCurrency();
  const conv = display(amount, currency);
  return <>{conv ? `≈ ${conv}` : `${amount} ${currency}`}</>;
}
