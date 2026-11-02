const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  baseUrl: process.env.BASE_URL || "https://www.saucedemo.com",
  browserName: (process.env.BROWSER || "chromium").toLowerCase(),
  headless: (process.env.HEADLESS || "true").toLowerCase() !== "false",
  slowMo: Number(process.env.SLOW_MO || 0),
  defaultTimeout: Number(process.env.DEFAULT_TIMEOUT || 10000),
  username: process.env.SAUCE_USERNAME || "standard_user",
  password: process.env.SAUCE_PASSWORD || "secret_sauce"
};
