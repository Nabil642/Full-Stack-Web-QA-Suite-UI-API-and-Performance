import { test, expect } from '../fixtures';

test.describe('Login', () => {
  test('registered user can log in and sees their name @smoke', async ({ homePage, loginPage, testUser }) => {
    await loginPage.open();
    await loginPage.login(testUser.email, testUser.password);

    await expect(homePage.loggedInLabel).toContainText(testUser.name);
  });

  test('wrong password shows an error', async ({ page, loginPage, testUser }) => {
    await loginPage.open();
    await loginPage.login(testUser.email, 'wrong-password');

    await expect(loginPage.loginError).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });

  test('cannot sign up with an email that already exists', async ({ loginPage, testUser }) => {
    await loginPage.open();
    await loginPage.startSignup('Someone Else', testUser.email);

    await expect(loginPage.existingEmailError).toBeVisible();
  });
});
