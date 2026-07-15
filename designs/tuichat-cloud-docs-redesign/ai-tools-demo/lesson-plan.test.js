const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const html = fs.readFileSync(path.join(root, "lesson-plan.html"), "utf8");
const css = fs.readFileSync(path.join(root, "lesson-plan.css"), "utf8");
const runtime = require("./lesson-plan.js");

test("lesson plan owns a structured teaching-design runtime", () => {
  assert.match(html, /lesson-plan\.css/);
  assert.match(html, /lesson-plan\.js/);
  assert.doesNotMatch(html, /app\.js/);
});

test("lesson timeline totals a real class period", () => {
  assert.equal(runtime.calculateTimelineTotal(runtime.INITIAL_TIMELINE), 45);
  assert.deepEqual(runtime.validateTimeline(runtime.INITIAL_TIMELINE, 45), { total: 45, difference: 0, valid: true });
});

test("timeline validation surfaces overrun and underrun", () => {
  const over = runtime.INITIAL_TIMELINE.map((item, index) => index === 1 ? { ...item, minutes: item.minutes + 5 } : item);
  const under = runtime.INITIAL_TIMELINE.map((item, index) => index === 0 ? { ...item, minutes: item.minutes - 2 } : item);
  assert.deepEqual(runtime.validateTimeline(over, 45), { total: 50, difference: 5, valid: false });
  assert.deepEqual(runtime.validateTimeline(under, 45), { total: 43, difference: -2, valid: false });
});

test("AI suggestions update one teaching block without replacing the plan", () => {
  const result = runtime.applyTeachingSuggestion(runtime.INITIAL_TIMELINE, "activity-2", "加入同伴互评卡");
  assert.equal(result.length, runtime.INITIAL_TIMELINE.length);
  assert.match(result[2].studentActivity, /同伴互评卡/);
  assert.equal(runtime.INITIAL_TIMELINE[2].studentActivity.includes("同伴互评卡"), false);
});

test("export readiness requires aligned time and teacher confirmation", () => {
  const readySections = runtime.SECTIONS.map(item => ({ ...item, confirmed: true }));
  assert.equal(runtime.canExportPlan(readySections, runtime.INITIAL_TIMELINE, 45), true);
  assert.equal(runtime.canExportPlan(runtime.SECTIONS, runtime.INITIAL_TIMELINE, 45), false);
  assert.equal(runtime.canExportPlan(readySections, runtime.INITIAL_TIMELINE.slice(0, -1), 45), false);
});

test("teaching editor has dedicated desktop and mobile layouts", () => {
  assert.match(css, /grid-template-columns:\s*230px\s+minmax\(620px,\s*1fr\)\s+330px/);
  assert.match(css, /@media \(max-width:\s*780px\)/);
  assert.match(css, /\.lesson-editor-grid\s*\{[\s\S]*grid-template-columns:\s*1fr/);
});
