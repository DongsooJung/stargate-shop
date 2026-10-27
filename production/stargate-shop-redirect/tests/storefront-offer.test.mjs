import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);

function loadCatalog() {
  const window = {};
  vm.runInNewContext(readFileSync(new URL("catalog.js", root), "utf8"), { window });
  return window.STARGATE_CATALOG;
}

test("ebook payment stays closed until the sale file is confirmed", () => {
  const catalog = loadCatalog();
  assert.equal(catalog.commerce.ebookFileConfirmed, false);
  assert.equal(catalog.commerce.ebookSku, "SGE-EBOOK-KOI-25");
  assert.deepEqual([...catalog.commerce.payableSkus], []);
  assert.equal(catalog.availability["ebook-koi-25"], "file_unconfirmed");
  assert.equal(catalog.products["ebook-koi-25"].sale, "closed-file");
});

test("only the 90-minute consult keeps a public price", () => {
  const catalog = loadCatalog();
  assert.deepEqual([...catalog.commerce.publicPriceSkus], ["SGE-CONSULT-STRATEGY-90"]);
  for (const [id, item] of Object.entries(catalog.products)) {
    assert.notEqual(catalog.availability[id], "request");
    const priced = catalog.commerce.publicPriceSkus.includes(item.sku);
    assert.equal(priced, item.sale === "consult");
    if (item.sale !== "consult") assert.equal(item.sale === "closed-file" || item.sale === "withheld", true);
  }
  assert.equal(catalog.products["subscription-bank-monthly"].sale, "withheld");
  assert.equal(catalog.products["subscription-mock-monthly"].sale, "withheld");
});

test("the browser payment map does not open a charge", () => {
  const window = {};
  vm.runInNewContext(readFileSync(new URL("payment-config.js", root), "utf8"), { window });
  assert.deepEqual({ ...window.STARGATE_TOSS.products }, {});
  vm.runInNewContext(readFileSync(new URL("payment-links.js", root), "utf8"), { window });
  assert.equal(window.STARGATE_PAYMENTS.links["SGE-EBOOK-KOI-25"], "");
});

test("public pages do not advertise unsellable prices or an unconfirmed opening date", () => {
  const banned = ["11월 8", "2026.11.08", "30,000", "39,000", "49,000", "429,000", "690,600", "384,000", "297,000", "752,000", "281,600", "405,000", "구독하기", "checkout.html?sku="];
  for (const name of ["index.html", "en.html", "start.html", "consult.html", "faq.html"]) {
    const html = readFileSync(new URL(name, root), "utf8");
    for (const phrase of banned) assert.equal(html.includes(phrase), false, `${name} still contains ${phrase}`);
  }
  assert.equal(readFileSync(new URL("index.html", root), "utf8").includes("250,000원"), true);
});
