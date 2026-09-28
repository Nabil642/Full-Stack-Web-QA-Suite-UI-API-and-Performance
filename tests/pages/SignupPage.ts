import { Page, expect } from '@playwright/test';
import { TestUser } from '../utils/userFactory';

export class SignupPage {
  constructor(private readonly page: Page) {}

  async fillAccountDetails(user: TestUser) {
    await this.page.locator('#id_gender2').check();
    await this.page.locator('[data-qa="password"]').fill(user.password);
    await this.page.locator('[data-qa="days"]').selectOption('15');
    await this.page.locator('[data-qa="months"]').selectOption('8');
    await this.page.locator('[data-qa="years"]').selectOption('1993');
    await this.page.locator('#newsletter').check();

    await this.page.locator('[data-qa="first_name"]').fill(user.firstName);
    await this.page.locator('[data-qa="last_name"]').fill(user.lastName);
    await this.page.locator('[data-qa="company"]').fill('QA Labs');
    await this.page.locator('[data-qa="address"]').fill('221 Baker Street');
    await this.page.locator('[data-qa="country"]').selectOption('Canada');
    await this.page.locator('[data-qa="state"]').fill('Ontario');
    await this.page.locator('[data-qa="city"]').fill('Toronto');
    await this.page.locator('[data-qa="zipcode"]').fill('10001');
    await this.page.locator('[data-qa="mobile_number"]').fill('5551234567');
  }

  async submit() {
    await this.page.locator('[data-qa="create-account"]').click();
    await expect(this.page.locator('[data-qa="account-created"]')).toHaveText(/account created/i);
  }

  async continueToHome() {
    await this.page.locator('[data-qa="continue-button"]').click();
  }
}
