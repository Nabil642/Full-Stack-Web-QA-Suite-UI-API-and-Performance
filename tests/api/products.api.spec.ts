import { test, expect } from "@playwright/test";

async function readBody(response: { text(): Promise<string> }) {
  return JSON.parse(await response.text());
}

test.describe("Products and brands API", () => {
  test("GET /api/productsList returns products", async ({ request }) => {
    const response = await request.get("/api/productsList");
    expect(response.status()).toBe(200);

    const body = await readBody(response);
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
  });

  test("every product has the expected structure", async ({ request }) => {
    const body = await readBody(await request.get("/api/productsList"));

    for (const product of body.products) {
      expect(typeof product.id).toBe("number");
      expect(product.name).toBeTruthy();
      expect(product.price).toMatch(/^Rs\. \d+/);
      expect(product.category.category).toBeTruthy();
    }
  });

  test("POST on productsList is not supported", async ({ request }) => {
    const body = await readBody(await request.post("/api/productsList"));
    expect(body.responseCode).toBe(405);
    expect(body.message).toContain("not supported");
  });

  test("GET /api/brandsList returns brands", async ({ request }) => {
    const body = await readBody(await request.get("/api/brandsList"));
    expect(body.responseCode).toBe(200);
    expect(body.brands.length).toBeGreaterThan(0);
  });

  test("searchProduct finds tops", async ({ request }) => {
    const response = await request.post("/api/searchProduct", {
      form: { search_product: "top" },
    });
    const body = await readBody(response);

    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
  });

  test("searchProduct without the parameter returns 400", async ({
    request,
  }) => {
    const body = await readBody(await request.post("/api/searchProduct"));

    expect(body.responseCode).toBe(400);
    expect(body.message).toContain("search_product");
  });
});
