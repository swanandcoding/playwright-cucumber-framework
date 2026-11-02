const fs = require("fs");
const path = require("path");

const input = path.join(__dirname, "..", "reports", "cucumber-report.json");
const output = path.join(__dirname, "..", "reports", "cucumber-report.html");

if (!fs.existsSync(input)) {
  console.error("JSON report not found. Run npm test first.");
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(input, "utf8"));
let total = 0, passed = 0, failed = 0, skipped = 0;
const rows = [];

for (const feature of report) {
  for (const element of (feature.elements || [])) {
    if (element.type !== "scenario") continue;
    total++;
    const steps = element.steps || [];
    const statuses = steps.map(s => s.result?.status);
    const status = statuses.includes("failed") ? "FAILED"
      : statuses.every(s => s === "skipped" || s === "undefined") ? "SKIPPED"
      : "PASSED";
    if (status === "PASSED") passed++;
    else if (status === "FAILED") failed++;
    else skipped++;
    rows.push(`<tr><td>${escapeHtml(feature.name || "")}</td><td>${escapeHtml(element.name || "")}</td><td class="${status.toLowerCase()}">${status}</td></tr>`);
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

const html = `<!doctype html><html><head><meta charset="utf-8"><title>Cucumber Test Report</title>
<style>body{font:15px Arial;margin:32px;color:#222}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ddd;padding:10px;text-align:left}.passed{color:green}.failed{color:#c00}.skipped{color:#987000}.summary{display:flex;gap:24px;margin:20px 0}</style></head><body>
<h1>Playwright + Cucumber Test Report</h1><div class="summary"><b>Total: ${total}</b><b class="passed">Passed: ${passed}</b><b class="failed">Failed: ${failed}</b><b class="skipped">Skipped: ${skipped}</b></div>
<table><thead><tr><th>Feature</th><th>Scenario</th><th>Status</th></tr></thead><tbody>${rows.join("")}</tbody></table></body></html>`;

fs.writeFileSync(output, html);
console.log(`HTML report created: ${output}`);
