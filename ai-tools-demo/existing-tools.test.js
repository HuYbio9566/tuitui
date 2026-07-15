const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;

const expectedPages = [
  "ai-doc.html",
  "ai-ppt.html",
  "ai-excel.html",
  "document-translation.html",
  "meeting-minutes.html",
  "file-sharing.html",
  "file-collection.html",
  "file-review.html",
  "pdf-to-word.html",
  "pdf-to-ppt.html",
  "pdf-to-excel.html",
  "image-to-text.html",
  "audio-to-text.html",
  "file-templates.html"
];

test("existing tools home links to all 14 standalone experiences", () => {
  const source = fs.readFileSync(path.join(root, "existing-app.js"), "utf8");
  assert.match(source, /const EXISTING_TOOL_ORDER = \[/);
  for (const page of expectedPages) {
    assert.match(source, new RegExp(page.replace(".", "\\.")));
    assert.ok(fs.existsSync(path.join(root, page)), `${page} should exist`);
  }
});

test("shared runtime includes the researched workflows and states", () => {
  const source = fs.readFileSync(path.join(root, "existing-app.js"), "utf8");
  for (const phrase of [
    "快速创作",
    "长文写作",
    "上传音频文件",
    "发起收集",
    "发起审阅",
    "从云盘选择",
    "我转换的文件",
    "推荐模版",
    "我的模版"
  ]) {
    assert.ok(source.includes(phrase), `runtime should include ${phrase}`);
  }
});

test("existing tools pages keep report and new-tool comparison navigation", () => {
  const source = fs.readFileSync(path.join(root, "existing-app.js"), "utf8");
  assert.ok(source.includes("report.html"));
  assert.ok(source.includes("index.html"));
  assert.ok(source.includes("existing-tools.html"));
});

test("cloud picker is a nested overlay that preserves its parent form", () => {
  const source = fs.readFileSync(path.join(root, "existing-app.js"), "utf8");
  const start = source.indexOf("function cloudPicker");
  const end = source.indexOf("function renderExistingHome", start);
  const implementation = source.slice(start, end);
  assert.ok(implementation.includes('document.createElement("div")'));
  assert.ok(implementation.includes("pickerHost.remove()"));
  assert.ok(!implementation.includes("legacyModal(title"));
});
