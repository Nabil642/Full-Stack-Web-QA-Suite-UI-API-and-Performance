import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  get loggedInLabel() {
    return this.page.getByText(/Logged in as/i);
  }

  async open() {
    await this.page.goto('/');
    await expect(this.page.locator('a[href="/products"]').first()).toBeVisible();
  }

  async goToLogin() {
    await this.page.locator('a[href="/login"]').click();
  }

  async goToProducts() {
    await this.page.locator('a[href="/products"]').first().click();
  }

  async deleteAccountFromMenu() {
    await this.page.locator('a[href="/delete_account"]').click();
  }
}
