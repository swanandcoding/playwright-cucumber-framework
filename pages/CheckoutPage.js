const BasePage = require("./BasePage");

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstName = page.getByPlaceholder("First Name");
    this.lastName = page.getByPlaceholder("Last Name");
    this.postalCode = page.getByPlaceholder("Zip/Postal Code");
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.finishButton = page.getByRole("button", { name: "Finish" });
    this.completeHeader = page.getByText("Thank you for your order!");
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async enterCustomerDetails(details) {
    await this.firstName.fill(details.firstName);
    await this.lastName.fill(details.lastName);
    await this.postalCode.fill(details.postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async getErrorMessage() {
    return (await this.errorMessage.textContent())?.trim();
  }
}

module.exports = CheckoutPage;
