import { test as base, expect } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ProductsPage } from "./pages/ProductsPage";
import { CartPage } from "./pages/CartPage";
import { buildUser, toCreateAccountForm, TestUser } from "./utils/userFactory";

const AD_HOSTS = [
  "googlesyndication.com",
  "doubleclick.net",
  "googleadservices.com",
  "adservice.google.com",
  "pagead",
];

type Fixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  testUser: TestUser;
};

export const test = base.extend<Fixtures>({
  page: async ({ page }, use) => {
    await page.route("**/*", (route) => {
      const url = route.request().url();
      return AD_HOSTS.some((host) => url.includes(host))
        ? route.abort()
        : route.continue();
    });
    await use(page);
  },

  homePage: async ({ page }, use) => use(new HomePage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  signupPage: async ({ page }, use) => use(new SignupPage(page)),
  productsPage: async ({ page }, use) => use(new ProductsPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),

  // A user created through the API before the test and deleted afterwards
  testUser: async ({ request }, use) => {
    const user = buildUser();
    const created = await request.post("/api/createAccount", {
      form: toCreateAccountForm(user),
    });
    const body = JSON.parse(await created.text());
    expect(
      body.responseCode,
      "test user should be created through the API",
    ).toBe(201);

    await use(user);

    await request.delete("/api/deleteAccount", {
      form: { email: user.email, password: user.password },
    });
  },
});

export { expect };
