const LESSONS = [
  { id: "lesson-1", unit: "unit-1", number: "1.1", title: "二次函数的图像与性质", duration: "2 课时", knowledge: ["二次函数图像", "开口方向", "对称轴与顶点"], standards: ["理解函数图像特征", "能用图像解决实际问题"] },
  { id: "lesson-2", unit: "unit-1", number: "1.2", title: "二次函数的最值", duration: "1 课时", knowledge: ["函数最值", "配方法", "实际建模"], standards: ["掌握二次函数最值求法", "建立简单数学模型"] },
  { id: "lesson-3", unit: "unit-2", number: "2.1", title: "实际问题中的二次函数", duration: "2 课时", knowledge: ["面积最值", "利润模型", "变量范围"], standards: ["从真实情境抽象函数关系", "解释模型结果"] }
];

const RESOURCES = [
  { id: "slides-1", lessonId: "lesson-1", kind: "slides", name: "二次函数图像_课堂演示.pptx", size: "18.6 MB", updated: "07-11", pages: 32, status: "ready", tags: ["课堂演示", "动画"] },
  { id: "plan-1", lessonId: "lesson-1", kind: "lessonPlan", name: "1.1二次函数图像教案.docx", size: "426 KB", updated: "07-10", pages: 9, status: "ready", tags: ["教案", "浙教版"] },
  { id: "handout-1", lessonId: "lesson-1", kind: "handout", name: "图像与性质学习单.pdf", size: "1.2 MB", updated: "07-09", pages: 4, status: "ready", tags: ["学习单"] },
  { id: "worksheet-1", lessonId: "lesson-1", kind: "worksheet", name: "二次函数图像练习A.docx", size: "680 KB", updated: "07-11", pages: 6, status: "ready", tags: ["基础练习"] },
  { id: "worksheet-copy", lessonId: "lesson-1", kind: "worksheet", name: "二次函数图像练习_最终版.docx", size: "692 KB", updated: "07-11", pages: 6, status: "duplicate", duplicateOf: "worksheet-1", tags: ["疑似重复"] },
  { id: "extension-old", lessonId: "lesson-1", kind: "extension", name: "2019竞赛拓展题.pdf", size: "2.4 MB", updated: "2019-09", pages: 12, status: "outdated", tags: ["拓展", "旧版"] },
  { id: "slides-2", lessonId: "lesson-2", kind: "slides", name: "二次函数最值.pptx", size: "12.2 MB", updated: "07-10", pages: 26, status: "ready", tags: ["课堂演示"] },
  { id: "plan-2", lessonId: "lesson-2", kind: "lessonPlan", name: "1.2最值问题教案.docx", size: "398 KB", updated: "07-10", pages: 8, status: "ready", tags: ["教案"] },
  { id: "worksheet-2", lessonId: "lesson-2", kind: "worksheet", name: "最值问题分层练习.docx", size: "730 KB", updated: "07-09", pages: 7, status: "ready", tags: ["分层练习"] },
  { id: "answer-2", lessonId: "lesson-2", kind: "answer", name: "最值问题练习答案.pdf", size: "560 KB", updated: "07-09", pages: 5, status: "ready", tags: ["答案解析"] },
  { id: "extension-2", lessonId: "lesson-2", kind: "extension", name: "利润模型案例.xlsx", size: "186 KB", updated: "07-08", pages: 3, status: "ready", tags: ["真实数据"] },
  { id: "slides-3", lessonId: "lesson-3", kind: "slides", name: "实际问题中的二次函数.pptx", size: "14.5 MB", updated: "07-07", pages: 29, status: "ready", tags: ["课堂演示"] },
  { id: "plan-3", lessonId: "lesson-3", kind: "lessonPlan", name: "2.1建模教案.docx", size: "405 KB", updated: "07-07", pages: 8, status: "ready", tags: ["教案"] },
  { id: "worksheet-3", lessonId: "lesson-3", kind: "worksheet", name: "建模问题练习.docx", size: "612 KB", updated: "07-07", pages: 6, status: "ready", tags: ["练习"] },
  { id: "answer-3", lessonId: "lesson-3", kind: "answer", name: "建模问题答案解析.pdf", size: "470 KB", updated: "07-07", pages: 5, status: "ready", tags: ["答案解析"] }
];

const UNASSIGNED = [
  { id: "unassigned-1", name: "函数练习补充题_王老师.docx", kind: "unknown", size: "388 KB", reason: "未识别课时", suggestion: "可能属于 1.1" },
  { id: "unassigned-2", name: "家长会数学学习建议.pdf", kind: "unknown", size: "1.1 MB", reason: "非课堂资料", suggestion: "建议放入课程公共资料" },
  { id: "unassigned-3", name: "IMG_20260710_白板.jpg", kind: "unknown", size: "3.8 MB", reason: "图片待 OCR", suggestion: "识别后再分类" }
];

const KINDS = [
  { id: "slides", label: "课件", icon: "presentation", color: "blue" },
  { id: "lessonPlan", label: "教案", icon: "notebook-tabs", color: "purple" },
  { id: "handout", label: "讲义/学习单", icon: "file-text", color: "cyan" },
  { id: "worksheet", label: "练习", icon: "list-checks", color: "orange" },
  { id: "answer", label: "答案", icon: "badge-check", color: "green" },
  { id: "extension", label: "拓展资源", icon: "sparkles", color: "gray" }
];

const state = {
  screen: "entry",
  activeLessonId: "lesson-1",
  resources: RESOURCES.map(item => ({ ...item, tags: [...item.tags] })),
  unassigned: UNASSIGNED.map(item => ({ ...item })),
  activeResourceId: "slides-1",
  modal: null,
  modalResourceId: null,
  mobilePane: "tree",
  trayOpen: true,
  toast: ""
};

const root = typeof document !== "undefined" ? document.body : null;

function resourcesForLesson(resources, lessonId) {
  return resources.filter(item => item.lessonId === lessonId);
}

function analyzeLesson(lesson, resources) {
  const items = resourcesForLesson(resources, lesson.id);
  const required = ["slides", "lessonPlan", "worksheet", "answer"];
  const labels = { slides: "课件", lessonPlan: "教案", worksheet: "练习", answer: "答案" };
  return {
    total: items.length,
    missing: required.filter(kind => !items.some(item => item.kind === kind)).map(kind => labels[kind]),
    duplicates: items.filter(item => item.status === "duplicate").length,
    outdated: items.filter(item => item.status === "outdated").length
  };
}

function moveResource(resource, lessonId, kind) {
  return { ...resource, lessonId, kind, status: "ready", tags: ["已归类"] };
}

function canGenerateCoursePack(lessons, resources) {
  return lessons.every(lesson => resourcesForLesson(resources, lesson.id).some(item => item.kind === "answer"));
}

function activeLesson() {
  return LESSONS.find(item => item.id === state.activeLessonId) || LESSONS[0];
}

function refreshIcons() { if (typeof lucide !== "undefined") lucide.createIcons(); }

function render() {
  if (!root) return;
  root.innerHTML = layout(state.screen === "workspace" ? renderWorkspace() : renderEntry());
  refreshIcons();
}

function layout(content) {
  return `<div class="app-shell course-shell">${renderProductSidebar()}<main class="main"><header class="topbar"><div class="breadcrumb"><a href="index.html">文件工作台</a><span>/</span><strong>课件整理工具</strong></div><nav class="primary-nav"><a class="primary-nav-link" href="report.html">调研报告</a><a class="primary-nav-link active" href="index.html">工具体验</a><a class="primary-nav-link" href="existing-tools.html">已有工具</a></nav><div class="top-actions"><button class="btn" data-action="toast" data-toast="已打开整理记录">使用记录</button><button class="btn" data-action="toast" data-toast="课程编排帮助已打开">使用帮助</button></div></header>${content}</main></div>${state.modal ? renderModal() : ""}${state.toast ? `<div class="toast">${state.toast}</div>` : ""}`;
}

function renderEntry() {
  return `<section class="course-entry"><div class="course-entry-head"><p class="course-eyebrow">课程资料编排台</p><h1>把散落课件重组为按单元、课时可直接使用的课程包</h1><p>系统识别学科、年级、教材和章节，保留未归类资料，并检查答案、课标和版本缺口。</p></div><div class="folder-analysis-card"><div class="selected-folder"><span class="folder-icon"><i data-lucide="folder-open"></i></span><div><strong>九年级数学上册 / 二次函数</strong><p>企业云盘 / 教研中心 / 2026 秋季课程</p></div><button class="btn" data-action="toast" data-toast="云盘文件夹选择器已打开"><i data-lucide="refresh-cw"></i>更换文件夹</button></div><div class="folder-analysis"><div><span>识别文件</span><strong>18</strong><small>PPT 6 · Word 7 · PDF 4 · Excel 1</small></div><div><span>课程结构</span><strong>2 单元 / 5 课时</strong><small>与浙教版九上目录匹配</small></div><div><span>待整理</span><strong>3</strong><small>1 张图片待 OCR</small></div><div><span>资料质量</span><strong>82%</strong><small>1 缺答案 · 1 重复 · 1 旧版</small></div></div><div class="detected-profile"><div><span>学科</span><strong>数学</strong></div><div><span>年级</span><strong>九年级上</strong></div><div><span>教材版本</span><strong>浙教版 2024</strong></div><div><span>章节</span><strong>第 1 章 二次函数</strong></div><button data-action="toast" data-toast="课程识别信息可人工修正"><i data-lucide="pencil"></i>修正</button></div><div class="entry-actions"><button class="btn" data-action="toast" data-toast="课程结构预览已打开"><i data-lucide="list-tree"></i>预览课程结构</button><button class="btn primary" data-action="start-organize"><i data-lucide="wand-sparkles"></i>确认并开始整理</button></div></div><section class="course-templates"><div class="section-head"><div><h2>课程结构模板</h2><p>也可以从学校课程模板开始整理。</p></div></div><div class="course-template-grid"><button data-action="start-organize"><span><i data-lucide="sigma"></i></span><strong>初中数学标准课程包</strong><p>单元、课时、教案、练习、答案、拓展资源</p><small>教研中心官方模板</small></button><button data-action="toast" data-toast="分层教学模板已选中"><span><i data-lucide="layers-3"></i></span><strong>分层教学课程包</strong><p>基础、进阶、挑战三层练习与答案</p><small>适合班级分层</small></button><button data-action="toast" data-toast="项目式学习模板已选中"><span><i data-lucide="blocks"></i></span><strong>项目式学习资料包</strong><p>任务书、过程材料、评价量规与成果</p><small>适合综合实践</small></button></div></section></section>`;
}

function renderWorkspace() {
  const lesson = activeLesson();
  const health = analyzeLesson(lesson, state.resources);
  return `<section class="course-workspace-page"><div class="course-header"><div><button class="back-link" data-action="back-entry"><i data-lucide="arrow-left"></i>返回文件夹分析</button><h1>九年级数学上册 · 二次函数</h1><p>浙教版 2024 · 2 单元 · 5 课时 · 18 份资料</p></div><div class="course-actions"><button class="btn" data-action="bulk-rename"><i data-lucide="text-cursor-input"></i>批量改名</button><button class="btn" data-action="sync-cloud"><i data-lucide="refresh-ccw"></i>同步云盘目录</button><button class="btn primary" data-action="generate-pack"><i data-lucide="package-check"></i>生成课程包</button></div></div><div class="course-health-bar"><div><span>当前课时</span><strong>${lesson.number} ${lesson.title}</strong></div><div><span>资料</span><strong>${health.total}</strong></div><div class="${health.missing.length ? "warn" : "ok"}"><span>缺口</span><strong>${health.missing.length ? health.missing.join("、") : "完整"}</strong></div><div class="${health.duplicates ? "warn" : "ok"}"><span>重复</span><strong>${health.duplicates}</strong></div><div class="${health.outdated ? "warn" : "ok"}"><span>旧版</span><strong>${health.outdated}</strong></div><div class="sync-state"><i data-lucide="cloud-check"></i><span>本次改动尚未同步</span></div></div><div class="mobile-course-tabs"><button class="${state.mobilePane === "tree" ? "active" : ""}" data-action="mobile-pane" data-pane="tree">课程</button><button class="${state.mobilePane === "board" ? "active" : ""}" data-action="mobile-pane" data-pane="board">资料</button><button class="${state.mobilePane === "quality" ? "active" : ""}" data-action="mobile-pane" data-pane="quality">质量</button></div><div class="curriculum-workbench" data-mobile-pane="${state.mobilePane}">${renderCourseTree()}${renderResourceBoard(lesson)}${renderQualityPanel(lesson, health)}</div></section>`;
}

function renderCourseTree() {
  return `<aside class="course-tree course-pane-tree"><div class="tree-head"><div><h2>课程结构</h2><span>拖拽可调整顺序</span></div><button class="icon-button" data-action="toast" data-toast="新建课时"><i data-lucide="plus"></i></button></div><div class="course-root"><i data-lucide="book-open-check"></i><div><strong>第 1 章 二次函数</strong><small>2 单元 · 5 课时</small></div></div><div class="unit-list"><section><div class="unit-head"><i data-lucide="chevron-down"></i><strong>单元一 基础与性质</strong><span>2 课时</span></div>${LESSONS.filter(item => item.unit === "unit-1").map(renderLessonNode).join("")}</section><section><div class="unit-head"><i data-lucide="chevron-down"></i><strong>单元二 建模与应用</strong><span>3 课时</span></div>${LESSONS.filter(item => item.unit === "unit-2").map(renderLessonNode).join("")}<button class="lesson-node ghost" data-action="toast" data-toast="该课时暂无样例资料"><span>2.2</span><div><strong>综合探究</strong><small>0 份资料</small></div></button><button class="lesson-node ghost" data-action="toast" data-toast="该课时暂无样例资料"><span>2.3</span><div><strong>单元复习</strong><small>0 份资料</small></div></button></section></div><div class="tree-footer"><button data-action="toast" data-toast="单元管理已打开"><i data-lucide="settings-2"></i>管理课程结构</button></div></aside>`;
}

function renderLessonNode(lesson) {
  const health = analyzeLesson(lesson, state.resources);
  return `<button class="lesson-node ${state.activeLessonId === lesson.id ? "active" : ""}" data-action="select-lesson" data-lesson="${lesson.id}"><span>${lesson.number}</span><div><strong>${lesson.title}</strong><small>${health.total} 份资料 · ${lesson.duration}</small></div>${health.missing.length ? `<i class="lesson-warning" data-lucide="triangle-alert"></i>` : `<i class="lesson-ready" data-lucide="check"></i>`}</button>`;
}

function renderResourceBoard(lesson) {
  const lessonResources = resourcesForLesson(state.resources, lesson.id);
  return `<main class="resource-board course-pane-board"><div class="board-head"><div><p class="course-eyebrow">${lesson.number}</p><h2>${lesson.title}</h2><span>${lesson.duration} · 最近更新 07-11</span></div><div><button class="btn" data-action="toast" data-toast="已添加课时资料"><i data-lucide="file-plus-2"></i>添加资料</button><button class="icon-button" data-action="toast" data-toast="课时设置已打开"><i data-lucide="more-horizontal"></i></button></div></div><div class="resource-columns">${KINDS.map(kind => renderKindColumn(kind, lessonResources.filter(item => item.kind === kind.id))).join("")}</div>${renderUnassignedTray()}</main>`;
}

function renderKindColumn(kind, items) {
  return `<section class="resource-kind"><div class="kind-head"><span class="kind-icon ${kind.color}"><i data-lucide="${kind.icon}"></i></span><div><strong>${kind.label}</strong><small>${items.length} 份</small></div><button data-action="toast" data-toast="向${kind.label}添加资料"><i data-lucide="plus"></i></button></div><div class="kind-items">${items.length ? items.map(renderResourceCard).join("") : `<button class="empty-kind" data-action="${kind.id === "answer" ? "generate-answer" : "toast"}" ${kind.id === "answer" ? "" : `data-toast=\"向${kind.label}添加资料\"`}><i data-lucide="${kind.id === "answer" ? "wand-sparkles" : "plus"}"></i><span>${kind.id === "answer" ? "生成答案解析" : `添加${kind.label}`}</span></button>`}</div></section>`;
}

function renderResourceCard(resource) {
  return `<button class="resource-card ${resource.status}" data-action="preview-resource" data-resource="${resource.id}"><span class="resource-file"><i data-lucide="${resource.kind === "slides" ? "presentation" : resource.kind === "worksheet" ? "list-checks" : resource.kind === "answer" ? "badge-check" : "file-text"}"></i></span><span><strong>${resource.name}</strong><small>${resource.size} · ${resource.pages} 页 · ${resource.updated}</small><em>${resource.tags.join(" · ")}</em></span>${resource.status === "duplicate" ? `<i class="resource-issue" data-lucide="copy"></i>` : resource.status === "outdated" ? `<i class="resource-issue" data-lucide="clock-alert"></i>` : `<i class="drag-handle" data-lucide="grip-vertical"></i>`}</button>`;
}

function renderUnassignedTray() {
  return `<section class="unassigned-tray ${state.trayOpen ? "open" : ""}"><button class="tray-head" data-action="toggle-tray"><span><i data-lucide="inbox"></i><strong>待整理资料</strong><em>${state.unassigned.length}</em></span><span>保留未分类文件，可移动到目标课时<i data-lucide="chevron-${state.trayOpen ? "down" : "up"}"></i></span></button>${state.trayOpen ? `<div class="tray-items">${state.unassigned.length ? state.unassigned.map(item => `<button class="tray-item" data-action="move-unassigned" data-resource="${item.id}"><span class="tray-file"><i data-lucide="file-question"></i></span><span><strong>${item.name}</strong><small>${item.size} · ${item.reason}</small><em>${item.suggestion}</em></span><i data-lucide="move-right"></i></button>`).join("") : `<div class="tray-empty"><i data-lucide="badge-check"></i>全部资料已归类</div>`}</div>` : ""}</section>`;
}

function renderQualityPanel(lesson, health) {
  return `<aside class="quality-panel course-pane-quality"><div class="quality-head"><div><h2>课程质量</h2><span>随整理进度更新</span></div><span class="quality-score">${health.missing.length ? 82 : 94}</span></div><section class="quality-section"><div class="quality-title"><h3>知识点</h3><button data-action="toast" data-toast="知识点编辑已打开"><i data-lucide="pencil"></i></button></div><div class="knowledge-tags">${lesson.knowledge.map(item => `<span>${item}</span>`).join("")}</div></section><section class="quality-section"><div class="quality-title"><h3>课标映射</h3><span class="matched">已匹配 ${lesson.standards.length}</span></div>${lesson.standards.map(item => `<div class="standard-row"><i data-lucide="check-circle-2"></i><span>${item}</span></div>`).join("")}</section><section class="quality-section"><div class="quality-title"><h3>资料缺口</h3><span>${health.missing.length}</span></div>${health.missing.length ? health.missing.map(item => `<article class="quality-issue critical"><i data-lucide="circle-alert"></i><div><strong>缺少${item}</strong><p>练习资料没有可核对的答案与步骤解析。</p><button data-action="generate-answer">基于练习生成</button></div></article>`).join("") : `<div class="quality-complete"><i data-lucide="badge-check"></i><span>关键资料已完整</span></div>`}</section><section class="quality-section"><div class="quality-title"><h3>质量问题</h3><span>${health.duplicates + health.outdated}</span></div>${health.duplicates ? `<article class="quality-issue"><i data-lucide="copy"></i><div><strong>发现疑似重复练习</strong><p>两份文档语义相似度 96%，建议保留更新版本。</p><button data-action="resolve-duplicate">查看并合并</button></div></article>` : ""}${health.outdated ? `<article class="quality-issue"><i data-lucide="clock-alert"></i><div><strong>1 份资料可能过期</strong><p>2019 年竞赛题与当前教材版本不一致。</p><button data-action="archive-outdated">移入历史资料</button></div></article>` : ""}${!health.duplicates && !health.outdated ? `<div class="quality-complete"><i data-lucide="badge-check"></i><span>未发现重复或旧版资料</span></div>` : ""}</section></aside>`;
}

function renderModal() {
  if (state.modal === "move") {
    const resource = state.unassigned.find(item => item.id === state.modalResourceId);
    return `<div class="course-modal-layer" data-action="close-modal"><section class="course-modal" role="dialog" data-stop-close><div class="modal-head"><div><p class="course-eyebrow">移动待整理资料</p><h2>${resource.name}</h2></div><button class="icon-button" data-action="close-modal"><i data-lucide="x"></i></button></div><div class="move-suggestion"><i data-lucide="sparkles"></i><div><strong>建议归入：1.1 二次函数的图像与性质 / 练习</strong><p>文件名和内容包含“函数图像、对称轴、顶点”等知识点。</p></div></div><label><span>目标课时</span><select id="move-lesson">${LESSONS.map(lesson => `<option value="${lesson.id}" ${lesson.id === "lesson-1" ? "selected" : ""}>${lesson.number} ${lesson.title}</option>`).join("")}</select></label><label><span>资料类型</span><select id="move-kind">${KINDS.map(kind => `<option value="${kind.id}" ${kind.id === "worksheet" ? "selected" : ""}>${kind.label}</option>`).join("")}</select></label><div class="modal-actions"><button class="btn" data-action="close-modal">取消</button><button class="btn primary" data-action="confirm-move">确认移动</button></div></section></div>`;
  }
  if (state.modal === "preview") {
    const resource = state.resources.find(item => item.id === state.activeResourceId);
    return `<div class="course-drawer-layer" data-action="close-modal"><aside class="resource-preview" data-stop-close><div class="modal-head"><div><p class="course-eyebrow">资料预览</p><h2>${resource.name}</h2></div><button class="icon-button" data-action="close-modal"><i data-lucide="x"></i></button></div><div class="preview-canvas"><div class="slide-preview"><span>${resource.kind === "slides" ? "PPT" : "DOC"}</span><h3>${activeLesson().title}</h3><div class="graph-preview"><i></i><i></i><i></i></div><p>图像、对称轴、顶点与开口方向</p></div></div><div class="preview-meta"><div><span>资料类型</span><strong>${KINDS.find(item => item.id === resource.kind)?.label}</strong></div><div><span>更新时间</span><strong>${resource.updated}</strong></div><div><span>页数</span><strong>${resource.pages}</strong></div><div><span>状态</span><strong>${resource.status === "ready" ? "可使用" : resource.status === "duplicate" ? "疑似重复" : "可能过期"}</strong></div></div><section><h3>识别内容</h3><div class="knowledge-tags"><span>二次函数图像</span><span>对称轴</span><span>顶点坐标</span></div></section><div class="preview-actions"><button class="btn" data-action="toast" data-toast="文件已在云盘打开">打开原文件</button><button class="btn primary" data-action="toast" data-toast="资料信息已编辑">编辑资料信息</button></div></aside></div>`;
  }
  if (state.modal === "pack") return `<div class="course-modal-layer" data-action="close-modal"><section class="pack-modal" role="dialog" data-stop-close><div class="pack-icon"><i data-lucide="package-check"></i></div><h2>生成二次函数课程包</h2><p>按课程结构重建云盘目录，并生成课程索引和教师使用说明。</p><div class="pack-tree"><strong>九年级数学上册_二次函数</strong><span>01_基础与性质 / 1.1 / 1.2</span><span>02_建模与应用 / 2.1 / 2.2 / 2.3</span><span>00_课程索引与使用说明</span></div><label><input type="checkbox" checked><span>统一文件命名：课时编号_资料类型_标题</span></label><label><input type="checkbox" checked><span>保留原始文件到“整理前备份”</span></label><div class="modal-actions"><button class="btn" data-action="close-modal">取消</button><button class="btn primary" data-action="confirm-pack">生成并保存</button></div></section></div>`;
  if (state.modal === "blocked-pack") return `<div class="course-modal-layer" data-action="close-modal"><section class="blocked-pack-modal" role="dialog" data-stop-close><div class="blocked-icon"><i data-lucide="circle-alert"></i></div><h2>课程包仍有关键资料缺口</h2><p>1.1 二次函数的图像与性质缺少答案解析。可以先生成答案，再打包课程。</p><div class="modal-actions"><button class="btn" data-action="close-modal">继续整理</button><button class="btn primary" data-action="generate-answer">生成答案解析</button></div></section></div>`;
  return "";
}

function showToast(message) { state.toast = message; render(); setTimeout(() => { state.toast = ""; render(); }, 1800); }

function handleClick(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  if (event.target.closest("[data-stop-close]")) event.stopPropagation();
  const action = target.dataset.action;
  if (action === "toast") return showToast(target.dataset.toast);
  if (action === "start-organize") state.screen = "workspace";
  else if (action === "back-entry") state.screen = "entry";
  else if (action === "select-lesson") { state.activeLessonId = target.dataset.lesson; state.mobilePane = "board"; }
  else if (action === "toggle-tray") state.trayOpen = !state.trayOpen;
  else if (action === "move-unassigned") { state.modal = "move"; state.modalResourceId = target.dataset.resource; }
  else if (action === "confirm-move") {
    const resource = state.unassigned.find(item => item.id === state.modalResourceId);
    const lessonId = document.querySelector("#move-lesson")?.value || "lesson-1";
    const kind = document.querySelector("#move-kind")?.value || "worksheet";
    state.resources.push(moveResource(resource, lessonId, kind));
    state.unassigned = state.unassigned.filter(item => item.id !== resource.id);
    state.modal = null;
    state.activeLessonId = lessonId;
    showToast(`${resource.name} 已移动到目标课时`);
    return;
  } else if (action === "preview-resource") { state.activeResourceId = target.dataset.resource; state.modal = "preview"; }
  else if (action === "generate-answer") {
    state.modal = null;
    if (!state.resources.some(item => item.lessonId === "lesson-1" && item.kind === "answer")) state.resources.push({ id: "generated-answer", lessonId: "lesson-1", kind: "answer", name: "二次函数图像练习_答案解析.docx", size: "520 KB", updated: "刚刚", pages: 7, status: "ready", tags: ["答案草稿", "待教师复核"] });
    showToast("答案解析已生成，请教师复核后使用");
    return;
  } else if (action === "resolve-duplicate") {
    state.resources = state.resources.filter(item => item.id !== "worksheet-copy");
    showToast("已保留更新版本，重复文件移入整理前备份");
    return;
  } else if (action === "archive-outdated") {
    state.resources = state.resources.filter(item => item.id !== "extension-old");
    showToast("旧版资料已移入历史资料");
    return;
  } else if (action === "generate-pack") state.modal = canGenerateCoursePack(LESSONS, state.resources) ? "pack" : "blocked-pack";
  else if (action === "confirm-pack") { state.modal = null; showToast("课程包已生成并保存到云盘"); return; }
  else if (action === "bulk-rename") { showToast("已预览统一命名规则：课时编号_资料类型_标题"); return; }
  else if (action === "sync-cloud") { showToast("课程结构和资料位置已同步到云盘"); return; }
  else if (action === "close-modal") state.modal = null;
  else if (action === "mobile-pane") state.mobilePane = target.dataset.pane;
  render();
}

if (root) { root.addEventListener("click", handleClick); render(); }
if (typeof module !== "undefined" && module.exports) module.exports = { LESSONS, RESOURCES, UNASSIGNED, analyzeLesson, moveResource, canGenerateCoursePack, resourcesForLesson };
