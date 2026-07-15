const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const tools = [
  "folder-summary",
  "multi-file-qa",
  "invoice-check",
  "contract-review",
  "version-compare",
  "courseware-organizer",
  "lesson-plan",
  "knowledge-import"
];

test("all eight new tools own independent HTML CSS and JavaScript", () => {
  for (const id of tools) {
    const htmlPath = path.join(root, `${id}.html`);
    const cssPath = path.join(root, `${id}.css`);
    const jsPath = path.join(root, `${id}.js`);
    assert.equal(fs.existsSync(htmlPath), true, `${id} HTML missing`);
    assert.equal(fs.existsSync(cssPath), true, `${id} CSS missing`);
    assert.equal(fs.existsSync(jsPath), true, `${id} JS missing`);
    const html = fs.readFileSync(htmlPath, "utf8");
    assert.match(html, new RegExp(`${id}\\.css`));
    assert.match(html, new RegExp(`${id}\\.js`));
    assert.doesNotMatch(html, /app\.js/);
  }
});

test("tool hub configuration links all eight independent experiences", () => {
  const runtime = fs.readFileSync(path.join(root, "app.js"), "utf8");
  for (const id of tools) assert.match(runtime, new RegExp(`"${id}"`));
});
