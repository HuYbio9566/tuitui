# Folder Summary Workspace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic file-processing demo for “文件夹智能摘要” with a dedicated folder-analysis workspace that supports folder selection, scan progress, evidence-linked report views, actions, and rescan history.

**Architecture:** `folder-summary.html` becomes a small wrapper loading the shared visual tokens plus a dedicated controller and stylesheet. `folder-summary.js` owns the page shell, domain state, render functions, and interactions; it does not call the generic tool renderer in `app.js`. The prototype uses deterministic sample data so every core interaction can be demonstrated without a backend.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Lucide browser icons, Node.js built-in test runner.

## Global Constraints

- Cloud drive is only the entry, file/folder picker, permission source, and result save target.
- The page must use the same brand navigation, typography, colors, buttons, modal, and toast language as the existing prototype.
- The business layout must be recognizable as a folder-analysis product without reading the page title.
- The primary flow must include entry, preflight, processing, review, and a completed business action.
- AI conclusions must expose file/page evidence and partial-file failures must not block successful files.
- Do not reuse `initToolPage()` or the generic four-step tool renderer from `app.js`.

---

### Task 1: Characterize and detach the folder-summary page

**Files:**
- Modify: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/folder-summary.html`
- Create: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/folder-summary.test.js`

**Interfaces:**
- Consumes: shared tokens and base components from `styles.css`.
- Produces: a wrapper with `body[data-page="folder-summary"]`, `folder-summary.css`, and `folder-summary.js`.

- [ ] **Step 1: Write the failing wrapper test**

```js
test("folder summary owns a dedicated runtime", () => {
  const html = read("folder-summary.html");
  assert.match(html, /data-page="folder-summary"/);
  assert.match(html, /folder-summary\.css/);
  assert.match(html, /folder-summary\.js/);
  assert.doesNotMatch(html, /src="app\.js"/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test folder-summary.test.js`

Expected: FAIL because the wrapper still loads `app.js` and has no dedicated assets.

- [ ] **Step 3: Replace the wrapper imports**

```html
<body data-page="folder-summary">
  <script src="https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js"></script>
  <script src="folder-summary.js"></script>
</body>
```

The head loads `styles.css` followed by `folder-summary.css`.

- [ ] **Step 4: Run the wrapper test**

Run: `node --test folder-summary.test.js`

Expected: PASS for the wrapper ownership test.

### Task 2: Build the entry and folder preflight experience

**Files:**
- Create: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/folder-summary.js`
- Create: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/folder-summary.css`
- Modify: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/folder-summary.test.js`

**Interfaces:**
- Consumes: `styles.css` tokens and links to `index.html`, `report.html`, and `existing-tools.html`.
- Produces: `renderEntry()`, `openFolderPicker()`, `selectFolder(folderId)`, and `renderPreflight()`.

- [ ] **Step 1: Add a failing structure test**

```js
test("entry is folder-first and offers analysis templates", () => {
  const source = read("folder-summary.js");
  for (const phrase of ["选择云盘文件夹", "领导速览", "项目进展", "知识归档", "最近分析"]) {
    assert.ok(source.includes(phrase));
  }
  assert.doesNotMatch(source, /选择本地文件/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test folder-summary.test.js`

Expected: FAIL because the dedicated runtime does not exist.

- [ ] **Step 3: Implement deterministic domain state**

```js
const state = {
  screen: "entry",
  template: "executive",
  selectedFolder: null,
  progress: 0,
  reportView: "overview",
  selectedInsight: "decision",
  rescanned: false
};
```

Add `FOLDERS`, `SCAN_STAGES`, `INSIGHTS`, `SOURCES`, and `ACTIVITY_CHANGES` fixtures with stable IDs.

- [ ] **Step 4: Implement entry UI and nested cloud picker**

The entry includes three selectable analysis-template cards, a primary cloud-folder selector, and recent analysis rows. The folder picker is an overlay with a left space tree, middle folder list, and selected-folder summary. Selecting a folder moves to preflight.

- [ ] **Step 5: Implement the preflight card**

Show folder name, 18 files, 5 subfolders, 126 MB, last update time, supported-format distribution, one permission-limited file, and one scanned image requiring OCR. Provide `返回重选` and `开始分析`.

- [ ] **Step 6: Run the structure test**

Run: `node --test folder-summary.test.js`

Expected: PASS for wrapper and entry tests.

### Task 3: Implement scan progress with partial-file handling

**Files:**
- Modify: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/folder-summary.js`
- Modify: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/folder-summary.css`
- Modify: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/folder-summary.test.js`

**Interfaces:**
- Consumes: `state.selectedFolder` and `SCAN_STAGES`.
- Produces: `startScan()`, `renderProcessing()`, and `finishScan()`.

- [ ] **Step 1: Add a failing processing contract test**

```js
test("processing exposes domain stages and recoverable file issues", () => {
  const source = read("folder-summary.js");
  for (const phrase of ["扫描目录与权限", "解析正文与表格", "识别决策与待办", "校验来源", "跳过并继续"]) {
    assert.ok(source.includes(phrase));
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test folder-summary.test.js`

Expected: FAIL until scan stages and recovery action are implemented.

- [ ] **Step 3: Implement processing state**

Render a live directory tree at left and a stage timeline at right. Advance progress with short deterministic timers. At 42%, display the permission-limited file as a nonblocking warning with `申请权限` and `跳过并继续`; the sample flow continues automatically after the skip action.

- [ ] **Step 4: Implement cancellation and retry**

`取消分析` returns to preflight without losing the selected folder. `重试文件` changes the failed OCR item to processing and then complete.

- [ ] **Step 5: Run processing tests**

Run: `node --test folder-summary.test.js`

Expected: PASS for all three tests.

### Task 4: Build the evidence-linked analysis dashboard

**Files:**
- Modify: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/folder-summary.js`
- Modify: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/folder-summary.css`
- Modify: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/folder-summary.test.js`

**Interfaces:**
- Consumes: completed scan state and report fixture data.
- Produces: `renderWorkspace()`, `setReportView(viewId)`, `selectInsight(insightId)`, `openSource(sourceId)`, `createTask(insightId)`, and `rescanFolder()`.

- [ ] **Step 1: Add a failing workspace contract test**

```js
test("workspace is a three-pane evidence-linked dashboard", () => {
  const source = read("folder-summary.js");
  for (const phrase of ["目录与覆盖", "领导速览", "项目进展", "待办事项", "风险提示", "知识资产", "来源证据", "重新扫描"]) {
    assert.ok(source.includes(phrase));
  }
  for (const selector of ["folder-tree-panel", "analysis-canvas", "evidence-panel"]) {
    assert.ok(source.includes(selector));
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test folder-summary.test.js`

Expected: FAIL before the dashboard exists.

- [ ] **Step 3: Implement the three-pane workspace**

Left pane contains the real directory tree with per-folder coverage. Center contains view tabs and view-specific content: executive overview cards, project timeline and owner tasks, risk table, and knowledge candidates. Right pane changes with the selected insight and shows file, page/sheet, excerpt, confidence, and an `打开原文件` action.

- [ ] **Step 4: Implement business actions**

- `创建待办` opens an assignee/date modal and marks the insight as assigned after confirmation.
- `风险已处理` updates the risk state and count.
- `保存为周报` opens a save-target modal and adds a completed toast.
- `加入知识库` changes the knowledge candidate to `待负责人复核`.

- [ ] **Step 5: Implement rescan history**

`重新扫描` shows an incremental scan, then a change banner: `新增 2 个文件 · 更新 1 个文件 · 结论变化 3 处`. A comparison drawer lists the changed conclusion and its old/new evidence.

- [ ] **Step 6: Run workspace tests**

Run: `node --test folder-summary.test.js`

Expected: PASS for all contract tests.

### Task 5: Integrate, browser-test, and document evidence

**Files:**
- Modify: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/folder-summary.test.js`
- Modify: `reports/2026-07-13-ai-tools-independent-workspaces-design.md` only if browser findings change the specification.

**Interfaces:**
- Consumes: the complete dedicated page.
- Produces: automated and visual evidence that the primary flow works.

- [ ] **Step 1: Add final regression assertions**

```js
test("folder summary keeps report and comparison navigation", () => {
  const source = read("folder-summary.js");
  for (const href of ["report.html", "index.html", "existing-tools.html"]) assert.ok(source.includes(href));
});
```

- [ ] **Step 2: Run syntax and unit checks**

Run:

```bash
node --check folder-summary.js
node --test folder-summary.test.js existing-tools.test.js
```

Expected: JavaScript syntax succeeds and all tests pass.

- [ ] **Step 3: Run the local server**

Run: `python3 -m http.server 8765 --bind 127.0.0.1`

Expected: `folder-summary.html` responds with HTTP 200.

- [ ] **Step 4: Browser-test the complete flow**

At 1440x900, execute: select analysis template -> open cloud picker -> select `2026 春季招生项目` -> confirm preflight -> start analysis -> handle partial permission warning -> open completed dashboard -> switch report view -> select insight -> inspect evidence -> create task -> rescan.

Expected: every action produces visible state change; no overlap, clipping, console error, or dead primary button.

- [ ] **Step 5: Test the narrow layout**

At 390x844, verify entry, picker, preflight, and workspace can be used with stacked panels or horizontal pane navigation, with no clipped text or inaccessible action.

- [ ] **Step 6: Record completion**

Update the implementation plan checkboxes and the thread plan only after fresh test and browser evidence are available. This workspace is complete only when both automated and visual verification pass.
