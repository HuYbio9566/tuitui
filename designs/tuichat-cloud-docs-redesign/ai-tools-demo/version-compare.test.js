const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const html = fs.readFileSync(path.join(root, "version-compare.html"), "utf8");
const css = fs.readFileSync(path.join(root, "version-compare.css"), "utf8");
const runtime = require("./version-compare.js");

test("version compare owns a semantic diff runtime", () => {
  assert.match(html, /version-compare\.css/);
  assert.match(html, /version-compare\.js/);
  assert.doesNotMatch(html, /app\.js/);
});

test("diff statistics describe semantic change types", () => {
  assert.deepEqual(runtime.calculateDiffStats(runtime.DIFFS), { total: 8, modified: 4, added: 2, deleted: 2, riskRaised: 3, unresolved: 8 });
});

test("a decision updates only one difference", () => {
  const next = runtime.decideDiff(runtime.DIFFS, "liability", "accepted");
  assert.equal(next.find(item => item.id === "liability").decision, "accepted");
  assert.equal(next.find(item => item.id === "renewal").decision, null);
});

test("merge is blocked while risk-raised differences are unresolved", () => {
  assert.equal(runtime.canGenerateMerge(runtime.DIFFS), false);
  const decided = runtime.DIFFS.map(item => item.riskRaised ? { ...item, decision: "accepted" } : item);
  assert.equal(runtime.canGenerateMerge(decided), true);
});

test("diff filters keep added deleted modified and risk views", () => {
  assert.equal(runtime.filterDiffs(runtime.DIFFS, "added").length, 2);
  assert.equal(runtime.filterDiffs(runtime.DIFFS, "deleted").length, 2);
  assert.equal(runtime.filterDiffs(runtime.DIFFS, "risk").length, 3);
});

test("diff workbench adapts into mobile difference document impact views", () => {
  assert.match(css, /grid-template-columns:\s*270px\s+minmax\(620px,\s*1fr\)\s+340px/);
  assert.match(css, /@media \(max-width:\s*780px\)/);
  assert.match(css, /\.diff-workbench\s*\{[\s\S]*grid-template-columns:\s*1fr/);
});
