import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  get loginError() {
    return this.page.getByText('Your email or password is incorrect!');
  }

  get existingEmailError() {
    return this.page.getByText('Email Address already exist!');
  }

  async open() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.locator('[data-qa="login-email"]').fill(email);
    await this.page.locator('[data-qa="login-password"]').fill(password);
    await this.page.locator('[data-qa="login-button"]').click();
  }

  async startSignup(name: string, email: string) {
    await this.page.locator('[data-qa="signup-name"]').fill(name);
    await this.page.locator('[data-qa="signup-email"]').fill(email);
    await this.page.locator('[data-qa="signup-button"]').click();
  }
}
