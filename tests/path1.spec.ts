import { test, expect } from '@playwright/test';

test.describe('Path1 - Game Filter and Search', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/path1'); 
    });

    test('should filter games based on criteria and display results', async ({ page }) => {
        const releaseDateInput = page.locator('#release-date-input');
        const minPriceInput = page.locator('#min-price-input');
        const maxPriceInput = page.locator('#max-price-input');
        const minPlaytimeInput = page.locator('#min-playtime-input');
        const applyFiltersButton = page.locator('#apply-filters-button');

        await releaseDateInput.fill('2023-01-01');
        await minPriceInput.fill('10'); 
        await maxPriceInput.fill('50'); 
        await minPlaytimeInput.fill('120'); 

        await applyFiltersButton.click();

        await page.waitForTimeout(4000);

        
        const gameCards = page.locator('.game-card');
        const visibleGames = await gameCards.count();
        expect(visibleGames).toBeGreaterThan(0); 
    });

    test('should filter games by price range only and display results', async ({ page }) => {
        const minPriceInput = page.locator('#min-price-input');
        const maxPriceInput = page.locator('#max-price-input');
        const applyFiltersButton = page.locator('#apply-filters-button');

        await minPriceInput.fill('20'); 
        await maxPriceInput.fill('70'); 

        await applyFiltersButton.click();

        await page.waitForTimeout(4000);

        const gameCards = page.locator('.game-card');
        const visibleGames = await gameCards.count();
        expect(visibleGames).toBeGreaterThan(0); 
    });

    test('should filter games by release date and playtime only and display results', async ({ page }) => {
        const releaseDateInput = page.locator('#release-date-input');
        const minPlaytimeInput = page.locator('#min-playtime-input');
        const applyFiltersButton = page.locator('#apply-filters-button');

        await releaseDateInput.fill('2022-06-01');
        await minPlaytimeInput.fill('60');

        await applyFiltersButton.click();

        await page.waitForTimeout(4000);

        const gameCards = page.locator('.game-card');
        const visibleGames = await gameCards.count();
        expect(visibleGames).toBeGreaterThan(0); 
    });
});
