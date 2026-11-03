
// initializes fields for the browser, page, and other scenario data
const { setWorldConstructor, World } = require("@cucumber/cucumber");

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.browser = undefined;
    this.context = undefined;
    this.page = undefined;
    this.pages = {};
    this.lastError = undefined;
  }
}

setWorldConstructor(CustomWorld);
