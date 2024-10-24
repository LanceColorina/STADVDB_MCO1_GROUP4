import { test, expect } from '@playwright/test';

test.describe('Path3 - Game Filter and Search', () => {
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


        await page.waitForTimeout(3000); 

    });
});
