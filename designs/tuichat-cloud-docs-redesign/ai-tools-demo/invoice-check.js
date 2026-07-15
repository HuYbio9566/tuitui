const INVOICES = [
  {
    id: "low-confidence",
    file: "电子发票_技术服务费.pdf",
    vendor: "北京智汇云科技有限公司",
    number: "044032600211",
    date: "2026-07-08",
    amount: 12800,
    tax: 724.53,
    category: "技术服务费",
    status: "exception",
    exceptionType: "低置信度",
    severity: "medium",
    page: "1/1",
    reimbursement: "BX20260710018",
    owner: "林澜",
    project: "AI-2026-0710",
    activeField: "number",
    fields: [
      { id: "title", label: "发票类型", value: "增值税电子普通发票", confidence: 99, status: "ok", box: [10, 9, 80, 8] },
      { id: "number", label: "发票号码", value: "04403260021I", confidence: 72, status: "low", box: [66, 18, 24, 6] },
      { id: "seller", label: "销售方", value: "北京智汇云科技有限公司", confidence: 98, status: "ok", box: [12, 58, 42, 6] },
      { id: "sellerTaxNo", label: "销售方税号", value: "91110108MA00A2R7X8", confidence: 79, status: "low", box: [12, 65, 44, 5] },
      { id: "amount", label: "价税合计", value: "¥12,800.00", confidence: 99, status: "ok", box: [61, 72, 28, 7] },
      { id: "category", label: "费用科目", value: "技术服务费", confidence: 94, status: "ok", box: [13, 42, 31, 7] }
    ],
    rules: [
      { label: "抬头与企业主体一致", status: "pass", detail: "北京三六零企业安全科技有限公司" },
      { label: "发票号码需人工确认", status: "warn", detail: "字符 I / 数字 1 识别不确定" },
      { label: "销售方税号需人工确认", status: "warn", detail: "末两位置信度低" },
      { label: "单笔金额审批规则", status: "pass", detail: "已关联部门负责人审批" }
    ],
    matches: [
      { type: "报销单", name: "BX20260710018", amount: "¥12,800.00", status: "matched" },
      { type: "支付凭证", name: "招商银行_0708.png", amount: "¥12,800.00", status: "matched" },
      { type: "订阅确认", name: "AI工具订阅确认.pdf", amount: "负责人已确认", status: "matched" }
    ]
  },
  {
    id: "amount-mismatch",
    file: "差旅住宿发票_杭州.pdf",
    vendor: "杭州云栖酒店管理有限公司",
    number: "033002600891",
    date: "2026-07-06",
    amount: 9600,
    tax: 543.4,
    category: "差旅住宿费",
    status: "exception",
    exceptionType: "金额不一致",
    severity: "high",
    page: "1/2",
    reimbursement: "BX20260709007",
    owner: "周宁",
    project: "EDU-2026-0618",
    activeField: "amount",
    fields: [
      { id: "title", label: "发票类型", value: "增值税电子普通发票", confidence: 99, status: "ok", box: [10, 9, 80, 8] },
      { id: "number", label: "发票号码", value: "033002600891", confidence: 99, status: "ok", box: [66, 18, 24, 6] },
      { id: "seller", label: "销售方", value: "杭州云栖酒店管理有限公司", confidence: 97, status: "ok", box: [12, 58, 42, 6] },
      { id: "sellerTaxNo", label: "销售方税号", value: "91330105MA2A8R91J", confidence: 96, status: "ok", box: [12, 65, 44, 5] },
      { id: "amount", label: "价税合计", value: "¥9,600.00", confidence: 99, status: "mismatch", box: [61, 72, 28, 7] },
      { id: "category", label: "费用科目", value: "差旅住宿费", confidence: 98, status: "ok", box: [13, 42, 31, 7] }
    ],
    rules: [
      { label: "报销金额一致", status: "fail", detail: "报销单金额 ¥9,860.00，相差 ¥260.00" },
      { label: "住宿标准", status: "warn", detail: "人均每晚 ¥800，超过标准 ¥150" },
      { label: "行程附件", status: "pass", detail: "已关联出差申请与行程单" }
    ],
    matches: [
      { type: "报销单", name: "BX20260709007", amount: "¥9,860.00", status: "mismatch" },
      { type: "支付凭证", name: "企业卡流水_0706.png", amount: "¥9,600.00", status: "matched" },
      { type: "出差申请", name: "CC20260629012", amount: "预算 ¥8,400.00", status: "mismatch" }
    ]
  },
  {
    id: "duplicate",
    file: "办公耗材发票_补传.pdf",
    vendor: "北京京东世纪贸易有限公司",
    number: "031002600567",
    date: "2026-07-02",
    amount: 18600,
    tax: 2140.7,
    category: "办公用品",
    status: "exception",
    exceptionType: "疑似重复",
    severity: "high",
    page: "1/1",
    reimbursement: "BX20260710029",
    owner: "王蕊",
    project: "OPS-2026-0602",
    activeField: "number",
    duplicateOf: "办公耗材发票_原件.pdf",
    fields: [
      { id: "title", label: "发票类型", value: "增值税专用发票", confidence: 99, status: "ok", box: [10, 9, 80, 8] },
      { id: "number", label: "发票号码", value: "031002600567", confidence: 99, status: "duplicate", box: [66, 18, 24, 6] },
      { id: "seller", label: "销售方", value: "北京京东世纪贸易有限公司", confidence: 99, status: "ok", box: [12, 58, 42, 6] },
      { id: "sellerTaxNo", label: "销售方税号", value: "9111030271093545X3", confidence: 99, status: "ok", box: [12, 65, 44, 5] },
      { id: "amount", label: "价税合计", value: "¥18,600.00", confidence: 99, status: "duplicate", box: [61, 72, 28, 7] },
      { id: "category", label: "费用科目", value: "办公用品", confidence: 98, status: "ok", box: [13, 42, 31, 7] }
    ],
    rules: [
      { label: "发票唯一性", status: "fail", detail: "同号码、同金额票据已在 07-04 入账" },
      { label: "销售方与金额一致", status: "fail", detail: "与历史票据 100% 匹配" },
      { label: "附件完整", status: "pass", detail: "采购清单已关联" }
    ],
    matches: [
      { type: "历史入账", name: "办公耗材发票_原件.pdf", amount: "¥18,600.00", status: "duplicate" },
      { type: "原报销单", name: "BX20260704011", amount: "已支付", status: "duplicate" },
      { type: "本次报销单", name: "BX20260710029", amount: "待提交", status: "blocked" }
    ]
  },
  {
    id: "missing-contract",
    file: "数据服务费发票.pdf",
    vendor: "上海数策信息技术有限公司",
    number: "031002600812",
    date: "2026-07-09",
    amount: 23500,
    tax: 1329.25,
    category: "数据服务费",
    status: "exception",
    exceptionType: "缺少合同",
    severity: "medium",
    page: "1/1",
    reimbursement: "BX20260711003",
    owner: "赵晨",
    project: "DATA-2026-0211",
    activeField: "amount",
    fields: [
      { id: "title", label: "发票类型", value: "增值税电子普通发票", confidence: 99, status: "ok", box: [10, 9, 80, 8] },
      { id: "number", label: "发票号码", value: "031002600812", confidence: 98, status: "ok", box: [66, 18, 24, 6] },
      { id: "seller", label: "销售方", value: "上海数策信息技术有限公司", confidence: 98, status: "ok", box: [12, 58, 42, 6] },
      { id: "sellerTaxNo", label: "销售方税号", value: "91310115MA1K48W2B", confidence: 97, status: "ok", box: [12, 65, 44, 5] },
      { id: "amount", label: "价税合计", value: "¥23,500.00", confidence: 99, status: "needs-proof", box: [61, 72, 28, 7] },
      { id: "category", label: "费用科目", value: "数据服务费", confidence: 97, status: "ok", box: [13, 42, 31, 7] }
    ],
    rules: [
      { label: "万元以上需关联合同", status: "fail", detail: "未找到合同或采购订单" },
      { label: "项目预算", status: "pass", detail: "项目余额 ¥84,300.00" },
      { label: "负责人确认", status: "pass", detail: "赵晨已于 07-10 确认" }
    ],
    matches: [
      { type: "报销单", name: "BX20260711003", amount: "¥23,500.00", status: "matched" },
      { type: "项目预算", name: "DATA-2026-0211", amount: "余额 ¥84,300.00", status: "matched" },
      { type: "合同/订单", name: "未关联", amount: "必需附件", status: "missing" }
    ]
  },
  {
    id: "pending",
    file: "培训场地租赁发票.pdf",
    vendor: "北京海淀会议中心",
    number: "011002600341",
    date: "2026-07-10",
    amount: 4800,
    tax: 271.7,
    category: "场地租赁费",
    status: "pending",
    exceptionType: "待人工复核",
    severity: "low",
    page: "1/1",
    reimbursement: "BX20260711009",
    owner: "陈悦",
    project: "EDU-TRAIN-07",
    activeField: "category",
    fields: [
      { id: "title", label: "发票类型", value: "增值税电子普通发票", confidence: 99, status: "ok", box: [10, 9, 80, 8] },
      { id: "number", label: "发票号码", value: "011002600341", confidence: 98, status: "ok", box: [66, 18, 24, 6] },
      { id: "seller", label: "销售方", value: "北京海淀会议中心", confidence: 98, status: "ok", box: [12, 58, 42, 6] },
      { id: "sellerTaxNo", label: "销售方税号", value: "91110108660514144D", confidence: 98, status: "ok", box: [12, 65, 44, 5] },
      { id: "amount", label: "价税合计", value: "¥4,800.00", confidence: 99, status: "ok", box: [61, 72, 28, 7] },
      { id: "category", label: "费用科目", value: "场地租赁费", confidence: 86, status: "review", box: [13, 42, 31, 7] }
    ],
    rules: [
      { label: "发票必填字段", status: "pass", detail: "字段完整" },
      { label: "费用科目建议", status: "warn", detail: "可能归入培训费，请人工选择" },
      { label: "预算与审批", status: "pass", detail: "均在标准范围内" }
    ],
    matches: [
      { type: "报销单", name: "BX20260711009", amount: "¥4,800.00", status: "matched" },
      { type: "活动申请", name: "培训活动_0710", amount: "预算 ¥5,000.00", status: "matched" }
    ]
  },
  {
    id: "passed",
    file: "教材印刷费发票.pdf",
    vendor: "北京华文印刷有限公司",
    number: "021002600611",
    date: "2026-07-09",
    amount: 7220,
    tax: 408.68,
    category: "印刷费",
    status: "passed",
    exceptionType: "自动通过",
    severity: "none",
    page: "1/1",
    reimbursement: "BX20260710031",
    owner: "刘琳",
    project: "EDU-BOOK-26",
    activeField: "amount",
    fields: [
      { id: "title", label: "发票类型", value: "增值税电子普通发票", confidence: 99, status: "ok", box: [10, 9, 80, 8] },
      { id: "number", label: "发票号码", value: "021002600611", confidence: 99, status: "ok", box: [66, 18, 24, 6] },
      { id: "seller", label: "销售方", value: "北京华文印刷有限公司", confidence: 99, status: "ok", box: [12, 58, 42, 6] },
      { id: "sellerTaxNo", label: "销售方税号", value: "9111010578891200XR", confidence: 99, status: "ok", box: [12, 65, 44, 5] },
      { id: "amount", label: "价税合计", value: "¥7,220.00", confidence: 99, status: "ok", box: [61, 72, 28, 7] },
      { id: "category", label: "费用科目", value: "印刷费", confidence: 98, status: "ok", box: [13, 42, 31, 7] }
    ],
    rules: [
      { label: "发票字段", status: "pass", detail: "完整且置信度高" },
      { label: "报销金额", status: "pass", detail: "与报销单一致" },
      { label: "预算与审批", status: "pass", detail: "均在标准范围内" }
    ],
    matches: [
      { type: "报销单", name: "BX20260710031", amount: "¥7,220.00", status: "matched" },
      { type: "采购订单", name: "PO-EDU-260701", amount: "¥7,220.00", status: "matched" }
    ]
  }
];

const state = {
  screen: "entry",
  mode: "reimbursement",
  activeBatch: "july-11",
  filter: "exception",
  activeId: "low-confidence",
  activeFieldId: "number",
  detailTab: "fields",
  pickerOpen: false,
  modal: null,
  zoom: 88,
  rotation: 0,
  mobilePane: "queue",
  processedIds: [],
  toast: ""
};

const root = typeof document !== "undefined" ? document.body : null;

function calculateBatchMetrics(items) {
  return {
    total: items.length,
    exceptions: items.filter(item => item.status === "exception").length,
    pending: items.filter(item => item.status === "pending").length,
    passed: items.filter(item => item.status === "passed").length,
    amount: items.reduce((sum, item) => sum + item.amount, 0)
  };
}

function canApprove(invoice) {
  return invoice.status !== "exception" || invoice.exceptionType !== "疑似重复";
}

function confirmField(invoice, fieldId, value) {
  return {
    ...invoice,
    fields: invoice.fields.map(field => field.id === fieldId ? { ...field, value, confidence: 100, status: "confirmed" } : { ...field })
  };
}

function filterInvoices(items, filter) {
  if (filter === "all") return items;
  return items.filter(item => item.status === filter);
}

function formatMoney(value) {
  return new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY", maximumFractionDigits: 0 }).format(value);
}

function activeInvoice() {
  return INVOICES.find(item => item.id === state.activeId) || INVOICES[0];
}

function refreshIcons() {
  if (typeof lucide !== "undefined") lucide.createIcons();
}

function render() {
  if (!root) return;
  root.innerHTML = layout(state.screen === "audit" ? renderAudit() : renderEntry());
  refreshIcons();
}

function layout(content) {
  return `
    <div class="app-shell invoice-shell">
      ${renderProductSidebar()}
      <main class="main">
        <header class="topbar">
          <div class="breadcrumb"><a href="index.html">AI 文件工作台</a><span>/</span><strong>财务票据核验</strong></div>
          <nav class="primary-nav" aria-label="全局导航"><a class="primary-nav-link" href="report.html">调研报告</a><a class="primary-nav-link active" href="index.html">工具体验</a><a class="primary-nav-link" href="existing-tools.html">已有工具</a></nav>
          <div class="top-actions"><button class="btn" data-action="toast" data-toast="已打开批次记录">使用记录</button><button class="btn" data-action="toast" data-toast="核验规则说明已打开">使用帮助</button></div>
        </header>
        ${renderWorkbenchContextBar({
          label: "当前财务规则",
          context: "企业标准规则集 / 2026-07-11",
          items: [
            { icon: "shield-check", label: "规则版本已锁定", state: "verified" },
            { icon: "scan-line", label: "OCR 字段可复核", state: "ready" },
            { icon: "user-check", label: "异常人工确认", state: "attention" },
            { icon: "clipboard-check", label: "审核动作留痕", state: "ready" }
          ]
        })}
        ${content}
      </main>
    </div>
    ${state.pickerOpen ? renderImportModal() : ""}
    ${state.modal ? renderBusinessModal() : ""}
    ${state.toast ? `<div class="toast">${state.toast}</div>` : ""}
  `;
}

function renderEntry() {
  const metrics = calculateBatchMetrics(INVOICES);
  return `
    <section class="invoice-entry">
      <div class="invoice-hero">
        <div><h1>批量识别票据，只把异常交给财务人员</h1><p>自动完成 OCR、企业规则校验与材料匹配；人工重点处理低置信度、重复和金额异常。</p><div class="hero-actions"><button class="btn primary" data-action="open-import"><i data-lucide="upload-cloud"></i>新建核验批次</button><button class="btn" data-action="load-batch"><i data-lucide="play"></i>体验示例批次</button></div></div>
        <div class="batch-overview"><div><span>本月自动通过率</span><strong>78.4%</strong><small>较上月 +6.2%</small></div><div class="overview-track"><span style="width:78.4%"></span></div><p><i data-lucide="shield-check"></i>企业标准规则集 · 07-11 更新</p></div>
      </div>
      <section class="invoice-section">
        <div class="section-title"><div><h2>选择核验任务</h2><p>不同任务会加载对应的材料要求和企业规则。</p></div></div>
        <div class="audit-mode-grid">
          ${[
            ["reimbursement", "receipt-text", "报销材料核验", "发票、报销单、支付凭证和审批附件", "最常用"],
            ["recognition", "scan-text", "票据字段识别", "批量识别字段并导出结构化台账", "快速录入"],
            ["three-way", "waypoints", "合同/订单/发票匹配", "核对供应商、金额、项目与付款条件", "采购财务"]
          ].map(item => `<button class="audit-mode ${state.mode === item[0] ? "active" : ""}" data-action="set-mode" data-mode="${item[0]}"><span class="mode-icon"><i data-lucide="${item[1]}"></i></span><span class="mode-tag">${item[4]}</span><strong>${item[2]}</strong><p>${item[3]}</p><span class="mode-link">使用该任务<i data-lucide="arrow-right"></i></span></button>`).join("")}
        </div>
      </section>
      <section class="invoice-section">
        <div class="section-title"><div><h2>待处理批次</h2><p>按异常数量和提交时间排序。</p></div><button class="text-action" data-action="toast" data-toast="已查看全部批次">查看全部</button></div>
        <div class="batch-table">
          <div class="batch-table-head"><span>批次</span><span>任务类型</span><span>票据</span><span>异常</span><span>总金额</span><span>提交人</span><span>状态</span><span></span></div>
          <button class="batch-row" data-action="load-batch"><span><strong>7 月 11 日报销批次</strong><small>今天 10:18</small></span><span>报销材料核验</span><span>${metrics.total}</span><span class="bad-number">${metrics.exceptions}</span><span>${formatMoney(metrics.amount)}</span><span>行政与教研中心</span><span><i class="status-dot warning"></i>待处理</span><i data-lucide="chevron-right"></i></button>
          <button class="batch-row" data-action="toast" data-toast="该批次已完成"><span><strong>7 月 10 日供应商付款</strong><small>昨天 16:42</small></span><span>三单匹配</span><span>18</span><span>0</span><span>¥286,400</span><span>采购部</span><span><i class="status-dot success"></i>已完成</span><i data-lucide="chevron-right"></i></button>
          <button class="batch-row" data-action="toast" data-toast="正在等待提交人补充附件"><span><strong>教育行业大会差旅</strong><small>07-09 14:06</small></span><span>报销材料核验</span><span>23</span><span class="bad-number">3</span><span>¥48,260</span><span>市场部</span><span><i class="status-dot danger"></i>待补充</span><i data-lucide="chevron-right"></i></button>
        </div>
      </section>
    </section>
  `;
}

function renderAudit() {
  const metrics = calculateBatchMetrics(INVOICES);
  const invoice = activeInvoice();
  return `
    <section class="invoice-audit-page">
      <div class="audit-header">
        <div><button class="back-link" data-action="back-entry"><i data-lucide="arrow-left"></i>返回批次</button><h1>7 月 11 日报销批次</h1><p>${metrics.total} 张票据 · 总金额 ${formatMoney(metrics.amount)} · 企业标准规则</p></div>
        <div class="audit-header-actions"><button class="btn" data-action="toast" data-toast="核验记录已导出"><i data-lucide="download"></i>导出核验单</button><button class="btn primary" data-action="submit-batch"><i data-lucide="send"></i>提交已完成项</button></div>
      </div>
      <div class="audit-kpis">
        <button data-action="set-filter" data-filter="all"><span>全部票据</span><strong>${metrics.total}</strong></button>
        <button class="danger" data-action="set-filter" data-filter="exception"><span>异常待处理</span><strong>${metrics.exceptions}</strong></button>
        <button class="warning" data-action="set-filter" data-filter="pending"><span>待人工复核</span><strong>${metrics.pending}</strong></button>
        <button class="success" data-action="set-filter" data-filter="passed"><span>已通过</span><strong>${metrics.passed + state.processedIds.length}</strong></button>
        <div class="kpi-progress"><span>批次完成度</span><strong>${Math.round(((metrics.passed + state.processedIds.length) / metrics.total) * 100)}%</strong><div><i style="width:${((metrics.passed + state.processedIds.length) / metrics.total) * 100}%"></i></div></div>
      </div>
      <div class="mobile-audit-tabs"><button class="${state.mobilePane === "queue" ? "active" : ""}" data-action="mobile-pane" data-pane="queue">队列</button><button class="${state.mobilePane === "document" ? "active" : ""}" data-action="mobile-pane" data-pane="document">原票</button><button class="${state.mobilePane === "fields" ? "active" : ""}" data-action="mobile-pane" data-pane="fields">核验</button></div>
      <div class="audit-workbench" data-mobile-pane="${state.mobilePane}">
        ${renderQueue()}
        ${renderDocument(invoice)}
        ${renderDetails(invoice)}
      </div>
    </section>
  `;
}

function renderQueue() {
  const items = filterInvoices(INVOICES, state.filter);
  const labels = { all: "全部", exception: "异常", pending: "待复核", passed: "已通过" };
  return `
    <aside class="invoice-queue audit-pane-queue">
      <div class="queue-head"><div><h2>${labels[state.filter]}票据</h2><span>${items.length} 项</span></div><button class="icon-button" data-action="toast" data-toast="筛选设置已打开"><i data-lucide="list-filter"></i></button></div>
      <div class="queue-search"><i data-lucide="search"></i><span>搜索发票号或供应商</span></div>
      <div class="queue-list">
        ${items.length ? items.map(item => renderQueueItem(item)).join("") : `<div class="queue-empty"><i data-lucide="badge-check"></i><p>该分组暂无待处理票据</p></div>`}
      </div>
      <div class="queue-footer"><span>键盘快捷键</span><kbd>J</kbd><span>下一张</span><kbd>A</kbd><span>通过</span></div>
    </aside>
  `;
}

function renderQueueItem(invoice) {
  const processed = state.processedIds.includes(invoice.id);
  return `<button class="queue-item ${state.activeId === invoice.id ? "active" : ""} ${processed ? "processed" : ""}" data-action="select-invoice" data-id="${invoice.id}"><span class="queue-file-icon"><i data-lucide="file-text"></i></span><span class="queue-item-main"><strong>${invoice.vendor}</strong><small>${invoice.number} · ${formatMoney(invoice.amount)}</small><span class="queue-label ${invoice.severity}">${processed ? "本次已处理" : invoice.exceptionType}</span></span><span class="queue-time">${invoice.date.slice(5)}</span></button>`;
}

function renderDocument(invoice) {
  const field = invoice.fields.find(item => item.id === state.activeFieldId) || invoice.fields[0];
  return `
    <main class="document-stage audit-pane-document">
      <div class="document-toolbar">
        <div><strong>${invoice.file}</strong><span>${invoice.page} · OCR 已完成</span></div>
        <div class="document-tools"><button data-action="zoom-out"><i data-lucide="zoom-out"></i></button><span>${state.zoom}%</span><button data-action="zoom-in"><i data-lucide="zoom-in"></i></button><button data-action="rotate"><i data-lucide="rotate-cw"></i></button><button data-action="toast" data-toast="已在新窗口打开原文件"><i data-lucide="maximize-2"></i></button></div>
      </div>
      <div class="document-canvas">
        <div class="invoice-paper" style="transform:scale(${state.zoom / 100}) rotate(${state.rotation}deg)">
          <div class="invoice-paper-head"><span>国家税务总局</span><h2>增值税电子普通发票</h2><span>电子发票</span></div>
          <div class="invoice-code"><div><span>发票号码</span><strong>${invoice.number}</strong></div><div><span>开票日期</span><strong>${invoice.date}</strong></div></div>
          <div class="invoice-parties"><div><span>购买方信息</span><strong>北京三六零企业安全科技有限公司</strong><small>统一社会信用代码：91110105MA01XXXXXX</small></div><div><span>销售方信息</span><strong>${invoice.vendor}</strong><small>税号：${invoice.fields.find(item => item.id === "sellerTaxNo").value}</small></div></div>
          <div class="invoice-lines"><div class="line-head"><span>项目名称</span><span>规格型号</span><span>数量</span><span>单价</span><span>金额</span><span>税额</span></div><div><span>*现代服务*${invoice.category}</span><span>服务项目</span><span>1</span><span>${formatMoney(invoice.amount - invoice.tax)}</span><span>${formatMoney(invoice.amount - invoice.tax)}</span><span>${formatMoney(invoice.tax)}</span></div></div>
          <div class="invoice-total"><span>价税合计（大写）</span><strong>人民币 ${moneyUpper(invoice.amount)}</strong><span>（小写）</span><strong>¥${invoice.amount.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}</strong></div>
          <div class="invoice-footer"><span>开票人：系统开票</span><span>校验码：4 7 8 3 2 9 1 0 6 5 8 2</span></div>
          <div class="field-highlight ${field.status}" style="left:${field.box[0]}%;top:${field.box[1]}%;width:${field.box[2]}%;height:${field.box[3]}%"><span>${field.label}</span></div>
        </div>
      </div>
      <div class="document-status"><span><i data-lucide="scan-line"></i>当前定位：${field.label}</span><strong class="${field.status}">${field.confidence}% 置信度</strong></div>
    </main>
  `;
}

function moneyUpper(value) {
  const map = { 12800: "壹万贰仟捌佰元整", 9600: "玖仟陆佰元整", 18600: "壹万捌仟陆佰元整", 23500: "贰万叁仟伍佰元整", 4800: "肆仟捌佰元整", 7220: "柒仟贰佰贰拾元整" };
  return map[value] || "金额待核验";
}

function renderDetails(invoice) {
  return `
    <aside class="invoice-details audit-pane-fields">
      <div class="detail-head"><div><h2>核验详情</h2><span>${invoice.exceptionType}</span></div><span class="severity-badge ${invoice.severity}">${invoice.severity === "high" ? "高优先级" : invoice.severity === "medium" ? "需处理" : invoice.status === "passed" ? "已通过" : "待复核"}</span></div>
      <div class="detail-tabs"><button class="${state.detailTab === "fields" ? "active" : ""}" data-action="detail-tab" data-tab="fields">识别字段</button><button class="${state.detailTab === "rules" ? "active" : ""}" data-action="detail-tab" data-tab="rules">规则校验</button><button class="${state.detailTab === "matches" ? "active" : ""}" data-action="detail-tab" data-tab="matches">材料匹配</button></div>
      <div class="detail-scroll">${state.detailTab === "rules" ? renderRules(invoice) : state.detailTab === "matches" ? renderMatches(invoice) : renderFields(invoice)}</div>
      <div class="audit-actions">
        ${invoice.exceptionType === "疑似重复" ? `<button class="btn danger-outline" data-action="open-duplicate"><i data-lucide="copy-x"></i>查看重复票据</button>` : `<button class="btn" data-action="open-return"><i data-lucide="undo-2"></i>退回补充</button>`}
        <button class="btn" data-action="mark-exception"><i data-lucide="circle-alert"></i>标记例外</button>
        <button class="btn primary" data-action="approve" ${canApprove(invoice) ? "" : "disabled"}><i data-lucide="check"></i>确认通过</button>
      </div>
    </aside>
  `;
}

function renderFields(invoice) {
  return `<div class="field-list"><div class="field-summary"><span>OCR 平均置信度</span><strong>${Math.round(invoice.fields.reduce((sum, field) => sum + field.confidence, 0) / invoice.fields.length)}%</strong><small>${invoice.fields.filter(field => field.status !== "ok").length} 个字段需要关注</small></div>${invoice.fields.map(field => `<button class="field-row ${state.activeFieldId === field.id ? "active" : ""}" data-action="select-field" data-field="${field.id}"><span><small>${field.label}</small><strong>${field.value}</strong></span><span class="field-state ${field.status}">${field.status === "ok" ? "已识别" : field.status === "confirmed" ? "已确认" : field.status === "mismatch" ? "金额不符" : field.status === "duplicate" ? "重复" : field.status === "needs-proof" ? "缺少凭证" : field.status === "review" ? "待复核" : `${field.confidence}%`}</span>${["low", "review"].includes(field.status) ? `<i data-lucide="pencil"></i>` : `<i data-lucide="locate-fixed"></i>`}</button>`).join("")}</div>`;
}

function renderRules(invoice) {
  return `<div class="rule-list">${invoice.rules.map(rule => `<article class="rule-row ${rule.status}"><span class="rule-icon"><i data-lucide="${rule.status === "pass" ? "check" : rule.status === "fail" ? "x" : "triangle-alert"}"></i></span><div><strong>${rule.label}</strong><p>${rule.detail}</p></div><span>${rule.status === "pass" ? "通过" : rule.status === "fail" ? "异常" : "关注"}</span></article>`).join("")}</div>`;
}

function renderMatches(invoice) {
  return `<div class="match-list"><div class="match-title"><h3>关联材料</h3><button data-action="open-import"><i data-lucide="paperclip"></i>补充附件</button></div>${invoice.matches.map(item => `<article class="match-row ${item.status}"><span class="match-icon"><i data-lucide="${item.status === "matched" ? "link-2" : item.status === "missing" ? "unlink" : "git-compare"}"></i></span><div><small>${item.type}</small><strong>${item.name}</strong><span>${item.amount}</span></div><em>${item.status === "matched" ? "已匹配" : item.status === "missing" ? "缺失" : item.status === "blocked" ? "已阻止" : item.status === "duplicate" ? "重复" : "不一致"}</em></article>`).join("")}</div>`;
}

function renderImportModal() {
  const task = state.mode === "three-way" ? "合同/订单/发票匹配" : state.mode === "recognition" ? "票据字段识别" : "报销材料核验";
  return `<div class="modal-layer" data-action="close-import">
    <section class="import-modal" role="dialog" aria-modal="true" aria-labelledby="import-modal-title" data-stop-close>
      <header class="modal-head import-modal-head">
        <div>
          <h2 id="import-modal-title">导入核验材料</h2>
          <p>导入票据、报销单和支付凭证，按企业规则完成批量核验。</p>
        </div>
        <button class="icon-button" type="button" aria-label="关闭" data-action="close-import"><i data-lucide="x"></i></button>
      </header>
      <div class="import-modal-body">
        <div class="import-drop">
          <span class="import-drop-icon"><i data-lucide="cloud-upload"></i></span>
          <div class="import-drop-copy">
            <h3>拖入文件，或从云盘选择</h3>
            <p>PDF、图片、Excel、Word 或压缩包</p>
          </div>
          <div class="import-drop-actions">
            <button class="btn" type="button">本地上传</button>
            <button class="btn primary" type="button">从云盘选择</button>
          </div>
        </div>
        <div class="import-options">
          <label><span>核验任务</span><select><option>${task}</option></select></label>
          <label><span>企业规则</span><select><option>企业标准规则（推荐）</option><option>严格核验</option></select></label>
          <label class="switch-row"><span><strong>自动通过无异常票据</strong><small>仅将异常票据加入人工队列</small></span><input type="checkbox" checked></label>
        </div>
      </div>
      <footer class="modal-actions import-modal-actions">
        <button class="btn" type="button" data-action="close-import">取消</button>
        <button class="btn primary" type="button" data-action="load-batch">使用示例开始核验</button>
      </footer>
    </section>
  </div>`;
}

function renderBusinessModal() {
  const invoice = activeInvoice();
  if (state.modal === "duplicate") {
    return `<div class="modal-layer" data-action="close-modal"><section class="duplicate-modal" role="dialog" data-stop-close><div class="modal-head"><div><p class="invoice-eyebrow">重复票据核对</p><h2>发现已入账的相同票据</h2></div><button class="icon-button" data-action="close-modal"><i data-lucide="x"></i></button></div><div class="duplicate-alert"><i data-lucide="shield-alert"></i><div><strong>相同发票号码、销售方和金额</strong><p>历史票据已于 2026-07-04 完成支付，本次报销已自动阻止。</p></div></div><div class="duplicate-compare"><article><span>本次提交</span><strong>${invoice.file}</strong><p>${invoice.number}</p><p>${formatMoney(invoice.amount)} · 待提交</p></article><div><i data-lucide="equal"></i><strong>100% 匹配</strong></div><article><span>历史入账</span><strong>${invoice.duplicateOf}</strong><p>${invoice.number}</p><p>${formatMoney(invoice.amount)} · 07-04 已支付</p></article></div><div class="modal-actions"><button class="btn" data-action="toast" data-toast="历史入账凭证已打开">查看历史凭证</button><button class="btn danger" data-action="reject-duplicate">拒绝本次报销</button></div></section></div>`;
  }
  if (state.modal === "return") {
    return `<div class="modal-layer" data-action="close-modal"><section class="return-modal" role="dialog" data-stop-close><div class="modal-head"><div><p class="invoice-eyebrow">退回补充</p><h2>通知 ${invoice.owner} 补充材料</h2></div><button class="icon-button" data-action="close-modal"><i data-lucide="x"></i></button></div><label><span>缺少或需要修改</span><div class="reason-chips"><button class="active">金额说明</button><button>合同/订单</button><button>支付凭证</button><button>发票重开</button></div></label><label><span>退回说明</span><textarea>请核对报销金额与发票金额，并补充差额 ¥260.00 的说明或修改报销单。</textarea></label><label><span>处理截止</span><input value="2026-07-14 18:00"></label><div class="modal-actions"><button class="btn" data-action="close-modal">取消</button><button class="btn primary" data-action="confirm-return">发送并退回</button></div></section></div>`;
  }
  if (state.modal === "edit-field") {
    const field = invoice.fields.find(item => item.id === state.activeFieldId);
    return `<div class="modal-layer" data-action="close-modal"><section class="field-modal" role="dialog" data-stop-close><div class="modal-head"><div><p class="invoice-eyebrow">人工确认字段</p><h2>${field.label}</h2></div><button class="icon-button" data-action="close-modal"><i data-lucide="x"></i></button></div><div class="field-confidence"><span>OCR 识别置信度</span><strong>${field.confidence}%</strong></div><label><span>确认值</span><input id="field-value" value="${field.id === "number" ? invoice.number : field.value}"></label><p class="field-help">确认后仅消除该字段的低置信度状态，其他异常仍需独立处理。</p><div class="modal-actions"><button class="btn" data-action="close-modal">取消</button><button class="btn primary" data-action="confirm-field">确认字段</button></div></section></div>`;
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
  if (action === "set-mode") state.mode = target.dataset.mode;
  else if (action === "open-import") state.pickerOpen = true;
  else if (action === "close-import") state.pickerOpen = false;
  else if (action === "load-batch") { state.pickerOpen = false; state.screen = "audit"; }
  else if (action === "back-entry") state.screen = "entry";
  else if (action === "set-filter") {
    state.filter = target.dataset.filter;
    const filtered = filterInvoices(INVOICES, state.filter);
    if (filtered.length && !filtered.some(item => item.id === state.activeId)) {
      state.activeId = filtered[0].id;
      state.activeFieldId = filtered[0].activeField;
    }
  } else if (action === "select-invoice") {
    state.activeId = target.dataset.id;
    state.activeFieldId = activeInvoice().activeField;
    state.detailTab = "fields";
    state.mobilePane = "document";
  } else if (action === "select-field") {
    state.activeFieldId = target.dataset.field;
    const field = activeInvoice().fields.find(item => item.id === state.activeFieldId);
    if (["low", "review"].includes(field.status)) state.modal = "edit-field";
    state.mobilePane = "document";
  } else if (action === "detail-tab") state.detailTab = target.dataset.tab;
  else if (action === "zoom-in") state.zoom = Math.min(120, state.zoom + 8);
  else if (action === "zoom-out") state.zoom = Math.max(64, state.zoom - 8);
  else if (action === "rotate") state.rotation = (state.rotation + 90) % 360;
  else if (action === "open-duplicate") state.modal = "duplicate";
  else if (action === "open-return") state.modal = "return";
  else if (action === "close-modal") state.modal = null;
  else if (action === "confirm-field") {
    const value = document.querySelector("#field-value")?.value || "";
    const index = INVOICES.findIndex(item => item.id === state.activeId);
    INVOICES[index] = confirmField(INVOICES[index], state.activeFieldId, value);
    state.modal = null;
    showToast("字段已确认，其他异常保持不变");
    return;
  } else if (action === "approve") {
    const invoice = activeInvoice();
    if (!canApprove(invoice)) return showToast("重复票据不能直接通过，请先完成核对");
    if (!state.processedIds.includes(invoice.id)) state.processedIds.push(invoice.id);
    showToast(`${invoice.file} 已确认通过`);
    return;
  } else if (action === "mark-exception") {
    showToast("已标记为财务例外并记录审核原因");
    return;
  } else if (action === "confirm-return") {
    state.modal = null;
    if (!state.processedIds.includes(state.activeId)) state.processedIds.push(state.activeId);
    showToast(`已退回给 ${activeInvoice().owner} 补充`);
    return;
  } else if (action === "reject-duplicate") {
    state.modal = null;
    if (!state.processedIds.includes(state.activeId)) state.processedIds.push(state.activeId);
    showToast("本次重复报销已拒绝并写入审核记录");
    return;
  } else if (action === "submit-batch") {
    showToast(`已提交 ${state.processedIds.length} 项审核结果`);
    return;
  } else if (action === "mobile-pane") state.mobilePane = target.dataset.pane;
  render();
}

if (root) {
  root.addEventListener("click", handleClick);
  render();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { INVOICES, calculateBatchMetrics, canApprove, confirmField, filterInvoices };
}
