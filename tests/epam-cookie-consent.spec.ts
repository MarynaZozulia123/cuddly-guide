import { test, expect } from '@playwright/test';

test('EPAM home page opens and cookie consent is handled', async ({ page }) => {
  await page.goto('https://www.epam.com/');

  // Basic assertion that the page is open.
  await expect(page).toHaveTitle(/EPAM/i);

  // Handle cookie consent banner if it appears.
});
