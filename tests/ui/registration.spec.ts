import { test, expect } from '../fixtures';
import { buildUser } from '../utils/userFactory';

test('new visitor can register, log in and delete the account @smoke', async ({
  homePage, loginPage, signupPage, request, page,
}) => {
  const user = buildUser();

  try {
    await homePage.open();
    await homePage.goToLogin();
    await loginPage.startSignup(user.name, user.email);

    await signupPage.fillAccountDetails(user);
    await signupPage.submit();
    await signupPage.continueToHome();

    await expect(homePage.loggedInLabel).toContainText(user.name);

    await homePage.deleteAccountFromMenu();
    await expect(page.locator('[data-qa="account-deleted"]')).toHaveText(/account deleted/i);
  } finally {
    // if the test failed half way, don't leave junk accounts behind
    await request.delete('/api/deleteAccount', { form: { email: user.email, password: user.password } });
  }
});
