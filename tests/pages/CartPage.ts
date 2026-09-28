import { Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  get rows() {
    return this.page.locator('#cart_info_table tbody tr');
  }

  get productNames() {
    return this.page.locator('.cart_description h4 a');
  }

  get emptyCartMessage() {
    return this.page.getByText('Cart is empty!');
  }

  async open() {
    await this.page.goto('/view_cart');
  }
}
