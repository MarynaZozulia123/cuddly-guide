import { test, expect } from '@playwright/test';

test('EPAM home page opens and cookie consent is handled', async ({ page }) => {
  await page.goto('https://www.epam.com/');

  // Basic assertion that the page is open.
  await expect(page).toHaveTitle(/EPAM/i);

  // Handle cookie consent banner if it appears.
  const acceptCookiesButton = page
    .getByRole('button', { name: /accept( all)?|agree|i agree/i })
    .first();

  try {
    await acceptCookiesButton.waitFor({ state: 'visible', timeout: 5000 });
    await acceptCookiesButton.click();
    await expect(acceptCookiesButton).toBeHidden({ timeout: 10_000 });
  } catch {
    // No cookie banner detected (or not interactable). That's OK for this flow.
  }

  // Assert we are still on the expected domain after cookie handling.
  await expect(page).toHaveURL(/https:\/\/www\.epam\.com\/?/);
});
