/**
 * Browser-safe payment configuration. Never add a Toss secret key or a
 * Supabase service-role key to this file.
 */
window.STARGATE_TOSS = Object.freeze({
  clientKey: "",
  // PayPal uses a separate Toss USD MID. Leave blank until that client key is issued.
  paypalClientKey: "",
  confirmEndpoint: "https://inftexpcnfinglwlrvsj.supabase.co/functions/v1/toss-confirm",
  supabasePublishableKey: "sb_publishable_-D0A-aWNMTMTHXeL0oqBXg_9Tz0bdvs",
  successUrl: "https://shop.stargateedu.co.kr/success.html",
  failUrl: "https://shop.stargateedu.co.kr/cancel.html",

  // 판매용 PDF 확인 전에는 어떤 SKU도 결제창으로 넘기지 않는다.
  // 전자책 결제를 다시 열 때는 catalog.js의 ebookFileConfirmed를 true로 바꾸고
  // payableSkus와 아래 매핑에 SGE-EBOOK-KOI-25 하나만 넣는다.
  products: Object.freeze({}),

  // PayPal (Toss FOREIGN_EASY_PAY, USD) for payment-list items 1 and 3.
  // Set a positive USD major-unit price before the button can open a charge.
  paypalUsd: Object.freeze({
    "SGE-EBOOK-KOI-25": null,
    "SGE-COURSE-ALGO-BUNDLE": null
  })
});

/**
 * PortOne(포트원) V2 — 브라우저 공개값만 둔다.
 * storeId·channelKey 는 공개되어도 되는 식별자다. V2 API Secret·웹훅 시크릿은
 * Supabase Edge Function Secret(PORTONE_API_SECRET / PORTONE_WEBHOOK_SECRET)에만 둔다.
 * mode "test": 테스트 채널. 결제창에 테스트 안내를 표시하고, 서버는 실결제(LIVE)를 거절·자동취소한다.
 * storeId 가 비어 있으면 PortOne 결제 버튼은 열리지 않는다.
 */
window.STARGATE_PORTONE = Object.freeze({
  mode: "test",
  storeId: "store-a7fa5e25-affe-4807-921e-bb22a82a8e33",
  channelKey: "channel-key-62b62435-7c4a-4a75-a906-9b93a3580d01",
  verifyEndpoint: "https://inftexpcnfinglwlrvsj.supabase.co/functions/v1/portone-verify",
  redirectUrl: "https://shop.stargateedu.co.kr/success.html"
});

window.STARGATE_BUSINESS = Object.freeze({
  companyName: "주식회사 별의문",
  representative: "정동수",
  businessNumber: "848-86-03835",
  mailOrderNumber: "2025-서울강남-05246호",
  address: "서울 강남구 강남대로112길 47",
  phone: "070-8027-8225",
  mobile: "010-9587-8225",
  email: "support@stargateedu.co.kr",
  privacyOfficer: "정동수 (대표)",
  hostingProvider: "GitHub Pages"
});
