# Playwright + JavaScript + Cucumber + POM

A beginner-friendly end-to-end automation framework for [SauceDemo](https://www.saucedemo.com/).

## 1. Prerequisites
- Node.js 20 or later (recommended)
- VS Code
- Internet connection for the demo application and initial browser installation

Check versions:
```bash
node -v
npm -v
```

## 2. Setup
```bash
npm install
npx playwright install
```
Copy `.env.example` to `.env` (or use the defaults).

## 3. Run tests
```bash
npm test                         # all scenarios
npm run test:headed              # visible browser
npm run test:smoke               # @smoke scenarios
npm run test:regression          # @regression scenarios
npm run test:login               # login feature only
npm run test:cart                # cart feature only
npm run test:checkout             # checkout feature only
npm run test:firefox              # Firefox
npm run test:webkit               # WebKit
```

## 4. Demo credentials
SauceDemo publishes these test accounts:
- Standard user: `standard_user`
- Locked user: `locked_out_user`
- Password: `secret_sauce`

The tests use environment variables if provided:
`SAUCE_USERNAME`, `SAUCE_PASSWORD`.

## 5. Project structure
```text
features/
  login.feature
  inventory.feature
  cart.feature
  checkout.feature
step-definitions/
  login.steps.js
  inventory.steps.js
  cart.steps.js
  checkout.steps.js
support/
  world.js
  hooks.js
pages/
  BasePage.js
  LoginPage.js
  InventoryPage.js
  CartPage.js
  CheckoutPage.js
utils/
  config.js
  testData.js
  assertions.js
reports/
  .gitkeep
cucumber.js
```

## 6. Framework flow
1. Cucumber reads a `.feature` file written in Gherkin.
2. Step definitions translate Given/When/Then steps into JavaScript.
3. Step definitions call methods from page classes.
4. Page classes locate elements and perform browser actions.
5. Assertions verify expected results.
6. Hooks launch and close the browser; failed scenarios save screenshots.
7. Cucumber writes JSON output; `npm run report` creates a simple HTML summary.

## 7. Add a test case
Create a new `.feature` file in `features/`, add Given/When/Then steps, then implement matching step definitions. Keep selectors and page interactions in `pages/`, not in step files.

## 8. Important learning notes
- Prefer role/label/test-id locators where possible.
- Avoid fixed sleeps (`waitForTimeout`) unless debugging.
- Keep assertions close to the behavior being verified.
- Use unique scenario data when the application changes server-side state.
- This is a practice framework for a public demo site, not a production test suite. The demo site can change or become unavailable.

## 9. Reports and screenshots
After a test run:
- JSON report: `reports/cucumber-report.json`
- Failed scenario screenshots: `test-results/`
Run:
```bash
npm run report
```

## 10. Suggested learning sequence
1. Run login scenarios and understand feature → steps → page object.
2. Debug a locator in headed mode.
3. Add a new scenario for product sorting.
4. Add a new page object method.
5. Run the suite in Firefox and WebKit.
6. Review screenshots and JSON/HTML reports.
