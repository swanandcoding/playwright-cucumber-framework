const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I open the SauceDemo login page", async function () {
  await this.pages.login.open();
});

Given("I am logged in as a standard user", async function () {
  await this.pages.login.open();
  await this.pages.login.login("standard_user", "secret_sauce");
  await expect(this.pages.inventory.pageTitle).toBeVisible();
});

When("I login with username {string} and password {string}", async function (username, password) {
  await this.pages.login.login(username, password);
});

Then("I should see the products page", async function () {
  await expect(this.pages.inventory.pageTitle).toBeVisible();
});

Then("I should see the login error {string}", async function (message) {
  await expect(this.pages.login.errorMessage).toContainText(message);
});

Then("I should see a login error message", async function () {
  await expect(this.pages.login.errorMessage).toBeVisible();
});

When("I log out", async function () {
  await this.pages.inventory.logout();
});

Then("I should be on the login page", async function () {
  await expect(this.pages.login.loginButton).toBeVisible();
});
