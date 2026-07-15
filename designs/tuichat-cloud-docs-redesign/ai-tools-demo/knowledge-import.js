const KNOWLEDGE_ITEMS = [
  { id: "kb-1", name: "客服高频问题汇总.docx", type: "DOCX", updated: "07-12", valueScore: 94, target: "客服知识库", owner: "王敏", visibility: "客服中心", permission: { status: "ok", label: "继承原权限" }, duplicate: { status: "none", similarity: 0 }, reviewCycle: "每 90 天", status: "candidate", selected: true, summary: "汇总售前、账号、计费和文件恢复等 43 个高频问题，答案结构完整且近 30 天仍在更新。", tags: ["客服", "高频问题", "产品使用"], questions: ["误删文件后如何恢复？", "企业空间容量如何扩容？", "外链分享为什么失效？"], trust: 96, sourcePath: "客服中心 / 服务运营 / FAQ" },
  { id: "kb-2", name: "产品培训材料_2026Q3.pptx", type: "PPTX", updated: "07-10", valueScore: 91, target: "产品培训库", owner: "李哲", visibility: "全公司", permission: { status: "ok", label: "全员可见" }, duplicate: { status: "pending", similarity: 87, similarName: "产品培训材料_2026Q2.pptx" }, reviewCycle: "每 180 天", status: "action", selected: true, summary: "覆盖产品定位、核心功能、典型客户场景和演示口径，适合新人培训与产品问答。", tags: ["产品培训", "新人必读", "销售支持"], questions: ["企业云盘适合哪些客户？", "AI 工具如何处理云盘文件？", "管理员如何配置成员权限？"], trust: 91, sourcePath: "产品部 / 培训材料 / 2026Q3" },
  { id: "kb-3", name: "保密项目复盘.pdf", type: "PDF", updated: "07-08", valueScore: 89, target: "AI 创新项目组", owner: "周扬", visibility: "项目组", permission: { status: "risk", label: "保密 · 禁止二次发布", detail: "来源文件含“保密”标签，当前账号没有知识发布授权。" }, duplicate: { status: "none", similarity: 0 }, reviewCycle: "每 90 天", status: "action", selected: true, summary: "包含项目决策、失败实验和客户反馈，知识价值较高，但当前权限禁止进入问答索引。", tags: ["项目复盘", "保密", "AI 项目"], questions: ["项目验证阶段有哪些失败假设？", "客户最关注哪些能力？"], trust: 78, sourcePath: "创新项目 / A17 / 项目复盘" },
  { id: "kb-4", name: "销售话术手册_旧版.docx", type: "DOCX", updated: "2024-11", valueScore: 62, target: "销售赋能库", owner: "", visibility: "销售部门", permission: { status: "ok", label: "销售部门可见" }, duplicate: { status: "none", similarity: 0 }, reviewCycle: "", status: "action", selected: true, summary: "部分报价、功能说明和竞品对比已过期，需指定负责人确认有效内容和复核周期。", tags: ["销售话术", "待更新"], questions: ["产品与同类方案相比有什么优势？"], trust: 58, sourcePath: "销售中心 / 话术 / 历史版本" },
  { id: "kb-5", name: "客户问题升级处理 SOP.pdf", type: "PDF", updated: "07-06", valueScore: 88, target: "客服知识库", owner: "王敏", visibility: "客服中心", permission: { status: "ok", label: "继承原权限" }, duplicate: { status: "none", similarity: 0 }, reviewCycle: "每 180 天", status: "candidate", selected: true, summary: "定义 P0-P3 问题升级标准、角色分工和时限，可直接支持客服团队流程问答。", tags: ["客服 SOP", "问题升级", "时效"], questions: ["P1 问题需要多久升级？", "谁负责通知客户？"], trust: 93, sourcePath: "客服中心 / 服务运营 / SOP" },
  { id: "kb-6", name: "新员工入职指南.docx", type: "DOCX", updated: "07-03", valueScore: 80, target: "员工服务知识库", owner: "赵宁", visibility: "全公司", permission: { status: "ok", label: "全员可见" }, duplicate: { status: "none", similarity: 0 }, reviewCycle: "每 180 天", status: "candidate", selected: true, summary: "覆盖账号申请、办公设备、假期和报销入口，可作为员工自助问答的主要来源。", tags: ["入职", "员工服务", "行政"], questions: ["第一天需要完成哪些账号申请？", "如何领取办公设备？"], trust: 87, sourcePath: "人力行政 / 员工手册 / 入职" }
];

const QUEUES = [
  { id: "all", label: "全部候选", icon: "inbox" },
  { id: "publishable", label: "可直接发布", icon: "circle-check-big" },
  { id: "action", label: "需处理", icon: "triangle-alert" },
  { id: "review", label: "待负责人复核", icon: "user-round-check" },
  { id: "published", label: "已入库", icon: "badge-check" }
];

const state = {
  screen: "entry",
  items: KNOWLEDGE_ITEMS.map(item => ({ ...item, tags: [...item.tags], questions: [...item.questions], permission: { ...item.permission }, duplicate: { ...item.duplicate } })),
  activeId: "kb-1",
  filter: "all",
  mobilePane: "queue",
  modal: null,
  modalItemId: null,
  toast: "",
  search: ""
};

const root = typeof document !== "undefined" ? document.body : null;

function blockersFor(item) {
  const blockers = [];
  if (!item.target) blockers.push("未设置目标知识库");
  if (!item.owner) blockers.push("未设置负责人");
  if (item.permission?.status !== "ok") blockers.push("权限未通过");
  if (item.duplicate?.status === "pending") blockers.push("疑似重复未处理");
  if (!item.reviewCycle) blockers.push("未设置复核周期");
  return blockers;
}

function canPublishItem(item) {
  return blockersFor(item).length === 0;
}

function governanceMetrics(items) {
  const active = items.filter(item => item.status !== "published");
  return {
    total: active.length,
    publishable: active.filter(canPublishItem).length,
    needsAction: active.filter(item => !canPublishItem(item)).length,
    permissionRisks: active.filter(item => item.permission?.status === "risk").length,
    duplicates: active.filter(item => item.duplicate?.status === "pending").length
  };
}

function resolveDuplicate(item, decision) {
  return { ...item, duplicate: { ...item.duplicate, status: "resolved", decision } };
}

function publishBatch(items) {
  return {
    publishable: items.filter(canPublishItem),
    blocked: items.filter(item => !canPublishItem(item)).map(item => ({ ...item, blockers: blockersFor(item) }))
  };
}

function refreshIcons() { if (typeof lucide !== "undefined") lucide.createIcons(); }
function activeItem() { return state.items.find(item => item.id === state.activeId) || state.items[0]; }

function render() {
  if (!root) return;
  root.innerHTML = layout(state.screen === "workspace" ? renderWorkspace() : renderEntry());
  refreshIcons();
}

function layout(content) {
  return `<div class="app-shell knowledge-shell">${renderProductSidebar()}<main class="main"><header class="topbar"><div class="breadcrumb"><a href="index.html">文件工作台</a><span>/</span><strong>知识入库治理</strong></div><nav class="primary-nav"><a class="primary-nav-link" href="report.html">调研报告</a><a class="primary-nav-link active" href="index.html">工具体验</a><a class="primary-nav-link" href="existing-tools.html">已有工具</a></nav><div class="top-actions"><button class="btn" data-action="toast" data-toast="已打开入库批次记录">入库记录</button><button class="btn" data-action="toast" data-toast="知识治理帮助已打开">使用帮助</button></div></header>${content}</main></div>${state.modal ? renderModal() : ""}${state.toast ? `<div class="toast">${state.toast}</div>` : ""}`;
}

function renderEntry() {
  return `<section class="knowledge-entry"><div class="knowledge-entry-head"><p class="knowledge-eyebrow">知识治理工作台</p><h1>先筛选、再治理，让云盘文件成为可信且持续可用的企业知识</h1><p>入库前检查价值、重复、权限、负责人和复核周期，不把文件未经治理直接发布。</p></div><div class="scan-layout"><section class="source-scan-card"><div class="scan-card-head"><span><i data-lucide="folder-search-2"></i></span><div><h2>客户服务中心 / 运营资料</h2><p>企业云盘 / 客服中心 · 最近更新 07-12</p></div><button class="btn" data-action="toast" data-toast="云盘文件夹选择器已打开"><i data-lucide="refresh-cw"></i>更换范围</button></div><div class="scan-overview"><div><span>扫描文件</span><strong>16</strong><small>DOCX 8 · PDF 5 · PPTX 3</small></div><div><span>高价值候选</span><strong>8</strong><small>价值分 ≥ 80</small></div><div><span>治理问题</span><strong>4</strong><small>重复 2 · 权限 1 · 过期 1</small></div><div><span>预计可发布</span><strong>5</strong><small>需负责人最终复核</small></div></div><div class="scan-tree"><div><span><i data-lucide="folder"></i>运营资料</span><em>16</em></div><div class="child"><span><i data-lucide="folder"></i>FAQ 与客服手册</span><em>7</em></div><div class="child"><span><i data-lucide="folder"></i>服务流程与 SOP</span><em>5</em></div><div class="child"><span><i data-lucide="folder"></i>培训和复盘</span><em>4</em></div></div><div class="scan-actions"><button class="btn" data-action="toast" data-toast="候选清单预览已打开"><i data-lucide="list-filter"></i>预览候选</button><button class="btn primary" data-action="start-governance"><i data-lucide="scan-search"></i>开始入库治理</button></div></section><aside class="policy-card"><div class="policy-head"><span><i data-lucide="shield-check"></i></span><div><h2>本次治理策略</h2><p>客服知识运营标准 v3</p></div></div><div class="policy-list"><div><span>价值门槛</span><strong>80 分以上优先</strong></div><div><span>权限策略</span><strong>继承原文件权限</strong></div><div><span>问答索引</span><strong>负责人复核后建立</strong></div><div><span>复核周期</span><strong>默认每 180 天</strong></div><div><span>敏感内容</span><strong>自动阻止发布</strong></div></div><button data-action="toast" data-toast="治理策略设置已打开"><i data-lucide="settings-2"></i>调整治理策略</button></aside></div><section class="recent-batches"><div class="section-head"><div><h2>最近治理批次</h2><p>继续处理尚未发布的资料。</p></div></div><div class="batch-grid"><button data-action="start-governance"><span><i data-lucide="headphones"></i></span><div><strong>客服中心运营资料</strong><p>6 个候选 · 3 个需处理</p></div><em>刚刚扫描</em></button><button data-action="toast" data-toast="产品培训批次已打开"><span><i data-lucide="presentation"></i></span><div><strong>2026 Q3 产品培训</strong><p>12 个候选 · 待 2 人复核</p></div><em>昨天</em></button><button data-action="toast" data-toast="员工手册批次已打开"><span><i data-lucide="users-round"></i></span><div><strong>员工服务与制度</strong><p>28 个知识 · 已发布</p></div><em>07-08</em></button></div></section></section>`;
}

function filteredItems() {
  if (state.filter === "published") return state.items.filter(item => item.status === "published");
  const active = state.items.filter(item => item.status !== "published");
  if (state.filter === "publishable") return active.filter(canPublishItem);
  if (state.filter === "action") return active.filter(item => !canPublishItem(item));
  if (state.filter === "review") return active.filter(item => canPublishItem(item) && item.status === "review");
  return active;
}

function queueCount(id) {
  if (id === "published") return state.items.filter(item => item.status === "published").length;
  const active = state.items.filter(item => item.status !== "published");
  if (id === "all") return active.length;
  if (id === "publishable") return active.filter(canPublishItem).length;
  if (id === "action") return active.filter(item => !canPublishItem(item)).length;
  if (id === "review") return active.filter(item => canPublishItem(item) && item.status === "review").length;
  return 0;
}

function renderWorkspace() {
  const metrics = governanceMetrics(state.items);
  const selected = state.items.filter(item => item.selected && item.status !== "published");
  return `<section class="governance-page"><div class="governance-head"><div><button class="back-link" data-action="back-entry"><i data-lucide="arrow-left"></i>返回扫描设置</button><h1>客服中心运营资料 · 入库治理</h1><p>批次 KB-20260713-08 · 16 个扫描文件 · 6 个高价值候选</p></div><div class="governance-metrics"><div><span>候选</span><strong>${metrics.total}</strong></div><div class="good"><span>可发布</span><strong>${metrics.publishable}</strong></div><div class="warn"><span>需处理</span><strong>${metrics.needsAction}</strong></div></div><div class="governance-actions"><button class="btn" data-action="bulk-settings"><i data-lucide="sliders-horizontal"></i>批量设置</button><button class="btn primary" data-action="publish-selected" ${selected.length ? "" : "disabled"}><i data-lucide="send"></i>发布所选 ${selected.length}</button></div></div><div class="knowledge-mobile-tabs"><button class="${state.mobilePane === "queue" ? "active" : ""}" data-action="mobile-pane" data-pane="queue">队列</button><button class="${state.mobilePane === "list" ? "active" : ""}" data-action="mobile-pane" data-pane="list">候选资料</button><button class="${state.mobilePane === "detail" ? "active" : ""}" data-action="mobile-pane" data-pane="detail">治理详情</button></div><div class="governance-grid" data-mobile-pane="${state.mobilePane}">${renderQueue(metrics)}${renderKnowledgeList(selected)}${renderKnowledgeDetail(activeItem())}</div></section>`;
}

function renderQueue(metrics) {
  return `<aside class="governance-queue knowledge-pane-queue"><div class="queue-title"><div><h2>治理队列</h2><span>按发布状态筛选</span></div><button class="icon-button" data-action="toast" data-toast="筛选设置已打开"><i data-lucide="list-filter"></i></button></div><nav>${QUEUES.map(item => `<button class="${state.filter === item.id ? "active" : ""}" data-action="queue-filter" data-filter="${item.id}"><i data-lucide="${item.icon}"></i><span>${item.label}</span><em>${queueCount(item.id)}</em></button>`).join("")}</nav><section class="risk-summary"><h3>本批次问题</h3><div><span><i data-lucide="copy"></i>疑似重复</span><strong>${metrics.duplicates}</strong></div><div><span><i data-lucide="shield-alert"></i>权限风险</span><strong>${metrics.permissionRisks}</strong></div><div><span><i data-lucide="user-round-x"></i>缺负责人/周期</span><strong>${state.items.filter(item => item.status !== "published" && (!item.owner || !item.reviewCycle)).length}</strong></div></section><section class="target-libraries"><h3>推荐知识库</h3><div><span class="kb-color blue"></span><span>客服知识库</span><em>2</em></div><div><span class="kb-color purple"></span><span>产品培训库</span><em>1</em></div><div><span class="kb-color green"></span><span>员工服务知识库</span><em>1</em></div></section></aside>`;
}

function renderKnowledgeList(selected) {
  const items = filteredItems();
  return `<main class="knowledge-list knowledge-pane-list"><div class="knowledge-toolbar"><div class="knowledge-search"><i data-lucide="search"></i><input placeholder="搜索候选资料"></div><button class="btn" data-action="toast" data-toast="目标知识库筛选已打开">目标知识库<i data-lucide="chevron-down"></i></button><button class="btn" data-action="toast" data-toast="更多筛选已打开"><i data-lucide="list-filter"></i>筛选</button><div class="toolbar-spacer"></div><span>已选 ${selected.length}</span></div><div class="governance-table"><div class="governance-row governance-table-head"><span></span><span>候选资料</span><span>价值分</span><span>推荐知识库</span><span>重复/权限</span><span>负责人</span><span>状态</span></div>${items.length ? items.map(renderKnowledgeRow).join("") : `<div class="empty-governance"><i data-lucide="inbox"></i><strong>当前队列暂无资料</strong><p>处理或发布后的资料会移动到对应队列。</p></div>`}</div></main>`;
}

function renderKnowledgeRow(item) {
  const blockers = blockersFor(item);
  return `<article class="governance-row knowledge-item ${state.activeId === item.id ? "active" : ""}" data-action="select-item" data-item="${item.id}"><button class="row-check ${item.selected ? "selected" : ""}" data-action="toggle-select" data-item="${item.id}">${item.selected ? `<i data-lucide="check"></i>` : ""}</button><div class="knowledge-file"><span class="file-type ${item.type.toLowerCase()}">${item.type.slice(0, 3)}</span><div><strong>${item.name}</strong><small>${item.sourcePath} · 更新 ${item.updated}</small></div></div><span class="value-score ${item.valueScore >= 85 ? "high" : "medium"}"><b>${item.valueScore}</b><small>/100</small></span><div class="target-cell"><strong>${item.target || "待设置"}</strong><small>${item.visibility}</small></div><div class="issue-cell">${item.duplicate.status === "pending" ? `<span class="issue duplicate"><i data-lucide="copy"></i>相似 ${item.duplicate.similarity}%</span>` : item.permission.status === "risk" ? `<span class="issue permission"><i data-lucide="shield-alert"></i>权限风险</span>` : item.permission.status === "pending" ? `<span class="issue pending"><i data-lucide="clock-3"></i>审批中</span>` : `<span class="issue clear"><i data-lucide="circle-check"></i>无阻塞</span>`}</div><div class="owner-cell">${item.owner ? `<span>${item.owner.slice(0, 1)}</span><strong>${item.owner}</strong>` : `<button data-action="assign-owner" data-item="${item.id}">+ 设置</button>`}<small>${item.reviewCycle || "未设复核周期"}</small></div><div class="status-cell">${item.status === "published" ? `<span class="published">已入库</span>` : blockers.length ? `<span class="blocked">需处理 ${blockers.length}</span>` : `<span class="ready">可发布</span>`}<button data-action="select-item" data-item="${item.id}"><i data-lucide="chevron-right"></i></button></div></article>`;
}

function renderKnowledgeDetail(item) {
  const blockers = blockersFor(item);
  return `<aside class="knowledge-detail knowledge-pane-detail"><div class="detail-head"><div><p class="knowledge-eyebrow">知识候选详情</p><h2>${item.name}</h2><span>${item.sourcePath}</span></div><button class="icon-button" data-action="toast" data-toast="原文件已在云盘打开"><i data-lucide="external-link"></i></button></div><div class="trust-overview"><div class="trust-score ${item.trust >= 85 ? "high" : "medium"}"><strong>${item.trust}</strong><span>可信度</span></div><div><strong>${item.valueScore} 分 · ${item.valueScore >= 85 ? "高价值知识" : "建议人工判断"}</strong><p>综合完整性、时效性、复用频率和结构化程度。</p></div></div><section class="detail-section"><div class="detail-title"><h3>内容摘要</h3><button data-action="toast" data-toast="摘要编辑已打开"><i data-lucide="pencil"></i></button></div><p class="knowledge-summary">${item.summary}</p><div class="knowledge-tags">${item.tags.map(tag => `<span>${tag}</span>`).join("")}<button data-action="toast" data-toast="标签编辑已打开">+</button></div></section><section class="detail-section governance-check"><div class="detail-title"><h3>治理检查</h3><span class="${blockers.length ? "needs" : "passed"}">${blockers.length ? `${blockers.length} 项待处理` : "全部通过"}</span></div>${renderGovernanceChecks(item)}</section><section class="detail-section"><div class="detail-title"><h3>进入问答后的热门问法</h3><span>${item.questions.length}</span></div><div class="question-list">${item.questions.map((question, index) => `<div><span>${index + 1}</span><p>${question}</p><button data-action="toast" data-toast="问法编辑已打开"><i data-lucide="pencil"></i></button></div>`).join("")}</div></section><section class="detail-section source-sync"><div><i data-lucide="refresh-ccw"></i><span><strong>来源文件持续同步</strong><p>更新后自动进入待复核，不会静默覆盖可信知识。</p></span></div><button data-action="toast" data-toast="同步规则已打开">设置</button></section></aside>`;
}

function renderGovernanceChecks(item) {
  return `<div class="check-list"><article class="${item.target ? "passed" : "blocked"}"><i data-lucide="database"></i><div><span>目标知识库</span><strong>${item.target || "尚未设置"}</strong></div><button data-action="bulk-settings">修改</button></article><article class="${item.duplicate.status === "pending" ? "blocked" : "passed"}"><i data-lucide="copy"></i><div><span>相似知识</span><strong>${item.duplicate.status === "pending" ? `${item.duplicate.similarName} · ${item.duplicate.similarity}%` : item.duplicate.status === "resolved" ? "已合并处理" : "未发现重复"}</strong></div>${item.duplicate.status === "pending" ? `<button data-action="resolve-duplicate" data-item="${item.id}">处理重复</button>` : `<em>通过</em>`}</article><article class="${item.permission.status === "ok" ? "passed" : "blocked"}"><i data-lucide="shield-check"></i><div><span>权限与可见范围</span><strong>${item.permission.label}</strong></div>${item.permission.status === "risk" ? `<button data-action="request-permission" data-item="${item.id}">申请授权</button>` : item.permission.status === "pending" ? `<em class="pending">审批中</em>` : `<em>通过</em>`}</article><article class="${item.owner && item.reviewCycle ? "passed" : "blocked"}"><i data-lucide="user-round-check"></i><div><span>负责人和复核周期</span><strong>${item.owner ? `${item.owner} · ${item.reviewCycle || "周期待设置"}` : "尚未指定负责人"}</strong></div>${item.owner && item.reviewCycle ? `<em>通过</em>` : `<button data-action="assign-owner" data-item="${item.id}">设置</button>`}</article></div>`;
}

function renderModal() {
  const item = state.items.find(row => row.id === state.modalItemId) || activeItem();
  if (state.modal === "duplicate") return `<div class="knowledge-modal-layer" data-action="close-modal"><section class="knowledge-modal duplicate-modal" role="dialog" data-stop-close><div class="modal-head"><div><p class="knowledge-eyebrow">重复知识治理</p><h2>两份培训材料相似度 ${item.duplicate.similarity}%</h2></div><button class="icon-button" data-action="close-modal"><i data-lucide="x"></i></button></div><div class="duplicate-compare"><article class="current"><span>本次候选</span><strong>${item.name}</strong><p>更新 07-10 · 36 页 · 包含 AI 工具新章节</p><em>建议保留</em></article><article><span>已有知识</span><strong>${item.duplicate.similarName}</strong><p>更新 04-02 · 30 页 · 已有 128 次问答引用</p><em>已有索引</em></article></div><div class="merge-preview"><i data-lucide="git-merge"></i><div><strong>推荐：合并为新版本</strong><p>保留旧知识的访问链接与问答记录，用 Q3 内容更新正文，并进入李哲复核队列。</p></div></div><div class="modal-actions"><button class="btn" data-action="close-modal">暂不处理</button><button class="btn primary" data-action="confirm-merge" data-item="${item.id}">合并为新版本</button></div></section></div>`;
  if (state.modal === "permission") return `<div class="knowledge-modal-layer" data-action="close-modal"><section class="knowledge-modal" role="dialog" data-stop-close><div class="modal-head"><div><p class="knowledge-eyebrow">权限发布申请</p><h2>${item.name}</h2></div><button class="icon-button" data-action="close-modal"><i data-lucide="x"></i></button></div><div class="permission-alert"><i data-lucide="shield-alert"></i><div><strong>来源文件禁止二次发布</strong><p>${item.permission.detail}</p></div></div><label class="permission-field"><span>申请发布范围</span><select><option>仅 AI 创新项目组可见</option><option>仅项目管理员可见</option></select></label><label class="permission-field"><span>审批人</span><select><option>项目负责人 · 林悦</option><option>数据安全管理员 · 赵峰</option></select></label><label class="permission-field"><span>申请说明</span><textarea>用于项目组内部复盘问答，不进入知识广场，不允许外部分享。</textarea></label><div class="modal-actions"><button class="btn" data-action="close-modal">取消</button><button class="btn primary" data-action="submit-permission" data-item="${item.id}">提交授权申请</button></div></section></div>`;
  if (state.modal === "bulk") return `<div class="knowledge-modal-layer" data-action="close-modal"><section class="knowledge-modal" role="dialog" data-stop-close><div class="modal-head"><div><p class="knowledge-eyebrow">批量治理设置</p><h2>为所选资料补齐发布属性</h2></div><button class="icon-button" data-action="close-modal"><i data-lucide="x"></i></button></div><div class="bulk-fields"><label><span>目标知识库</span><select><option>保持当前推荐</option><option>客服知识库</option><option>产品培训库</option></select></label><label><span>负责人</span><select><option>保持现有设置</option><option>王敏</option><option>李哲</option><option>赵宁</option></select></label><label><span>可见范围</span><select><option>继承原文件权限</option><option>仅部门可见</option></select></label><label><span>复核周期</span><select><option>每 180 天</option><option>每 90 天</option><option>每 365 天</option></select></label></div><div class="modal-actions"><button class="btn" data-action="close-modal">取消</button><button class="btn primary" data-action="apply-bulk">应用到所选资料</button></div></section></div>`;
  if (state.modal === "publish") {
    const selected = state.items.filter(row => row.selected && row.status !== "published");
    const result = publishBatch(selected);
    return `<div class="knowledge-modal-layer" data-action="close-modal"><section class="knowledge-modal publish-modal" role="dialog" data-stop-close><div class="modal-head"><div><p class="knowledge-eyebrow">发布前检查</p><h2>${result.publishable.length} 项可发布，${result.blocked.length} 项仍需处理</h2></div><button class="icon-button" data-action="close-modal"><i data-lucide="x"></i></button></div><div class="publish-stats"><div class="ready"><strong>${result.publishable.length}</strong><span>建立知识卡与问答索引</span></div><div class="blocked"><strong>${result.blocked.length}</strong><span>保留在需处理队列</span></div></div>${result.blocked.length ? `<div class="blocked-list">${result.blocked.map(row => `<article><span class="file-type ${row.type.toLowerCase()}">${row.type.slice(0, 3)}</span><div><strong>${row.name}</strong><p>${row.blockers.join(" · ")}</p></div></article>`).join("")}</div>` : `<div class="all-ready"><i data-lucide="badge-check"></i>所选资料均已完成治理检查</div>`}<div class="publish-note"><i data-lucide="info"></i><p>发布后来源更新不会直接覆盖知识，将重新进入负责人复核。</p></div><div class="modal-actions"><button class="btn" data-action="close-modal">返回治理</button><button class="btn primary" data-action="confirm-publish">${result.blocked.length ? `仅发布 ${result.publishable.length} 项可发布资料` : "确认发布"}</button></div></section></div>`;
  }
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
  if (action === "start-governance") state.screen = "workspace";
  else if (action === "back-entry") state.screen = "entry";
  else if (action === "queue-filter") { state.filter = target.dataset.filter; state.mobilePane = "list"; }
  else if (action === "select-item") { state.activeId = target.dataset.item; state.mobilePane = "detail"; }
  else if (action === "toggle-select") {
    event.stopPropagation();
    state.items = state.items.map(item => item.id === target.dataset.item ? { ...item, selected: !item.selected } : item);
  } else if (action === "mobile-pane") state.mobilePane = target.dataset.pane;
  else if (action === "resolve-duplicate") { state.modal = "duplicate"; state.modalItemId = target.dataset.item; }
  else if (action === "confirm-merge") {
    state.items = state.items.map(item => item.id === target.dataset.item ? resolveDuplicate(item, "merge") : item);
    state.modal = null;
    showToast("重复知识已合并为新版本，历史链接与问答记录已保留");
    return;
  } else if (action === "request-permission") { state.modal = "permission"; state.modalItemId = target.dataset.item; }
  else if (action === "submit-permission") {
    state.items = state.items.map(item => item.id === target.dataset.item ? { ...item, permission: { ...item.permission, status: "pending", label: "授权申请审批中" } } : item);
    state.modal = null;
    showToast("授权申请已提交，在通过前不会进入问答索引");
    return;
  } else if (action === "assign-owner") {
    const id = target.dataset.item || state.activeId;
    state.items = state.items.map(item => item.id === id ? { ...item, owner: "赵宁", reviewCycle: "每 90 天" } : item);
    showToast("已设置负责人赵宁，复核周期为每 90 天");
    return;
  } else if (action === "bulk-settings") state.modal = "bulk";
  else if (action === "apply-bulk") { state.modal = null; showToast("批量治理设置已应用，权限风险项保持原规则"); return; }
  else if (action === "publish-selected") state.modal = "publish";
  else if (action === "confirm-publish") {
    const selected = state.items.filter(item => item.selected && item.status !== "published");
    const result = publishBatch(selected);
    const publishIds = new Set(result.publishable.map(item => item.id));
    state.items = state.items.map(item => publishIds.has(item.id) ? { ...item, status: "published", selected: false } : item);
    state.modal = null;
    state.filter = "all";
    state.activeId = state.items.find(item => item.status !== "published")?.id || state.items[0].id;
    showToast(`${publishIds.size} 项知识已发布并建立问答索引`);
    return;
  } else if (action === "close-modal") state.modal = null;
  render();
}

if (root) { root.addEventListener("click", handleClick); render(); }
if (typeof module !== "undefined" && module.exports) module.exports = { KNOWLEDGE_ITEMS, governanceMetrics, blockersFor, canPublishItem, resolveDuplicate, publishBatch };
