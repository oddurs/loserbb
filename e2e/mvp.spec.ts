import { expect, test, type Page } from "@playwright/test";

const password = "password123";

async function signUp(page: Page, handle: string) {
  await page.goto("/signup");
  await page.getByLabel("Handle").fill(handle);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign up" }).click();
  await expect(page.getByText(`@${handle}`)).toBeVisible();
}

async function todaysLimit(page: Page): Promise<number> {
  return Number(await page.locator("form[data-limit]").getAttribute("data-limit"));
}

test("sign up, post within today's number, read it back", async ({ page }) => {
  const handle = `u${Date.now() % 1e9}`;
  await signUp(page, handle);

  const limit = await todaysLimit(page);
  await expect(page.getByTestId("today")).toHaveText(`Today: ${limit}`);

  const box = page.getByLabel("Post");
  const post = page.getByRole("button", { name: "Post" });

  await box.fill("x".repeat(limit + 1));
  await expect(page.getByTestId("remaining")).toHaveText("-1");
  await expect(post).toBeDisabled();

  const body = "😀".repeat(limit);
  await box.fill(body);
  await expect(page.getByTestId("remaining")).toHaveText("0");
  await post.click();

  const first = page.getByTestId("post").first();
  await expect(first).toContainText(`@${handle}`);
  await expect(first).toContainText(body);
  await expect(first).toContainText(`· ${limit}`);
  await expect(box).toHaveValue("");
});

test("markup in a post renders as text", async ({ page }) => {
  await signUp(page, `m${Date.now() % 1e9}`);
  const limit = await todaysLimit(page);
  test.skip(limit < 3, "today's number is too small for the probe");
  const probe = "<b>".slice(0, limit);
  await page.getByLabel("Post").fill(probe);
  await page.getByRole("button", { name: "Post" }).click();
  await expect(page.getByTestId("post").first().locator("p")).toHaveText(probe);
  await expect(page.getByTestId("post").first().locator("b")).toHaveCount(0);
});

test("posting after the session ends sends you to log in", async ({ page }) => {
  await signUp(page, `s${Date.now() % 1e9}`);
  await page.context().clearCookies();
  await page.getByLabel("Post").fill("x");
  await page.getByRole("button", { name: "Post" }).click();
  await expect(page).toHaveURL(/\/login$/);
});

test("a taken handle keeps the input and says why", async ({ page }) => {
  const handle = `t${Date.now() % 1e9}`;
  await signUp(page, handle);
  await page.getByRole("button", { name: "Log out" }).click();
  await page.goto("/signup");
  await page.getByLabel("Handle").fill(handle);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign up" }).click();
  await expect(page.locator("form [role=alert]")).toHaveText("That handle is taken.");
  await expect(page.getByLabel("Handle")).toHaveValue(handle);
});

test("log out hides the composer, log in brings it back", async ({ page }) => {
  const handle = `l${Date.now() % 1e9}`;
  await signUp(page, handle);
  await page.getByRole("button", { name: "Log out" }).click();
  await expect(page.getByLabel("Post")).toHaveCount(0);
  await expect(page.getByText("to post.")).toBeVisible();

  await page.goto("/login");
  await page.getByLabel("Handle").fill(handle.toUpperCase());
  await page.getByLabel("Password").fill("wrong-password");
  await page.getByRole("button", { name: "Log in" }).click();
  await expect(page.locator("form [role=alert]")).toHaveText("Wrong handle or password.");

  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Log in" }).click();
  await expect(page.getByLabel("Post")).toBeVisible();
});
