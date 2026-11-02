const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

When("I add {string} to the cart", async function (productName) {
  await this.pages.inventory.addProductToCart(productName);
});

Then("the cart badge should show {string}", async function (count) {
  await expect(this.page.locator(".shopping_cart_badge")).toHaveText(count);
});

Then("I should see {int} products", async function (count) {
  await expect(this.pages.inventory.inventoryItems).toHaveCount(count);
});

When("I sort products by {string}", async function (sortOption) {
  await this.pages.inventory.sortBy(sortOption);
});

Then("products should be sorted by price from low to high", async function () {
  const prices = await this.page.locator(".inventory_item_price").allTextContents();
  const numericPrices = prices.map(price => Number(price.replace("$", "")));
  expect(numericPrices).toEqual([...numericPrices].sort((a, b) => a - b));
});
