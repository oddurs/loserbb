import { expect, test } from "@playwright/test";

test("the home page loads with the site name", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("loserbb");
  await expect(page.getByRole("link", { name: "loserbb" })).toBeVisible();
});
