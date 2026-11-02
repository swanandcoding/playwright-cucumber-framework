module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    require: [
      "support/**/*.js",
      "step-definitions/**/*.js"
    ],
    format: [
      "progress",
      "json:reports/cucumber-report.json"
    ],
    formatOptions: { snippetInterface: "async-await" },
    publishQuiet: true,
    parallel: 1,
    retry: 0,
    timeout: 30000
  }
};
