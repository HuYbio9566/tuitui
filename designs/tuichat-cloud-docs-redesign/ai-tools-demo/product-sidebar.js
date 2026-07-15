function renderProductSidebar() {
  return `<aside class="sidebar product-sidebar">
    <a class="brand product-brand" href="existing-tools.html">
      <span class="product-logo"><i data-lucide="sparkles"></i></span>
      <span>360AI企业知识库</span>
    </a>
    <button class="global-search product-search" type="button">
      <i data-lucide="search"></i>
      <span>搜索</span>
      <kbd>⌘ K</kbd>
    </button>
    <div class="side-actions">
      <button class="side-action" type="button"><span class="side-action-content"><i data-lucide="plus"></i><span class="side-action-label">新建</span></span></button>
      <button class="side-action" type="button"><span class="side-action-content"><i data-lucide="upload"></i><span class="side-action-label">添加</span></span></button>
    </div>
    <nav class="side-nav" aria-label="产品导航">
      <a class="side-link" href="../Cloud Docs Redesign v4 Autoplan.html"><i data-lucide="message-square-more"></i>问AI</a>
      <div class="side-label">知识库</div>
      <a class="side-link" href="#"><i data-lucide="store"></i>知识广场</a>
      <a class="side-link" href="#"><i data-lucide="library-big"></i>我的知识库</a>
      <div class="side-label">智能体</div>
      <a class="side-link" href="#"><i data-lucide="bot"></i>智能体广场</a>
      <div class="side-label">文件</div>
      <a class="side-link" href="#"><i data-lucide="cloud"></i>云盘</a>
      <a class="side-link active" href="existing-tools.html" aria-current="page"><i data-lucide="box"></i>工具</a>
    </nav>
    <div class="side-spacer"></div>
    <div class="account">
      <span class="account-avatar">t</span>
      <span>test1</span>
      <span class="product-account-actions" aria-label="账号快捷操作">
        <i data-lucide="monitor"></i><i data-lucide="bell"></i><i data-lucide="ellipsis"></i>
      </span>
    </div>
  </aside>`;
}

function renderWorkbenchContextBar({
  label = "可信文件工作台",
  context = "当前云盘范围",
  contextIcon = "scan-search",
  items = [],
  actionLabel = "返回工作台",
  actionHref = "index.html"
} = {}) {
  return `<section class="workbench-context-bar" aria-label="当前文件处理上下文">
    <a class="workbench-context-link" href="${actionHref}"><i data-lucide="arrow-left"></i>${actionLabel}</a>
    <div class="workbench-context-identity">
      <span class="workbench-context-mark"><i data-lucide="${contextIcon}"></i></span>
      <span>${label ? `<small>${label}</small>` : ""}<strong>${context}</strong></span>
    </div>
    <div class="workbench-context-states">
      ${items.map(item => `<span class="context-state ${item.state || "ready"}"><i data-lucide="${item.icon || "circle-check"}"></i>${item.label}</span>`).join("")}
    </div>
  </section>`;
}

function refreshProductIcons() {
  if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.7 } });
}
