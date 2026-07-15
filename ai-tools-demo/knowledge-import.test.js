const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const html = fs.readFileSync(path.join(root, "knowledge-import.html"), "utf8");
const css = fs.readFileSync(path.join(root, "knowledge-import.css"), "utf8");
const runtime = require("./knowledge-import.js");

test("knowledge import owns a governance-specific runtime", () => {
  assert.match(html, /knowledge-import\.css/);
  assert.match(html, /knowledge-import\.js/);
  assert.doesNotMatch(html, /app\.js/);
});

test("governance metrics distinguish candidate risks and publishable knowledge", () => {
  const metrics = runtime.governanceMetrics(runtime.KNOWLEDGE_ITEMS);
  assert.deepEqual(metrics, { total: 6, publishable: 3, needsAction: 3, permissionRisks: 1, duplicates: 1 });
});

test("publishing requires target owner permissions duplicates and review cycle", () => {
  assert.equal(runtime.canPublishItem(runtime.KNOWLEDGE_ITEMS[0]), true);
  assert.equal(runtime.canPublishItem(runtime.KNOWLEDGE_ITEMS[1]), false);
  assert.equal(runtime.canPublishItem(runtime.KNOWLEDGE_ITEMS[2]), false);
  assert.equal(runtime.canPublishItem(runtime.KNOWLEDGE_ITEMS[3]), false);
});

test("duplicate resolution preserves knowledge identity and clears its blocker", () => {
  const source = runtime.KNOWLEDGE_ITEMS[1];
  const resolved = runtime.resolveDuplicate(source, "merge");
  assert.equal(resolved.id, source.id);
  assert.equal(resolved.duplicate.status, "resolved");
  assert.equal(resolved.duplicate.decision, "merge");
  assert.equal(runtime.canPublishItem(resolved), true);
});

test("batch publication separates eligible and blocked items", () => {
  const result = runtime.publishBatch(runtime.KNOWLEDGE_ITEMS);
  assert.equal(result.publishable.length, 3);
  assert.equal(result.blocked.length, 3);
  assert.ok(result.blocked.every(item => item.blockers.length > 0));
});

test("governance workbench adapts into mobile queue list detail views", () => {
  assert.match(css, /grid-template-columns:\s*220px\s+minmax\(720px,\s*1fr\)\s+360px/);
  assert.match(css, /@media \(max-width:\s*780px\)/);
  assert.match(css, /\.governance-grid\s*\{[\s\S]*grid-template-columns:\s*1fr/);
});
