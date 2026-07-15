const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = __dirname;
const EXPERIENCE_PAGES = [
  "index.html",
  "report.html",
  "folder-summary.html",
  "multi-file-qa.html",
  "invoice-check.html",
  "contract-review.html",
  "version-compare.html",
  "courseware-organizer.html",
  "lesson-plan.html",
  "knowledge-import.html"
];

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

test("all new-tool experience pages load the shared polish layer", () => {
  for (const file of EXPERIENCE_PAGES) {
    const source = read(file);
    assert.match(source, /qiaomu-polish\.css/, `${file} should load the visual polish layer`);
    assert.match(source, /qiaomu-polish\.js/, `${file} should load interaction hardening`);
  }
});

test("the shared polish layer encodes restrained motion and Chinese typography", () => {
  const css = read("qiaomu-polish.css");
  assert.match(css, /PingFang SC/);
  assert.match(css, /text-wrap:\s*balance/);
  assert.match(css, /font-variant-numeric:\s*tabular-nums/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /cubic-bezier\(\.23,\s*1,\s*\.32,\s*1\)/);
  assert.doesNotMatch(css, /transition:\s*all/);
  assert.doesNotMatch(css, /font-style:\s*italic/);
});

test("tool copy describes work instead of advertising AI", () => {
  const sources = [
    "lesson-plan.js",
    "courseware-organizer.js",
    "contract-review.js",
    "version-compare.js",
    "knowledge-import.js",
    "multi-file-qa.js"
  ].map(read).join("\n");

  for (const phrase of ["AI 草稿", "AI 教学助理", "AI 建议：", "AI 识别内容", "AI 摘要", "AI 只检索"]) {
    assert.doesNotMatch(sources, new RegExp(phrase), `remove product-facing phrase: ${phrase}`);
  }
});

test("workbench entries start with the task instead of redundant eyebrow labels", () => {
  const sources = ["folder-summary.js", "multi-file-qa.js", "invoice-check.js"].map(read).join("\n");
  for (const label of ["文件夹分析驾驶舱", "异常驱动财务审核台"]) {
    assert.doesNotMatch(sources, new RegExp(label), `remove redundant entry label: ${label}`);
  }
  assert.doesNotMatch(read("multi-file-qa.js"), /<p class="qa-eyebrow">多文件问答<\/p>/);
});

test("invoice import uses a compact task-oriented dialog", () => {
  const source = read("invoice-check.js");
  const css = read("invoice-check.css");
  assert.match(source, /aria-labelledby="import-modal-title"/);
  assert.match(source, /导入核验材料/);
  assert.match(css, /\.import-modal-head\s*\{[\s\S]*min-height:\s*72px/);
  assert.match(css, /\.import-drop\s*\{[\s\S]*grid-template-columns:\s*auto minmax\(0, 1fr\) auto/);
});

test("the project has one design source of truth", () => {
  const design = read("DESIGN.md");
  for (const heading of ["视觉主题与氛围", "色板与角色", "排版规则", "组件样式", "Motion 哲学"]) {
    assert.match(design, new RegExp(heading));
  }
});
