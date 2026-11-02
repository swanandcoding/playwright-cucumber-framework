const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const testData = require("../utils/testData");

When("I proceed to checkout", async function () {
  await this.pages.cart.checkout();
});

When("I enter valid customer information", async function () {
  await this.pages.checkout.enterCustomerDetails(testData.checkout);
});

When("I enter customer information with first name {string}", async function (firstName) {
  await this.pages.checkout.enterCustomerDetails({
    ...testData.checkout,
    firstName
  });
});

When("I continue to order overview", async function () {
  await this.pages.checkout.continueToOverview();
});

When("I finish the order", async function () {
  await this.pages.checkout.finishOrder();
});

Then("I should see the order confirmation", async function () {
  await expect(this.pages.checkout.completeHeader).toBeVisible();
});

Then("I should see checkout error {string}", async function (message) {
  await expect(this.pages.checkout.errorMessage).toHaveText(message);
});
