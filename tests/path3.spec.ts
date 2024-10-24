import { test, expect } from '@playwright/test';

test.describe('Path3 - Game Filter and Search', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/path3'); 
    });

    test('should filter games by criteria and search by game name', async ({ page }) => {

        const releaseDateInput = page.locator('#releaseDate');
        const minPriceInput = page.locator('#minPrice');
        const maxPriceInput = page.locator('#maxPrice');
        const metacriticScoreInput = page.locator('#metacriticScore');
        const windowsCheckbox = page.locator('#windows-checkbox');
        const macCheckbox = page.locator('#mac-checkbox');
        const linuxCheckbox = page.locator('#linux-checkbox');
        const filterButton = page.locator('#filter-button');
        await releaseDateInput.fill('2023-01-01'); 
        await minPriceInput.fill('10'); 
        await maxPriceInput.fill('50'); 
        await metacriticScoreInput.fill('75');

        await windowsCheckbox.check();
        await macCheckbox.check();
        await linuxCheckbox.check();

        await filterButton.click();

        await page.waitForTimeout(300); 
    });
});
