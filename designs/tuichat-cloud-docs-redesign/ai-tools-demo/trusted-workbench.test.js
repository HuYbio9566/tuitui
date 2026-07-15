const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

test("hub prioritizes three P0 workflows inside a trusted file workbench", () => {
  const source = read("app.js");
  assert.match(source, /const TRUSTED_P0 = \[/);
  for (const id of ["folder-summary", "multi-file-qa", "invoice-check"]) {
    assert.match(source, new RegExp(`TRUSTED_P0[\\s\\S]*"${id}"`));
  }
  for (const phrase of ["360 AI 文件工作台", "从当前文件夹开始", "首期推荐", "可信底座", "行业工作流", "任务中心"]) {
    assert.match(source, new RegExp(phrase));
  }
  assert.match(source, /data-hub-filter/);
  assert.match(source, /data-hub-action="tasks"/);
});

test("shared trusted context is visible in every P0 workflow", () => {
  const shared = read("product-sidebar.js");
  assert.match(shared, /function renderWorkbenchContextBar/);
  assert.ok(shared.indexOf('<a class="workbench-context-link"') < shared.indexOf('<div class="workbench-context-identity">'));
  assert.match(shared, /data-lucide="arrow-left"/);
  for (const file of ["folder-summary.js", "multi-file-qa.js", "invoice-check.js"]) {
    const source = read(file);
    assert.match(source, /renderWorkbenchContextBar\(/, `${file} should render the shared trust context`);
    assert.match(source, /AI 文件工作台/, `${file} should use the workbench breadcrumb`);
    assert.match(source, /工具体验/, `${file} should use the shared experience tab label`);
  }
  const folderSummary = read("folder-summary.js");
  assert.match(folderSummary, /context: "春季招生项目"/);
  assert.doesNotMatch(folderSummary, /企业云盘 \/ 市场部 \/ 春季招生项目/);
});

test("desktop trust states align to the right edge of the context bar", () => {
  const styles = read("styles.css");
  assert.match(styles, /\.workbench-context-states\s*\{[\s\S]*justify-self:\s*end;[\s\S]*justify-content:\s*flex-end;/);
  assert.match(styles, /@media \(max-width:\s*640px\)[\s\S]*\.workbench-context-states\s*\{[\s\S]*justify-self:\s*stretch;[\s\S]*justify-content:\s*flex-start;/);
});

test("report separates the product map from the production MVP", () => {
  const source = read("app.js");
  for (const phrase of ["3 个 P0", "共享可信底座", "财务票据核验", "多文件问答", "文件夹摘要"]) {
    assert.match(source, new RegExp(phrase));
  }
});
