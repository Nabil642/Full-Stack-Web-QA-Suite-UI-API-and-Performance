import { Page, expect } from '@playwright/test';

export class ProductsPage {
  constructor(private readonly page: Page) {}

  get cards() {
    return this.page.locator('.features_items .product-image-wrapper');
  }

  get searchedHeading() {
    return this.page.getByRole('heading', { name: /searched products/i });
  }

  async open() {
    await this.page.goto('/products');
    await expect(this.cards.first()).toBeVisible();
  }

  async search(term: string) {
    await this.page.locator('#search_product').fill(term);
    await this.page.locator('#submit_search').click();
    await expect(this.searchedHeading).toBeVisible();
  }

  async addFirstProductToCart(): Promise<string> {
    const card = this.cards.first();
    const name = (await card.locator('.productinfo p').innerText()).trim();

    await card.hover();
    await card.locator('.product-overlay .add-to-cart').click();
    await expect(this.page.locator('#cartModal')).toBeVisible();
    return name;
  }

  async continueShopping() {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }

  async viewCartFromModal() {
    await this.page.locator('#cartModal a[href="/view_cart"]').click();
  }
}
