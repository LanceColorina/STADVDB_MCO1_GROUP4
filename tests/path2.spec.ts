import { test, expect } from '@playwright/test';

test.describe('Path2 - Verify Game Cards Count', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://stadvdb-mco-1-group-4.vercel.app/path2');
  });

  test('should display at least one game card after data fetch', async ({ page }) => {
    await page.waitForSelector('.game-card', { timeout: 20000 });

    const gameCards = page.locator('.game-card');
    const cardCount = await gameCards.count();
    expect(cardCount).toBeGreaterThan(0);
  });
});
