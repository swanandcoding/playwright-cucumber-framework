const BasePage = require("./BasePage");

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.pageTitle = page.getByText("Products", { exact: true });
    this.inventoryItems = page.locator(".inventory_item");
    this.cartLink = page.locator(".shopping_cart_link");
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.menuButton = page.getByRole("button", { name: "Open Menu" });
    this.logoutLink = page.getByRole("button", { name: "Logout" });
  }

  async addProductToCart(productName) {
    const item = this.inventoryItems.filter({ has: this.page.getByText(productName, { exact: true }) });
    await item.getByRole("button", { name: "Add to cart" }).click();
  }

  async removeProductFromCart(productName) {
    const item = this.inventoryItems.filter({ has: this.page.getByText(productName, { exact: true }) });
    await item.getByRole("button", { name: "Remove" }).click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async sortBy(value) {
    await this.sortDropdown.selectOption(value);
  }

  async getProductNames() {
    return this.page.locator(".inventory_item_name").allTextContents();
  }

  async getCartCount() {
    return this.page.locator(".shopping_cart_badge").textContent();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}

module.exports = InventoryPage;
