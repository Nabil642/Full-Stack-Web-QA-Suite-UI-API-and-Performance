import { test, expect } from '../fixtures';

test.describe('Products', () => {
  test('search shows matching products @smoke', async ({ productsPage }) => {
    await productsPage.open();
    await productsPage.search('top');

    const count = await productsPage.cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('search with no match shows an empty result', async ({ productsPage }) => {
    await productsPage.open();
    await productsPage.search('zzzxxyy');

    await expect(productsPage.cards).toHaveCount(0);
  });

  test('UI lists as many products as the API returns', async ({ productsPage, request }) => {
    const apiBody = JSON.parse(await (await request.get('/api/productsList')).text());

    await productsPage.open();

    await expect(productsPage.cards).toHaveCount(apiBody.products.length);
  });
});
