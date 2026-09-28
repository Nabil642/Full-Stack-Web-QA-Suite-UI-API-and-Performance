# AutomationExercise QA Suite

UI, API and load tests for the practice e-commerce site [automationexercise.com](https://automationexercise.com), which is built for testers.

| Layer          | Tool                                  | What it covers                                                                |
| -------------- | ------------------------------------- | ----------------------------------------------------------------------------- |
| UI automation  | Playwright + TypeScript               | Registration, login, product search, cart                                     |
| API automation | Playwright `request` + Postman/Newman | Products, brands, search, full user lifecycle (create, verify, fetch, delete) |
| Performance    | Apache JMeter                         | Home page + API journey with CSV data and JSON assertions                     |
| CI             | GitHub Actions                        | Runs everything and uploads the reports                                       |

## Things that make this project different

- **Users are created through the API** before a UI test and deleted after it (a `testUser` fixture), so UI tests are fast and never depend on each other.
- **Ads are blocked at network level** (`page.route`) because ad overlays are the number one cause of flaky tests on this site.
- **The API returns HTTP 200 for everything**, the real result lives in the `responseCode` field of the JSON body. Every API test (Playwright, Postman and JMeter) checks the body, not only the HTTP status. This is a good example of "don't trust the status code" and worth mentioning in an interview.
- **Hybrid check**: the number of products shown in the UI equals the number returned by `/api/productsList`.

## Layout

```
tests/
  pages/       page objects
  ui/          browser specs
  api/         API specs
  utils/       test data factory
  fixtures.ts  ad blocking, page objects, testUser fixture
postman/       collection + environment
jmeter/        test plan, CSV data, run scripts
docs/          test cases
```

## Setup

Requirements: Node.js 18+, Java 8+, [Apache JMeter 5.6.x](https://jmeter.apache.org/download_jmeter.cgi) on your PATH.

```bash
npm install
npx playwright install chromium
```

## Run

```bash
npm test               # UI + API
npm run test:ui
npm run test:api
npm run test:headed
npm run report

npm run postman        # report in reports/postman/report.html

./jmeter/run-load-test.sh 3 6 2       # Linux / macOS (users, ramp-up s, loops)
jmeter\run-load-test.bat 3 6 2        # Windows
```

JMeter dashboard: `jmeter/results/report/index.html`.

## If a locator fails

Run `npx playwright codegen https://automationexercise.com`, copy the current locator into the page object and re-run.
