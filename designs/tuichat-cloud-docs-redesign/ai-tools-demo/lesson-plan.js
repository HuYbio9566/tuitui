const INITIAL_TIMELINE = [
  { id: "activity-0", phase: "情境导入", minutes: 5, teacherActivity: "展示校园运动会计分牌，引导学生观察两个变量之间的对应关系。", studentActivity: "观察数据，描述变量如何随另一个变量变化。", evidence: "函数基础_第1课时.pptx · 第 2-4 页", type: "导入" },
  { id: "activity-1", phase: "概念建构", minutes: 12, teacherActivity: "用集合与对应关系表述函数定义，对比函数与一般对应。", studentActivity: "提取定义中的关键词，完成概念卡片。", evidence: "函数基础_第1课时.pptx · 第 5-10 页", type: "讲授" },
  { id: "activity-2", phase: "合作探究", minutes: 10, teacherActivity: "发放四组对应关系卡，组织小组判断是否构成函数并说明理由。", studentActivity: "四人小组分类、举证并完成一次互评。", evidence: "函数章节教案.docx · 活动二", type: "互动" },
  { id: "activity-3", phase: "巩固练习", minutes: 8, teacherActivity: "投放基础、进阶两组练习，巡视记录共性错误。", studentActivity: "按自选难度完成练习，并订正定义域遗漏。", evidence: "函数单元练习.pdf · 题目 1-6", type: "练习" },
  { id: "activity-4", phase: "总结与作业", minutes: 10, teacherActivity: "用概念图回收关键结论，布置分层作业并说明评价标准。", studentActivity: "补全概念图，选择基础或挑战作业。", evidence: "学校教案模板.docx · 作业设计", type: "总结" }
];

const SECTIONS = [
  { id: "overview", label: "教学概览", icon: "clipboard-list", status: "ready", confirmed: true },
  { id: "objectives", label: "教学目标", icon: "target", status: "ai", confirmed: false },
  { id: "focus", label: "重难点", icon: "circle-dot-dashed", status: "ai", confirmed: false },
  { id: "preparation", label: "教学准备", icon: "briefcase-business", status: "ready", confirmed: true },
  { id: "timeline", label: "教学流程", icon: "list-timeline", status: "ai", confirmed: false },
  { id: "assessment", label: "学习评价", icon: "scan-search", status: "ai", confirmed: false },
  { id: "homework", label: "分层作业", icon: "layers-3", status: "ai", confirmed: false },
  { id: "reflection", label: "课后反思", icon: "message-square-text", status: "empty", confirmed: false }
];

const MATERIALS = [
  { id: "slides", name: "函数基础_第1课时.pptx", type: "课堂课件", meta: "28 页 · 已解析", selected: true, icon: "presentation" },
  { id: "textbook", name: "数学必修一_函数章节.pdf", type: "教材", meta: "第 42-55 页 · 已解析", selected: true, icon: "book-open-text" },
  { id: "standard", name: "普通高中数学课程标准.pdf", type: "课程标准", meta: "2 条相关要求", selected: true, icon: "badge-check" },
  { id: "template", name: "杭州市第二中学教案模板.docx", type: "学校模板", meta: "2026 版 · 9 个模块", selected: true, icon: "layout-template" }
];

const state = {
  screen: "setup",
  setupStep: 1,
  activeSection: "timeline",
  sections: SECTIONS.map(item => ({ ...item })),
  timeline: INITIAL_TIMELINE.map(item => ({ ...item })),
  materials: MATERIALS.map(item => ({ ...item })),
  mobilePane: "outline",
  modal: null,
  toast: "",
  generationNote: "",
  selectedTemplate: "学校标准教案"
};

const root = typeof document !== "undefined" ? document.body : null;

function calculateTimelineTotal(timeline) {
  return timeline.reduce((sum, item) => sum + Number(item.minutes || 0), 0);
}

function validateTimeline(timeline, lessonMinutes) {
  const total = calculateTimelineTotal(timeline);
  return { total, difference: total - lessonMinutes, valid: total === lessonMinutes };
}

function applyTeachingSuggestion(timeline, activityId, suggestion) {
  return timeline.map(item => item.id === activityId ? { ...item, studentActivity: `${item.studentActivity} ${suggestion}` } : { ...item });
}

function canExportPlan(sections, timeline, lessonMinutes) {
  return validateTimeline(timeline, lessonMinutes).valid && sections.filter(item => item.id !== "reflection").every(item => item.confirmed);
}

function refreshIcons() { if (typeof lucide !== "undefined") lucide.createIcons(); }

function render() {
  if (!root) return;
  root.innerHTML = layout(state.screen === "editor" ? renderEditor() : renderSetup());
  refreshIcons();
}

function layout(content) {
  return `<div class="app-shell lesson-shell">${renderProductSidebar()}<main class="main"><header class="topbar"><div class="breadcrumb"><a href="index.html">文件工作台</a><span>/</span><strong>教案生成工具</strong></div><nav class="primary-nav"><a class="primary-nav-link" href="report.html">调研报告</a><a class="primary-nav-link active" href="index.html">工具体验</a><a class="primary-nav-link" href="existing-tools.html">已有工具</a></nav><div class="top-actions"><button class="btn" data-action="toast" data-toast="已打开教案记录">历史教案</button><button class="btn" data-action="toast" data-toast="教学设计帮助已打开">使用帮助</button></div></header>${content}</main></div>${state.modal ? renderModal() : ""}${state.toast ? `<div class="toast">${state.toast}</div>` : ""}`;
}

function renderSetup() {
  return `<section class="lesson-setup"><div class="setup-intro"><p class="lesson-eyebrow">结构化教学设计</p><h1>从可信课程材料出发，生成可调整、可核验的课堂教案</h1><p>先补齐课题、材料与班情，再整理目标、时间轴、评价和分层作业。</p></div><div class="setup-stepper">${["课题与课时", "课程材料与课标", "班情与教学偏好"].map((label, index) => `<button class="${state.setupStep === index + 1 ? "active" : state.setupStep > index + 1 ? "done" : ""}" data-action="setup-step" data-step="${index + 1}"><span>${state.setupStep > index + 1 ? `<i data-lucide="check"></i>` : index + 1}</span><strong>${label}</strong></button>`).join("")}</div><div class="setup-card">${state.setupStep === 1 ? renderSetupBasics() : state.setupStep === 2 ? renderSetupMaterials() : renderSetupClass()}</div></section>`;
}

function renderSetupBasics() {
  return `<div class="setup-panel"><div class="setup-panel-head"><span class="setup-icon"><i data-lucide="book-marked"></i></span><div><h2>这节课要教什么？</h2><p>结构化信息会直接决定目标、活动和课时节奏。</p></div></div><div class="setup-form-grid"><label class="wide"><span>课题</span><input value="函数的概念与定义域"></label><label><span>学科</span><select><option>高中数学</option><option>初中数学</option><option>高中物理</option></select></label><label><span>年级</span><select><option>高一上学期</option><option>高二上学期</option></select></label><label><span>课时长度</span><select><option>45 分钟</option><option>40 分钟</option><option>90 分钟</option></select></label><label><span>课型</span><select><option>新授课</option><option>复习课</option><option>探究课</option></select></label></div><div class="setup-summary"><i data-lucide="list-checks"></i><div><strong>已识别教学主题</strong><p>函数定义、对应关系、定义域限制与真实情境中的变量关系。</p></div></div><div class="setup-actions"><span></span><button class="btn primary" data-action="next-step">下一步：选择课程材料<i data-lucide="arrow-right"></i></button></div></div>`;
}

function renderSetupMaterials() {
  return `<div class="setup-panel"><div class="setup-panel-head"><span class="setup-icon"><i data-lucide="files"></i></span><div><h2>选择生成依据</h2><p>教案中的目标和知识内容会标注到这些来源。</p></div><button class="btn" data-action="toast" data-toast="云盘文件选择器已打开"><i data-lucide="folder-plus"></i>从云盘添加</button></div><div class="material-list">${state.materials.map(item => `<button class="material-row ${item.selected ? "selected" : ""}" data-action="toggle-material" data-material="${item.id}"><span class="material-check">${item.selected ? `<i data-lucide="check"></i>` : ""}</span><span class="material-icon"><i data-lucide="${item.icon}"></i></span><span><strong>${item.name}</strong><small>${item.type} · ${item.meta}</small></span><em>${item.selected ? "参与生成" : "未选择"}</em></button>`).join("")}</div><div class="source-health"><div><i data-lucide="shield-check"></i><span><strong>来源覆盖完整</strong><small>课件、教材、课程标准与学校模板均已匹配。</small></span></div><button data-action="show-sources">查看解析范围</button></div><div class="setup-actions"><button class="btn" data-action="prev-step"><i data-lucide="arrow-left"></i>上一步</button><button class="btn primary" data-action="next-step">下一步：补充班情<i data-lucide="arrow-right"></i></button></div></div>`;
}

function renderSetupClass() {
  return `<div class="setup-panel"><div class="setup-panel-head"><span class="setup-icon"><i data-lucide="users-round"></i></span><div><h2>这节课面对怎样的学生？</h2><p>班情影响提问难度、活动组织和作业分层。</p></div></div><div class="class-profile"><section><h3>班级学情</h3><div class="ability-bar"><span style="--size:28%"><b>基础薄弱 28%</b></span><span style="--size:54%"><b>达标 54%</b></span><span style="--size:18%"><b>进阶 18%</b></span></div><label><span>已掌握内容</span><textarea>集合的基本概念、区间表示、变量与对应关系。</textarea></label><label><span>常见困难</span><textarea>容易忽略定义域；混淆“一个 x 只能对应一个 y”和“一一对应”。</textarea></label></section><section><h3>教学偏好</h3><div class="preference-grid"><button class="selected"><i data-lucide="messages-square"></i><strong>问题链</strong><small>由浅入深追问</small></button><button class="selected"><i data-lucide="users"></i><strong>小组探究</strong><small>4 人小组活动</small></button><button><i data-lucide="monitor-play"></i><strong>数字互动</strong><small>投屏与即时反馈</small></button><button class="selected"><i data-lucide="layers-3"></i><strong>分层任务</strong><small>基础与挑战</small></button></div><label><span>教案模板</span><select><option>杭州市第二中学标准教案</option><option>简明课堂设计</option><option>教研公开课模板</option></select></label></section></div><div class="setup-actions"><button class="btn" data-action="prev-step"><i data-lucide="arrow-left"></i>上一步</button><button class="btn primary generate" data-action="generate-plan"><i data-lucide="wand-sparkles"></i>生成结构化教案</button></div></div>`;
}

function renderEditor() {
  const validation = validateTimeline(state.timeline, 45);
  const confirmed = state.sections.filter(item => item.confirmed).length;
  return `<section class="lesson-editor"><div class="lesson-editor-head"><div><button class="back-link" data-action="back-setup"><i data-lucide="arrow-left"></i>返回教学设置</button><h1>函数的概念与定义域</h1><p>高一数学 · 新授课 · 45 分钟 · ${state.selectedTemplate}</p></div><div class="editor-status"><span><i data-lucide="save"></i>已自动保存 10:32</span><span class="review-progress">教师已复核 ${confirmed}/${state.sections.length - 1}</span></div><div class="editor-actions"><button class="btn" data-action="generate-exercises"><i data-lucide="file-plus-2"></i>配套练习</button><button class="btn" data-action="differentiate"><i data-lucide="layers-3"></i>生成分层版</button><button class="btn primary" data-action="export-plan"><i data-lucide="download"></i>导出教案</button></div></div><div class="lesson-mobile-tabs"><button class="${state.mobilePane === "outline" ? "active" : ""}" data-action="mobile-pane" data-pane="outline">结构</button><button class="${state.mobilePane === "document" ? "active" : ""}" data-action="mobile-pane" data-pane="document">教案</button><button class="${state.mobilePane === "assistant" ? "active" : ""}" data-action="mobile-pane" data-pane="assistant">教学建议</button></div><div class="lesson-editor-grid" data-mobile-pane="${state.mobilePane}">${renderOutline(confirmed)}${renderDocument(validation)}${renderAssistant(validation)}</div></section>`;
}

function renderOutline(confirmed) {
  return `<aside class="lesson-outline lesson-pane-outline"><div class="outline-head"><div><h2>教案结构</h2><span>${confirmed}/${state.sections.length - 1} 已复核</span></div><button class="icon-button" data-action="toast" data-toast="已打开模块管理"><i data-lucide="settings-2"></i></button></div><nav>${state.sections.map((item, index) => `<button class="${state.activeSection === item.id ? "active" : ""}" data-action="select-section" data-section="${item.id}"><span>${String(index + 1).padStart(2, "0")}</span><i data-lucide="${item.icon}"></i><strong>${item.label}</strong>${item.confirmed ? `<em class="confirmed"><i data-lucide="check"></i></em>` : item.status === "ai" ? `<em class="ai">草稿</em>` : item.status === "empty" ? `<em class="empty">待课后</em>` : ""}</button>`).join("")}</nav><div class="outline-source"><i data-lucide="link-2"></i><div><strong>4 个生成来源</strong><p>课件、教材、课标、学校模板</p></div><button data-action="show-sources">查看</button></div><button class="confirm-all" data-action="confirm-all"><i data-lucide="badge-check"></i>全部标记为教师已复核</button></aside>`;
}

function renderDocument(validation) {
  const section = state.sections.find(item => item.id === state.activeSection) || state.sections[0];
  return `<main class="lesson-document lesson-pane-document"><div class="document-toolbar"><div><button class="tool-button"><i data-lucide="undo-2"></i></button><button class="tool-button"><i data-lucide="redo-2"></i></button><span></span><button class="tool-button"><i data-lucide="bold"></i></button><button class="tool-button"><i data-lucide="underline"></i></button><button class="tool-button"><i data-lucide="list"></i></button></div><div><button class="btn small" data-action="toast" data-toast="批注模式已开启"><i data-lucide="message-square-plus"></i>批注</button><button class="btn small ${section.confirmed ? "reviewed" : ""}" data-action="confirm-section"><i data-lucide="${section.confirmed ? "badge-check" : "circle-check-big"}"></i>${section.confirmed ? "教师已复核" : "标记已复核"}</button></div></div><article class="lesson-paper"><header><div class="school-line"><span>杭州市第二中学</span><span>2026 学年第一学期</span></div><h2>《函数的概念与定义域》教学设计</h2><div class="paper-meta"><span>学科：高中数学</span><span>年级：高一</span><span>课型：新授课</span><span>课时：1 课时</span></div></header>${section.id === "timeline" ? renderTimeline(validation) : renderSectionContent(section)}</article></main>`;
}

function renderTimeline(validation) {
  return `<section class="paper-section"><div class="paper-section-head"><div><span>05</span><h3>教学流程</h3><em class="ai-draft">内容草稿 · 待教师复核</em></div><button data-action="toast" data-toast="已添加教学环节"><i data-lucide="plus"></i>添加环节</button></div><div class="time-validation ${validation.valid ? "valid" : "invalid"}"><div><i data-lucide="${validation.valid ? "circle-check-big" : "triangle-alert"}"></i><strong>课堂时间 ${validation.total}/45 分钟</strong><span>${validation.valid ? "各环节时长已对齐" : validation.difference > 0 ? `超出 ${validation.difference} 分钟，请压缩环节` : `还可安排 ${Math.abs(validation.difference)} 分钟`}</span></div><div class="time-bar"><i style="width:${Math.min(validation.total / 45 * 100, 100)}%"></i></div></div><div class="timeline-editor">${state.timeline.map((item, index) => `<section class="timeline-block"><div class="timeline-marker"><span>${String(index + 1).padStart(2, "0")}</span><i></i></div><div class="timeline-card"><div class="timeline-card-head"><div><em>${item.type}</em><h4>${item.phase}</h4></div><div class="minute-stepper"><button data-action="adjust-time" data-id="${item.id}" data-delta="-1">−</button><strong>${item.minutes} 分钟</strong><button data-action="adjust-time" data-id="${item.id}" data-delta="1">+</button></div></div><div class="activity-grid"><div><span>教师活动</span><p contenteditable="true">${item.teacherActivity}</p></div><div><span>学生活动</span><p contenteditable="true">${item.studentActivity}</p></div></div><footer><span><i data-lucide="link-2"></i>${item.evidence}</span><button data-action="toast" data-toast="该环节更多操作"><i data-lucide="more-horizontal"></i></button></footer></div></section>`).join("")}</div></section>`;
}

function renderSectionContent(section) {
  const content = {
    overview: ["教材分析", "函数是高中数学的核心概念，是后续学习基本初等函数、导数与概率统计的基础。", "学情分析", "学生已掌握集合与区间，但容易把函数误解为一一对应，并忽略定义域限制。"],
    objectives: ["核心素养目标", "1. 能用集合与对应的语言描述函数概念。\n2. 能从表达式和实际情境确定简单函数的定义域。\n3. 在分类与举证中发展数学抽象和逻辑推理。", "课标依据", "理解函数是描述客观世界变量关系的重要数学模型。"],
    focus: ["教学重点", "理解函数定义中的任意性、唯一性以及定义域的约束。", "教学难点", "从实际情境中抽象变量对应关系，并判断是否构成函数。"],
    preparation: ["教师准备", "课堂课件、对应关系卡片、分层练习、即时反馈表。", "学生准备", "复习集合与区间表示，完成课前变量关系观察任务。"],
    assessment: ["形成性评价", "通过概念卡、小组分类理由和随堂练习三类证据观察学生理解。", "达成标准", "能准确判断 4 组对应关系，并说明定义域限制的理由。"],
    homework: ["基础任务", "教材习题 1.2 A 组 1-4，绘制函数概念图。", "挑战任务", "寻找一个生活中的变量关系，说明其定义域并判断是否构成函数。"],
    reflection: ["课后反思", "该模块由教师课后填写。可记录目标达成、时间分配、学生错误与下次改进。", "待观察问题", "学生能否稳定区分函数与一一对应？"]
  }[section.id] || [];
  return `<section class="paper-section"><div class="paper-section-head"><div><span>${String(state.sections.findIndex(item => item.id === section.id) + 1).padStart(2, "0")}</span><h3>${section.label}</h3>${section.status === "ai" ? `<em class="ai-draft">内容草稿 · 待教师复核</em>` : ""}</div></div><div class="content-blocks">${Array.from({ length: content.length / 2 }, (_, index) => `<section><h4>${content[index * 2]}</h4><p contenteditable="true">${content[index * 2 + 1]}</p><span class="source-chip"><i data-lucide="link-2"></i>${index ? "课程标准节选.pdf" : "函数基础_第1课时.pptx"}</span></section>`).join("")}</div></section>`;
}

function renderAssistant(validation) {
  const section = state.sections.find(item => item.id === state.activeSection) || state.sections[0];
  return `<aside class="lesson-assistant lesson-pane-assistant"><div class="assistant-head"><div><span class="assistant-mark"><i data-lucide="list-checks"></i></span><div><h2>教学建议</h2><p>正在协助：${section.label}</p></div></div><button class="icon-button" data-action="toast" data-toast="教学建议设置已打开"><i data-lucide="settings-2"></i></button></div>${state.activeSection === "timeline" ? renderTimelineSuggestions(validation) : renderGeneralSuggestions(section)}<section class="assistant-section source-check"><div class="assistant-title"><h3>生成依据</h3><button data-action="show-sources">4 个来源</button></div><div class="source-coverage"><div><span>教材内容</span><strong>92%</strong></div><i><b style="width:92%"></b></i></div><div class="source-coverage"><div><span>课程标准</span><strong>100%</strong></div><i><b style="width:100%"></b></i></div><button class="assistant-action" data-action="show-sources"><i data-lucide="scan-search"></i><span><strong>检查课标与材料引用</strong><small>查看每段内容的生成依据</small></span><i data-lucide="chevron-right"></i></button></section><section class="assistant-section teacher-boundary"><i data-lucide="shield-check"></i><div><strong>教师确认边界</strong><p>生成内容需由教师结合班情复核，尤其是目标、时间和评价标准。</p></div></section><div class="assistant-input"><textarea placeholder="说明你想如何调整当前模块…"></textarea><button data-action="toast" data-toast="已记录修改要求"><i data-lucide="arrow-up"></i></button></div></aside>`;
}

function renderTimelineSuggestions(validation) {
  return `<section class="assistant-section"><div class="assistant-title"><h3>课堂节奏检查</h3><span class="${validation.valid ? "pass" : "warning"}">${validation.valid ? "已通过" : "需调整"}</span></div><div class="rhythm-card ${validation.valid ? "pass" : "warning"}"><i data-lucide="${validation.valid ? "audio-waveform" : "triangle-alert"}"></i><div><strong>${validation.valid ? "讲授与活动比例合理" : "课时时长不匹配"}</strong><p>${validation.valid ? "讲授 27%，互动与练习 40%，符合新授课建议。" : `当前为 ${validation.total} 分钟，请调整后再导出。`}</p></div></div></section><section class="assistant-section"><div class="assistant-title"><h3>优化建议</h3><span>基于当前流程</span></div><article class="suggestion-card"><span><i data-lucide="messages-square"></i></span><div><strong>让小组互评更可执行</strong><p>加入 3 项同伴互评卡，学生可按“结论、依据、表达”快速反馈。</p><button data-action="apply-suggestion" data-id="activity-2" data-suggestion="加入同伴互评卡，按结论、依据、表达三项反馈。">应用到合作探究</button></div></article><article class="suggestion-card"><span><i data-lucide="layers-3"></i></span><div><strong>为练习增加分层出口</strong><p>基础组识别函数，进阶组解释定义域，挑战组修改反例。</p><button data-action="differentiate">生成分层任务</button></div></article></section>`;
}

function renderGeneralSuggestions(section) {
  return `<section class="assistant-section"><div class="assistant-title"><h3>${section.label}检查</h3><span class="pass">材料已对齐</span></div><div class="rhythm-card pass"><i data-lucide="badge-check"></i><div><strong>已关联课标和教材</strong><p>当前模块引用 2 个可信来源，未发现超出材料的知识结论。</p></div></div></section><section class="assistant-section"><div class="assistant-title"><h3>可用操作</h3><span>仅修改当前模块</span></div><button class="assistant-action" data-action="toast" data-toast="已补充可观察的目标行为"><i data-lucide="list-checks"></i><span><strong>改写为可评价表述</strong><small>使用“判断、解释、举例”等行为词</small></span><i data-lucide="chevron-right"></i></button><button class="assistant-action" data-action="differentiate"><i data-lucide="layers-3"></i><span><strong>生成分层版本</strong><small>基础、达标、进阶三档</small></span><i data-lucide="chevron-right"></i></button></section>`;
}

function renderModal() {
  if (state.modal === "sources") return `<div class="lesson-modal-layer" data-action="close-modal"><section class="lesson-modal source-modal" role="dialog" data-stop-close><div class="modal-head"><div><p class="lesson-eyebrow">生成依据</p><h2>教案内容可追溯到 4 个来源</h2></div><button class="icon-button" data-action="close-modal"><i data-lucide="x"></i></button></div><div class="source-detail-list">${state.materials.filter(item => item.selected).map(item => `<article><span><i data-lucide="${item.icon}"></i></span><div><strong>${item.name}</strong><p>${item.type} · ${item.meta}</p></div><em>已引用</em></article>`).join("")}</div><div class="source-boundary"><i data-lucide="shield-check"></i><p>仅依据已选择且有权限的材料生成教学内容；未找到依据时会明确标记。</p></div><div class="modal-actions"><button class="btn primary" data-action="close-modal">知道了</button></div></section></div>`;
  if (state.modal === "differentiate") return `<div class="lesson-modal-layer" data-action="close-modal"><section class="lesson-modal" role="dialog" data-stop-close><div class="modal-head"><div><p class="lesson-eyebrow">分层教学</p><h2>生成三个学情版本</h2></div><button class="icon-button" data-action="close-modal"><i data-lucide="x"></i></button></div><div class="level-options"><label><input type="checkbox" checked><span><strong>基础支持版</strong><small>增加概念脚手架、示例和提示卡</small></span></label><label><input type="checkbox" checked><span><strong>标准达成版</strong><small>保持当前问题链和练习难度</small></span></label><label><input type="checkbox" checked><span><strong>进阶挑战版</strong><small>增加反例设计与真实情境建模</small></span></label></div><div class="modal-actions"><button class="btn" data-action="close-modal">取消</button><button class="btn primary" data-action="confirm-differentiate">生成分层教案</button></div></section></div>`;
  if (state.modal === "blocked-export") return `<div class="lesson-modal-layer" data-action="close-modal"><section class="lesson-modal compact-modal" role="dialog" data-stop-close><span class="modal-warning"><i data-lucide="circle-alert"></i></span><h2>导出前仍需教师确认</h2><p>请确保教学流程为 45 分钟，并复核目标、重难点、流程、评价和作业中的待复核内容。</p><div class="modal-actions"><button class="btn" data-action="close-modal">继续编辑</button><button class="btn primary" data-action="confirm-all">全部标记已复核</button></div></section></div>`;
  if (state.modal === "export") return `<div class="lesson-modal-layer" data-action="close-modal"><section class="lesson-modal export-modal" role="dialog" data-stop-close><div class="modal-head"><div><p class="lesson-eyebrow">导出教案</p><h2>函数的概念与定义域</h2></div><button class="icon-button" data-action="close-modal"><i data-lucide="x"></i></button></div><div class="export-formats"><button class="selected"><span class="word">W</span><strong>Word</strong><small>保留可编辑结构</small></button><button><span class="pdf">PDF</span><strong>PDF</strong><small>适合打印与归档</small></button></div><label class="export-check"><input type="checkbox" checked><span>附带材料来源与课标映射</span></label><label class="export-check"><input type="checkbox" checked><span>保存到原课程文件夹 / 教案</span></label><div class="modal-actions"><button class="btn" data-action="close-modal">取消</button><button class="btn primary" data-action="confirm-export">导出并保存</button></div></section></div>`;
  return "";
}

function showToast(message) {
  state.toast = message;
  render();
  setTimeout(() => { state.toast = ""; render(); }, 1800);
}

function handleClick(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  if (event.target.closest("[data-stop-close]")) event.stopPropagation();
  const action = target.dataset.action;
  if (action === "toast") return showToast(target.dataset.toast);
  if (action === "setup-step") state.setupStep = Number(target.dataset.step);
  else if (action === "next-step") state.setupStep = Math.min(3, state.setupStep + 1);
  else if (action === "prev-step") state.setupStep = Math.max(1, state.setupStep - 1);
  else if (action === "toggle-material") {
    state.materials = state.materials.map(item => item.id === target.dataset.material ? { ...item, selected: !item.selected } : item);
  } else if (action === "generate-plan") { state.screen = "editor"; state.mobilePane = "outline"; }
  else if (action === "back-setup") state.screen = "setup";
  else if (action === "select-section") { state.activeSection = target.dataset.section; state.mobilePane = "document"; }
  else if (action === "mobile-pane") state.mobilePane = target.dataset.pane;
  else if (action === "adjust-time") {
    const delta = Number(target.dataset.delta);
    state.timeline = state.timeline.map(item => item.id === target.dataset.id ? { ...item, minutes: Math.max(1, item.minutes + delta) } : item);
  } else if (action === "apply-suggestion") {
    state.timeline = applyTeachingSuggestion(state.timeline, target.dataset.id, target.dataset.suggestion);
    showToast("同伴互评卡已加入合作探究环节");
    return;
  } else if (action === "confirm-section") {
    state.sections = state.sections.map(item => item.id === state.activeSection ? { ...item, confirmed: true } : item);
    showToast(`${state.sections.find(item => item.id === state.activeSection)?.label}已标记为教师复核`);
    return;
  } else if (action === "confirm-all") {
    state.sections = state.sections.map(item => item.id === "reflection" ? item : { ...item, confirmed: true });
    state.modal = null;
    showToast("需要课前确认的教案模块已全部复核");
    return;
  } else if (action === "show-sources") state.modal = "sources";
  else if (action === "differentiate") state.modal = "differentiate";
  else if (action === "confirm-differentiate") { state.modal = null; showToast("三个学情版本已生成并关联当前教案"); return; }
  else if (action === "generate-exercises") { showToast("已生成基础 6 题、进阶 3 题和挑战 1 题"); return; }
  else if (action === "export-plan") state.modal = canExportPlan(state.sections, state.timeline, 45) ? "export" : "blocked-export";
  else if (action === "confirm-export") { state.modal = null; showToast("教案 Word 已导出并保存到课程文件夹"); return; }
  else if (action === "close-modal") state.modal = null;
  render();
}

if (root) { root.addEventListener("click", handleClick); render(); }
if (typeof module !== "undefined" && module.exports) module.exports = { INITIAL_TIMELINE, SECTIONS, MATERIALS, calculateTimelineTotal, validateTimeline, applyTeachingSuggestion, canExportPlan };
