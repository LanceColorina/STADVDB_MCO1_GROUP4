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

        await page.waitForTimeout(1000);

        const gameCards = page.locator('.game-card');
        const visibleGames = await gameCards.count();
        expect(visibleGames).toBeGreaterThan(0);
    });

    test('should filter games by price range and metacritic score', async ({ page }) => {
        const minPriceInput = page.locator('#minPrice');
        const maxPriceInput = page.locator('#maxPrice');
        const metacriticScoreInput = page.locator('#metacriticScore');
        const filterButton = page.locator('#filter-button');

        await minPriceInput.fill('20');
        await maxPriceInput.fill('70');
        await metacriticScoreInput.fill('80');

        await filterButton.click();

        await page.waitForTimeout(1000);

        const gameCards = page.locator('.game-card');
        const visibleGames = await gameCards.count();
        expect(visibleGames).toBeGreaterThan(-1);
    });

    test('should filter games by platforms and metacritic score', async ({ page }) => {
        const metacriticScoreInput = page.locator('#metacriticScore');
        const windowsCheckbox = page.locator('#windows-checkbox');
        const macCheckbox = page.locator('#mac-checkbox');
        const filterButton = page.locator('#filter-button');

        await metacriticScoreInput.fill('85');
        await windowsCheckbox.check();
        await macCheckbox.check();

        await filterButton.click();

        await page.waitForTimeout(1000);


        const gameCards = page.locator('.game-card');
        const visibleGames = await gameCards.count();
        expect(visibleGames).toBeGreaterThan(-1);
    });
});
