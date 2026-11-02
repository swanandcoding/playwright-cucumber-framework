const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

When("I open the cart", async function () {
  await this.pages.inventory.openCart();
});

Then("the cart should contain {string}", async function (productName) {
  expect(await this.pages.cart.hasProduct(productName)).toBeTruthy();
});

When("I continue shopping", async function () {
  await this.pages.cart.continueShopping();
});
