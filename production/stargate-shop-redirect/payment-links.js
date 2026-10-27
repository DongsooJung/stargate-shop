// 결제 URL은 비어 있는 동안 청구되지 않는다.
// SGE-EBOOK-KOI-25는 판매용 PDF(ISBN 979-11-993413-0-2)가 확인되기 전에는 링크를 넣지 않는다.
// 강의·구독·실물·캠프·멘토링 링크도 판매 전에는 비워 둔다.
window.STARGATE_PAYMENTS = {
  provider: "PayPal",
  mode: "setup",
  supportEmail: "support@stargateedu.co.kr",
  links: {
    "SGE-EBOOK-KOI-25": "",
    "SGE-COURSE-KOI-ADV": "",
    "SGE-COURSE-ALGO-BUNDLE": "",
    "SGE-COURSE-KMO-NC": "",
    "SGE-COURSE-KOI-INTRO": "",
    "SGE-SUB-BANK-M": "",
    "SGE-SUB-MOCK-M": "",
    "SGE-BOOK-KOI-INTRO": "",
    "SGE-BOOK-ALGO-V1": "",
    "SGE-BOOK-KOI-PAST-2015-2025": "",
    "SGE-EBOOK-ALGO-SET": "",
    "SGE-BOOK-KMO-NC": "",
    "SGE-LIVE-VACATION-4W": "",
    "SGE-LIVE-KOI-FINAL": "",
    "SGE-CONSULT-STRATEGY-90": "",
    "SGE-MENTOR-M4": ""
  }
};
