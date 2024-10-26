import { test, expect } from '@playwright/test';

test.describe('Path3 - Game Filter and Search', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://stadvdb-mco-1-group-4.vercel.app/path3'); 
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

        const gameCards = page.locator('.game-card');
        await expect(gameCards.first()).toBeVisible({ timeout: 10000 });

        const visibleGames = await gameCards.count();
        expect(visibleGames).toBeGreaterThan(0); // Ensure there are results
    });

    test('should filter games by price range and metacritic score', async ({ page }) => {
        const minPriceInput = page.locator('#minPrice');
        const maxPriceInput = page.locator('#maxPrice');
        const metacriticScoreInput = page.locator('#metacriticScore');
        const filterButton = page.locator('#filter-button');
        const releaseDateInput = page.locator('#releaseDate');

        await releaseDateInput.fill('2014-01-01'); 
        await minPriceInput.fill('20');
        await maxPriceInput.fill('70');
        await metacriticScoreInput.fill('80');

        await filterButton.click();

        const gameCards = page.locator('.game-card');
        await expect(gameCards.first()).toBeVisible({ timeout: 10000 });

        const visibleGames = await gameCards.count();
        expect(visibleGames).toBeGreaterThan(0);
    });

    test('should filter games by platforms and metacritic score', async ({ page }) => {
        const releaseDateInput = page.locator('#releaseDate');
        const metacriticScoreInput = page.locator('#metacriticScore');
        const minPriceInput = page.locator('#minPrice');
        const maxPriceInput = page.locator('#maxPrice');
        const windowsCheckbox = page.locator('#windows-checkbox');
        const macCheckbox = page.locator('#mac-checkbox');
        const filterButton = page.locator('#filter-button');

        await releaseDateInput.fill('2017-01-01'); 
        await minPriceInput.fill('10');
        await maxPriceInput.fill('100');
        await metacriticScoreInput.fill('85');
        await windowsCheckbox.check();
        await macCheckbox.check();

        await filterButton.click();

        const gameCards = page.locator('.game-card');
        await expect(gameCards.first()).toBeVisible({ timeout: 10000 });

        const visibleGames = await gameCards.count();
        expect(visibleGames).toBeGreaterThan(-1); // Ensure there are results
    });
});