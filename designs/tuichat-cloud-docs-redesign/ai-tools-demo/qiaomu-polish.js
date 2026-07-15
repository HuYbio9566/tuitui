(() => {
  const focusableSelector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[contenteditable="true"]',
    '[tabindex]:not([tabindex="-1"])'
  ].join(",");

  let activeDialog = null;
  let previousFocus = null;
  let previousFocusSelector = "";
  let latestTrigger = null;

  function stableSelector(element) {
    if (!element) return "";
    if (element.dataset.action) return `[data-action="${CSS.escape(element.dataset.action)}"]`;
    if (element.getAttribute("href")) return `a[href="${CSS.escape(element.getAttribute("href"))}"]`;
    if (element.getAttribute("aria-label")) return `[aria-label="${CSS.escape(element.getAttribute("aria-label"))}"]`;
    return "";
  }

  function labelIconButtons(scope = document) {
    scope.querySelectorAll("button").forEach(button => {
      if (button.getAttribute("aria-label") || button.textContent.trim()) return;
      const action = button.dataset.action || "";
      const label = action.includes("close") ? "关闭" : action.includes("more") ? "更多操作" : "打开操作";
      button.setAttribute("aria-label", label);
    });
  }

  function decorateStatus(scope = document) {
    scope.querySelectorAll(".toast").forEach(toast => {
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
    });
    scope.querySelectorAll("svg").forEach(icon => icon.setAttribute("aria-hidden", "true"));
  }

  function focusDialog(dialog) {
    if (!dialog || dialog === activeDialog) return;
    previousFocus = latestTrigger || document.activeElement;
    previousFocusSelector = stableSelector(previousFocus);
    activeDialog = dialog;
    dialog.setAttribute("aria-modal", "true");
    if (!dialog.hasAttribute("tabindex")) dialog.setAttribute("tabindex", "-1");
    const first = dialog.querySelector(focusableSelector);
    requestAnimationFrame(() => (first || dialog).focus({ preventScroll: true }));
  }

  function syncDialog() {
    labelIconButtons();
    decorateStatus();
    const dialog = [...document.querySelectorAll('[role="dialog"]')].find(item => item.offsetParent !== null) || null;
    if (dialog) {
      focusDialog(dialog);
      return;
    }
    if (activeDialog) {
      activeDialog = null;
      const returnTarget = previousFocus?.isConnected
        ? previousFocus
        : previousFocusSelector && document.querySelector(previousFocusSelector);
      if (returnTarget) requestAnimationFrame(() => returnTarget.focus({ preventScroll: true }));
      previousFocus = null;
      previousFocusSelector = "";
    }
  }

  document.body.classList.add("qiaomu-polished");
  document.addEventListener("pointerdown", event => {
    const trigger = event.target.closest("button, a[href]");
    if (trigger && !activeDialog) latestTrigger = trigger;
  }, true);

  document.addEventListener("keydown", event => {
    if (!activeDialog) return;
    if (event.key === "Escape") {
      const close = activeDialog.querySelector('[data-action*="close"], [data-close-modal]')
        || activeDialog.parentElement?.closest('[data-action*="close"]');
      if (close) {
        event.preventDefault();
        close.click();
      }
      return;
    }
    if (event.key !== "Tab") return;
    const focusables = [...activeDialog.querySelectorAll(focusableSelector)].filter(item => item.offsetParent !== null);
    if (!focusables.length) {
      event.preventDefault();
      activeDialog.focus();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const observer = new MutationObserver(syncDialog);
  observer.observe(document.body, { childList: true, subtree: true });
  syncDialog();
})();
