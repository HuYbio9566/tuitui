const EXISTING_TOOL_ORDER = [
  "ai-doc",
  "ai-ppt",
  "ai-excel",
  "document-translation",
  "meeting-minutes",
  "file-sharing",
  "file-collection",
  "file-review",
  "pdf-to-word",
  "pdf-to-ppt",
  "pdf-to-excel",
  "image-to-text",
  "audio-to-text",
  "file-templates"
];

const EXISTING_TOOL_DATA = {
  "ai-doc": {
    file: "ai-doc.html",
    group: "推荐应用",
    name: "AI DOC",
    desc: "输入主题快捷生成内容",
    icon: "file-pen-line",
    tag: "限时体验",
    banner: "https://kbase-web.fangcloud.com/download/file?key=73vGHfufWiT/v2l5+zcjgxxnnJ1wlJQ1NfU0vCtfOOk=",
    kind: "doc"
  },
  "ai-ppt": {
    file: "ai-ppt.html",
    group: "推荐应用",
    name: "AI PPT",
    desc: "自动化生成PPT演示文档",
    icon: "presentation",
    tag: "限时体验",
    banner: "https://kbase-web.fangcloud.com/download/file?key=73vGHfufWiT/v2l5+zcjg0X0eue8UYDJlI3ntAjWFjM=",
    kind: "ppt"
  },
  "ai-excel": {
    file: "ai-excel.html",
    group: "推荐应用",
    name: "AI Excel",
    desc: "仅通过聊天，AI即可处理EXCEL和数据分析",
    icon: "sheet",
    tag: "限时体验",
    banner: "https://kbase-web.fangcloud.com/download/file?key=73vGHfufWiT/v2l5+zcjg8L67zyiQFEPOUyIBFeKFZoCDzpS/rUX0ZKOxKng9sKC",
    kind: "excel"
  },
  "document-translation": {
    file: "document-translation.html",
    group: "推荐应用",
    name: "文档翻译",
    desc: "多语言文档对比翻译",
    icon: "languages",
    tag: "限时体验",
    banner: "https://kbase-web.fangcloud.com/download/file?key=73vGHfufWiT/v2l5+zcjg0Ntzj/nTUMA0qu3YukGfV/doqHDEkbg7JUycG6Hmq6O",
    kind: "translation"
  },
  "meeting-minutes": {
    file: "meeting-minutes.html",
    group: "推荐应用",
    name: "会议纪要",
    desc: "根据会议音频生成会议纪要",
    icon: "audio-lines",
    tag: "限时体验",
    banner: "https://kbase-web.fangcloud.com/download/file?key=73vGHfufWiT/v2l5+zcjg++QkWnzPj/SHHiDyUCqPyhEhOapI+lyECwL4nnI6XNU",
    kind: "meeting"
  },
  "file-sharing": { file: "file-sharing.html", group: "文件流转", name: "分享", desc: "全局管理我发起和收到的全部分享", icon: "share-2", kind: "sharing" },
  "file-collection": { file: "file-collection.html", group: "文件流转", name: "收集", desc: "面向多人高效收集文件", icon: "inbox", kind: "collection" },
  "file-review": { file: "file-review.html", group: "文件流转", name: "审阅", desc: "支持多节点的单人、多人审阅", icon: "badge-check", kind: "review" },
  "pdf-to-word": { file: "pdf-to-word.html", group: "文件处理", name: "PDF转Word", desc: "快速批量将PDF转换为Word", icon: "file-type-2", kind: "converter", accept: ".pdf", support: "支持 PDF 文件，单文件最大 100MB", output: "Word", sample: "年度经营分析报告.pdf" },
  "pdf-to-ppt": { file: "pdf-to-ppt.html", group: "文件处理", name: "PDF转PPT", desc: "快速批量将PDF转换为PPT", icon: "file-sliders", kind: "converter", accept: ".pdf", support: "支持 PDF 文件，单文件最大 100MB", output: "PPT", sample: "产品白皮书.pdf" },
  "pdf-to-excel": { file: "pdf-to-excel.html", group: "文件处理", name: "PDF转Excel", desc: "快速批量将PDF转换为Excel", icon: "file-spreadsheet", kind: "converter", accept: ".pdf", support: "支持 PDF 文件，单文件最大 100MB", output: "Excel", sample: "费用明细表.pdf" },
  "image-to-text": { file: "image-to-text.html", group: "文件处理", name: "图片转文字", desc: "智能识别图片中文字", icon: "scan-text", kind: "converter", accept: ".png,.jpg,.jpeg,.bmp,.gif,.tiff,.webp", support: "支持PNG、JPG、JPEG、BMP、GIF、TIFF、WebP，单文件最大10MB", output: "Word", sample: "课堂板书照片.jpg" },
  "audio-to-text": { file: "audio-to-text.html", group: "文件处理", name: "音频转文字", desc: "快速实现转换语音资料", icon: "file-audio", kind: "converter", accept: ".mp3,.wav,.aac,.flac,.ogg,.m4a", support: "支持MP3、WAV、AAC、FLAC、OGG、M4A，单文件最大3GB", output: "Word", sample: "项目周会录音.mp3" },
  "file-templates": { file: "file-templates.html", group: "文件处理", name: "文件模板库", desc: "多种文件模板直接使用", icon: "layout-template", kind: "templates" }
};

const LEGACY_TEMPLATES = [
  ["简历模板（绿色）", "简历", "green"],
  ["简历模板（粉色）", "简历", "pink"],
  ["简历模板（蓝色）", "简历", "blue"],
  ["美术老师简历模板", "简历", "art"],
  ["解除劳动合同协议", "合同", "paper"],
  ["全日制劳动合同", "合同", "paper"],
  ["劳务派遣劳动合同", "合同", "paper"],
  ["实习协议", "合同", "paper"],
  ["保密协议书", "合同", "paper"],
  ["年会策划方案范文", "市场营销", "paper"]
];

function legacyIcon(name, size = 18) {
  return `<i data-lucide="${name}" style="width:${size}px;height:${size}px" aria-hidden="true"></i>`;
}

function legacyNav(active = "existing") {
  return `<nav class="primary-nav" aria-label="汇报导航">
    <a class="primary-nav-link ${active === "report" ? "active" : ""}" href="report.html">调研报告</a>
    <a class="primary-nav-link ${active === "experience" ? "active" : ""}" href="index.html">新增工具</a>
    <a class="primary-nav-link ${active === "existing" ? "active" : ""}" href="existing-tools.html">已有工具</a>
  </nav>`;
}

function legacySidebar() {
  return renderProductSidebar();
}

function legacyTopbar(title, active = "existing") {
  return `<header class="topbar legacy-topbar"><div class="breadcrumb"><strong>${title}</strong></div>${legacyNav(active)}<div class="top-actions"><a class="btn" href="report.html">查看调研</a><a class="btn primary" href="index.html">对比新增工具</a></div></header>`;
}

function initLegacyIcons(root = document) {
  if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.7 } });
  root.querySelectorAll("[data-legacy-toast]").forEach(node => node.addEventListener("click", () => legacyToast(node.dataset.legacyToast)));
}

let legacyToastTimer;
function legacyToast(message) {
  const toast = document.getElementById("legacyToast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(legacyToastTimer);
  legacyToastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function legacyModal(title, body, options = {}) {
  const host = document.getElementById("legacyModal");
  const confirmText = options.confirmText || "确认";
  host.innerHTML = `<div class="legacy-modal-backdrop" data-modal-close><section class="legacy-modal" role="dialog" aria-modal="true" aria-label="${title}"><header><h3>${title}</h3><button class="legacy-icon-btn" type="button" data-modal-close aria-label="关闭">${legacyIcon("x")}</button></header><div class="legacy-modal-body">${body}</div><footer><button class="btn" type="button" data-modal-close>取消</button><button class="btn primary" type="button" id="legacyModalConfirm">${confirmText}</button></footer></section></div>`;
  host.classList.add("open");
  host.querySelectorAll("[data-modal-close]").forEach(node => node.addEventListener("click", event => {
    if (node.classList.contains("legacy-modal-backdrop") && event.target !== node) return;
    host.classList.remove("open");
  }));
  document.getElementById("legacyModalConfirm").addEventListener("click", () => {
    if (options.onConfirm) options.onConfirm(host);
    else host.classList.remove("open");
  });
  initLegacyIcons(host);
  if (options.onOpen) options.onOpen(host);
}

function cloudPicker(onPick, title = "从云盘选择") {
  const files = ["2026年度工作计划.docx", "项目复盘报告.pdf", "经营数据汇总.xlsx", "产品白皮书.pptx"];
  const pickerHost = document.createElement("div");
  pickerHost.className = "legacy-picker-overlay";
  pickerHost.innerHTML = `<div class="legacy-modal-backdrop"><section class="legacy-modal" role="dialog" aria-modal="true" aria-label="${title}"><header><h3>${title}</h3><button class="legacy-icon-btn" type="button" data-picker-close aria-label="关闭">${legacyIcon("x")}</button></header><div class="legacy-modal-body"><div class="legacy-picker"><aside><div class="legacy-picker-search">${legacyIcon("search", 15)} 输入并搜索文件...</div><strong>企业文件</strong><button class="is-active" type="button">${legacyIcon("folder", 16)} DEMO</button><button type="button">${legacyIcon("folder", 16)} 群组空间</button><button type="button">${legacyIcon("user-round", 16)} 个人空间</button><button type="button">${legacyIcon("users", 16)} 与我协作</button></aside><div class="legacy-picker-main"><div class="legacy-picker-breadcrumb">企业文件 / DEMO</div><div class="legacy-file-table">${files.map((file, index) => `<label><input type="radio" name="cloudFileNested" value="${file}" ${index === 0 ? "checked" : ""}><span class="legacy-file-icon">${legacyIcon(file.endsWith("xlsx") ? "sheet" : "file-text", 17)}</span><span>${file}</span><small>${index + 2} MB</small></label>`).join("")}</div></div></div></div><footer><button class="btn" type="button" data-picker-close>取消</button><button class="btn primary" type="button" data-picker-confirm>选择</button></footer></section></div>`;
  document.body.appendChild(pickerHost);
  pickerHost.querySelectorAll("[data-picker-close]").forEach(button => button.addEventListener("click", () => pickerHost.remove()));
  pickerHost.querySelector("[data-picker-confirm]").addEventListener("click", () => {
    const selected = pickerHost.querySelector('input[name="cloudFileNested"]:checked');
    if (!selected) return;
    const value = selected.value;
    pickerHost.remove();
    onPick(value);
  });
  initLegacyIcons(pickerHost);
}

function renderExistingHome() {
  document.title = "工具 · 360AI企业知识库";
  const groups = ["推荐应用", "文件流转", "文件处理"];
  const sections = groups.map(group => {
    const items = EXISTING_TOOL_ORDER.map(id => ({ id, ...EXISTING_TOOL_DATA[id] })).filter(item => item.group === group);
    if (group === "推荐应用") {
      return `<section class="legacy-home-section" id="legacy-recommended"><h2>推荐应用</h2><div class="legacy-feature-grid">${items.map(item => `<a class="legacy-feature-card" href="${item.file}"><div class="legacy-banner"><img src="${item.banner}" alt="${item.name} 功能场景"></div><div><strong>${item.name}</strong><p>${item.desc}</p></div></a>`).join("")}</div></section>`;
    }
    return `<section class="legacy-home-section" id="${group === "文件流转" ? "legacy-workflow" : "legacy-processing"}"><h2>${group}</h2><div class="legacy-compact-grid ${group === "文件处理" ? "is-processing" : ""}">${items.map((item, index) => `<a class="legacy-compact-card tone-${index % 6}" href="${item.file}"><span class="legacy-compact-icon">${legacyIcon(item.icon, 22)}</span><div><strong>${item.name}</strong><p>${item.desc}</p></div></a>`).join("")}</div></section>`;
  }).join("");

  document.body.innerHTML = `<div class="app-shell">${legacySidebar()}<main class="main">${legacyTopbar("工具")}<div class="legacy-home"><div class="legacy-home-title"><h1>巧用<span>工具</span>，工作挑战轻松应对</h1><nav><a class="is-active" href="#legacy-recommended">推荐应用</a><a href="#legacy-workflow">文件流转</a><a href="#legacy-processing">文件处理</a></nav></div>${sections}</div></main></div><div class="toast" id="legacyToast"></div><div id="legacyModal"></div>`;
  document.querySelectorAll(".legacy-home-title nav a").forEach(link => link.addEventListener("click", () => {
    document.querySelectorAll(".legacy-home-title nav a").forEach(item => item.classList.toggle("is-active", item === link));
  }));
  initLegacyIcons();
}

function detailShell(tool, content, extraClass = "") {
  document.title = `${tool.name} · 360AI企业知识库`;
  document.body.innerHTML = `<div class="app-shell">${legacySidebar()}<main class="main">${legacyTopbar(tool.name)}<div class="legacy-detail ${extraClass}"><div class="legacy-detail-toolbar"><a href="existing-tools.html">${legacyIcon("arrow-left", 16)} 返回工具中心</a><div><button class="btn" type="button" data-legacy-toast="暂无历史记录">使用记录</button><button class="btn primary" type="button" data-legacy-toast="这是可交互原型，所有处理均为本地演示">使用帮助</button></div></div>${content}</div></main></div><div class="toast" id="legacyToast"></div><div id="legacyModal"></div>`;
  initLegacyIcons();
}

function docTemplateCards() {
  const names = ["检察院审查报告", "年审报告模板", "浙大教学案例", "可研模板", "设备采购技术规范书模板", "教学设计2", "Q3项目立项", "产品规格书", "采购合同", "宣传推广计划书", "会议纪要", "总结报告"];
  return names.map((name, index) => `<article class="legacy-doc-template" data-doc-template="${name}"><div class="legacy-doc-paper"><span></span><span></span><span></span><b>${index % 3 === 0 ? "360 AI" : "DOC"}</b></div><strong>${name}</strong><div><button type="button" data-template-preview="${name}">预览</button><button type="button" data-doc-create="${name}">使用</button></div></article>`).join("");
}

function renderAiDoc(tool) {
  detailShell(tool, `<section class="legacy-doc-hero"><div><span>AI DOC</span><h1>AI帮你写文档</h1><p>从主题、资料到可编辑全文，保留清晰的生成步骤。</p></div></section><div class="legacy-doc-actions"><button type="button" data-doc-mode="quick"><span>${legacyIcon("wand-sparkles", 26)}</span><b>快速创作</b><small>分分钟帮你生成文档</small></button><button type="button" data-doc-mode="long"><span>${legacyIcon("book-open-text", 26)}</span><b>长文写作</b><small>学术论文、研究报告等万字长文</small></button><button type="button" data-doc-history><span>${legacyIcon("history", 26)}</span><b>我的创建</b><small>由我创建的历史文档</small></button></div><div class="legacy-section-line"><h2>推荐模板</h2><div class="legacy-inline-tabs"><button class="is-active">全部</button><button>公文写作</button><button>教育教案</button><button>职场办公</button></div></div><div class="legacy-doc-grid">${docTemplateCards()}</div>`, "legacy-doc-page");
  document.querySelectorAll("[data-doc-mode]").forEach(button => button.addEventListener("click", () => openDocCreator(button.dataset.docMode)));
  document.querySelector("[data-doc-history]").addEventListener("click", () => legacyModal("我的创建", `<div class="legacy-empty-state">${legacyIcon("file-clock", 42)}<h3>暂无历史文档</h3><p>完成一次文档生成后，记录会展示在这里。</p></div>`, { confirmText: "新建文档", onConfirm(host) { host.classList.remove("open"); openDocCreator("quick"); } }));
  document.querySelectorAll("[data-template-preview]").forEach(button => button.addEventListener("click", event => { event.stopPropagation(); openTemplatePreview(button.dataset.templatePreview); }));
  document.querySelectorAll("[data-doc-create]").forEach(button => button.addEventListener("click", event => { event.stopPropagation(); openDocCreator("quick", button.dataset.docCreate); }));
}

function openDocCreator(mode, preset = "") {
  const long = mode === "long";
  legacyModal(long ? "长文写作" : "快速创作", `<div class="legacy-step-line"><span class="is-active">1 配置信息</span><span>${long ? "2 生成大纲" : "2 生成全文"}</span>${long ? "<span>3 生成全文</span>" : ""}</div><div class="legacy-form-grid"><label class="is-full">主题名称<input id="docTopic" value="${preset}" placeholder="请输入主题/标题"></label><label>输出语言<select><option>中文</option><option>英文</option></select></label>${long ? "" : "<label>字数要求<select><option>800</option><option>1500</option><option>3000</option></select></label>"}<label class="is-full">参考材料<div class="legacy-upload-inline"><button type="button" id="docLocal">${legacyIcon("upload", 16)} 本地上传</button><button type="button" id="docCloud">${legacyIcon("cloud", 16)} 云端选择</button><span id="docFileState">当前仅支持pdf/docx/txt/xlsx，最多3个文件</span></div></label><label class="is-full">补充说明<textarea placeholder="简单主题概述、目的阐述、特点描述、重点强调、难点分析"></textarea></label></div>`, {
    confirmText: long ? "生成大纲" : "AI一键生成",
    onOpen(host) {
      host.querySelector("#docCloud").addEventListener("click", () => cloudPicker(file => { document.getElementById("docFileState").textContent = file; }, "选择参考材料"));
      host.querySelector("#docLocal").addEventListener("click", () => document.getElementById("docFileState").textContent = "本地参考材料.docx");
    },
    onConfirm(host) {
      const topic = host.querySelector("#docTopic");
      if (!topic.value.trim()) { topic.focus(); topic.classList.add("is-error"); return; }
      host.querySelector(".legacy-modal-body").innerHTML = `<div class="legacy-generating">${legacyIcon("loader-circle", 38)}<h3>${long ? "正在生成大纲" : "正在生成全文"}</h3><p>正在理解主题、组织结构并匹配参考材料...</p><div><span></span></div></div>`;
      host.querySelector("footer").style.display = "none";
      initLegacyIcons(host);
      setTimeout(() => {
        host.classList.remove("open");
        showDocResult(topic.value, long);
      }, 1200);
    }
  });
}

function showDocResult(topic, long) {
  legacyModal("生成结果", `<div class="legacy-doc-result"><div class="legacy-result-meta"><span>已生成</span><span>${long ? "约 5,200 字" : "约 860 字"}</span><span>来源 2 份</span></div><h2>${topic}</h2><h3>一、背景与目标</h3><p>围绕当前业务目标，系统整理了背景信息、核心问题和可执行方向，并将参考材料中的关键结论融入正文。</p><h3>二、实施重点</h3><p>建议从用户场景、能力闭环和结果交付三个层面推进，明确负责人、时间节点和验收标准。</p><h3>三、后续计划</h3><p>先完成小范围验证，再根据使用数据优化模板和生成策略。</p></div>`, { confirmText: "保存到云盘", onConfirm(host) { host.classList.remove("open"); legacyToast("文档已保存到云盘（演示）"); } });
}

function openTemplatePreview(name) {
  legacyModal(name, `<div class="legacy-template-preview"><div class="legacy-preview-page"><h2>${name}</h2><p>姓名 / 部门 / 日期</p><hr><h3>一、基本信息</h3><p>这是模板内容预览。正式使用后可在云文档中继续编辑。</p><h3>二、正文结构</h3><p>模板已预置常用章节、字段和排版规范。</p></div><aside><span class="legacy-status">官方推荐</span><h3>${name}</h3><p>Word 模板 · 可在线编辑</p><ul><li>结构完整</li><li>样式规范</li><li>支持云端协作</li></ul></aside></div>`, { confirmText: "使用此模板", onConfirm(host) { host.classList.remove("open"); legacyToast("已基于模板创建文档（演示）"); } });
}

function renderAiPpt(tool) {
  detailShell(tool, `<div class="legacy-agent-shell"><aside class="legacy-agent-nav"><strong>${legacyIcon("presentation", 22)} PPT 专家</strong><button class="is-active">${legacyIcon("plus", 16)} 新建对话</button><button>${legacyIcon("layout-template", 16)} 模板管理</button><button>${legacyIcon("trash-2", 16)} 回收站</button><button>${legacyIcon("history", 16)} 历史任务</button></aside><section class="legacy-agent-main"><div class="legacy-agent-hero"><h1>AI 赋能 PPT 创作<br>只需<span>一篇文档</span></h1><div class="legacy-mode-switch"><button class="is-active" data-ppt-mode="输入主题">输入主题</button><button data-ppt-mode="导入文件">导入文件</button><button data-ppt-mode="PPT美化">PPT美化</button></div><div class="legacy-super-input"><textarea id="pptPrompt" placeholder="请输入PPT主题与要求，例如：生成一份教育行业AI工具调研汇报"></textarea><div><button type="button" data-legacy-toast="参考模板已选择">${legacyIcon("paperclip", 17)} 上传参考模板</button><button class="legacy-send" type="button" id="pptGenerate">${legacyIcon("arrow-up", 17)}</button></div></div></div><div class="legacy-section-line"><h2>选择模板创作</h2><div class="legacy-inline-tabs"><button class="is-active">官方模板</button><button>企业模板</button><button>我的模板</button></div></div><div class="legacy-ppt-grid">${["灵活排版", "温暖日落风格模板", "中台汇报模板-1", "紫粉古青风格模板", "余烬锻造风格模板"].map((name, index) => `<button type="button" data-ppt-template="${name}"><span class="ppt-cover ppt-${index}"><b>${index + 1 < 10 ? "0" + (index + 1) : index + 1}</b><i></i></span><strong>${name}</strong></button>`).join("")}</div></section></div>`, "legacy-agent-page");
  document.querySelectorAll("[data-ppt-mode]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-ppt-mode]").forEach(item => item.classList.toggle("is-active", item === button));
    document.getElementById("pptPrompt").placeholder = button.dataset.pptMode === "输入主题" ? "请输入PPT主题与要求" : button.dataset.pptMode === "导入文件" ? "请选择文档，AI 将提炼结构并生成 PPT" : "请选择现有PPT并描述需要优化的风格";
  }));
  document.querySelectorAll("[data-ppt-template]").forEach(button => button.addEventListener("click", () => { document.getElementById("pptPrompt").value = `使用“${button.dataset.pptTemplate}”生成一份教育行业AI工具调研汇报`; legacyToast("模板已选择"); }));
  document.getElementById("pptGenerate").addEventListener("click", () => runPptGeneration());
}

function runPptGeneration() {
  const input = document.getElementById("pptPrompt");
  if (!input.value.trim()) { input.value = "云盘AI工具商业化方案汇报"; }
  legacyModal("生成 PPT", `<div class="legacy-generating">${legacyIcon("loader-circle", 38)}<h3>正在生成演示文稿</h3><p>提炼主题、生成大纲、匹配版式与视觉模板...</p><div><span></span></div></div>`, { confirmText: "后台生成", onConfirm() {} });
  document.querySelector("#legacyModal footer").style.display = "none";
  setTimeout(() => legacyModal("PPT 已生成", `<div class="legacy-ppt-result"><aside>${["封面", "行业现状", "用户场景", "工具规划", "商业化方案", "实施路线"].map((name, i) => `<button class="${i === 0 ? "is-active" : ""}"><span>${i + 1}</span>${name}</button>`).join("")}</aside><div class="legacy-slide-preview"><span>360 AI 企业知识库</span><h2>${input.value}</h2><p>基于云盘文件的 AI 工具商业化方案</p><small>2026 · 产品方案汇报</small></div></div>`, { confirmText: "导出 PPT", onConfirm(host) { host.classList.remove("open"); legacyToast("PPT 导出完成（演示）"); } }), 1100);
}

function renderAiExcel(tool) {
  const cases = ["银行流水核查", "公司财务状况分析", "校招简历投递综合分析", "人力报表全景诊断", "订单管理", "进销存管理", "销售数据仪表盘", "多次考试成绩分析"];
  detailShell(tool, `<div class="legacy-excel-head"><span>AI EXCEL</span><h1>仅通过聊天，AI即可处理EXCEL和数据分析</h1><p>上传表格或选择业务案例，快速获得分析结论和可视化结果。</p><button class="btn primary" id="excelUpload">${legacyIcon("plus", 17)} 新建会话</button></div><div class="legacy-excel-tabs"><button class="is-active">工作台</button><button>AI Excel-Max <span>推荐</span></button><button>历史会话</button><button>我的文件</button><button>工具箱</button></div><div class="legacy-super-input legacy-excel-input"><textarea id="excelPrompt" placeholder="上传表格文件，快速进行表格处理和数据分析洞察"></textarea><div><button id="excelSample" type="button">${legacyIcon("paperclip", 17)} 加载示例表格</button><button class="legacy-send" type="button" id="excelRun">${legacyIcon("arrow-up", 17)}</button></div></div><div class="legacy-section-line"><h2>业务场景</h2><div class="legacy-inline-tabs"><button class="is-active">全部</button><button>财务会计</button><button>人力行政</button><button>生产制造</button><button>教育培训</button></div></div><div class="legacy-case-grid">${cases.map((name, index) => `<button type="button" data-excel-case="${name}"><span>${legacyIcon(["landmark", "chart-no-axes-combined", "users", "contact", "shopping-bag", "boxes", "chart-column-big", "graduation-cap"][index], 22)}</span><strong>${name}</strong><small>上传表格，一键生成分析报告</small></button>`).join("")}</div>`, "legacy-excel-page");
  document.getElementById("excelUpload").addEventListener("click", () => document.getElementById("excelPrompt").focus());
  document.getElementById("excelSample").addEventListener("click", () => { document.getElementById("excelPrompt").value = "分析 2026 上半年各渠道销售额、增长率和目标达成情况"; legacyToast("示例表格已加载"); });
  document.querySelectorAll("[data-excel-case]").forEach(button => button.addEventListener("click", () => { document.getElementById("excelPrompt").value = `请完成“${button.dataset.excelCase}”，输出关键结论和异常项`; document.getElementById("excelPrompt").scrollIntoView({ behavior: "smooth", block: "center" }); }));
  document.getElementById("excelRun").addEventListener("click", runExcelAnalysis);
}

function runExcelAnalysis() {
  const input = document.getElementById("excelPrompt");
  if (!input.value.trim()) input.value = "分析示例销售数据并找出异常渠道";
  legacyModal("AI Excel 分析结果", `<div class="legacy-excel-result"><div class="legacy-result-summary"><span>${legacyIcon("sparkles", 18)}</span><p>已分析 1,286 行数据。上半年销售额同比增长 18.6%，社群转介绍达成率最高；小红书渠道 5 月获客成本异常上升。</p></div><div class="legacy-chart"><div style="height:52%"><span>1月</span></div><div style="height:66%"><span>2月</span></div><div style="height:61%"><span>3月</span></div><div style="height:78%"><span>4月</span></div><div style="height:70%"><span>5月</span></div><div style="height:91%"><span>6月</span></div></div><table><thead><tr><th>渠道</th><th>销售额</th><th>增长率</th><th>状态</th></tr></thead><tbody><tr><td>社群转介绍</td><td>¥ 286 万</td><td>+32.4%</td><td><span>领先</span></td></tr><tr><td>小红书</td><td>¥ 174 万</td><td>+8.2%</td><td><em>需关注</em></td></tr><tr><td>搜索投放</td><td>¥ 221 万</td><td>+16.7%</td><td><span>正常</span></td></tr></tbody></table></div>`, { confirmText: "导出分析报告", onConfirm(host) { host.classList.remove("open"); legacyToast("分析报告已导出（演示）"); } });
}

function renderTranslation(tool) {
  detailShell(tool, `<div class="legacy-translation"><h1>文档翻译，<span id="translationSlogan">保持原文格式排版</span></h1><div class="legacy-mode-switch"><button class="is-active" data-translation-mode="document">文档</button><button data-translation-mode="image">图片</button><button data-translation-mode="text">文本</button></div><div class="legacy-language-row"><select disabled><option>自动检测语言</option></select><button type="button">${legacyIcon("arrow-right-left", 18)}</button><select><option>中文（简体）</option><option>英文</option><option>日语</option></select></div><div id="translationWorkspace"></div></div>`, "legacy-translation-page");
  const setMode = mode => {
    document.querySelectorAll("[data-translation-mode]").forEach(button => button.classList.toggle("is-active", button.dataset.translationMode === mode));
    const workspace = document.getElementById("translationWorkspace");
    const slogans = { document: "保持原文格式排版", image: "专业术语智能识别", text: "精准翻译多种语言" };
    document.getElementById("translationSlogan").textContent = slogans[mode];
    if (mode === "text") {
      workspace.innerHTML = `<div class="legacy-text-translate"><textarea id="sourceText" maxlength="5000" placeholder="请输入...">The course materials are ready for the spring semester.</textarea><div>${legacyIcon("languages", 30)}</div><textarea readonly id="targetText" placeholder="翻译结果将显示在这里"></textarea></div><button class="btn primary legacy-translate-button" id="translateRun">立即翻译</button>`;
    } else {
      const type = mode === "document" ? "文件" : "图片";
      const support = mode === "document" ? "支持 PDF（含扫描件）、doc、docx、ppt、pptx、html、txt；单文件不超过50MB" : "支持 JPG、JPEG、PNG、BMP、WEBP；单文件不超过10MB";
      workspace.innerHTML = `<div class="legacy-translation-drop"><span>${legacyIcon(mode === "document" ? "file-up" : "image-up", 40)}</span><h3>点击或将${type}拖拽到这里上传</h3><p>${support}</p><div><button class="btn" id="translationLocal">从本地选择</button><button class="btn primary" id="translationSample">加载示例${type}</button></div></div><div class="legacy-selected-translation" id="translationSelected" hidden></div>`;
    }
    initLegacyIcons(workspace);
    const run = document.getElementById("translateRun");
    if (run) run.addEventListener("click", () => { document.getElementById("targetText").value = "春季学期的课程资料已经准备完成。"; legacyToast("翻译完成"); });
    const sample = document.getElementById("translationSample");
    if (sample) sample.addEventListener("click", () => {
      const selected = document.getElementById("translationSelected");
      selected.hidden = false;
      selected.innerHTML = `${legacyIcon("file-check-2", 22)}<div><strong>${mode === "document" ? "课程介绍_英文版.docx" : "英文课程表.png"}</strong><small>已识别为英文</small></div><button class="btn primary" id="fileTranslateRun">开始翻译</button>`;
      initLegacyIcons(selected);
      document.getElementById("fileTranslateRun").addEventListener("click", () => legacyModal("翻译结果", `<div class="legacy-compare-doc"><section><span>原文</span><h3>Course introduction</h3><p>Our curriculum combines project-based learning with weekly feedback.</p></section><section><span>译文</span><h3>课程介绍</h3><p>我们的课程将项目式学习与每周反馈相结合。</p></section></div>`, { confirmText: "下载译文", onConfirm(host) { host.classList.remove("open"); legacyToast("译文已下载（演示）"); } }));
    });
    const local = document.getElementById("translationLocal");
    if (local) local.addEventListener("click", () => sample.click());
  };
  document.querySelectorAll("[data-translation-mode]").forEach(button => button.addEventListener("click", () => setMode(button.dataset.translationMode)));
  setMode("document");
}

function renderMeeting(tool) {
  const history = [["00:19:28", "国家医保局高质量发展发布会", "医保体系建设、集采和跨省结算"], ["00:06:13", "人工智能驱动人类文明新形态", "人工智能对教育与生产力的影响"], ["00:32:30", "十九届六中全会公报", "百年奋斗成就与历史经验"]];
  detailShell(tool, `<div class="legacy-meeting"><h1>会议纪要，<span>快速提炼关键</span></h1><div class="legacy-meeting-actions"><article><span>即录即转</span><h2>实时速记纪要无忧</h2><p>实时语音转文字</p><button class="btn primary" id="meetingRealtime">${legacyIcon("mic", 17)} 开启实时记录</button></article><article><span>会后必备</span><h2>音频一键生纪要</h2><p>音频转文字，一键导出</p><button class="btn primary" id="meetingUpload">${legacyIcon("upload", 17)} 上传音频文件</button></article></div><div class="legacy-meeting-history">${history.map(item => `<article><div><span>${legacyIcon("circle-play", 23)}</span><small>${item[0]}</small></div><strong>${item[1]}</strong><p>${item[2]}</p></article>`).join("")}</div></div>`, "legacy-meeting-page");
  document.getElementById("meetingUpload").addEventListener("click", () => openMeetingProcess("项目需求评审会.mp3"));
  document.getElementById("meetingRealtime").addEventListener("click", () => legacyModal("实时记录", `<div class="legacy-recording"><span>${legacyIcon("mic", 38)}</span><h3>正在实时记录</h3><b id="recordTimer">00:00:08</b><p>“我们先确认本周的项目目标和风险项...”</p></div>`, { confirmText: "结束并生成纪要", onConfirm(host) { host.classList.remove("open"); showMeetingResult("实时会议记录"); } }));
}

function openMeetingProcess(file) {
  legacyModal("上传音频文件", `<div class="legacy-uploaded-audio">${legacyIcon("file-audio", 34)}<div><strong>${file}</strong><small>18.6 MB · 预计 2 分钟完成</small></div></div><label class="legacy-form-label">纪要模板<select><option>通用会议纪要</option><option>项目评审</option><option>访谈纪要</option></select></label><label class="legacy-form-label">识别语言<select><option>自动识别</option><option>普通话</option><option>中英混合</option></select></label>`, { confirmText: "开始生成", onConfirm(host) { host.querySelector(".legacy-modal-body").innerHTML = `<div class="legacy-generating">${legacyIcon("loader-circle", 38)}<h3>正在生成会议纪要</h3><p>语音转写、区分发言人、提炼议题与待办...</p><div><span></span></div></div>`; host.querySelector("footer").style.display = "none"; initLegacyIcons(host); setTimeout(() => { host.classList.remove("open"); showMeetingResult(file); }, 1100); } });
}

function showMeetingResult(title) {
  legacyModal("会议纪要", `<div class="legacy-meeting-result"><div><span class="legacy-status">已完成</span><h2>${title}</h2><p>时长 28:16 · 3 位发言人 · 识别准确率 96%</p></div><section><h3>会议摘要</h3><p>会议确认了首批 AI 工具范围、体验原型交付时间和商业化验证指标。</p></section><section><h3>待办事项</h3><label><input type="checkbox" checked> 产品：周五前完成 8 个工具体验流程</label><label><input type="checkbox"> 技术：评估票据核验接口与成本</label><label><input type="checkbox"> 设计：统一已有工具与新增工具视觉规范</label></section></div>`, { confirmText: "导出纪要", onConfirm(host) { host.classList.remove("open"); legacyToast("会议纪要已导出（演示）"); } });
}

function workflowTabs() {
  return `<div class="legacy-list-tabs"><button class="is-active">我发起的</button><button>我收到的</button><button>抄送给我的</button></div>`;
}

function renderWorkflow(tool) {
  const configs = {
    sharing: { action: "分享给同事", empty: "你还没有发起分享", icon: "share-2" },
    collection: { action: "发起收集", empty: "暂无收集", icon: "inbox" },
    review: { action: "发起审阅", empty: "暂无审阅", icon: "badge-check" }
  };
  const config = configs[tool.kind];
  detailShell(tool, `<section class="legacy-workflow-page"><div class="legacy-page-heading"><div><h1>${tool.name}</h1><p>${tool.desc}</p></div><button class="btn primary" id="workflowStart">${legacyIcon("plus", 17)} ${config.action}</button></div>${workflowTabs()}<div class="legacy-list-filter"><button class="is-active">全部</button><button>进行中</button><button>已完成</button><button>已失效</button></div><div class="legacy-workflow-empty" id="workflowEmpty">${legacyIcon(config.icon, 46)}<h3>${config.empty}</h3><p>点击右上角按钮开始创建</p></div><div id="workflowRows" class="legacy-workflow-rows"></div></section>`, "legacy-workflow-detail");
  document.getElementById("workflowStart").addEventListener("click", () => {
    if (tool.kind === "sharing") startSharing();
    if (tool.kind === "collection") startCollection();
    if (tool.kind === "review") startReview();
  });
}

function addWorkflowRow(title, meta, status = "进行中") {
  const rows = document.getElementById("workflowRows");
  document.getElementById("workflowEmpty").style.display = "none";
  rows.innerHTML = `<article><span>${legacyIcon("file-check-2", 24)}</span><div><strong>${title}</strong><p>${meta}</p></div><em>${status}</em><button class="legacy-icon-btn" data-legacy-toast="更多操作（演示）">${legacyIcon("ellipsis")}</button></article>` + rows.innerHTML;
  initLegacyIcons(rows);
}

function startSharing() {
  cloudPicker(file => legacyModal("分享设置", `<div class="legacy-selected-file">${legacyIcon("file-text", 24)}<div><strong>${file}</strong><small>企业文件 / DEMO</small></div></div><div class="legacy-form-grid"><label class="is-full">分享对象<input value="项目协作组" placeholder="选择同事或部门"></label><label>文件权限<select><option>可预览</option><option>可下载</option><option>可编辑</option></select></label><label>有效期<select><option>7天</option><option>30天</option><option>永久有效</option></select></label><label class="is-full">访问安全<div class="legacy-radio-line"><label><input type="radio" name="shareSafe" checked> 仅指定成员</label><label><input type="radio" name="shareSafe"> 链接密码</label></div></label></div>`, { confirmText: "创建分享", onConfirm(host) { host.classList.remove("open"); addWorkflowRow(file, "分享给：项目协作组 · 7天有效"); legacyToast("分享已创建（演示）"); } }), "发起分享");
}

function startCollection() {
  legacyModal("发起收集", `<div class="legacy-form-grid"><label class="is-full">收集标题<input id="collectionTitle" value="2026春季课程资料收集" maxlength="30" placeholder="必填，最多30个字"></label><label class="is-full">存放文件夹<div class="legacy-select-row"><input value="企业文件 / DEMO / 课程资料" readonly><button class="btn" type="button" id="collectionFolder">选择</button></div></label><label class="is-full">收集参与人<div class="legacy-radio-line"><label><input type="radio" name="collectPeople" checked> 任何人（通过链接，无需账号）</label><label><input type="radio" name="collectPeople"> 指定成员</label></div></label><label class="is-full">收集描述<textarea>请按“姓名+课程名称”上传课件、教案和练习题。</textarea></label><label>截止时间<select><option>无</option><option>7天后</option><option>30天后</option></select></label><label>文件统一命名<select><option>姓名 + 文件原始名</option><option>部门 + 文件原始名</option></select></label></div>`, { confirmText: "发起收集", onConfirm(host) { const title = host.querySelector("#collectionTitle").value.trim(); if (!title) return; host.classList.remove("open"); addWorkflowRow(title, "任何人可提交 · 存放至课程资料", "收集中"); legacyToast("收集任务已创建（演示）"); }, onOpen(host) { host.querySelector("#collectionFolder").addEventListener("click", () => cloudPicker(() => legacyToast("文件夹已选择"), "选择存放文件夹")); } });
}

function startReview() {
  legacyModal("发起审阅", `<div class="legacy-form-grid"><label class="is-full">审阅标题<input id="reviewTitle" value="课程合作协议审阅" maxlength="100"></label><label class="is-full">审阅文件<div class="legacy-select-row"><input id="reviewFile" value="课程合作协议_v3.docx" readonly><button class="btn" type="button" id="reviewPick">添加文件</button></div></label><label class="is-full">审阅流程<div class="legacy-review-flow"><div><span>1</span><strong>提交文件</strong><small>test1</small></div><i></i><div><span>2</span><strong>法务审阅</strong><small>王敏、李哲</small></div><button type="button">${legacyIcon("plus", 15)} 新增节点</button></div></label><label class="is-full">抄送人<input value="项目负责人"></label><label class="is-full">备注<textarea maxlength="500">请重点审阅付款、违约责任和知识产权条款。</textarea></label></div>`, { confirmText: "发起审阅", onConfirm(host) { const title = host.querySelector("#reviewTitle").value.trim(); if (!title) return; host.classList.remove("open"); addWorkflowRow(title, "2个审阅节点 · 抄送项目负责人", "待处理"); legacyToast("审阅流程已发起（演示）"); }, onOpen(host) { host.querySelector("#reviewPick").addEventListener("click", () => cloudPicker(file => { document.getElementById("reviewFile").value = file; }, "选择审阅文件")); } });
}

function renderConverter(tool) {
  const ocr = tool.file === "pdf-to-word.html" ? `<p>想要OCR扫描？点击 <button type="button" data-legacy-toast="已切换为扫描PDF转WORD">扫描PDF转WORD</button></p>` : "";
  detailShell(tool, `<section class="legacy-converter"><div class="legacy-converter-head"><h1>${tool.name}</h1><button type="button" id="converterHistory">${legacyIcon("history", 17)} 我转换的文件</button></div><div class="legacy-converter-stage" id="converterStage"><div class="legacy-converter-empty"><span>${legacyIcon(tool.icon, 50)}</span><h2>${tool.name.includes("图片") ? "请选择图片开启转换" : "请选择文件开始转换"}</h2><div><label class="btn" for="converterInput">从本地选择</label><button class="btn primary" type="button" id="converterCloud">从云盘选择</button><button class="btn" type="button" id="converterSample">加载示例</button></div><small>${tool.support}</small>${ocr}</div></div></section><input id="converterInput" type="file" accept="${tool.accept}" hidden>`, "legacy-converter-page");
  const start = name => showConverterFile(tool, name);
  document.getElementById("converterInput").addEventListener("change", event => { if (event.target.files[0]) start(event.target.files[0].name); });
  document.getElementById("converterCloud").addEventListener("click", () => cloudPicker(start));
  document.getElementById("converterSample").addEventListener("click", () => start(tool.sample));
  document.getElementById("converterHistory").addEventListener("click", () => legacyModal("我转换的文件", `<div class="legacy-empty-state">${legacyIcon("folder-clock", 42)}<h3>暂无转换记录</h3><p>转换结果仅保留7天，请及时保存到云盘。</p></div>`, { confirmText: "知道了" }));
}

function showConverterFile(tool, name) {
  const stage = document.getElementById("converterStage");
  stage.innerHTML = `<div class="legacy-convert-file"><span>${legacyIcon(tool.icon, 34)}</span><div><strong>${name}</strong><small>已准备 · 3.6 MB</small></div><button class="btn" type="button" id="converterReplace">重新选择</button><button class="btn primary" type="button" id="converterRun">开始转换</button></div><div class="legacy-convert-options"><label>识别模式<select><option>自动识别</option><option>OCR增强</option></select></label><label>输出格式<select><option>${tool.output}</option></select></label></div>`;
  initLegacyIcons(stage);
  document.getElementById("converterReplace").addEventListener("click", () => document.getElementById("converterInput").click());
  document.getElementById("converterRun").addEventListener("click", () => {
    stage.innerHTML = `<div class="legacy-converting">${legacyIcon("loader-circle", 44)}<h2>正在转换</h2><p>解析文件结构并生成 ${tool.output} 文档...</p><div><span></span></div></div>`;
    initLegacyIcons(stage);
    setTimeout(() => {
      const outputName = name.replace(/\.[^.]+$/, "") + (tool.output === "PPT" ? ".pptx" : tool.output === "Excel" ? ".xlsx" : ".docx");
      stage.innerHTML = `<div class="legacy-convert-success"><span>${legacyIcon("circle-check-big", 48)}</span><h2>转换完成</h2><p>转换后的文档仅保存7天，请尽快保存到网盘。</p><div class="legacy-result-file"><span>${legacyIcon("file-check-2", 26)}</span><div><strong>${outputName}</strong><small>转换时间：刚刚</small></div><button class="btn" data-legacy-toast="文件已保存到云盘（演示）">保存到云盘</button><button class="btn primary" data-legacy-toast="文件下载完成（演示）">下载</button></div><button class="btn" type="button" id="convertAgain">继续转换</button></div>`;
      initLegacyIcons(stage);
      document.getElementById("convertAgain").addEventListener("click", () => location.reload());
    }, 1200);
  });
}

function renderTemplates(tool) {
  const templateCard = ([name, category, style]) => `<button class="legacy-template-card" type="button" data-library-template="${name}" data-category="${category}"><span class="legacy-template-paper is-${style}"><i></i><i></i><i></i><b>${category}</b></span><strong>${name}</strong><small>${legacyIcon("file-text", 14)} ${category}</small></button>`;
  detailShell(tool, `<section class="legacy-library"><div class="legacy-library-head"><div><h1>模板库 <em>Beta</em></h1></div><div class="legacy-library-tabs"><button class="is-active" data-library-tab="recommended">推荐模版</button><button data-library-tab="mine">我的模版</button></div><label>${legacyIcon("search", 16)}<input id="templateSearch" placeholder="请输入关键字"></label></div><div class="legacy-library-types"><button class="is-active" data-template-filter="全部">${legacyIcon("file-text", 16)} 文档</button><button data-template-filter="表格">${legacyIcon("sheet", 16)} 表格</button><button data-template-filter="幻灯片">${legacyIcon("presentation", 16)} 幻灯片</button><button data-template-filter="AI云文档">${legacyIcon("sparkles", 16)} AI云文档</button></div><div id="templateLibrary"><div class="legacy-section-line"><h2>热门推荐</h2><button>查看全部 ${legacyIcon("chevron-right", 15)}</button></div><div class="legacy-template-grid"><button class="legacy-template-card legacy-blank-template" type="button" data-legacy-toast="已创建空白文档（演示）"><span>${legacyIcon("plus", 44)}</span><strong>新建空白文档</strong></button>${LEGACY_TEMPLATES.slice(0,6).map(templateCard).join("")}</div><div class="legacy-section-line"><h2>合同范本</h2><button>查看全部 ${legacyIcon("chevron-right", 15)}</button></div><div class="legacy-template-grid">${LEGACY_TEMPLATES.filter(item => item[1] === "合同").map(templateCard).join("")}</div></div></section>`, "legacy-template-page");
  const bindCards = () => document.querySelectorAll("[data-library-template]").forEach(button => button.addEventListener("click", () => openTemplatePreview(button.dataset.libraryTemplate)));
  bindCards();
  document.getElementById("templateSearch").addEventListener("input", event => document.querySelectorAll("[data-library-template]").forEach(card => { card.hidden = !card.dataset.libraryTemplate.includes(event.target.value.trim()); }));
  document.querySelectorAll("[data-library-tab]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-library-tab]").forEach(item => item.classList.toggle("is-active", item === button));
    if (button.dataset.libraryTab === "mine") document.getElementById("templateLibrary").innerHTML = `<div class="legacy-empty-state legacy-library-empty">${legacyIcon("layout-template", 46)}<h3>暂无我的模版</h3><p>使用模板或上传企业模板后，会出现在这里。</p></div>`;
    else location.reload();
  }));
}

function renderLegacyTool() {
  const id = document.body.dataset.existingTool;
  const tool = EXISTING_TOOL_DATA[id];
  if (!tool) { location.href = "existing-tools.html"; return; }
  if (tool.kind === "doc") renderAiDoc(tool);
  else if (tool.kind === "ppt") renderAiPpt(tool);
  else if (tool.kind === "excel") renderAiExcel(tool);
  else if (tool.kind === "translation") renderTranslation(tool);
  else if (tool.kind === "meeting") renderMeeting(tool);
  else if (["sharing", "collection", "review"].includes(tool.kind)) renderWorkflow(tool);
  else if (tool.kind === "converter") renderConverter(tool);
  else if (tool.kind === "templates") renderTemplates(tool);
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page === "existing") renderExistingHome();
  else renderLegacyTool();
});
