import { test, expect } from '@playwright/test';

test.describe('Path1 - Game Filter and Search', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://stadvdb-mco-1-group-4.vercel.app/path1'); 
    });

    test('filter games @releasedate = 2023-01-01, @minprice = 10, @maxprice = 50, @minplaytime = 120  - test 1', async ({ page }) => {
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


        
        const gameCards = page.locator('.game-card');
        await expect(gameCards.first()).toBeVisible({ timeout: 10000 });

        const visibleGames = await gameCards.count();
        expect(visibleGames).toBeGreaterThan(0);
    });

    test('should filter games @releasedate = 2017-01-01, @minprice = 10, @maxprice = 80, @minplaytime = 10 - test 2', async ({ page }) => {
        const releaseDateInput = page.locator('#release-date-input');
        const minPriceInput = page.locator('#min-price-input');
        const maxPriceInput = page.locator('#max-price-input');
        const minPlaytimeInput = page.locator('#min-playtime-input');
        const applyFiltersButton = page.locator('#apply-filters-button');

        await releaseDateInput.fill('2017-01-01');
        await minPriceInput.fill('10'); 
        await maxPriceInput.fill('80'); 
        await minPlaytimeInput.fill('10');  

        await applyFiltersButton.click();


        const gameCards = page.locator('.game-card');
        await expect(gameCards.first()).toBeVisible({ timeout: 10000 });

        const visibleGames = await gameCards.count();
        expect(visibleGames).toBeGreaterThan(0);
    });

    test('should filter games @releasedate = 2010-01-01, @minprice = 2, @maxprice = 30, @minplaytime = 50 - test 3', async ({ page }) => {
        const releaseDateInput = page.locator('#release-date-input');
        const minPriceInput = page.locator('#min-price-input');
        const maxPriceInput = page.locator('#max-price-input');
        const minPlaytimeInput = page.locator('#min-playtime-input');
        const applyFiltersButton = page.locator('#apply-filters-button');

        await releaseDateInput.fill('2010-01-01');
        await minPriceInput.fill('2'); 
        await maxPriceInput.fill('30'); 
        await minPlaytimeInput.fill('50'); 

        await applyFiltersButton.click();


        const gameCards = page.locator('.game-card');
        await expect(gameCards.first()).toBeVisible({ timeout: 10000 });

        const visibleGames = await gameCards.count();
        expect(visibleGames).toBeGreaterThan(0);
    });
});
