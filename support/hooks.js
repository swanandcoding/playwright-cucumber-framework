
//it launches the configured browser, creates a page, and initializes page objects.
const { Before, After, setDefaultTimeout, Status } = require("@cucumber/cucumber");
const { chromium, firefox, webkit } = require("playwright");
const config = require("../utils/config");
const LoginPage = require("../pages/LoginPage");
const InventoryPage = require("../pages/InventoryPage");
const CartPage = require("../pages/CartPage");
const CheckoutPage = require("../pages/CheckoutPage");

setDefaultTimeout(30 * 1000);

const browsers = { chromium, firefox, webkit };

Before(async function () {
  const browserType = browsers[config.browserName];
  if (!browserType) throw new Error(`Unsupported BROWSER: ${config.browserName}`);
  this.browser = await browserType.launch({
    headless: config.headless,
    slowMo: config.slowMo
  });
  this.context = await this.browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(config.defaultTimeout);

  this.pages.login = new LoginPage(this.page);
  this.pages.inventory = new InventoryPage(this.page);
  this.pages.cart = new CartPage(this.page);
  this.pages.checkout = new CheckoutPage(this.page);
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const safeName = scenario.pickle.name.replace(/[^a-z0-9-_]/gi, "_").slice(0, 80);
    const screenshotPath = `test-results/${Date.now()}-${safeName}.png`;
    await this.page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => {});
    await this.attach(await this.page.screenshot({ fullPage: true }), "image/png").catch(() => {});
  }
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});
