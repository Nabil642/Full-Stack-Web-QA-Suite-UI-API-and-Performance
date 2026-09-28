import { test, expect } from "@playwright/test";
import { buildUser, toCreateAccountForm } from "../utils/userFactory";

test.describe.serial("User account lifecycle via API", () => {
  const user = buildUser();

  test("create a new account", async ({ request }) => {
    const response = await request.post("/api/createAccount", {
      form: toCreateAccountForm(user),
    });
    const body = JSON.parse(await response.text());

    expect(body.responseCode).toBe(201);
    expect(body.message).toBe("User created!");
  });

  test("the new user can be verified", async ({ request }) => {
    const response = await request.post("/api/verifyLogin", {
      form: { email: user.email, password: user.password },
    });
    const body = JSON.parse(await response.text());

    expect(body.responseCode).toBe(200);
    expect(body.message).toBe("User exists!");
  });

  test("wrong password is reported as user not found", async ({ request }) => {
    const response = await request.post("/api/verifyLogin", {
      form: { email: user.email, password: "wrong-password" },
    });
    const body = JSON.parse(await response.text());

    expect(body.responseCode).toBe(404);
    expect(body.message).toBe("User not found!");
  });

  test("user details can be fetched by email", async ({ request }) => {
    const response = await request.get("/api/getUserDetailByEmail", {
      params: { email: user.email },
    });
    const body = JSON.parse(await response.text());

    expect(body.responseCode).toBe(200);
    expect(body.user.email).toBe(user.email);
    expect(body.user.first_name).toBe(user.firstName);
  });

  test("delete the account", async ({ request }) => {
    const response = await request.delete("/api/deleteAccount", {
      form: { email: user.email, password: user.password },
    });
    const body = JSON.parse(await response.text());

    expect(body.responseCode).toBe(200);
    expect(body.message).toBe("Account deleted!");
  });

  test("deleted user can no longer be verified", async ({ request }) => {
    const response = await request.post("/api/verifyLogin", {
      form: { email: user.email, password: user.password },
    });
    expect(JSON.parse(await response.text()).responseCode).toBe(404);
  });
});
