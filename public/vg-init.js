// gtag consent + init + auth-flash — statik dosya (inline script yerine).
// Inline script kaldırılınca CSP nonce'a gerek kalmaz → layout statik render edilir
// (SEO: tüm site CDN cache, hızlı crawl). Bu dosya self-host, script-src 'self' ile izinli.
(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied' });
  gtag('js', new Date());
  gtag('config', 'G-SH98TTW4KS');
  try {
    if (localStorage.getItem('vg_cookie_consent') === 'accepted') {
      gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  } catch (e) {}
  // Auth flash önleme: paint öncesi <html data-authed="1">
  try {
    if (localStorage.getItem('vg_authed') === '1') {
      document.documentElement.setAttribute('data-authed', '1');
    }
  } catch (e) {}
})();
