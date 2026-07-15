const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const html = fs.readFileSync(path.join(root, "invoice-check.html"), "utf8");
const css = fs.readFileSync(path.join(root, "invoice-check.css"), "utf8");
const runtime = require("./invoice-check.js");

test("invoice review owns a dedicated audit runtime", () => {
  assert.match(html, /invoice-check\.css/);
  assert.match(html, /invoice-check\.js/);
  assert.doesNotMatch(html, /app\.js/);
});

test("batch metrics are driven by invoice audit states", () => {
  const metrics = runtime.calculateBatchMetrics(runtime.INVOICES);
  assert.deepEqual(metrics, { total: 6, exceptions: 4, pending: 1, passed: 1, amount: 76520 });
});

test("duplicate invoices are blocked from direct approval", () => {
  assert.equal(runtime.canApprove(runtime.INVOICES.find(item => item.id === "duplicate")), false);
  assert.equal(runtime.canApprove(runtime.INVOICES.find(item => item.id === "passed")), true);
});

test("field confirmation resolves only the selected field issue", () => {
  const invoice = runtime.INVOICES.find(item => item.id === "low-confidence");
  const next = runtime.confirmField(invoice, "number", "044032600211");
  assert.equal(next.fields.find(field => field.id === "number").status, "confirmed");
  assert.equal(next.fields.find(field => field.id === "sellerTaxNo").status, "low");
});

test("queue filters preserve professional audit groupings", () => {
  assert.equal(runtime.filterInvoices(runtime.INVOICES, "exception").length, 4);
  assert.equal(runtime.filterInvoices(runtime.INVOICES, "pending").length, 1);
  assert.equal(runtime.filterInvoices(runtime.INVOICES, "passed").length, 1);
});

test("audit workbench has a distinct desktop and mobile layout", () => {
  assert.match(css, /grid-template-columns:\s*278px\s+minmax\(420px,\s*1fr\)\s+390px/);
  assert.match(css, /@media \(max-width:\s*780px\)/);
  assert.match(css, /\.audit-workbench\s*\{[\s\S]*grid-template-columns:\s*1fr/);
});
