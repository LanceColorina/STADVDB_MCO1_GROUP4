import { test, expect } from '@playwright/test';

test.describe('Path4 - Fetch and Display Game Data', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the game filtering page
    await page.goto('https://stadvdb-mco-1-group-4.vercel.app/path4'); // Adjust the URL as necessary
  });

  test('should fetch and display game data in the table', async ({ page }) => {
    const fetchButton = page.locator('#fetch-button');
    await fetchButton.click();

    await page.waitForSelector('.game-table tbody tr', { timeout: 15000 });

    const tableContainer = page.locator('.table-container');
    await expect(tableContainer).toBeVisible();

    const tableRows = page.locator('.game-table tbody tr');
    const rowCount = await tableRows.count();
    expect(rowCount).toBeGreaterThan(0);

  });
});
