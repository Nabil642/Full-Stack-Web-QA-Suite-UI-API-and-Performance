import { test, expect } from '../fixtures';

test.describe('Cart', () => {
  test('empty cart shows the empty message', async ({ cartPage }) => {
    await cartPage.open();

    await expect(cartPage.emptyCartMessage).toBeVisible();
  });

  test('added product appears in the cart @smoke', async ({ productsPage, cartPage }) => {
    await productsPage.open();
    const productName = await productsPage.addFirstProductToCart();
    await productsPage.viewCartFromModal();

    await expect(cartPage.rows).toHaveCount(1);
    await expect(cartPage.productNames.first()).toHaveText(productName);
  });

  test('two different products can be added one after another', async ({ productsPage, cartPage, page }) => {
    await productsPage.open();
    await productsPage.addFirstProductToCart();
    await productsPage.continueShopping();

    // second card
    const secondCard = productsPage.cards.nth(1);
    await secondCard.hover();
    await secondCard.locator('.product-overlay .add-to-cart').click();
    await page.locator('#cartModal a[href="/view_cart"]').click();

    await expect(cartPage.rows).toHaveCount(2);
  });
});
