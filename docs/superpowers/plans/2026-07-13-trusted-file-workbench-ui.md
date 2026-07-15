# Trusted File Workbench UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the equal-weight eight-tool gallery into a polished 360 AI trusted file workbench that prioritizes three P0 workflows, exposes file-context actions, and communicates permission, evidence, review, and writeback guarantees.

**Architecture:** Keep the existing static HTML/CSS/JavaScript structure and all eight independent tool runtimes. Add hub metadata and interactions in `app.js`, shared trust UI in `product-sidebar.js` and `styles.css`, and consume that shared UI in the three P0 runtimes without restructuring their domain workbenches.

**Tech Stack:** Canonical HTML templates in JavaScript, CSS custom properties and responsive grid/flex layouts, Lucide icons, Node built-in test runner.

## Global Constraints

- Preserve all eight standalone tool links and all existing domain-specific workflows.
- Match the existing 360 enterprise product sidebar, density, blue action color, 8px maximum card radius, and restrained B2B visual language.
- No new runtime dependency or build step.
- The hub must work at desktop, tablet, and mobile widths.
- High-risk tools must continue to describe AI output as reviewable rather than final decisions.
- Existing test behavior must remain green.

---

### Task 1: Trusted Workbench Acceptance Tests

**Files:**
- Create: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/trusted-workbench.test.js`
- Test: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/*.test.js`

**Interfaces:**
- Consumes: source strings from `app.js`, `product-sidebar.js`, and the three P0 runtimes.
- Produces: structural requirements for P0 prioritization, context entry, shared trust status, and task center.

- [ ] Write assertions for `TRUSTED_P0`, file-context copy, task center controls, trust foundation copy, and report scope.
- [ ] Run `node --test trusted-workbench.test.js` and confirm it fails before implementation.
- [ ] Keep the test source-based, matching the repository's existing no-DOM testing pattern.

### Task 2: Hub Information Architecture and Interactions

**Files:**
- Modify: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/app.js`
- Modify: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/styles.css`

**Interfaces:**
- Consumes: `TOOLS`, `TOOL_ORDER`, `primaryNav()`, `renderProductSidebar()`.
- Produces: `TRUSTED_P0`, P0 outcome cards, file-context launcher, trust foundation strip, industry workflow grid, filters, and a task drawer.

- [ ] Add P0 and category metadata without changing existing tool IDs or URLs.
- [ ] Replace the equal card grid with a file-context launch band, three prominent P0 cards, and five secondary workflow cards.
- [ ] Add filter buttons for all, common, finance, legal, education, and governance categories.
- [ ] Add an interactive task drawer with processing, review, and completed states.
- [ ] Add responsive and reduced-motion styling.
- [ ] Keep cards, spacing, typography, and states consistent with the existing 360 UI.

### Task 3: Shared Trust Status for P0 Tools

**Files:**
- Modify: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/product-sidebar.js`
- Modify: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/styles.css`
- Modify: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/folder-summary.js`
- Modify: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/multi-file-qa.js`
- Modify: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/invoice-check.js`

**Interfaces:**
- Produces: `renderWorkbenchContextBar(config)` returning shared trusted-state markup.
- Consumes: `{ label, context, items, actionLabel, actionHref }` with every item shaped as `{ icon, label, state }`.

- [ ] Implement the shared context bar in `product-sidebar.js`.
- [ ] Add one context bar to each P0 layout using domain-specific permission, evidence, rule, review, and writeback copy.
- [ ] Keep the bar compact and horizontally scrollable on small screens.
- [ ] Normalize P0 breadcrumbs and the active top navigation label to “AI 文件工作台 / 工具体验”.

### Task 4: Report Alignment

**Files:**
- Modify: `designs/tuichat-cloud-docs-redesign/ai-tools-demo/app.js`

**Interfaces:**
- Consumes: the existing `renderReport()` template.
- Produces: a report summary that distinguishes the eight-tool product map from the three-tool P0 production MVP.

- [ ] Update the executive conclusion and scoreboard to “3 P0 + shared trusted foundation”.
- [ ] Update the priority table so finance, common cloud, legal/knowledge governance, and education map to P0/P1/P2 accurately.
- [ ] Keep external content acquisition at P2 and explicitly tied to compliant connectors.

### Task 5: Verification

**Files:**
- Verify: all files under `designs/tuichat-cloud-docs-redesign/ai-tools-demo/`

**Interfaces:**
- Consumes: the finished prototype.
- Produces: passing tests and visual evidence at desktop and mobile widths.

- [ ] Run `node --test *.test.js`; expected result is all tests passing.
- [ ] Serve `designs/tuichat-cloud-docs-redesign/ai-tools-demo` over HTTP.
- [ ] Inspect the hub at desktop and mobile widths, verify no clipping, horizontal overflow, blank panels, or console errors.
- [ ] Exercise filters, the task drawer, and links into all three P0 tools.
- [ ] Confirm the three P0 context bars render and each domain workflow still starts normally.
