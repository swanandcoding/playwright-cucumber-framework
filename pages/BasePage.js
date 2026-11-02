class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open(path = "/") {
    await this.page.goto(`${require("../utils/config").baseUrl}${path}`);
  }

  async getTitle() {
    return this.page.title();
  }
}

module.exports = BasePage;
