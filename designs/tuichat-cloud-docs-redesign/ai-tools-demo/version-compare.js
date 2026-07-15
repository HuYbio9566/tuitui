const DIFFS = [
  {
    id: "liability",
    section: "8.2 责任限制",
    type: "modified",
    title: "赔偿责任从合同金额上限改为无限责任",
    severity: "high",
    riskRaised: true,
    pageLeft: 8,
    pageRight: 9,
    oldText: "乙方在本协议项下的累计赔偿责任不超过甲方已支付的年度服务费。",
    newText: "乙方应赔偿甲方因此遭受的全部损失，且赔偿金额不受本协议服务费限制。",
    impact: "供应商责任显著扩大，但作为我方采购合同，该改动对我方有利；需确认对方是否有权接受。",
    responsibility: "乙方由有限责任变为无限责任",
    suggestion: "接受，但建议保留对间接损失的排除，避免条款因过度严苛而难以落地。",
    decision: null
  },
  {
    id: "renewal",
    section: "12.2 续展",
    type: "modified",
    title: "自动续费通知期由 60 日缩短为 7 日",
    severity: "high",
    riskRaised: true,
    pageLeft: 12,
    pageRight: 13,
    oldText: "任一方应至少在合同到期前六十日书面确认是否续约，本协议不自动续展。",
    newText: "任一方未在到期日前七日提出异议的，本协议自动续展一年。",
    impact: "我方可能在预算和采购审批尚未完成时被自动续费，退出窗口明显收窄。",
    responsibility: "我方新增主动通知义务",
    suggestion: "拒绝该修改，恢复不自动续展及 60 日书面确认机制。",
    decision: null
  },
  {
    id: "data-delete",
    section: "11.4 数据返还",
    type: "deleted",
    title: "删除终止后 30 日数据导出期",
    severity: "high",
    riskRaised: true,
    pageLeft: 11,
    pageRight: 12,
    oldText: "协议终止后，乙方应提供不少于三十日的数据导出期，并以通用格式返还数据。",
    newText: "",
    impact: "数据迁移保障被删除，合同终止后可能无法完整取回业务数据。",
    responsibility: "乙方不再承担数据返还义务",
    suggestion: "拒绝删除，恢复原条款并补充删除前书面确认。",
    decision: null
  },
  {
    id: "payment",
    section: "5.3 付款",
    type: "modified",
    title: "尾款支付期从 15 日延长为 30 日",
    severity: "low",
    riskRaised: false,
    pageLeft: 5,
    pageRight: 6,
    oldText: "验收通过后十五个工作日内支付剩余百分之五十款项。",
    newText: "验收通过且收到合法发票后三十个自然日内支付剩余百分之五十款项。",
    impact: "付款窗口延长且增加收到合法发票作为付款前提，对我方资金安排更有利。",
    responsibility: "乙方新增合规开票前置义务",
    suggestion: "建议接受。",
    decision: null
  },
  {
    id: "sla",
    section: "附件二 服务等级",
    type: "added",
    title: "新增 P1 故障 2 小时恢复承诺",
    severity: "low",
    riskRaised: false,
    pageLeft: 15,
    pageRight: 17,
    oldText: "",
    newText: "P1 级故障应在十五分钟内响应，并在两小时内恢复核心服务。",
    impact: "供应商服务承诺更明确，可作为后续 SLA 考核和服务抵扣依据。",
    responsibility: "乙方新增故障恢复义务",
    suggestion: "接受，并确认未达标的服务抵扣比例。",
    decision: null
  },
  {
    id: "subprocessor",
    section: "10.3 分包商",
    type: "added",
    title: "新增境外分包商处理数据条款",
    severity: "medium",
    riskRaised: false,
    pageLeft: 10,
    pageRight: 11,
    oldText: "",
    newText: "乙方可委托其境外关联方处理平台日志和运行数据。",
    impact: "引入潜在跨境数据处理，需要明确数据类型、地域和甲方事前书面同意。",
    responsibility: "我方需评估并批准境外分包",
    suggestion: "修改为事前书面同意，并附分包商清单和数据处理地域。",
    decision: null
  },
  {
    id: "training",
    section: "附件一 交付清单",
    type: "deleted",
    title: "删除两次管理员培训",
    severity: "medium",
    riskRaised: false,
    pageLeft: 14,
    pageRight: 16,
    oldText: "乙方提供两次管理员培训，每次不少于三小时。",
    newText: "",
    impact: "交付范围缩减，可能增加上线后的内部培训成本。",
    responsibility: "甲方需自行承担管理员培训",
    suggestion: "恢复至少一次管理员培训，或同步调整合同价格。",
    decision: null
  },
  {
    id: "notice",
    section: "14.1 通知",
    type: "modified",
    title: "补充双方有效通知邮箱",
    severity: "low",
    riskRaised: false,
    pageLeft: 14,
    pageRight: 15,
    oldText: "通知发送至合同首页联系人。",
    newText: "通知应同时发送至合同首页联系人及双方指定法务邮箱。",
    impact: "送达路径更明确，可降低通知效力争议。",
    responsibility: "双方均需维护有效法务邮箱",
    suggestion: "接受。",
    decision: null
  }
];

const state = {
  screen: "entry",
  diffs: DIFFS.map(item => ({ ...item })),
  filter: "all",
  activeDiffId: "liability",
  viewMode: "side-by-side",
  showFormat: false,
  zoom: 92,
  thirdVersion: false,
  modal: null,
  mobilePane: "diffs",
  toast: ""
};

const root = typeof document !== "undefined" ? document.body : null;

function calculateDiffStats(diffs) {
  return {
    total: diffs.length,
    modified: diffs.filter(item => item.type === "modified").length,
    added: diffs.filter(item => item.type === "added").length,
    deleted: diffs.filter(item => item.type === "deleted").length,
    riskRaised: diffs.filter(item => item.riskRaised).length,
    unresolved: diffs.filter(item => !item.decision).length
  };
}

function decideDiff(diffs, id, decision) {
  return diffs.map(item => item.id === id ? { ...item, decision } : { ...item });
}

function canGenerateMerge(diffs) {
  return !diffs.some(item => item.riskRaised && !item.decision);
}

function filterDiffs(diffs, filter) {
  if (filter === "all") return diffs;
  if (filter === "risk") return diffs.filter(item => item.riskRaised);
  if (filter === "decided") return diffs.filter(item => item.decision);
  return diffs.filter(item => item.type === filter);
}

function activeDiff() {
  return state.diffs.find(item => item.id === state.activeDiffId) || state.diffs[0];
}

function refreshIcons() {
  if (typeof lucide !== "undefined") lucide.createIcons();
}

function render() {
  if (!root) return;
  root.innerHTML = layout(state.screen === "compare" ? renderCompare() : renderEntry());
  refreshIcons();
}

function layout(content) {
  return `<div class="app-shell compare-shell">${renderProductSidebar()}<main class="main"><header class="topbar"><div class="breadcrumb"><a href="index.html">文件工作台</a><span>/</span><strong>文档版本对比</strong></div><nav class="primary-nav"><a class="primary-nav-link" href="report.html">调研报告</a><a class="primary-nav-link active" href="index.html">工具体验</a><a class="primary-nav-link" href="existing-tools.html">已有工具</a></nav><div class="top-actions"><button class="btn" data-action="toast" data-toast="已打开对比记录">使用记录</button><button class="btn" data-action="toast" data-toast="版本对比帮助已打开">使用帮助</button></div></header>${content}</main></div>${state.modal ? renderModal() : ""}${state.toast ? `<div class="toast">${state.toast}</div>` : ""}`;
}

function renderEntry() {
  return `<section class="compare-entry"><div class="compare-entry-head"><p class="compare-eyebrow">语义 Diff 工作台</p><h1>看清版本改了什么，以及责任和风险如何变化</h1><p>不仅标记文字差异，还解释条款影响，并支持逐项接受、拒绝和生成合并建议。</p></div><div class="version-slots"><article class="version-slot baseline"><div class="slot-label"><span>A</span><div><strong>基准版本</strong><small>对比起点</small></div></div><div class="version-file"><span class="doc-icon"><i data-lucide="file-text"></i></span><div><strong>星云数据平台服务采购协议_v2.docx</strong><p>15 页 · 07-08 18:20 · 我方发出</p><small>企业云盘 / 采购部 / 合同谈判</small></div><button class="icon-button" data-action="toast" data-toast="已打开基准版本选择器"><i data-lucide="refresh-cw"></i></button></div><div class="version-meta"><span>作者：赵晨</span><span>版本日期：2026-07-08</span><span>已签名：否</span></div></article><div class="compare-direction"><i data-lucide="arrow-right-left"></i><span>对比</span></div><article class="version-slot revised"><div class="slot-label"><span>B</span><div><strong>修订版本</strong><small>最新修改</small></div></div><div class="version-file"><span class="doc-icon"><i data-lucide="file-pen-line"></i></span><div><strong>星云数据平台服务采购协议_v3.docx</strong><p>17 页 · 今天 09:42 · 对方返回</p><small>企业云盘 / 采购部 / 合同谈判</small></div><button class="icon-button" data-action="toast" data-toast="已打开修订版本选择器"><i data-lucide="refresh-cw"></i></button></div><div class="version-meta"><span>作者：北京星云数据</span><span>版本日期：2026-07-13</span><span>已签名：否</span></div></article></div>${state.thirdVersion ? `<div class="third-version"><span>C</span><div><strong>星云数据平台服务采购协议_v4_法务建议.docx</strong><p>法务内部建议版 · 今天 11:10</p></div><button class="icon-button" data-action="remove-third"><i data-lucide="x"></i></button></div>` : `<button class="add-third" data-action="add-third"><i data-lucide="plus"></i>追加第三版做一对多比较</button>`}<div class="comparison-options"><div><h2>对比设置</h2><p>已自动识别 B 为 A 的后续修订版本。</p></div><label><input type="checkbox" checked><span><strong>语义差异分析</strong><small>识别责任、风险和数字变化</small></span></label><label><input type="checkbox"><span><strong>包含格式变化</strong><small>字体、编号和样式调整</small></span></label><label><input type="checkbox" checked><span><strong>忽略页眉页脚</strong><small>减少无业务影响差异</small></span></label><button class="btn primary" data-action="start-compare"><i data-lucide="git-compare-arrows"></i>开始对比</button></div><section class="recent-comparisons"><div class="section-head"><div><h2>最近对比</h2><p>继续完成尚未决策的差异。</p></div><button data-action="toast" data-toast="已打开全部对比记录">查看全部</button></div><div class="recent-compare-grid"><button data-action="start-compare"><strong>内容版权许可协议 v4 → v5</strong><p>12 项差异 · 3 项风险上升</p><span>已决策 8/12 · 昨天 17:32</span></button><button data-action="toast" data-toast="该版本对比已完成"><strong>校企合作框架协议 v2 → v3</strong><p>6 项差异 · 无高风险</p><span>已完成 · 07-11</span></button><button data-action="toast" data-toast="该版本对比正在等待对方回复"><strong>年度采购协议 v6 → v7</strong><p>21 项差异 · 5 项待确认</p><span>谈判中 · 07-10</span></button></div></section></section>`;
}

function renderCompare() {
  const stats = calculateDiffStats(state.diffs);
  return `<section class="compare-page"><div class="compare-header"><div><button class="back-link" data-action="back-entry"><i data-lucide="arrow-left"></i>返回版本选择</button><h1>星云数据平台服务采购协议 v2 → v3</h1><p>基准：我方 v2 · 修订：对方 v3 · 语义差异分析</p></div><div class="compare-actions"><button class="btn" data-action="open-summary"><i data-lucide="file-chart-column"></i>变化摘要</button><button class="btn" data-action="toast" data-toast="红线版 Word 已导出"><i data-lucide="download"></i>导出红线版</button><button class="btn primary" data-action="generate-merge"><i data-lucide="git-merge"></i>生成合并建议</button></div></div><div class="diff-stats"><button data-action="set-filter" data-filter="all"><span>全部差异</span><strong>${stats.total}</strong></button><button class="modified" data-action="set-filter" data-filter="modified"><span>修改</span><strong>${stats.modified}</strong></button><button class="added" data-action="set-filter" data-filter="added"><span>新增</span><strong>${stats.added}</strong></button><button class="deleted" data-action="set-filter" data-filter="deleted"><span>删除</span><strong>${stats.deleted}</strong></button><button class="risk" data-action="set-filter" data-filter="risk"><span>风险上升</span><strong>${stats.riskRaised}</strong></button><div class="decision-progress"><span>已决策</span><strong>${stats.total - stats.unresolved}/${stats.total}</strong><div><i style="width:${((stats.total - stats.unresolved) / stats.total) * 100}%"></i></div></div></div><div class="mobile-diff-tabs"><button class="${state.mobilePane === "diffs" ? "active" : ""}" data-action="mobile-pane" data-pane="diffs">差异</button><button class="${state.mobilePane === "documents" ? "active" : ""}" data-action="mobile-pane" data-pane="documents">文档</button><button class="${state.mobilePane === "impact" ? "active" : ""}" data-action="mobile-pane" data-pane="impact">影响</button></div><div class="diff-workbench" data-mobile-pane="${state.mobilePane}">${renderDiffRail()}${renderDiffDocuments()}${renderImpactPanel()}</div></section>`;
}

function renderDiffRail() {
  const items = filterDiffs(state.diffs, state.filter);
  return `<aside class="diff-rail diff-pane-list"><div class="diff-rail-head"><div><h2>差异导航</h2><span>${items.length} 项</span></div><button class="icon-button" data-action="toast" data-toast="差异筛选设置已打开"><i data-lucide="list-filter"></i></button></div><div class="diff-filter"><button class="${state.filter === "all" ? "active" : ""}" data-action="set-filter" data-filter="all">全部</button><button class="${state.filter === "risk" ? "active" : ""}" data-action="set-filter" data-filter="risk">风险</button><button class="${state.filter === "decided" ? "active" : ""}" data-action="set-filter" data-filter="decided">已决策</button></div><div class="diff-list">${items.length ? items.map(renderDiffItem).join("") : `<div class="diff-empty"><i data-lucide="check-check"></i><p>该分组暂无差异</p></div>`}</div><div class="diff-legend"><span><i class="legend-dot modified"></i>修改</span><span><i class="legend-dot added"></i>新增</span><span><i class="legend-dot deleted"></i>删除</span></div></aside>`;
}

function renderDiffItem(diff) {
  const labels = { modified: "修改", added: "新增", deleted: "删除" };
  const decisions = { accepted: "已接受", rejected: "已拒绝", commented: "有评论" };
  return `<button class="diff-item ${state.activeDiffId === diff.id ? "active" : ""}" data-action="select-diff" data-diff="${diff.id}"><span class="diff-type ${diff.type}">${labels[diff.type]}</span><span><strong>${diff.title}</strong><small>${diff.section} · A P${diff.pageLeft} / B P${diff.pageRight}</small>${diff.riskRaised ? `<em class="risk-raised"><i data-lucide="trending-up"></i>风险上升</em>` : ""}${diff.decision ? `<em class="diff-decision ${diff.decision}">${decisions[diff.decision]}</em>` : ""}</span></button>`;
}

function renderDiffDocuments() {
  const diff = activeDiff();
  return `<main class="diff-documents diff-pane-documents"><div class="diff-toolbar"><div class="view-switch"><button class="${state.viewMode === "side-by-side" ? "active" : ""}" data-action="view-mode" data-mode="side-by-side">并排对比</button><button class="${state.viewMode === "redline" ? "active" : ""}" data-action="view-mode" data-mode="redline">红线模式</button></div><div class="sync-control"><i data-lucide="link-2"></i>同步滚动</div><div class="diff-tools"><button data-action="zoom-out"><i data-lucide="zoom-out"></i></button><span>${state.zoom}%</span><button data-action="zoom-in"><i data-lucide="zoom-in"></i></button><button data-action="toast" data-toast="全文搜索已打开"><i data-lucide="search"></i></button></div></div>${state.viewMode === "redline" ? renderRedlineDocument(diff) : renderSideBySide(diff)}<div class="diff-location"><span><i data-lucide="locate-fixed"></i>${diff.section} · 差异 ${state.diffs.findIndex(item => item.id === diff.id) + 1}/${state.diffs.length}</span><strong>${diff.type === "modified" ? "内容修改" : diff.type === "added" ? "新增内容" : "删除内容"}</strong></div></main>`;
}

function renderSideBySide(diff) {
  return `<div class="document-pair"><section class="version-document old"><header><span>A · 基准版本</span><strong>v2 · 我方 · 07-08</strong></header><article style="font-size:${state.zoom}%"><h2>星云数据平台服务采购协议</h2><h3>${diff.section}</h3>${diff.oldText ? `<p class="diff-block ${diff.type === "deleted" ? "deleted" : "modified-old"}">${diff.oldText}</p>` : `<p class="empty-clause">基准版本无此条款</p>`}<p>双方其余权利义务按照本协议及附件约定执行。</p><p>本条款与其他条款冲突时，以双方最终书面确认内容为准。</p></article></section><div class="pair-divider"><span><i data-lucide="arrow-right"></i></span></div><section class="version-document new"><header><span>B · 修订版本</span><strong>v3 · 对方 · 今天</strong></header><article style="font-size:${state.zoom}%"><h2>星云数据平台服务采购协议</h2><h3>${diff.section}</h3>${diff.newText ? `<p class="diff-block ${diff.type === "added" ? "added" : "modified-new"}">${diff.newText}</p>` : `<p class="empty-clause deleted">该条款已从修订版本删除</p>`}<p>双方其余权利义务按照本协议及附件约定执行。</p><p>本条款与其他条款冲突时，以双方最终书面确认内容为准。</p></article></section></div>`;
}

function renderRedlineDocument(diff) {
  return `<div class="redline-scroll"><article class="redline-document" style="font-size:${state.zoom}%"><header><h2>星云数据平台服务采购协议</h2><p>基于 v2 展示 v3 修订</p></header><h3>${diff.section}</h3>${diff.oldText ? `<del>${diff.oldText}</del>` : ""}${diff.newText ? `<ins>${diff.newText}</ins>` : ""}<p>双方其余权利义务按照本协议及附件约定执行。</p><div class="redline-note"><i data-lucide="message-square"></i><span>语义影响：${diff.impact}</span></div></article></div>`;
}

function renderImpactPanel() {
  const diff = activeDiff();
  const decisionLabel = { accepted: "已接受该差异", rejected: "已拒绝该差异", commented: "已添加审阅意见" }[diff.decision];
  return `<aside class="impact-panel diff-pane-impact"><div class="impact-head"><div><span class="diff-type ${diff.type}">${diff.type === "modified" ? "修改" : diff.type === "added" ? "新增" : "删除"}</span><div><h2>${diff.title}</h2><p>${diff.section}</p></div></div><button class="icon-button" data-action="toast" data-toast="差异链接已复制"><i data-lucide="link"></i></button></div>${decisionLabel ? `<div class="diff-decision-banner ${diff.decision}"><i data-lucide="${diff.decision === "accepted" ? "check" : diff.decision === "rejected" ? "x" : "message-square"}"></i><strong>${decisionLabel}</strong></div>` : ""}<div class="impact-scroll"><section class="impact-section"><div class="impact-title"><h3>语义影响</h3>${diff.riskRaised ? `<span class="risk-up"><i data-lucide="trending-up"></i>风险上升</span>` : `<span class="risk-neutral">风险未上升</span>`}</div><p>${diff.impact}</p></section><section class="impact-section responsibility"><h3>责任变化</h3><div><span>变更前后</span><strong>${diff.responsibility}</strong></div></section><section class="impact-section"><h3>修改前</h3><blockquote class="old-quote">${diff.oldText || "基准版本无此条款"}</blockquote></section><section class="impact-section"><h3>修改后</h3><blockquote class="new-quote">${diff.newText || "修订版本已删除该条款"}</blockquote></section><section class="impact-section suggestion-box"><div class="impact-title"><h3>处理建议</h3><span>92% 置信度</span></div><p>${diff.suggestion}</p><small><i data-lucide="info"></i>建议基于文本影响分析，最终决策由审阅人确认。</small></section></div><div class="diff-actions"><button class="btn reject" data-action="decide" data-decision="rejected"><i data-lucide="x"></i>拒绝</button><button class="btn" data-action="comment"><i data-lucide="message-square-plus"></i>评论</button><button class="btn primary" data-action="decide" data-decision="accepted"><i data-lucide="check"></i>接受</button></div></aside>`;
}

function renderModal() {
  const diff = activeDiff();
  if (state.modal === "comment") return `<div class="compare-modal-layer" data-action="close-modal"><section class="compare-modal" role="dialog" data-stop-close><div class="modal-head"><div><p class="compare-eyebrow">添加审阅意见</p><h2>${diff.title}</h2></div><button class="icon-button" data-action="close-modal"><i data-lucide="x"></i></button></div><label><span>通知对象</span><div class="comment-mentions"><span>赵晨 · 法务</span><span>周宁 · 采购</span><button><i data-lucide="plus"></i></button></div></label><label><span>审阅意见</span><textarea>请确认该修改是否为对方最终立场，并结合本项目谈判底线给出处理建议。</textarea></label><label class="comment-task"><input type="checkbox" checked><span><strong>同时创建协作任务</strong><small>截止时间：07-15 18:00</small></span></label><div class="modal-actions"><button class="btn" data-action="close-modal">取消</button><button class="btn primary" data-action="save-comment">发送评论</button></div></section></div>`;
  if (state.modal === "summary") {
    const stats = calculateDiffStats(state.diffs);
    return `<div class="compare-modal-layer" data-action="close-modal"><section class="change-summary-modal" role="dialog" data-stop-close><div class="modal-head"><div><p class="compare-eyebrow">版本变化摘要</p><h2>v2 → v3 核心变化</h2></div><button class="icon-button" data-action="close-modal"><i data-lucide="x"></i></button></div><div class="summary-kpis"><div><span>全部差异</span><strong>${stats.total}</strong></div><div><span>风险上升</span><strong class="danger">${stats.riskRaised}</strong></div><div><span>责任变化</span><strong>5</strong></div><div><span>已决策</span><strong>${stats.total - stats.unresolved}</strong></div></div><section class="summary-highlight danger"><i data-lucide="shield-alert"></i><div><strong>优先处理 3 项风险上升</strong><p>无限责任、自动续费和数据导出期删除会显著改变我方合同风险。</p></div></section><section class="summary-list"><h3>变化主题</h3><article><span>责任与赔偿</span><strong>1 项高风险修改</strong></article><article><span>数据与安全</span><strong>1 项高风险删除，1 项新增</strong></article><article><span>交付与服务</span><strong>1 项新增，1 项删除</strong></article><article><span>期限与付款</span><strong>2 项修改</strong></article></section><div class="modal-actions"><button class="btn" data-action="toast" data-toast="变化摘要已保存到云盘">保存摘要</button><button class="btn primary" data-action="toast" data-toast="变化摘要 Word 已导出">导出 Word</button></div></section></div>`;
  }
  if (state.modal === "merge") return `<div class="compare-modal-layer" data-action="close-modal"><section class="merge-modal" role="dialog" data-stop-close><div class="merge-icon"><i data-lucide="git-merge"></i></div><h2>生成合并建议</h2><p>将按已接受、已拒绝和评论状态生成可继续编辑的 v4 建议稿。</p><div class="merge-summary"><span>接受差异 <strong>${state.diffs.filter(item => item.decision === "accepted").length}</strong></span><span>拒绝差异 <strong>${state.diffs.filter(item => item.decision === "rejected").length}</strong></span><span>待继续处理 <strong>${state.diffs.filter(item => !item.decision).length}</strong></span></div><label><span>文件名称</span><input value="星云数据平台服务采购协议_v4_合并建议.docx"></label><label><span>保存到</span><div><i data-lucide="folder"></i>企业云盘 / 采购部 / 合同谈判</div></label><div class="modal-actions"><button class="btn" data-action="close-modal">取消</button><button class="btn primary" data-action="save-merge">生成并保存</button></div></section></div>`;
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
  if (action === "add-third") state.thirdVersion = true;
  else if (action === "remove-third") state.thirdVersion = false;
  else if (action === "start-compare") state.screen = "compare";
  else if (action === "back-entry") state.screen = "entry";
  else if (action === "set-filter") {
    state.filter = target.dataset.filter;
    const filtered = filterDiffs(state.diffs, state.filter);
    if (filtered.length && !filtered.some(item => item.id === state.activeDiffId)) state.activeDiffId = filtered[0].id;
  } else if (action === "select-diff") { state.activeDiffId = target.dataset.diff; state.mobilePane = "documents"; }
  else if (action === "view-mode") state.viewMode = target.dataset.mode;
  else if (action === "zoom-in") state.zoom = Math.min(115, state.zoom + 5);
  else if (action === "zoom-out") state.zoom = Math.max(80, state.zoom - 5);
  else if (action === "decide") {
    state.diffs = decideDiff(state.diffs, state.activeDiffId, target.dataset.decision);
    showToast(target.dataset.decision === "accepted" ? "已接受该差异" : "已拒绝该差异");
    return;
  } else if (action === "comment") state.modal = "comment";
  else if (action === "save-comment") {
    state.diffs = decideDiff(state.diffs, state.activeDiffId, "commented");
    state.modal = null;
    showToast("审阅意见和协作任务已发送");
    return;
  } else if (action === "open-summary") state.modal = "summary";
  else if (action === "generate-merge") {
    if (!canGenerateMerge(state.diffs)) return showToast("仍有风险上升差异未决策，请先接受、拒绝或评论");
    state.modal = "merge";
  } else if (action === "save-merge") {
    state.modal = null;
    showToast("v4 合并建议已生成并保存到云盘");
    return;
  } else if (action === "close-modal") state.modal = null;
  else if (action === "mobile-pane") state.mobilePane = target.dataset.pane;
  render();
}

if (root) {
  root.addEventListener("click", handleClick);
  render();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { DIFFS, calculateDiffStats, decideDiff, canGenerateMerge, filterDiffs };
}
