const BasePage = require("./BasePage");

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = page.locator(".cart_item");
    this.continueShoppingButton = page.getByRole("button", { name: "Continue Shopping" });
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
  }

  async hasProduct(productName) {
    return this.cartItems.filter({ has: this.page.getByText(productName, { exact: true }) }).count().then(count => count > 0);
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}

module.exports = CartPage;
