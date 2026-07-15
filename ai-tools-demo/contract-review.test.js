const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const html = fs.readFileSync(path.join(root, "contract-review.html"), "utf8");
const css = fs.readFileSync(path.join(root, "contract-review.css"), "utf8");
const runtime = require("./contract-review.js");

test("contract review owns a legal-specific runtime", () => {
  assert.match(html, /contract-review\.css/);
  assert.match(html, /contract-review\.js/);
  assert.doesNotMatch(html, /app\.js/);
});

test("risk counts preserve severity and decision states", () => {
  assert.deepEqual(runtime.calculateRiskCounts(runtime.RISKS), { high: 2, medium: 3, low: 1, unresolved: 6 });
});

test("applying a redline preserves original text and creates a proposed decision", () => {
  const risk = runtime.RISKS.find(item => item.id === "liability");
  const next = runtime.applyRedline(risk);
  assert.equal(next.original, risk.original);
  assert.equal(next.displayText, risk.suggestion);
  assert.equal(next.decision, "proposed");
});

test("review cannot finish while high risks remain unresolved", () => {
  assert.equal(runtime.canCompleteReview(runtime.RISKS), false);
  const resolved = runtime.RISKS.map(item => item.severity === "high" ? { ...item, decision: "accepted" } : item);
  assert.equal(runtime.canCompleteReview(resolved), true);
});

test("risk filters select contract review groupings", () => {
  assert.equal(runtime.filterRisks(runtime.RISKS, "high").length, 2);
  assert.equal(runtime.filterRisks(runtime.RISKS, "medium").length, 3);
  assert.equal(runtime.filterRisks(runtime.RISKS, "all").length, 6);
});

test("legal workbench has distinct desktop and mobile layouts", () => {
  assert.match(css, /grid-template-columns:\s*260px\s+minmax\(520px,\s*1fr\)\s+380px/);
  assert.match(css, /@media \(max-width:\s*780px\)/);
  assert.match(css, /\.legal-workbench\s*\{[\s\S]*grid-template-columns:\s*1fr/);
});
