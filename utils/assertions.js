const { expect } = require("@cucumber/cucumber");

async function expectVisible(locator, message) {
  await locator.waitFor({ state: "visible" });
  if (!(await locator.isVisible())) throw new Error(message || "Expected element to be visible");
}

module.exports = { expectVisible };
