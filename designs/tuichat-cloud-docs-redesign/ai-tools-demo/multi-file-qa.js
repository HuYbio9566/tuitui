const SOURCES = [
  {
    id: "plan",
    name: "2026春季招生方案.pptx",
    type: "PPT",
    pages: 32,
    updated: "今天 09:18",
    path: "企业云盘 / 市场部 / 招生增长",
    status: "ready",
    color: "blue"
  },
  {
    id: "budget",
    name: "渠道预算与投放计划.xlsx",
    type: "Excel",
    pages: 6,
    updated: "今天 09:32",
    path: "企业云盘 / 市场部 / 招生增长 / 数据",
    status: "ready",
    color: "green"
  },
  {
    id: "minutes",
    name: "招生项目周会纪要.docx",
    type: "Word",
    pages: 9,
    updated: "昨天 18:08",
    path: "企业云盘 / 市场部 / 招生增长 / 会议",
    status: "ready",
    color: "purple"
  },
  {
    id: "survey",
    name: "家长调研访谈汇总.pdf",
    type: "PDF",
    pages: 18,
    updated: "07-11 16:20",
    path: "企业云盘 / 教研中心 / 用户研究",
    status: "ready",
    color: "orange"
  }
];

const CITATIONS = {
  "plan-12": {
    id: "plan-12",
    sourceId: "plan",
    place: "第 12 页 · 渠道策略",
    heading: "核心渠道优先级",
    excerpt: "本期优先投入社群转介绍与直播试听。社群侧以老生家长推荐为主，目标到课率 40% 以上。",
    before: "渠道预算应围绕有效到课和后续转化进行动态分配。",
    after: "线下活动仅保留三个重点城市，不做全国铺开。",
    confidence: 96
  },
  "budget-sheet": {
    id: "budget-sheet",
    sourceId: "budget",
    place: "Sheet2 · 第 18-24 行",
    heading: "渠道投入与到课表现",
    excerpt: "社群转介绍：预算 18 万，到课率 42.1%；直播试听：预算 26 万，到课率 31.6%；短视频表单：预算 32 万，到课率 18.4%。",
    before: "统计周期：2026-06-01 至 2026-06-30。",
    after: "注：三个渠道目前使用的成本口径不完全一致。",
    confidence: 93
  },
  "minutes-3": {
    id: "minutes-3",
    sourceId: "minutes",
    place: "第 3 页 · 决策事项",
    heading: "预算调整结论",
    excerpt: "会议暂定将直播试听预算增加 20%，社群转介绍预算维持不变，待财务确认后执行。",
    before: "参会人讨论了不同渠道的规模上限和交付节奏。",
    after: "负责人：周宁；确认截止：7 月 17 日。",
    confidence: 91
  },
  "minutes-6": {
    id: "minutes-6",
    sourceId: "minutes",
    place: "第 6 页 · 行动项",
    heading: "本周行动项",
    excerpt: "林澜负责统一渠道 ROI 统计口径；周宁负责提交直播预算调整版；教研组补充试听课反馈表。",
    before: "会议确认先解决数据口径，再决定下一阶段预算。",
    after: "以上事项均需在周五例会前更新状态。",
    confidence: 97
  },
  "survey-8": {
    id: "survey-8",
    sourceId: "survey",
    place: "第 8 页 · 报名决策因素",
    heading: "家长关注点",
    excerpt: "76% 的受访家长把学习反馈透明度列入前三位，61% 关注班级分层，价格因素占 43%。",
    before: "本次访谈覆盖 42 位已报名和 28 位意向家长。",
    after: "建议试听课重点展示每周反馈与分层教学机制。",
    confidence: 95
  }
};

const PRESETS = [
  { id: "compare", icon: "columns-3", title: "比较方案", prompt: "比较各渠道的投入、到课表现和建议动作" },
  { id: "facts", icon: "list-checks", title: "提取事实", prompt: "整理本周待办、负责人和截止时间" },
  { id: "conflict", icon: "git-compare", title: "查找矛盾", prompt: "资料中关于预算调整有哪些冲突结论？" },
  { id: "summary", icon: "file-output", title: "生成纪要", prompt: "基于现有资料生成一份项目决策简报" }
];

const state = {
  screen: "entry",
  selectedSourceIds: ["plan", "budget", "minutes"],
  pickerOpen: false,
  pickerSelection: ["plan", "budget", "minutes"],
  activeCitationId: "plan-12",
  scopePinned: false,
  activeSession: "spring",
  messages: [],
  deliverable: null,
  toast: "",
  mobilePanel: "chat",
  processing: null,
  processingRun: 0,
  evidenceExpanded: false
};

const root = typeof document !== "undefined" ? document.body : null;
let toastTimer = null;

function toggleSourceScope(selectedIds, sourceId) {
  if (selectedIds.includes(sourceId)) {
    if (selectedIds.length === 1) return [...selectedIds];
    return selectedIds.filter(id => id !== sourceId);
  }
  return [...selectedIds, sourceId];
}

function citation(id) {
  return CITATIONS[id];
}

function availableCitations(ids) {
  return Object.values(CITATIONS).filter(item => ids.includes(item.sourceId));
}

function buildGroundedAnswer(kind, selectedIds) {
  const scope = [...selectedIds];
  if (kind === "outside") {
    return {
      status: "insufficient",
      title: "当前资料不足以回答",
      summary: "当前选择的文件不足以回答“竞品明年学费变化”。来源中没有竞品价格或 2027 年收费信息。",
      usedSourceIds: [],
      citations: [],
      suggestions: ["添加竞品价格资料", "改问现有方案中的课程定价", "在云盘中搜索相关文件"]
    };
  }

  if (kind === "conflict") {
    const refs = ["plan-12", "minutes-3"].map(citation).filter(item => item && scope.includes(item.sourceId));
    if (refs.length < 2) {
      return {
        status: "insufficient",
        title: "缺少形成对照的来源",
        summary: "至少需要同时选择招生方案和周会纪要，才能核对预算调整是否存在冲突。",
        usedSourceIds: refs.map(item => item.sourceId),
        citations: refs,
        suggestions: ["勾选招生方案与周会纪要"]
      };
    }
    return {
      status: "conflict",
      title: "发现 1 处需要人工确认的冲突",
      summary: "招生方案建议提高社群转介绍预算，但周会纪要暂定增加直播试听预算、维持社群预算。两份资料的决策方向不同，且周会纪要标注“待财务确认”。",
      usedSourceIds: ["plan", "minutes"],
      citations: refs,
      conflicts: [{ field: "预算优先方向", left: "提高社群转介绍预算", right: "增加直播试听预算", owner: "周宁", due: "07-17" }]
    };
  }

  if (kind === "facts") {
    const refs = ["minutes-6"].map(citation).filter(item => item && scope.includes(item.sourceId));
    if (!refs.length) return buildGroundedAnswer("insufficient", scope);
    return {
      status: "grounded",
      title: "识别出 3 项本周行动",
      summary: "本周重点是统一 ROI 口径、提交直播预算调整版，并补充试听课反馈表。三项工作均应在周五例会前更新。",
      usedSourceIds: ["minutes"],
      citations: refs,
      rows: [
        ["统一渠道 ROI 统计口径", "林澜", "周五例会前", "进行中"],
        ["提交直播预算调整版", "周宁", "07-17", "待确认"],
        ["补充试听课反馈表", "教研组", "周五例会前", "未开始"]
      ]
    };
  }

  if (kind === "summary") {
    const refs = ["plan-12", "budget-sheet", "minutes-6", "survey-8"].map(citation).filter(item => item && scope.includes(item.sourceId));
    if (!refs.length) return buildGroundedAnswer("outside", scope);
    return {
      status: "grounded",
      title: "项目决策摘要",
      summary: "现有资料显示，社群转介绍到课率最高，家长更看重反馈透明度与分层教学。本周应先统一渠道 ROI 口径，再由财务确认预算调整方向。",
      usedSourceIds: [...new Set(refs.map(item => item.sourceId))],
      citations: refs,
      bullets: ["保留社群转介绍作为高质量渠道", "试听内容强化每周反馈与分层机制", "预算调整前先统一成本与转化口径"]
    };
  }

  const refs = ["plan-12", "budget-sheet"].map(citation).filter(item => item && scope.includes(item.sourceId));
  if (refs.length < 2) {
    return {
      status: "insufficient",
      title: "资料不足以完成完整比较",
      summary: "完整比较需要同时选择渠道策略和预算数据。当前只能确认部分渠道方向，无法核对投入与到课表现。",
      usedSourceIds: refs.map(item => item.sourceId),
      citations: refs,
      suggestions: ["勾选招生方案和渠道预算文件"]
    };
  }
  return {
    status: "grounded",
    title: "社群转介绍效率领先，直播试听具备扩量空间",
    summary: "社群转介绍到课率 42.1%，在三个渠道中最高；直播试听到课率 31.6%，但预算规模更大。建议先统一成本口径，再以到课质量和后续转化共同决定增量预算。",
    usedSourceIds: ["plan", "budget"],
    citations: refs,
    rows: [
      ["社群转介绍", "18 万", "42.1%", "保持核心渠道，验证扩量上限"],
      ["直播试听", "26 万", "31.6%", "小步增加预算并跟踪后续转化"],
      ["短视频表单", "32 万", "18.4%", "收缩低质量投放"]
    ]
  };
}

function transformAnswer(type) {
  const transforms = {
    comparison: { title: "方案对比表", format: "Excel", description: "按指标横向整理结论和引用。" },
    brief: { title: "决策简报", format: "Word", description: "形成一页式结论、风险和下一步。" },
    faq: { title: "项目 FAQ", format: "Word", description: "把本轮问答整理为可复用问题库。" }
  };
  return transforms[type] || transforms.brief;
}

function classifyQuestion(value) {
  const text = String(value || "");
  if (/矛盾|冲突|不一致/.test(text)) return "conflict";
  if (/待办|负责人|截止|行动/.test(text)) return "facts";
  if (/竞品|明年|2027/.test(text)) return "outside";
  if (/简报|总结|纪要/.test(text)) return "summary";
  return "compare";
}

function refreshIcons() {
  if (typeof lucide !== "undefined") lucide.createIcons();
}

function sourceById(id) {
  return SOURCES.find(item => item.id === id) || SOURCES[0];
}

function render() {
  if (!root) return;
  root.innerHTML = layout(state.screen === "workspace" ? renderWorkspace() : renderEntry());
  refreshIcons();
}

function layout(content) {
  return `
    <div class="app-shell qa-shell">
      ${renderProductSidebar()}
      <main class="main">
        <header class="topbar">
          <div class="breadcrumb"><a href="index.html">AI 文件工作台</a><span>/</span><strong>多文件问答</strong></div>
          <nav class="primary-nav" aria-label="全局导航">
            <a class="primary-nav-link" href="report.html">调研报告</a>
            <a class="primary-nav-link active" href="index.html">工具体验</a>
            <a class="primary-nav-link" href="existing-tools.html">已有工具</a>
          </nav>
          <div class="top-actions">
            <button class="btn" data-action="toast" data-toast="已打开问答记录">使用记录</button>
            <button class="btn" data-action="toast" data-toast="帮助说明已打开">使用帮助</button>
          </div>
        </header>
        ${renderWorkbenchContextBar({
          label: "当前来源范围",
          context: `春季招生决策资料 · ${state.selectedSourceIds.length} 份文件`,
          items: [
            { icon: "shield-check", label: "权限已校验", state: "verified" },
            { icon: "scan-text", label: "仅检索已选来源", state: "verified" },
            { icon: "quote", label: "回答精确引用", state: "ready" },
            { icon: "file-output", label: "可生成交付物", state: "ready" }
          ]
        })}
        ${content}
      </main>
    </div>
    ${state.pickerOpen ? renderSourcePicker() : ""}
    ${state.deliverable ? renderDeliverable() : ""}
  `;
}

function renderEntry() {
  return `
    <section class="qa-entry">
      <header class="qa-entry-header">
        <div class="qa-entry-copy">
        <h1>先建立来源范围，再开始有依据的回答</h1>
          <p>仅检索你明确勾选且有权限的云盘文件，每个事实性结论都能定位到原文。</p>
        </div>
        <div class="entry-health" aria-label="来源状态">
          <span><i data-lucide="shield-check"></i>权限已校验</span>
          <span><i data-lucide="scan-text"></i>${state.selectedSourceIds.length} 份已解析</span>
          <span><i data-lucide="history"></i>今天 09:42 更新</span>
        </div>
      </header>
      <div class="scope-builder">
        <section class="scope-catalog" aria-labelledby="scopeCatalogTitle">
          <div class="scope-catalog-head">
            <div><h2 id="scopeCatalogTitle">选择问答来源</h2><p>春季招生决策资料 · 企业云盘 / 市场部</p></div>
            <div class="catalog-actions">
              <button class="catalog-search" data-action="toast" data-toast="可按文件名、正文或负责人搜索"><i data-lucide="search"></i>搜索当前资料夹</button>
              <button class="icon-btn" data-action="open-picker" aria-label="从其他位置添加文件"><i data-lucide="folder-plus"></i></button>
            </div>
          </div>
          <div class="catalog-table" role="table" aria-label="可选文件">
            <div class="catalog-table-head" role="row"><span>文件</span><span>位置</span><span>更新时间</span><span>状态</span></div>
            ${SOURCES.map(renderCatalogSource).join("")}
          </div>
          <footer class="catalog-footer">
            <span>已选择 <strong>${state.selectedSourceIds.length}</strong> / ${SOURCES.length} 份文件</span>
            <button class="text-btn" data-action="open-picker"><i data-lucide="plus"></i>从云盘继续添加</button>
          </footer>
        </section>
        <aside class="launch-panel">
          <details class="launch-scope">
            <summary class="launch-heading">
              <div><p class="qa-eyebrow">本次问答范围</p><h2>春季招生决策资料</h2></div>
              <span class="launch-heading-actions"><span class="source-count">${state.selectedSourceIds.length}</span><i class="scope-chevron" data-lucide="chevron-down"></i></span>
            </summary>
            <div class="launch-source-list">
              ${state.selectedSourceIds.map(id => renderScopeSource(sourceById(id))).join("")}
            </div>
          </details>
          <div class="scope-policy">
            <strong>回答边界</strong>
            <span><i data-lucide="check"></i>仅使用已勾选来源</span>
            <span><i data-lucide="check"></i>回答前重新校验权限</span>
            <span><i data-lucide="check"></i>冲突结论不自动裁决</span>
          </div>
          <div class="quick-asks" aria-label="常用任务">
            ${PRESETS.slice(0, 3).map(item => `<button data-action="start-preset" data-preset="${item.id}" title="${item.prompt}"><i data-lucide="${item.icon}"></i><span>${item.title}</span></button>`).join("")}
          </div>
          <div class="start-composer">
            <textarea id="entry-question" aria-label="输入问题" placeholder="例如：比较各渠道投入、到课表现和建议动作"></textarea>
            <div class="composer-foot"><span><i data-lucide="lock-keyhole"></i>检索 ${state.selectedSourceIds.length} 个来源</span><button class="send-btn" data-action="start-question" aria-label="开始提问"><i data-lucide="arrow-up"></i></button></div>
          </div>
        </aside>
      </div>
      <section class="recent-ledger">
        <div class="section-heading"><div><h2>最近问答</h2><span>继续上次的来源范围和引用状态</span></div><button class="text-btn" data-action="start-workspace">查看全部</button></div>
        <button data-action="start-workspace"><span class="ledger-status grounded">已核对</span><strong>上周预算调整最终以哪份资料为准？</strong><small>3 个来源 · 6 条引用</small><time>昨天 18:42</time><i data-lucide="arrow-right"></i></button>
        <button data-action="start-workspace"><span class="ledger-status review">待复核</span><strong>试听课反馈中家长最关注什么？</strong><small>2 个来源 · 4 条引用</small><time>07-11 16:20</time><i data-lucide="arrow-right"></i></button>
      </section>
    </section>
  `;
}

function renderCatalogSource(source) {
  const selected = state.selectedSourceIds.includes(source.id);
  return `<label class="catalog-row ${selected ? "selected" : ""}" role="row"><span class="catalog-file"><input type="checkbox" data-source-toggle="${source.id}" ${selected ? "checked" : ""}><span class="file-code">${source.type === "Excel" ? "XLS" : source.type.toUpperCase().slice(0, 3)}</span><span><strong>${source.name}</strong><small>${source.type} · ${source.pages} ${source.type === "Excel" ? "个工作表" : "页"}</small></span></span><span class="catalog-path">${source.path.split(" / ").slice(-2).join(" / ")}</span><time>${source.updated}</time><span class="catalog-ready"><i data-lucide="check"></i>已解析</span></label>`;
}

function renderScopeSource(source) {
  return `<div class="scope-source"><span class="file-code">${source.type === "Excel" ? "XLS" : source.type.toUpperCase().slice(0, 3)}</span><span><strong>${source.name}</strong><small>${source.type === "Excel" ? source.pages + " 个工作表" : source.pages + " 页"}</small></span><i data-lucide="check-circle-2"></i></div>`;
}

function renderWorkspace() {
  return `
    <section class="qa-workspace-page">
      <div class="workspace-heading">
        <div class="workspace-title-group"><button class="back-to-entry" data-action="back-entry" aria-label="返回来源设置"><i data-lucide="arrow-left"></i></button><div><p class="qa-eyebrow">多文件问答 / 春季招生项目</p><h1>春季招生决策资料</h1><p><span>${state.selectedSourceIds.length} 个来源</span><span>权限已校验</span><span>${state.processing ? "正在生成回答" : "引用状态正常"}</span></p></div></div>
        <div class="workspace-buttons">
          <button class="btn" data-action="pin-scope"><i data-lucide="pin"></i>${state.scopePinned ? "已固定来源" : "固定来源集合"}</button>
          <button class="btn primary" data-action="transform" data-transform="brief"><i data-lucide="file-output"></i>生成简报</button>
        </div>
      </div>
      <div class="mobile-workspace-tabs">
        <button class="${state.mobilePanel === "sources" ? "active" : ""}" data-action="mobile-panel" data-panel="sources">来源</button>
        <button class="${state.mobilePanel === "chat" ? "active" : ""}" data-action="mobile-panel" data-panel="chat">问答</button>
        <button class="${state.mobilePanel === "evidence" ? "active" : ""}" data-action="mobile-panel" data-panel="evidence">证据</button>
      </div>
      <div class="qa-workspace ${state.evidenceExpanded ? "evidence-expanded" : ""}" data-mobile-panel="${state.mobilePanel}">
        ${renderSourceRail()}
        ${renderConversation()}
        ${renderEvidencePanel()}
      </div>
    </section>
  `;
}

function renderSourceRail() {
  return `
    <aside class="source-rail qa-pane-source">
      <div class="pane-head"><div><h2>来源范围</h2><span>${state.selectedSourceIds.length}/${SOURCES.length} 参与当前问答</span></div><button class="icon-btn" data-action="open-picker" aria-label="添加来源"><i data-lucide="plus"></i></button></div>
      <div class="scope-lock"><i data-lucide="lock-keyhole"></i><span><strong>${state.scopePinned ? "已固定来源集合" : "回答边界已启用"}</strong><small>取消勾选后，下一次回答将重新核验引用。</small></span></div>
      <div class="workspace-source-list">
        ${SOURCES.map(source => `
          <label class="workspace-source ${state.selectedSourceIds.includes(source.id) ? "selected" : "excluded"}">
            <input type="checkbox" data-source-toggle="${source.id}" ${state.selectedSourceIds.includes(source.id) ? "checked" : ""}>
            <span class="file-code">${source.type === "Excel" ? "XLS" : source.type.toUpperCase().slice(0, 3)}</span>
            <span><strong>${source.name}</strong><small>${source.type} · ${source.updated}</small></span>
            <i class="source-state" data-lucide="${state.selectedSourceIds.includes(source.id) ? "circle-check" : "circle-minus"}"></i>
          </label>
        `).join("")}
      </div>
      <button class="btn wide source-add" data-action="open-picker"><i data-lucide="folder-plus"></i>添加云盘文件</button>
      <div class="source-footer"><span><i data-lucide="shield-check"></i>权限在每次回答前重新校验</span><span><i data-lucide="scan-text"></i>共 ${SOURCES.reduce((sum, source) => sum + source.pages, 0)} 页 / 表已解析</span></div>
    </aside>
  `;
}

function renderConversation() {
  return `
    <main class="conversation qa-pane-chat">
      <div class="conversation-toolbar">
        <div><strong>回答工作稿</strong><span>${state.messages.length ? "按结论组织，并保留段落级引用" : "从勾选来源中检索、核验并组织答案"}</span></div>
        <div class="answer-tools">
          <button data-action="transform" data-transform="comparison"><i data-lucide="table-2"></i>对比表</button>
          <button data-action="transform" data-transform="brief"><i data-lucide="file-text"></i>简报</button>
          <button data-action="transform" data-transform="faq"><i data-lucide="circle-help"></i>FAQ</button>
        </div>
      </div>
      <div class="message-stream">
        ${state.messages.length ? state.messages.map(renderMessage).join("") : state.processing ? "" : renderEmptyConversation()}
        ${state.processing ? renderProcessing() : ""}
      </div>
      <div class="chat-composer">
        <textarea id="workspace-question" aria-label="继续追问" placeholder="继续追问，或要求比较、提取、核对……" ${state.processing ? "disabled" : ""}></textarea>
        <div class="composer-foot"><span><i data-lucide="files"></i>${state.processing ? "正在处理当前问题" : "本轮将检索 " + state.selectedSourceIds.length + " 个来源"}</span><button class="send-btn" data-action="send-question" aria-label="发送问题" ${state.processing ? "disabled" : ""}><i data-lucide="arrow-up"></i></button></div>
      </div>
    </main>
  `;
}

function renderEmptyConversation() {
  return `<div class="conversation-empty"><div class="empty-mark"><i data-lucide="quote"></i></div><p class="qa-eyebrow">可信回答工作稿</p><h2>问题、结论和证据会在这里形成一份连续文稿</h2><p>系统先检索已选来源，再核对事实与冲突；没有直接证据的内容会明确标记。</p><div class="suggestion-row">${PRESETS.slice(0, 3).map(item => `<button data-action="ask-suggestion" data-kind="${item.id}"><i data-lucide="${item.icon}"></i>${item.prompt}</button>`).join("")}</div></div>`;
}

function renderProcessing() {
  const phase = state.processing?.phase || 0;
  const steps = ["检索来源", "核对引用", "组织回答"];
  return `<section class="qa-processing" role="status" aria-live="polite"><div class="processing-heading"><span class="processing-spinner"></span><div><strong>${steps[phase]}</strong><small>正在基于 ${state.selectedSourceIds.length} 份已授权文件处理</small></div></div><div class="processing-steps">${steps.map((step, index) => `<span class="${index < phase ? "done" : index === phase ? "active" : ""}"><i>${index < phase ? "✓" : index + 1}</i>${step}</span>`).join("")}</div><div class="processing-skeleton" aria-hidden="true"><span></span><span></span><span></span></div></section>`;
}

function renderMessage(message) {
  if (message.role === "user") return `<article class="question-chapter"><div class="question-meta"><span>提问</span><time>刚刚</time><span>${state.selectedSourceIds.length} 个来源</span></div><p>${message.text}</p></article>`;
  const answer = message.answer;
  return `
    <article class="answer-document ${answer.status}">
      <div class="answer-body">
        <div class="answer-heading"><div><span class="message-label">回答结论 · 基于 ${answer.usedSourceIds.length} 个实际来源</span><h2>${answer.title}</h2></div>${answer.status === "conflict" ? `<span class="conflict-badge"><i data-lucide="triangle-alert"></i>需人工确认</span>` : answer.status === "insufficient" ? `<span class="insufficient-badge"><i data-lucide="circle-help"></i>资料不足</span>` : `<span class="grounded-badge"><i data-lucide="shield-check"></i>来源已核对</span>`}</div>
        <p class="answer-summary">${answer.summary}</p>
        ${answer.rows ? renderAnswerTable(answer.rows) : ""}
        ${answer.bullets ? `<ul class="answer-bullets">${answer.bullets.map(item => `<li>${item}</li>`).join("")}</ul>` : ""}
        ${answer.conflicts ? renderConflicts(answer.conflicts) : ""}
        ${answer.suggestions ? `<div class="insufficient-actions">${answer.suggestions.map(item => `<button data-action="toast" data-toast="${item}">${item}</button>`).join("")}</div>` : ""}
        ${answer.citations.length ? `<div class="citation-strip"><span>引用证据</span>${answer.citations.map((item, index) => `<button class="citation-chip ${state.activeCitationId === item.id ? "active" : ""}" data-action="open-citation" data-citation="${item.id}" aria-label="查看证据 ${index + 1}，${sourceById(item.sourceId).name}"><b>E${String(index + 1).padStart(2, "0")}</b><span>${sourceById(item.sourceId).name}</span></button>`).join("")}</div>` : ""}
        <div class="message-actions"><button data-action="toast" data-toast="回答已复制"><i data-lucide="copy"></i>复制</button><button data-action="transform" data-transform="brief"><i data-lucide="file-plus-2"></i>转为产物</button><button data-action="toast" data-toast="已提交反馈"><i data-lucide="thumbs-up"></i>有帮助</button></div>
      </div>
    </article>
  `;
}

function renderAnswerTable(rows) {
  return `<div class="answer-table"><div class="answer-table-head"><span>项目</span><span>数据/负责人</span><span>表现/截止</span><span>建议/状态</span></div>${rows.map(row => `<div>${row.map(cell => `<span>${cell}</span>`).join("")}</div>`).join("")}</div>`;
}

function renderConflicts(conflicts) {
  return `<div class="conflict-box">${conflicts.map(item => `<div class="conflict-title"><strong>${item.field}</strong><span>负责人 ${item.owner} · ${item.due} 前确认</span></div><div class="conflict-columns"><p><small>招生方案</small>${item.left}</p><p><small>周会纪要</small>${item.right}</p></div><button class="btn" data-action="toast" data-toast="已创建核对任务">创建核对任务</button>`).join("")}</div>`;
}

function currentAnswerCitations() {
  const message = [...state.messages].reverse().find(item => item.role === "assistant" && item.answer?.citations?.length);
  return message ? message.answer.citations : availableCitations(state.selectedSourceIds);
}

function renderEvidencePanel() {
  const citations = currentAnswerCitations();
  const item = citations.find(citationItem => citationItem.id === state.activeCitationId) || citations[0];
  if (!item || !state.selectedSourceIds.includes(item.sourceId)) {
    return `<aside class="evidence-rail qa-pane-evidence"><div class="pane-head"><div><h2>引用证据</h2><span>等待选择引用</span></div></div><div class="evidence-empty"><i data-lucide="mouse-pointer-click"></i><p>点击回答中的引用，在这里核对原文、版本和云盘位置。</p></div></aside>`;
  }
  const source = sourceById(item.sourceId);
  const index = Math.max(0, citations.findIndex(citationItem => citationItem.id === item.id));
  return `
    <aside class="evidence-rail qa-pane-evidence">
      <div class="pane-head"><div><h2>引用证据</h2><span>${index + 1} / ${citations.length} · 回答引用定位</span></div><div class="pane-actions"><button class="icon-btn" data-action="expand-evidence" aria-label="${state.evidenceExpanded ? "收窄证据栏" : "展开证据栏"}"><i data-lucide="${state.evidenceExpanded ? "panel-right-close" : "panel-right-open"}"></i></button><button class="icon-btn" data-action="toast" data-toast="已在云盘打开原文件" aria-label="在云盘打开"><i data-lucide="external-link"></i></button></div></div>
      <div class="evidence-switcher"><button data-action="evidence-step" data-step="-1" ${index === 0 ? "disabled" : ""}><i data-lucide="chevron-left"></i>上一条</button><span>${citations.map((citationItem, citationIndex) => `<i class="${citationItem.id === item.id ? "active" : ""}" aria-hidden="true"></i>`).join("")}</span><button data-action="evidence-step" data-step="1" ${index === citations.length - 1 ? "disabled" : ""}>下一条<i data-lucide="chevron-right"></i></button></div>
      <div class="evidence-content" data-evidence="${item.id}">
        <div class="evidence-file"><span class="file-code">${source.type === "Excel" ? "XLS" : source.type.toUpperCase().slice(0, 3)}</span><div><strong>${source.name}</strong><small>${item.place}</small></div></div>
        <div class="evidence-quality"><span><i data-lucide="badge-check"></i>原文匹配</span><strong>${item.confidence}%</strong></div>
        <div class="confidence-track"><span style="width:${item.confidence}%"></span></div>
        <div class="source-preview">
          <div class="preview-toolbar"><span>${item.heading}</span><small>命中原文</small></div>
          <p>${item.before}</p>
          <blockquote>${item.excerpt}</blockquote>
          <p>${item.after}</p>
        </div>
        <div class="evidence-meta"><div><span>云盘位置</span><strong>${source.path}</strong></div><div><span>文件版本</span><strong>当前版本 · ${source.updated}</strong></div><div><span>权限状态</span><strong><i data-lucide="lock-keyhole"></i>可访问</strong></div></div>
        <div class="evidence-actions"><button class="btn wide" data-action="toast" data-toast="已打开原文件并定位到 ${item.place}"><i data-lucide="locate-fixed"></i>打开原文并定位</button><button class="icon-btn" data-action="toast" data-toast="引用已复制" aria-label="复制引用"><i data-lucide="copy"></i></button></div>
      </div>
    </aside>
  `;
}

function renderSourcePicker() {
  return `
    <div class="modal-mask" data-action="close-picker">
      <section class="source-picker" role="dialog" aria-modal="true" aria-label="从云盘选择来源" data-stop-close>
        <div class="picker-head"><div><p class="qa-eyebrow">添加问答来源</p><h2>从云盘选择文件</h2><span>所选文件会继承原有访问权限</span></div><button class="icon-btn" data-action="close-picker"><i data-lucide="x"></i></button></div>
        <div class="picker-layout">
          <aside class="picker-tree"><strong>企业空间</strong><button class="active"><i data-lucide="building-2"></i>市场部</button><button><i data-lucide="users"></i>教研中心</button><button><i data-lucide="folder-clock"></i>最近使用</button></aside>
          <main class="picker-files">
            <div class="picker-search"><i data-lucide="search"></i><span>搜索当前空间</span></div>
            ${SOURCES.map(source => `<label class="picker-file"><input type="checkbox" data-picker-source="${source.id}" ${state.pickerSelection.includes(source.id) ? "checked" : ""}><span class="file-badge ${source.color}">${source.type.slice(0, 1)}</span><span><strong>${source.name}</strong><small>${source.path} · ${source.updated}</small></span></label>`).join("")}
          </main>
        </div>
        <div class="picker-actions"><span>已选择 ${state.pickerSelection.length} 个文件</span><div><button class="btn" data-action="close-picker">取消</button><button class="btn primary" data-action="confirm-picker">添加到来源</button></div></div>
      </section>
    </div>
  `;
}

function renderDeliverable() {
  const product = transformAnswer(state.deliverable);
  return `
    <div class="modal-mask" data-action="close-deliverable">
      <section class="deliverable-modal" role="dialog" aria-modal="true" data-stop-close>
        <div class="deliverable-icon"><i data-lucide="file-check-2"></i></div>
        <h2>生成${product.title}</h2><p>${product.description}</p>
        <label>文件名称<input value="春季招生项目-${product.title}"></label>
        <label>保存到<div class="save-target"><i data-lucide="folder"></i>企业云盘 / 市场部 / 招生增长 / 分析结果</div></label>
        <div class="deliverable-preview"><span>输出格式</span><strong>${product.format}</strong><span>保留引用</span><strong>是 · 6 条来源</strong></div>
        <div class="modal-actions"><button class="btn" data-action="close-deliverable">取消</button><button class="btn primary" data-action="save-deliverable">生成并保存</button></div>
      </section>
    </div>
  `;
}

function ask(kind, text) {
  if (state.processing) return showToast("当前问题仍在处理中");
  const run = ++state.processingRun;
  state.messages.push({ role: "user", text });
  state.processing = { kind, text, phase: 0, run };
  state.screen = "workspace";
  state.mobilePanel = "chat";
  render();
  scrollConversation();

  const reducedMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const delays = reducedMotion ? [80, 160, 260] : [360, 760, 1280];
  [1, 2].forEach((phase, index) => {
    setTimeout(() => {
      if (state.processing?.run !== run) return;
      state.processing.phase = phase;
      render();
      scrollConversation();
    }, delays[index]);
  });
  setTimeout(() => {
    if (state.processing?.run !== run) return;
    const answer = buildGroundedAnswer(kind, state.selectedSourceIds);
    state.messages.push({ role: "assistant", answer });
    if (answer.citations.length) state.activeCitationId = answer.citations[0].id;
    state.processing = null;
    render();
    scrollConversation();
  }, delays[2]);
}

function scrollConversation() {
  if (typeof requestAnimationFrame === "undefined") return;
  requestAnimationFrame(() => {
    const stream = document.querySelector(".message-stream");
    if (stream) stream.scrollTo({ top: stream.scrollHeight, behavior: "smooth" });
  });
}

function showToast(message) {
  if (!root || typeof document === "undefined") return;
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  requestAnimationFrame(() => toast.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 180);
  }, 2200);
}

function refreshEvidenceView() {
  const workspace = document.querySelector(".qa-workspace");
  const pane = workspace?.querySelector(".qa-pane-evidence");
  if (!workspace || !pane) return render();

  pane.outerHTML = renderEvidencePanel();
  workspace.classList.toggle("evidence-expanded", state.evidenceExpanded);
  workspace.dataset.mobilePanel = state.mobilePanel;
  document.querySelectorAll(".mobile-workspace-tabs button").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.panel === state.mobilePanel);
  });
  document.querySelectorAll(".citation-chip").forEach(chip => {
    const active = chip.dataset.citation === state.activeCitationId;
    chip.classList.toggle("active", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  refreshIcons();
}

function handleClick(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  if (event.target.closest("[data-stop-close]")) event.stopPropagation();
  const action = button.dataset.action;
  if (action === "toast") return showToast(button.dataset.toast);
  if (action === "open-picker") {
    state.pickerSelection = [...state.selectedSourceIds];
    state.pickerOpen = true;
  } else if (action === "close-picker") {
    state.pickerOpen = false;
  } else if (action === "confirm-picker") {
    if (state.pickerSelection.length) state.selectedSourceIds = [...state.pickerSelection];
    state.pickerOpen = false;
    state.activeCitationId = availableCitations(state.selectedSourceIds)[0]?.id || "";
  } else if (action === "start-preset" || action === "ask-suggestion") {
    const kind = button.dataset.preset || button.dataset.kind;
    const preset = PRESETS.find(item => item.id === kind);
    ask(kind, preset ? preset.prompt : "请基于资料回答");
    return;
  } else if (action === "start-question") {
    const value = document.querySelector("#entry-question")?.value.trim();
    if (!value) return showToast("请先输入问题");
    ask(classifyQuestion(value), value);
    return;
  } else if (action === "start-workspace") {
    state.screen = "workspace";
  } else if (action === "back-entry") {
    state.screen = "entry";
  } else if (action === "send-question") {
    const value = document.querySelector("#workspace-question")?.value.trim();
    if (!value) return showToast("请输入要追问的问题");
    ask(classifyQuestion(value), value);
    return;
  } else if (action === "open-citation") {
    state.activeCitationId = button.dataset.citation;
    state.mobilePanel = "evidence";
    refreshEvidenceView();
    return;
  } else if (action === "evidence-step") {
    const citations = currentAnswerCitations();
    const currentIndex = Math.max(0, citations.findIndex(item => item.id === state.activeCitationId));
    const nextIndex = Math.max(0, Math.min(citations.length - 1, currentIndex + Number(button.dataset.step || 0)));
    state.activeCitationId = citations[nextIndex]?.id || state.activeCitationId;
    refreshEvidenceView();
    return;
  } else if (action === "expand-evidence") {
    state.evidenceExpanded = !state.evidenceExpanded;
    refreshEvidenceView();
    return;
  } else if (action === "pin-scope") {
    state.scopePinned = !state.scopePinned;
    render();
    showToast(state.scopePinned ? "来源集合已固定，可在下次问答复用" : "已取消固定来源集合");
    return;
  } else if (action === "transform") {
    state.deliverable = button.dataset.transform;
  } else if (action === "close-deliverable") {
    state.deliverable = null;
  } else if (action === "save-deliverable") {
    state.deliverable = null;
    render();
    showToast("产物已生成并保存到云盘");
    return;
  } else if (action === "mobile-panel") {
    state.mobilePanel = button.dataset.panel;
  }
  render();
}

function handleChange(event) {
  const sourceId = event.target.dataset.sourceToggle;
  if (sourceId) {
    const next = toggleSourceScope(state.selectedSourceIds, sourceId);
    if (next.length === state.selectedSourceIds.length && next[0] === state.selectedSourceIds[0] && state.selectedSourceIds.length === 1) {
      return showToast("至少保留 1 个问答来源");
    }
    state.selectedSourceIds = next;
    if (!availableCitations(next).some(item => item.id === state.activeCitationId)) state.activeCitationId = availableCitations(next)[0]?.id || "";
    render();
    showToast(`来源范围已更新，后续回答将核验 ${next.length} 份文件`);
    return;
  }
  const pickerId = event.target.dataset.pickerSource;
  if (pickerId) {
    state.pickerSelection = event.target.checked ? [...new Set([...state.pickerSelection, pickerId])] : state.pickerSelection.filter(id => id !== pickerId);
    render();
  }
}

if (root) {
  root.addEventListener("click", handleClick);
  root.addEventListener("change", handleChange);
  root.addEventListener("keydown", event => {
    if (event.key === "Escape" && (state.pickerOpen || state.deliverable)) {
      state.pickerOpen = false;
      state.deliverable = null;
      render();
      return;
    }
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      const entryValue = document.querySelector("#entry-question")?.value.trim();
      const workspaceValue = document.querySelector("#workspace-question")?.value.trim();
      const value = workspaceValue || entryValue;
      if (value) {
        event.preventDefault();
        ask(classifyQuestion(value), value);
      }
    }
  });
  render();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { buildGroundedAnswer, toggleSourceScope, transformAnswer, classifyQuestion };
}
