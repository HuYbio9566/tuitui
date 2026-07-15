function syncAlertExpandability(root, expanded = false) {
  const description = root.querySelector('[data-alert-description]');
  const toggle = root.querySelector('[data-alert-toggle]');
  const toggleRow = root.querySelector('.alert__toggle-row');
  if (!description || !toggle) return;

  description.classList.add('alert__description--clamp');
  const needsToggle =
    description.scrollHeight > description.clientHeight + 1 ||
    description.scrollWidth > description.clientWidth + 1;

  if (toggleRow) {
    toggleRow.hidden = !needsToggle;
  }
  toggle.hidden = !needsToggle;

  if (!needsToggle) {
    description.classList.remove('alert__description--clamp');
    toggle.setAttribute('aria-expanded', 'false');
    return false;
  }

  return true;
}

function setAlertExpanded(root, expanded) {
  const description = root.querySelector('[data-alert-description]');
  const toggle = root.querySelector('[data-alert-toggle]');
  const descriptionWrap = root.querySelector('.alert__description-wrap');
  if (!description || !toggle) return;

  const canExpand = syncAlertExpandability(root, expanded);
  if (!canExpand) return;

  if (descriptionWrap) {
    window.clearTimeout(root._collapseTimer);
    if (expanded) {
      description.classList.remove('alert__description--clamp');
      descriptionWrap.classList.remove('is-collapsing');
      descriptionWrap.classList.add('is-expanded');
      descriptionWrap.style.maxHeight = `${description.scrollHeight}px`;
    } else {
      descriptionWrap.classList.remove('is-expanded');
      descriptionWrap.classList.add('is-collapsing');
      descriptionWrap.style.maxHeight = `${description.scrollHeight}px`;
      window.requestAnimationFrame(() => {
        description.classList.add('alert__description--clamp');
        descriptionWrap.style.maxHeight = `${description.clientHeight}px`;
      });
      root._collapseTimer = window.setTimeout(() => {
        descriptionWrap.classList.remove('is-collapsing');
      }, 200);
    }
  } else {
    description.classList.toggle('alert__description--clamp', !expanded);
  }
  toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  toggle.textContent = expanded
    ? (toggle.dataset.collapseLabel || '收起')
    : (toggle.dataset.expandLabel || '展开更多');
}

document.addEventListener('click', event => {
  const closeButton = event.target.closest('[data-alert-close]');
  if (closeButton) {
    const root = closeButton.closest('[data-alert-demo]');
    if (root) {
      root.hidden = true;
    }
    return;
  }

  const toggleButton = event.target.closest('[data-alert-toggle]');
  if (!toggleButton) return;

  const root = toggleButton.closest('[data-alert-demo]');
  if (!root) return;

  const nextExpanded = toggleButton.getAttribute('aria-expanded') !== 'true';
  setAlertExpanded(root, nextExpanded);
});

document.querySelectorAll('[data-alert-demo]').forEach(root => {
  const toggle = root.querySelector('[data-alert-toggle]');
  if (!toggle) return;
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  setAlertExpanded(root, expanded);
});

window.addEventListener('resize', () => {
  document.querySelectorAll('[data-alert-demo]').forEach(root => {
    const toggle = root.querySelector('[data-alert-toggle]');
    if (!toggle) return;
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    setAlertExpanded(root, expanded);
  });
});

function getSelectLayerHost(root) {
  return root.closest('.select-layer-host');
}

function syncSelectLayerHost(root, open) {
  const host = getSelectLayerHost(root);
  if (!host) return;

  if (open) {
    host.classList.add('has-open-select');
    return;
  }

  const hasOpenSelect = host.querySelector('[data-select-demo].is-active');
  host.classList.toggle('has-open-select', Boolean(hasOpenSelect));
}

function setSelectDemoOpen(root, open) {
  const trigger = root.querySelector('[data-select-trigger]');
  const panel = root.querySelector('[data-select-panel]');
  if (!trigger || !panel) return;

  trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (panel._hideTimer) {
    window.clearTimeout(panel._hideTimer);
    panel._hideTimer = null;
  }

  if (open) {
    panel.hidden = false;
    panel.setAttribute('aria-hidden', 'false');
    panel.classList.remove('select-panel--open');
    window.requestAnimationFrame(() => {
      panel.classList.add('select-panel--open');
    });
  } else {
    panel.setAttribute('aria-hidden', 'true');
    panel.classList.remove('select-panel--open');
    panel._hideTimer = window.setTimeout(() => {
      panel.hidden = true;
      panel._hideTimer = null;
    }, 200);
  }

  root.classList.toggle('is-active', open);
  syncSelectLayerHost(root, open);
}

function closeAllSelectDemos(exceptRoot = null) {
  document.querySelectorAll('[data-select-demo]').forEach(root => {
    if (root !== exceptRoot) {
      setSelectDemoOpen(root, false);
    }
  });
}

document.querySelectorAll('[data-select-demo]').forEach(root => {
  const trigger = root.querySelector('[data-select-trigger]');
  const valueNode = root.querySelector('[data-select-value]');
  const options = root.querySelectorAll('[data-select-option]');
  const panel = root.querySelector('[data-select-panel]');

  if (!trigger || !valueNode || !panel || !options.length) return;
  const startsOpen = trigger.getAttribute('aria-expanded') === 'true';
  panel.setAttribute('aria-hidden', startsOpen ? 'false' : 'true');
  if (!startsOpen) panel.hidden = true;

  trigger.addEventListener('click', () => {
    if (trigger.disabled || trigger.getAttribute('aria-disabled') === 'true') return;
    const willOpen = trigger.getAttribute('aria-expanded') !== 'true';
    closeAllSelectDemos(root);
    setSelectDemoOpen(root, willOpen);
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      const nextValue = option.dataset.value || option.textContent.trim();
      valueNode.textContent = nextValue;
      valueNode.classList.remove('select-trigger__value--placeholder', 'select-combo__value--placeholder');

      options.forEach(item => {
        const isSelected = item === option;
        item.classList.toggle('select-panel__item--selected', isSelected);
        item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      });

      setSelectDemoOpen(root, false);
    });
  });
});

document.addEventListener('click', event => {
  document.querySelectorAll('[data-select-demo]').forEach(root => {
    if (!root.contains(event.target)) {
      setSelectDemoOpen(root, false);
    }
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeAllSelectDemos();
  }
});

function initTextareaDemos() {
  document.querySelectorAll('[data-textarea-demo]').forEach(root => {
    const input = root.querySelector('[data-textarea-input]');
    if (!input) return;

    const group = root.closest('.textarea-group');
    const countNode = root.querySelector('[data-textarea-count]');
    const helper = root.querySelector('[data-textarea-helper]') || group?.querySelector('[data-textarea-helper]');
    const helperMessage =
      root.querySelector('[data-textarea-helper-message]') || group?.querySelector('[data-textarea-helper-message]');
    const maxLength = Number(root.dataset.maxlength || input.getAttribute('maxlength') || 0);
    const minLength = Number(root.dataset.minlength || 0);
    const errorMessage = root.dataset.errorMessage || '';

    function updateCount() {
      if (!countNode) return;
      const valueLength = input.value.length;
      countNode.textContent = maxLength > 0 ? `${valueLength} / ${maxLength}` : `${valueLength}`;
    }

    function applyValidation(force = false) {
      if (!minLength || input.disabled) return;

      const trimmedLength = input.value.trim().length;
      const touched = root.dataset.touched === 'true';
      const initiallyInvalid = root.dataset.initialError === 'true';
      const shouldShow = force || touched || initiallyInvalid;
      const remaining = Math.max(minLength - trimmedLength, 0);
      const hasError = shouldShow && remaining > 0;

      root.classList.toggle('textarea-shell--error', hasError);
      input.setAttribute('aria-invalid', hasError ? 'true' : 'false');
      if (helper) helper.hidden = !hasError;
      if (helperMessage && errorMessage) {
        helperMessage.textContent = hasError && remaining > 0
          ? `${errorMessage}，还差 ${remaining} 个字`
          : errorMessage;
      }
    }

    updateCount();
    applyValidation(root.dataset.initialError === 'true');

    input.addEventListener('input', () => {
      updateCount();
      if (root.dataset.liveValidate === 'true' || root.dataset.touched === 'true' || root.dataset.initialError === 'true') {
        applyValidation(true);
      }
    });

    input.addEventListener('blur', () => {
      root.dataset.touched = 'true';
      applyValidation(true);
    });
  });
}

function initTableSelectionDemos() {
  document.querySelectorAll('[data-table-select-demo]').forEach(root => {
    const selectAll = root.querySelector('[data-table-select-all]');
    const rowCheckboxes = [...root.querySelectorAll('[data-table-row-checkbox]')];
    if (!selectAll || !rowCheckboxes.length) return;

    function syncRowsAndHeader() {
      const selectedCount = rowCheckboxes.filter(checkbox => checkbox.checked).length;
      selectAll.checked = selectedCount === rowCheckboxes.length;
      selectAll.indeterminate = selectedCount > 0 && selectedCount < rowCheckboxes.length;
      selectAll.classList.toggle('indeterminate', selectAll.indeterminate);

      rowCheckboxes.forEach(checkbox => {
        const row = checkbox.closest('[data-table-row]');
        if (row) row.classList.toggle('is-selected', checkbox.checked);
      });
    }

    selectAll.addEventListener('change', () => {
      rowCheckboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
      });
      syncRowsAndHeader();
    });

    rowCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', syncRowsAndHeader);
    });

    syncRowsAndHeader();
  });
}

const messageIcons = {
  notice: 'info',
  success: 'circle-check',
  error: 'circle-x',
  warning: 'triangle-alert',
};

function dismissMessage(message) {
  if (!message || message.dataset.dismissing === 'true') return;
  message.dataset.dismissing = 'true';
  if (message._dismissTimer) {
    window.clearTimeout(message._dismissTimer);
  }
  message.classList.add('is-leaving');
  window.setTimeout(() => message.remove(), 180);
}

function showMessage({ tone = 'notice', text = '', closable = false, duration = 3000 } = {}) {
  const stack = document.querySelector('[data-message-stack]');
  if (!stack) return;

  const resolvedTone = messageIcons[tone] ? tone : 'notice';
  const message = document.createElement('div');
  message.className = `message message--transient message--${resolvedTone}${closable ? ' message--closable' : ''}`;
  message.setAttribute('role', 'status');

  const main = document.createElement('div');
  main.className = 'message__main';
  const icon = document.createElement('span');
  icon.className = 'message__icon';
  icon.setAttribute('aria-hidden', 'true');
  const iconGlyph = document.createElement('i');
  iconGlyph.setAttribute('data-lucide', messageIcons[resolvedTone]);
  icon.appendChild(iconGlyph);
  const textNode = document.createElement('p');
  textNode.className = 'message__text';
  textNode.textContent = text;
  main.append(icon, textNode);
  message.appendChild(main);

  if (closable) {
    const close = document.createElement('button');
    close.className = 'message__close';
    close.type = 'button';
    close.setAttribute('data-message-close', '');
    close.setAttribute('aria-label', '关闭消息');
    const closeIcon = document.createElement('i');
    closeIcon.setAttribute('data-lucide', 'x');
    close.appendChild(closeIcon);
    message.appendChild(close);
  }

  stack.appendChild(message);
  window.requestAnimationFrame(() => message.classList.add('is-visible'));
  if (duration > 0) {
    message._dismissTimer = window.setTimeout(() => dismissMessage(message), duration);
  }
  if (window.lucide) window.lucide.createIcons();
}

document.addEventListener('click', event => {
  const close = event.target.closest('[data-message-close]');
  if (close) {
    dismissMessage(close.closest('.message'));
    return;
  }

  const trigger = event.target.closest('[data-message-trigger]');
  if (!trigger) return;
  showMessage({
    tone: trigger.dataset.messageTone || 'notice',
    text: trigger.dataset.messageText || '',
    closable: trigger.dataset.messageClosable === 'true',
    duration: Number(trigger.dataset.messageDuration || 3000),
  });
});

initTextareaDemos();
initTableSelectionDemos();

function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}
(function() {
  const t = localStorage.getItem('theme');
  if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
})();

// Tabs
document.querySelectorAll('[data-tabs]').forEach(container => {
  const tabsList = container.querySelector('[data-tabs-list]');
  if (!tabsList) return;
  const triggers = [...tabsList.querySelectorAll('[data-tab-trigger]')];
  const panels = [...container.querySelectorAll('[data-tab-panel]')];

  function activate(target, shouldFocus = false) {
    if (!target || target.disabled) return;
    const value = target.dataset.tabTrigger;
    triggers.forEach(trigger => {
      const selected = trigger === target;
      trigger.classList.toggle('is-active', selected);
      trigger.setAttribute('aria-selected', selected ? 'true' : 'false');
      trigger.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(panel => {
      const selected = panel.dataset.tabPanel === value;
      panel.classList.toggle('active', selected);
      panel.hidden = !selected;
    });
    if (shouldFocus) target.focus();
  }

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', () => activate(trigger));
    trigger.addEventListener('keydown', event => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const enabled = triggers.filter(item => !item.disabled);
      const currentIndex = enabled.indexOf(triggers[index]);
      if (currentIndex === -1 || !enabled.length) return;
      let target = enabled[currentIndex];
      if (event.key === 'ArrowRight') target = enabled[(currentIndex + 1) % enabled.length];
      if (event.key === 'ArrowLeft') target = enabled[(currentIndex - 1 + enabled.length) % enabled.length];
      if (event.key === 'Home') target = enabled[0];
      if (event.key === 'End') target = enabled[enabled.length - 1];
      activate(target, true);
    });
  });

  const defaultValue = container.dataset.defaultValue;
  const initial = triggers.find(trigger => trigger.dataset.tabTrigger === defaultValue)
    || triggers.find(trigger => trigger.getAttribute('aria-selected') === 'true')
    || triggers[0];
  if (initial) activate(initial);
});

window.showMessage = showMessage;

if (window.lucide) {
  window.lucide.createIcons();
}
