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

        // Fill in the filter form
        await releaseDateInput.fill('2023-01-01'); // Use correct date format matching your input display
        await minPriceInput.fill('10'); // Example minimum price
        await maxPriceInput.fill('50'); // Example maximum price
        await minPlaytimeInput.fill('120'); // Example minimum playtime in minutes

        // Click the apply filters button
        await applyFiltersButton.click();

        // Wait for the page to load and display results
        await page.waitForTimeout(3000); 

    });
});
