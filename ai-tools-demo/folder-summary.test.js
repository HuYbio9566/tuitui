const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const {
  getTemplateDefaultView,
  selectFolderReport,
  resolvePermissionRecovery,
  summarizeChangeSummary
} = require("./folder-summary.js");

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

test("folder summary owns a dedicated runtime", () => {
  const html = read("folder-summary.html");
  assert.match(html, /data-page="folder-summary"/);
  assert.match(html, /folder-summary\.css/);
  assert.match(html, /folder-summary\.js/);
  assert.doesNotMatch(html, /src="app\.js"/);
});

test("entry is folder-first and offers analysis templates", () => {
  const source = read("folder-summary.js");
  for (const phrase of ["选择云盘文件夹", "领导速览", "项目进展", "知识归档", "最近分析"]) {
    assert.ok(source.includes(phrase));
  }
  assert.doesNotMatch(source, /选择本地文件/);
});

test("processing exposes domain stages and recoverable file issues", () => {
  const source = read("folder-summary.js");
  for (const phrase of ["扫描目录与权限", "解析正文与表格", "识别决策与待办", "校验来源", "跳过并继续"]) {
    assert.ok(source.includes(phrase));
  }
});

test("workspace is a three-pane evidence-linked dashboard", () => {
  const source = read("folder-summary.js");
  for (const phrase of ["目录与覆盖", "领导速览", "项目进展", "待办事项", "风险提示", "知识资产", "来源证据", "重新扫描"]) {
    assert.ok(source.includes(phrase));
  }
  for (const selector of ["folder-tree-panel", "analysis-canvas", "evidence-panel"]) {
    assert.ok(source.includes(selector));
  }
});

test("folder summary keeps report and comparison navigation", () => {
  const source = read("folder-summary.js");
  for (const href of ["report.html", "index.html", "existing-tools.html"]) assert.ok(source.includes(href));
});

test("requesting permission remains recoverable and does not block scanning", () => {
  const result = resolvePermissionRecovery("request", "waiting");
  assert.deepEqual(result, {
    status: "requested",
    label: "已申请、等待授权",
    detail: "权限申请已提交，分析继续推进其余文件。",
    continueScanning: true
  });
});

test("each selectable folder resolves to its own evidence and save path", () => {
  const spring = selectFolderReport("spring-enroll");
  const renewal = selectFolderReport("renewal-playbook");
  const teacher = selectFolderReport("teacher-kit");

  assert.equal(spring.folderName, "2026 春季招生项目");
  assert.ok(spring.sourceFiles.includes("2026春季招生方案.pptx"));
  assert.equal(renewal.folderName, "续费运营 SOP 更新");
  assert.ok(renewal.sourceFiles.includes("续费运营 SOP 更新.docx"));
  assert.ok(!renewal.sourceFiles.includes("2026春季招生方案.pptx"));
  assert.equal(teacher.folderName, "教师培训资料包");
  assert.ok(teacher.sourceFiles.includes("教师培训资料包.pptx"));
  assert.match(teacher.savePath, /教研中心/);
});

test("analysis templates open distinct professional views", () => {
  assert.equal(getTemplateDefaultView("executive"), "overview");
  assert.equal(getTemplateDefaultView("project"), "progress");
  assert.equal(getTemplateDefaultView("knowledge"), "knowledge");
});

test("incremental rescan summary includes deleted files", () => {
  const summary = summarizeChangeSummary({
    added: 2,
    updated: 1,
    deleted: 1,
    conclusion: 3,
    deletedFile: "旧版预算表.xlsx",
    affectedConclusion: "预算口径已切换",
    oldEvidence: "旧版预算表.xlsx · Sheet1",
    newEvidence: "新版预算表.xlsx · Sheet2"
  });

  assert.equal(summary.banner, "新增 2 个文件 · 更新 1 个文件 · 删除 1 个文件 · 结论变化 3 处");
  assert.equal(summary.deletedFile, "旧版预算表.xlsx");
  assert.equal(summary.affectedConclusion, "预算口径已切换");
});

test("folder picker has responsive two-column and single-column layouts", () => {
  const css = read("folder-summary.css");
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*grid-template-areas:[\s\S]*"tree list"[\s\S]*"summary summary"/);
  assert.match(css, /@media \(max-width: 560px\)[\s\S]*grid-template-columns: 1fr;[\s\S]*"summary"[\s\S]*"tree"[\s\S]*"list"/);
});
