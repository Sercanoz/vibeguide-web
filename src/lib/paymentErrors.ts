/**
 * Ödeme ret sebeplerini kullanıcıya anlaşılır İngilizce metne çevirir.
 *
 * NEDEN: TAMİ/banka ret mesajları Türkçe geliyor ve teknik ("Card expiration
 * year cannot be earlier than current year"). Kullanıcı ödemesinin NEDEN
 * reddedildiğini bilmeli — özellikle kendi düzeltebileceği durumlarda
 * (son kullanma tarihi, CVV, bakiye). Aksi halde sessizce booking'e dönüyor
 * ve ne olduğunu anlamıyor.
 *
 * Backend `code` (TAMİ errorCode) + `reason` (akış aşaması) gönderir.
 * Kod eşleşmezse aşamaya göre genel bir metne düşeriz.
 */

/** Banka/TAMİ ret kodu → kullanıcıya gösterilecek metin. */
const CODE_TEXT: Record<string, string> = {
  // Son kullanma tarihi
  expired_card: "Your card has expired. Please check the expiry date or use another card.",
  invalid_expiry: "The expiry date looks incorrect. Please check the month and year.",
  "0054": "Your card has expired. Please check the expiry date or use another card.",
  "0033": "Your card has expired. Please check the expiry date or use another card.",

  // CVV / güvenlik kodu
  invalid_cvv: "The security code (CVV) is incorrect. It's the 3 digits on the back of your card.",
  "0082": "The security code (CVV) is incorrect. It's the 3 digits on the back of your card.",

  // Kart numarası
  invalid_card: "The card number looks incorrect. Please check it and try again.",
  "0014": "The card number looks incorrect. Please check it and try again.",
  "0056": "This card could not be found. Please check the number or use another card.",

  // Bakiye / limit
  insufficient_funds: "There aren't enough funds on this card. Please use another card.",
  "0051": "There aren't enough funds on this card. Please use another card.",
  "0061": "This exceeds your card's transaction limit. Please try a smaller amount or another card.",
  "0065": "This exceeds your card's transaction limit. Please try another card.",

  // Banka reddi
  do_not_honor: "Your bank declined the payment. Please contact your bank or use another card.",
  "0005": "Your bank declined the payment. Please contact your bank or use another card.",
  "0041": "This card cannot be used. Please use another card.",
  "0043": "This card cannot be used. Please use another card.",
  "0057": "This card is not allowed for online payments. Please contact your bank.",
  "0062": "This card is restricted for this type of payment. Please use another card.",

  // 3DS doğrulama
  "3ds_failed": "The 3D Secure verification failed. Please try again and enter the SMS code carefully.",
  md0: "The 3D Secure verification failed. Please try again or use another card.",
  md1: "", // başarılı — buraya düşmemeli
};

/** Akış aşamasına göre yedek metinler (kod yoksa/eşleşmezse). */
const REASON_TEXT: Record<string, string> = {
  declined:
    "The payment was not approved. This is often a wrong expiry date, security code, or an SMS verification that wasn't completed. No charge was made.",
  complete_failed: "The payment could not be completed. No charge was made.",
  complete_error: "Something went wrong finalizing the payment. No charge was made.",
  signature: "We couldn't verify the payment result. No charge was made.",
  mismatch: "This payment didn't match your reservation. No charge was made.",
  notfound: "We couldn't find your reservation. Please try again.",
  orderid: "Invalid payment reference. Please try again.",
};

/**
 * Ödeme hatası için gösterilecek metni döner.
 * @param reason backend'in `reason` parametresi (akış aşaması)
 * @param code   TAMİ/banka ret kodu (varsa)
 * @param fallback hiçbiri eşleşmezse kullanılacak metin
 */
export function paymentErrorText(
  reason?: string | null,
  code?: string | null,
  fallback?: string
): string {
  if (code) {
    const byCode = CODE_TEXT[code] ?? CODE_TEXT[code.toLowerCase()];
    if (byCode) return byCode;
  }
  if (reason) {
    const byReason = REASON_TEXT[reason];
    if (byReason) return byReason;
  }
  return (
    fallback ??
    "The payment could not be completed. Please check your card details and try again."
  );
}
