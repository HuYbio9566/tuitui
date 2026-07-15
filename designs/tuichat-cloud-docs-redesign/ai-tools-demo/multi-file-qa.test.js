const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const html = fs.readFileSync(path.join(root, "multi-file-qa.html"), "utf8");
const css = fs.readFileSync(path.join(root, "multi-file-qa.css"), "utf8");
const runtime = require("./multi-file-qa.js");

test("multi-file QA owns a dedicated runtime", () => {
  assert.match(html, /multi-file-qa\.css/);
  assert.match(html, /multi-file-qa\.js/);
  assert.doesNotMatch(html, /app\.js/);
});

test("answers are constrained to the selected source scope", () => {
  const answer = runtime.buildGroundedAnswer("compare", ["plan", "budget"]);
  assert.equal(answer.status, "grounded");
  assert.deepEqual(answer.usedSourceIds, ["plan", "budget"]);
  assert.ok(answer.citations.length >= 2);
});

test("the product refuses claims outside the source set", () => {
  const answer = runtime.buildGroundedAnswer("outside", ["plan", "budget"]);
  assert.equal(answer.status, "insufficient");
  assert.match(answer.summary, /不足以回答/);
});

test("conflicting sources produce an explicit review state", () => {
  const answer = runtime.buildGroundedAnswer("conflict", ["plan", "minutes"]);
  assert.equal(answer.status, "conflict");
  assert.equal(answer.conflicts.length, 1);
});

test("source selection cannot silently become empty", () => {
  assert.deepEqual(runtime.toggleSourceScope(["plan"], "plan"), ["plan"]);
  assert.deepEqual(runtime.toggleSourceScope(["plan", "budget"], "plan"), ["budget"]);
});

test("answers can be transformed into distinct deliverables", () => {
  assert.equal(runtime.transformAnswer("comparison").title, "方案对比表");
  assert.equal(runtime.transformAnswer("brief").title, "决策简报");
  assert.equal(runtime.transformAnswer("faq").title, "项目 FAQ");
});

test("three-pane workspace collapses for narrow screens", () => {
  assert.match(css, /grid-template-columns:\s*260px\s+minmax\(0,\s*1fr\)\s+320px/);
  assert.match(css, /@media \(max-width:\s*760px\)/);
  assert.match(css, /\.qa-workspace\s*\{[\s\S]*grid-template-columns:\s*1fr/);
});

test("entry panel collapses source scope and anchors the composer below quiet shortcuts", () => {
  const source = fs.readFileSync(path.join(root, "multi-file-qa.js"), "utf8");
  assert.match(source, /<details class="launch-scope">[\s\S]*<summary class="launch-heading">/);
  assert.ok(source.indexOf('class="quick-asks"') < source.indexOf('class="start-composer"'));
  assert.match(css, /\.launch-panel\s*\{[\s\S]*display:\s*flex;[\s\S]*flex-direction:\s*column;/);
  assert.match(css, /\.quick-asks\s*\{[\s\S]*margin-top:\s*auto;/);
  assert.match(css, /\.quick-asks > button\s*\{[\s\S]*min-height:\s*26px;/);
});
