const RISKS = [
  {
    id: "liability",
    section: "8.2",
    title: "责任上限缺失",
    severity: "high",
    category: "责任限制",
    page: 8,
    original: "因本协议产生或与本协议有关的任何损失，乙方应承担全部赔偿责任，且不受金额限制。",
    explanation: "乙方承担无限责任，未区分直接损失、间接损失，也没有以合同金额为赔偿上限。",
    rule: "企业采购合同 Playbook 4.2：除保密、知识产权侵权和故意行为外，累计责任不超过过去 12 个月已支付费用。",
    suggestion: "除因乙方故意或重大过失、违反保密义务或侵犯第三方知识产权造成的损失外，乙方在本协议项下的累计赔偿责任以甲方在责任发生前十二个月内已支付的服务费总额为限。",
    owner: "法务部",
    confidence: 98,
    decision: null
  },
  {
    id: "data-export",
    section: "11.4",
    title: "终止后数据不可导出",
    severity: "high",
    category: "数据权益",
    page: 11,
    original: "协议终止后，乙方有权立即删除甲方在平台内的全部数据，不再承担任何保存或迁移义务。",
    explanation: "缺少终止后的数据导出窗口和格式要求，可能导致业务数据无法迁移。",
    rule: "数据服务采购标准 3.1：供应商应提供至少 30 天的标准格式导出期，并在书面确认后删除数据。",
    suggestion: "协议终止或到期后，乙方应为甲方保留不少于三十日的数据导出期，并以通用、机器可读格式提供完整数据。数据仅可在甲方书面确认导出完成后删除。",
    owner: "信息安全部",
    confidence: 96,
    decision: null
  },
  {
    id: "payment",
    section: "5.3",
    title: "付款节点早于验收",
    severity: "medium",
    category: "付款条件",
    page: 5,
    original: "甲方应在服务开通后三个工作日内支付全部年度服务费用。",
    explanation: "付款义务在验收之前发生，且一次性支付全年费用，缺少验收不通过时的处理机制。",
    rule: "采购付款政策 2.4：首付款不高于 50%，尾款应在验收通过并收到合规发票后支付。",
    suggestion: "甲方在服务开通并完成初验后支付合同金额的百分之五十；剩余款项在最终验收通过并收到合法有效发票后十个工作日内支付。",
    owner: "采购部",
    confidence: 94,
    decision: null
  },
  {
    id: "renewal",
    section: "12.2",
    title: "自动续费通知期过短",
    severity: "medium",
    category: "期限与终止",
    page: 12,
    original: "任何一方未在到期日前七日提出异议的，本协议自动续展一年。",
    explanation: "七日通知期过短，容易在预算和采购流程尚未完成时自动续费。",
    rule: "SaaS 采购标准 5.2：不得默认自动续费；确需续费的，供应商至少提前 60 日书面提醒。",
    suggestion: "本协议到期后不自动续展。双方如需续约，应至少在到期日前六十日启动书面续约确认，并另行签署续约文件。",
    owner: "采购部",
    confidence: 97,
    decision: null
  },
  {
    id: "ip",
    section: "9.1",
    title: "定制成果权属不清",
    severity: "medium",
    category: "知识产权",
    page: 9,
    original: "服务过程中形成的相关成果及改进均归乙方所有。",
    explanation: "未区分供应商既有能力与甲方付费形成的定制成果，可能限制甲方后续使用。",
    rule: "定制开发条款 1.3：既有知识产权归原权利人；甲方付费定制的交付成果归甲方或取得永久使用权。",
    suggestion: "双方既有知识产权仍归各自所有；甲方付费形成的定制交付成果及其文档归甲方所有，乙方保留其通用底层技术的权利。",
    owner: "法务部",
    confidence: 92,
    decision: null
  },
  {
    id: "notice",
    section: "14.1",
    title: "通知邮箱需补充",
    severity: "low",
    category: "一般条款",
    page: 14,
    original: "双方通知应发送至本协议首页所列联系人。",
    explanation: "合同首页未填写法定通知邮箱，可能影响通知送达认定。",
    rule: "合同形式审查清单：明确联系人、地址、邮箱和变更通知机制。",
    suggestion: "双方通知应发送至本协议载明的联系人、通讯地址及电子邮箱；任一方联系方式变更的，应提前三个工作日书面通知对方。",
    owner: "业务部门",
    confidence: 88,
    decision: null
  }
];

const SECTIONS = [
  { id: "1", title: "1. 定义与服务范围", page: 1 },
  { id: "3", title: "3. 服务内容与交付", page: 3 },
  { id: "5", title: "5. 费用与付款", page: 5, riskIds: ["payment"] },
  { id: "8", title: "8. 违约与责任", page: 8, riskIds: ["liability"] },
  { id: "9", title: "9. 知识产权", page: 9, riskIds: ["ip"] },
  { id: "11", title: "11. 数据与安全", page: 11, riskIds: ["data-export"] },
  { id: "12", title: "12. 期限与终止", page: 12, riskIds: ["renewal"] },
  { id: "14", title: "14. 通知与其他", page: 14, riskIds: ["notice"] }
];

const state = {
  screen: "entry",
  contractType: "saas",
  position: "buyer",
  playbook: "procurement",
  risks: RISKS.map(item => ({ ...item })),
  filter: "all",
  activeRiskId: "liability",
  documentMode: "review",
  zoom: 100,
  modal: null,
  reportReady: false,
  mobilePane: "risks",
  toast: ""
};

const root = typeof document !== "undefined" ? document.body : null;

function calculateRiskCounts(risks) {
  return {
    high: risks.filter(item => item.severity === "high").length,
    medium: risks.filter(item => item.severity === "medium").length,
    low: risks.filter(item => item.severity === "low").length,
    unresolved: risks.filter(item => !item.decision).length
  };
}

function applyRedline(risk) {
  return { ...risk, displayText: risk.suggestion, decision: "proposed" };
}

function canCompleteReview(risks) {
  return !risks.some(item => item.severity === "high" && !["accepted", "ignored", "transferred"].includes(item.decision));
}

function filterRisks(risks, filter) {
  if (filter === "all") return risks;
  if (filter === "resolved") return risks.filter(item => item.decision);
  return risks.filter(item => item.severity === filter);
}

function activeRisk() {
  return state.risks.find(item => item.id === state.activeRiskId) || state.risks[0];
}

function refreshIcons() {
  if (typeof lucide !== "undefined") lucide.createIcons();
}

function render() {
  if (!root) return;
  root.innerHTML = layout(state.screen === "review" ? renderReview() : renderEntry());
  refreshIcons();
}

function layout(content) {
  return `
    <div class="app-shell contract-shell">
      ${renderProductSidebar()}
      <main class="main"><header class="topbar"><div class="breadcrumb"><a href="index.html">文件工作台</a><span>/</span><strong>合同风险审阅</strong></div><nav class="primary-nav"><a class="primary-nav-link" href="report.html">调研报告</a><a class="primary-nav-link active" href="index.html">工具体验</a><a class="primary-nav-link" href="existing-tools.html">已有工具</a></nav><div class="top-actions"><button class="btn" data-action="toast" data-toast="已打开审阅记录">使用记录</button><button class="btn" data-action="toast" data-toast="审阅边界与帮助已打开">使用帮助</button></div></header>${content}</main>
    </div>
    ${state.modal ? renderModal() : ""}
    ${state.toast ? `<div class="toast">${state.toast}</div>` : ""}
  `;
}

function renderEntry() {
  return `
    <section class="contract-entry">
      <div class="contract-entry-head"><h1>依据企业 Playbook 审阅合同，直接形成可谈判的修改稿</h1><p>依据企业规则定位风险、说明规则依据并生成红线建议；法务和业务人员保留最终决策。</p></div>
      <div class="contract-start-grid">
        <main class="contract-upload-card">
          <div class="selected-contract"><span class="word-file"><i data-lucide="file-text"></i></span><div><strong>星云数据平台服务采购协议_v3.docx</strong><p>15 页 · 386 KB · 来自企业云盘 / 采购部 / 待审合同</p></div><button class="icon-button" type="button" aria-label="更换待审合同" data-action="toast" data-toast="已打开云盘文件选择器"><i data-lucide="refresh-cw"></i></button></div>
          <div class="contract-meta"><div><span>合同类型</span><strong>SaaS 服务采购</strong></div><div><span>合同金额</span><strong>¥480,000 / 年</strong></div><div><span>对方主体</span><strong>北京星云数据科技有限公司</strong></div></div>
          <div class="contract-scan-note"><i data-lucide="shield-check"></i><div><strong>文件权限已校验</strong><p>当前合同和审阅结果仅对采购部、法务部成员可见。</p></div></div>
          <button class="replace-file" data-action="toast" data-toast="可从本地或云盘重新选择合同"><i data-lucide="upload-cloud"></i>更换待审合同</button>
        </main>
        <aside class="review-config">
          <div class="config-head"><h2>审阅配置</h2><span>已识别建议值</span></div>
          <label><span>合同类型</span><div class="select-control"><select data-config="type"><option>SaaS 服务采购</option><option>软件许可</option><option>数据处理协议</option><option>教育内容合作</option></select><i data-lucide="chevron-down"></i></div></label>
          <label><span>我方立场</span><div class="segmented"><button class="active">采购方</button><button>供应方</button></div></label>
          <label><span>审查 Playbook</span><button class="playbook-select"><span><i data-lucide="book-check"></i><strong>企业采购合同 Playbook</strong><small>38 条规则 · 07-10 更新</small></span><i data-lucide="chevron-down"></i></button></label>
          <label class="config-check"><input type="checkbox" checked><span><strong>同时检查信息安全条款</strong><small>数据导出、删除、事件通知和分包商</small></span></label>
          <button class="btn primary start-review" data-action="start-review"><i data-lucide="scan-search"></i>开始审阅</button>
        </aside>
      </div>
      <section class="recent-contracts"><div class="section-head"><div><h2>最近审阅</h2><p>继续处理尚未完成的风险决策。</p></div><button data-action="toast" data-toast="已打开全部审阅记录">查看全部</button></div><div class="recent-contract-grid"><button data-action="start-review"><span class="contract-status pending">待处理 3</span><strong>营销系统订阅协议_v2.docx</strong><p>高风险 1 · 中风险 2 · 昨天 18:40</p><small>法务：尚未分派</small></button><button data-action="toast" data-toast="该合同已完成审阅"><span class="contract-status done">已完成</span><strong>校企合作框架协议.pdf</strong><p>已接受 4 · 已忽略 2 · 07-11</p><small>审阅人：赵晨</small></button><button data-action="toast" data-toast="该合同正在等待对方回复"><span class="contract-status negotiation">谈判中</span><strong>内容版权许可协议_v5.docx</strong><p>红线 8 处 · 对方待确认 3 处 · 07-10</p><small>负责人：法务合同组</small></button></div></section>
    </section>
  `;
}

function renderReview() {
  const counts = calculateRiskCounts(state.risks);
  const risk = activeRisk();
  return `
    <section class="contract-review-page">
      <div class="review-header"><div><button class="back-link" data-action="back-entry"><i data-lucide="arrow-left"></i>返回合同列表</button><h1>星云数据平台服务采购协议_v3</h1><p>SaaS 服务采购 · 我方：采购方 · 企业采购合同 Playbook</p></div><div class="review-actions"><button class="btn" data-action="open-report"><i data-lucide="clipboard-list"></i>审阅报告</button><button class="btn" data-action="toast" data-toast="修订稿已导出为 Word"><i data-lucide="download"></i>导出修订稿</button><button class="btn primary" data-action="complete-review"><i data-lucide="check-check"></i>完成审阅</button></div></div>
      <div class="review-status-bar"><div class="review-score"><span>合同风险</span><strong>中高</strong></div><button data-action="set-filter" data-filter="high"><span>高风险</span><strong>${counts.high}</strong></button><button data-action="set-filter" data-filter="medium"><span>中风险</span><strong>${counts.medium}</strong></button><button data-action="set-filter" data-filter="low"><span>低风险</span><strong>${counts.low}</strong></button><button data-action="set-filter" data-filter="resolved"><span>已决策</span><strong>${state.risks.filter(item => item.decision).length}</strong></button><div class="review-progress"><span>审阅进度</span><strong>${Math.round(((state.risks.length - counts.unresolved) / state.risks.length) * 100)}%</strong><div><i style="width:${((state.risks.length - counts.unresolved) / state.risks.length) * 100}%"></i></div></div></div>
      <div class="mobile-legal-tabs"><button class="${state.mobilePane === "risks" ? "active" : ""}" data-action="mobile-pane" data-pane="risks">风险</button><button class="${state.mobilePane === "document" ? "active" : ""}" data-action="mobile-pane" data-pane="document">合同</button><button class="${state.mobilePane === "advice" ? "active" : ""}" data-action="mobile-pane" data-pane="advice">建议</button></div>
      <div class="legal-workbench" data-mobile-pane="${state.mobilePane}">${renderRiskRail()}${renderContractDocument(risk)}${renderAdvicePanel(risk)}</div>
    </section>
  `;
}

function renderRiskRail() {
  const risks = filterRisks(state.risks, state.filter);
  return `<aside class="risk-rail legal-pane-risks"><div class="risk-rail-head"><div><h2>风险与目录</h2><span>${risks.length} 个风险</span></div><button class="icon-button" data-action="set-filter" data-filter="all"><i data-lucide="list-filter"></i></button></div><div class="risk-filter"><button class="${state.filter === "all" ? "active" : ""}" data-action="set-filter" data-filter="all">全部</button><button class="high ${state.filter === "high" ? "active" : ""}" data-action="set-filter" data-filter="high">高</button><button class="medium ${state.filter === "medium" ? "active" : ""}" data-action="set-filter" data-filter="medium">中</button><button class="low ${state.filter === "low" ? "active" : ""}" data-action="set-filter" data-filter="low">低</button></div><div class="risk-list">${risks.length ? risks.map(renderRiskItem).join("") : `<div class="risk-empty"><i data-lucide="badge-check"></i><p>当前筛选下没有风险</p></div>`}</div><div class="outline-head"><h3>合同目录</h3><span>15 页</span></div><div class="contract-outline">${SECTIONS.map(section => `<button data-action="jump-section" data-section="${section.id}"><span>${section.title}</span><small>P${section.page}${section.riskIds ? ` · ${section.riskIds.length} 风险` : ""}</small></button>`).join("")}</div></aside>`;
}

function renderRiskItem(risk) {
  const decisionLabel = { proposed: "已生成红线", accepted: "已接受", ignored: "已忽略", transferred: "已转法务" }[risk.decision];
  return `<button class="risk-item ${state.activeRiskId === risk.id ? "active" : ""}" data-action="select-risk" data-risk="${risk.id}"><span class="risk-level ${risk.severity}">${risk.severity === "high" ? "高" : risk.severity === "medium" ? "中" : "低"}</span><span><strong>${risk.title}</strong><small>第 ${risk.section} 条 · P${risk.page}</small>${decisionLabel ? `<em>${decisionLabel}</em>` : ""}</span></button>`;
}

function renderContractDocument(active) {
  return `<main class="contract-document legal-pane-document"><div class="contract-toolbar"><div class="document-mode"><button class="${state.documentMode === "review" ? "active" : ""}" data-action="document-mode" data-mode="review">审阅模式</button><button class="${state.documentMode === "redline" ? "active" : ""}" data-action="document-mode" data-mode="redline">红线模式</button></div><div class="contract-tools"><button data-action="zoom-out"><i data-lucide="zoom-out"></i></button><span>${state.zoom}%</span><button data-action="zoom-in"><i data-lucide="zoom-in"></i></button><button data-action="toast" data-toast="已搜索合同全文"><i data-lucide="search"></i></button><button data-action="toast" data-toast="已打开评论面板"><i data-lucide="message-square"></i></button></div></div><div class="contract-scroll"><article class="contract-paper" style="font-size:${state.zoom}%"><header><h2>星云数据平台服务采购协议</h2><p>合同编号：360-CG-2026-0712</p><div><span>甲方：北京三六零企业安全科技有限公司</span><span>乙方：北京星云数据科技有限公司</span></div></header>${renderClause("1", "定义与服务范围", `乙方向甲方提供星云数据分析平台的账号、存储、接口及运维支持服务。服务范围以附件一《服务清单》为准。`, null)}${renderClause("5.3", "费用与付款", state.risks.find(item => item.id === "payment").original, "payment")}${renderClause("8.2", "违约与责任限制", state.risks.find(item => item.id === "liability").original, "liability")}${renderClause("9.1", "知识产权", state.risks.find(item => item.id === "ip").original, "ip")}${renderClause("11.4", "数据返还与删除", state.risks.find(item => item.id === "data-export").original, "data-export")}${renderClause("12.2", "期限与续展", state.risks.find(item => item.id === "renewal").original, "renewal")}${renderClause("14.1", "通知", state.risks.find(item => item.id === "notice").original, "notice")}<footer><span>甲方（盖章）：</span><span>乙方（盖章）：</span><span>签署日期：2026 年  月  日</span></footer></article></div><div class="document-location"><span><i data-lucide="locate-fixed"></i>当前定位：第 ${active.section} 条 ${active.title}</span><strong>P${active.page} / 15</strong></div></main>`;
}

function renderClause(number, title, original, riskId) {
  if (!riskId) return `<section class="contract-clause"><h3>第 ${number} 条 ${title}</h3><p>${original}</p></section>`;
  const risk = state.risks.find(item => item.id === riskId);
  const active = state.activeRiskId === riskId;
  const changed = ["proposed", "accepted"].includes(risk.decision);
  return `<section class="contract-clause ${active ? "active" : ""}" id="clause-${riskId}"><h3>第 ${number} 条 ${title}</h3><button class="clause-risk ${risk.severity} ${changed ? "redlined" : ""}" data-action="select-risk" data-risk="${riskId}"><span class="inline-risk-label">${risk.severity === "high" ? "高风险" : risk.severity === "medium" ? "中风险" : "低风险"}</span>${state.documentMode === "redline" && changed ? `<del>${original}</del><ins>${risk.displayText || risk.suggestion}</ins>` : `<span>${changed ? risk.displayText || risk.suggestion : original}</span>`}<i data-lucide="message-square-warning"></i></button></section>`;
}

function renderAdvicePanel(risk) {
  const decisionText = { proposed: "红线待确认", accepted: "已接受修改", ignored: "已忽略并留痕", transferred: "已转交法务" }[risk.decision];
  return `<aside class="advice-panel legal-pane-advice"><div class="advice-head"><div><span class="risk-level ${risk.severity}">${risk.severity === "high" ? "高" : risk.severity === "medium" ? "中" : "低"}</span><div><h2>${risk.title}</h2><p>第 ${risk.section} 条 · ${risk.category}</p></div></div><button class="icon-button" data-action="toast" data-toast="风险链接已复制"><i data-lucide="link"></i></button></div>${decisionText ? `<div class="decision-banner ${risk.decision}"><i data-lucide="${risk.decision === "accepted" ? "check-check" : risk.decision === "ignored" ? "circle-minus" : risk.decision === "transferred" ? "user-round-check" : "pen-line"}"></i><strong>${decisionText}</strong></div>` : ""}<div class="advice-scroll"><section class="advice-section"><div class="advice-section-title"><h3>风险说明</h3><span>${risk.confidence}% 置信度</span></div><p>${risk.explanation}</p></section><section class="advice-section rule-basis"><div class="advice-section-title"><h3>企业规则依据</h3><button data-action="toast" data-toast="Playbook 规则详情已打开">查看规则</button></div><p>${risk.rule}</p><small><i data-lucide="book-check"></i>企业采购合同 Playbook · 当前生效</small></section><section class="advice-section"><div class="advice-section-title"><h3>当前条款</h3><button data-action="toast" data-toast="已复制当前条款"><i data-lucide="copy"></i></button></div><blockquote>${risk.original}</blockquote></section><section class="advice-section suggestion"><div class="advice-section-title"><h3>建议替换条款</h3><button data-action="edit-suggestion"><i data-lucide="pencil"></i>编辑</button></div><textarea readonly>${risk.displayText || risk.suggestion}</textarea><div class="suggestion-meta"><span><i data-lucide="shield-check"></i>已核对 Playbook</span><span>保留原文与修改记录</span></div></section></div><div class="risk-actions">${risk.decision === "proposed" ? `<button class="btn primary" data-action="accept-redline"><i data-lucide="check"></i>接受红线</button>` : risk.decision === "accepted" ? `<button class="btn primary" disabled><i data-lucide="check-check"></i>已接受</button>` : `<button class="btn primary" data-action="apply-redline"><i data-lucide="pen-line"></i>应用建议</button>`}<button class="btn" data-action="ignore-risk"><i data-lucide="circle-minus"></i>忽略</button><button class="btn" data-action="transfer-legal"><i data-lucide="user-round-plus"></i>转交法务</button></div></aside>`;
}

function renderModal() {
  const risk = activeRisk();
  if (state.modal === "ignore") return `<div class="contract-modal-layer" data-action="close-modal"><section class="contract-modal" role="dialog" data-stop-close><div class="modal-head"><div><p class="contract-eyebrow">忽略风险</p><h2>记录不采纳原因</h2></div><button class="icon-button" data-action="close-modal"><i data-lucide="x"></i></button></div><div class="ignore-warning"><i data-lucide="triangle-alert"></i><p>${risk.title} 将保留在审阅报告中，并标记为业务接受风险。</p></div><label><span>忽略原因</span><select><option>业务已接受该风险</option><option>已有其他条款覆盖</option><option>规则不适用于当前合同</option></select></label><label><span>补充说明</span><textarea>经业务负责人确认，本次合同金额和服务范围可接受该风险。</textarea></label><div class="modal-actions"><button class="btn" data-action="close-modal">取消</button><button class="btn primary" data-action="confirm-ignore">确认忽略并留痕</button></div></section></div>`;
  if (state.modal === "transfer") return `<div class="contract-modal-layer" data-action="close-modal"><section class="contract-modal" role="dialog" data-stop-close><div class="modal-head"><div><p class="contract-eyebrow">转交法务复核</p><h2>${risk.title}</h2></div><button class="icon-button" data-action="close-modal"><i data-lucide="x"></i></button></div><label><span>复核人</span><div class="assignee"><span>赵</span><div><strong>赵晨 · 法务部</strong><small>采购与数据合规</small></div><i data-lucide="chevron-down"></i></div></label><label><span>处理优先级</span><div class="segmented"><button class="active">紧急</button><button>普通</button></div></label><label><span>复核说明</span><textarea>请结合本项目的数据迁移要求确认替换条款，并给出可谈判底线。</textarea></label><div class="modal-actions"><button class="btn" data-action="close-modal">取消</button><button class="btn primary" data-action="confirm-transfer">发送复核任务</button></div></section></div>`;
  if (state.modal === "edit") return `<div class="contract-modal-layer" data-action="close-modal"><section class="contract-modal edit-clause-modal" role="dialog" data-stop-close><div class="modal-head"><div><p class="contract-eyebrow">编辑建议条款</p><h2>${risk.title}</h2></div><button class="icon-button" data-action="close-modal"><i data-lucide="x"></i></button></div><label><span>替换条款</span><textarea id="suggestion-value">${risk.displayText || risk.suggestion}</textarea></label><div class="edit-note"><i data-lucide="history"></i><span>保存后会生成新版本，原始条款和初始建议均可追溯。</span></div><div class="modal-actions"><button class="btn" data-action="close-modal">取消</button><button class="btn primary" data-action="save-suggestion">保存为修订建议</button></div></section></div>`;
  if (state.modal === "report") {
    const counts = calculateRiskCounts(state.risks);
    return `<div class="contract-modal-layer" data-action="close-modal"><section class="review-report-modal" role="dialog" data-stop-close><div class="modal-head"><div><p class="contract-eyebrow">审阅报告</p><h2>星云数据平台服务采购协议</h2></div><button class="icon-button" data-action="close-modal"><i data-lucide="x"></i></button></div><div class="report-summary"><div><span>总体风险</span><strong>中高</strong></div><div><span>高风险</span><strong class="high">${counts.high}</strong></div><div><span>已决策</span><strong>${state.risks.filter(item => item.decision).length}</strong></div><div><span>红线修改</span><strong>${state.risks.filter(item => ["proposed", "accepted"].includes(item.decision)).length}</strong></div></div><div class="report-list">${state.risks.map(item => `<article><span class="risk-level ${item.severity}">${item.severity === "high" ? "高" : item.severity === "medium" ? "中" : "低"}</span><div><strong>${item.title}</strong><p>第 ${item.section} 条 · ${item.decision ? { proposed: "红线待确认", accepted: "已接受", ignored: "已忽略", transferred: "法务复核中" }[item.decision] : "待处理"}</p></div></article>`).join("")}</div><div class="ai-boundary"><i data-lucide="info"></i><span>本报告依据企业规则生成，不替代法务最终判断；所有建议均保留规则来源。</span></div><div class="modal-actions"><button class="btn" data-action="toast" data-toast="审阅报告已保存到云盘">保存到云盘</button><button class="btn primary" data-action="toast" data-toast="审阅报告 PDF 已导出">导出 PDF</button></div></section></div>`;
  }
  if (state.modal === "complete") return `<div class="contract-modal-layer" data-action="close-modal"><section class="complete-review-modal" role="dialog" data-stop-close><div class="complete-icon"><i data-lucide="badge-check"></i></div><h2>合同审阅已完成</h2><p>所有高风险均已决策。可以导出修订稿、审阅报告并发起业务确认。</p><div class="complete-stats"><span>接受红线 <strong>${state.risks.filter(item => item.decision === "accepted").length}</strong></span><span>已忽略 <strong>${state.risks.filter(item => item.decision === "ignored").length}</strong></span><span>法务复核 <strong>${state.risks.filter(item => item.decision === "transferred").length}</strong></span></div><div class="modal-actions"><button class="btn" data-action="close-modal">返回工作台</button><button class="btn primary" data-action="toast" data-toast="已发起业务确认">发起业务确认</button></div></section></div>`;
  return "";
}

function updateRisk(id, updater) {
  state.risks = state.risks.map(item => item.id === id ? updater(item) : item);
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
  if (action === "start-review") state.screen = "review";
  else if (action === "back-entry") state.screen = "entry";
  else if (action === "set-filter") state.filter = target.dataset.filter;
  else if (action === "select-risk") { state.activeRiskId = target.dataset.risk; state.mobilePane = "document"; }
  else if (action === "jump-section") {
    const section = SECTIONS.find(item => item.id === target.dataset.section);
    if (section?.riskIds?.length) state.activeRiskId = section.riskIds[0];
    showToast(`已定位到第 ${target.dataset.section} 条`);
    return;
  } else if (action === "document-mode") state.documentMode = target.dataset.mode;
  else if (action === "zoom-in") state.zoom = Math.min(120, state.zoom + 5);
  else if (action === "zoom-out") state.zoom = Math.max(85, state.zoom - 5);
  else if (action === "apply-redline") {
    updateRisk(state.activeRiskId, applyRedline);
    state.documentMode = "redline";
    showToast("已生成红线，等待人工接受");
    return;
  } else if (action === "accept-redline") {
    updateRisk(state.activeRiskId, item => ({ ...item, decision: "accepted", displayText: item.displayText || item.suggestion }));
    showToast("红线已接受并写入修订稿");
    return;
  } else if (action === "ignore-risk") state.modal = "ignore";
  else if (action === "confirm-ignore") {
    updateRisk(state.activeRiskId, item => ({ ...item, decision: "ignored" }));
    state.modal = null;
    showToast("已忽略并记录业务接受原因");
    return;
  } else if (action === "transfer-legal") state.modal = "transfer";
  else if (action === "confirm-transfer") {
    updateRisk(state.activeRiskId, item => ({ ...item, decision: "transferred" }));
    state.modal = null;
    showToast("法务复核任务已发送给赵晨");
    return;
  } else if (action === "edit-suggestion") state.modal = "edit";
  else if (action === "save-suggestion") {
    const value = document.querySelector("#suggestion-value")?.value.trim();
    updateRisk(state.activeRiskId, item => ({ ...item, displayText: value || item.suggestion, decision: "proposed" }));
    state.documentMode = "redline";
    state.modal = null;
    showToast("自定义修订建议已保存");
    return;
  } else if (action === "open-report") state.modal = "report";
  else if (action === "complete-review") {
    if (!canCompleteReview(state.risks)) return showToast("仍有未决策的高风险，请先处理或转交法务");
    state.modal = "complete";
  } else if (action === "close-modal") state.modal = null;
  else if (action === "mobile-pane") state.mobilePane = target.dataset.pane;
  render();
}

if (root) {
  root.addEventListener("click", handleClick);
  render();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { RISKS, calculateRiskCounts, applyRedline, canCompleteReview, filterRisks };
}
