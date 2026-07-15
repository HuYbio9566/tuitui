const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const html = fs.readFileSync(path.join(root, "courseware-organizer.html"), "utf8");
const css = fs.readFileSync(path.join(root, "courseware-organizer.css"), "utf8");
const runtime = require("./courseware-organizer.js");

test("courseware organizer owns a curriculum-specific runtime", () => {
  assert.match(html, /courseware-organizer\.css/);
  assert.match(html, /courseware-organizer\.js/);
  assert.doesNotMatch(html, /app\.js/);
});

test("lesson health detects resource gaps and quality issues", () => {
  const health = runtime.analyzeLesson(runtime.LESSONS[0], runtime.RESOURCES);
  assert.equal(health.total, 6);
  assert.deepEqual(health.missing, ["答案"]);
  assert.equal(health.duplicates, 1);
  assert.equal(health.outdated, 1);
});

test("moving an unassigned resource preserves its identity", () => {
  const item = runtime.UNASSIGNED[0];
  const moved = runtime.moveResource(item, "lesson-1", "worksheet");
  assert.equal(moved.id, item.id);
  assert.equal(moved.lessonId, "lesson-1");
  assert.equal(moved.kind, "worksheet");
});

test("course pack readiness requires critical answer gaps resolved", () => {
  assert.equal(runtime.canGenerateCoursePack(runtime.LESSONS, runtime.RESOURCES), false);
  const resolved = [...runtime.RESOURCES, { id: "generated-answer", lessonId: "lesson-1", kind: "answer" }];
  assert.equal(runtime.canGenerateCoursePack(runtime.LESSONS, resolved), true);
});

test("lesson filters keep units and lesson-specific resources separate", () => {
  assert.equal(runtime.resourcesForLesson(runtime.RESOURCES, "lesson-1").length, 6);
  assert.equal(runtime.resourcesForLesson(runtime.RESOURCES, "lesson-2").length, 5);
});

test("curriculum workbench adapts into mobile tree board quality views", () => {
  assert.match(css, /grid-template-columns:\s*250px\s+minmax\(600px,\s*1fr\)\s+330px/);
  assert.match(css, /@media \(max-width:\s*780px\)/);
  assert.match(css, /\.curriculum-workbench\s*\{[\s\S]*grid-template-columns:\s*1fr/);
});
