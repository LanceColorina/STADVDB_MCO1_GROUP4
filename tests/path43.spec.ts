import { test, expect } from '@playwright/test';

test.describe('Filter Games by Platform - Locator Example', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/path4');
    });

    test('locate checkboxes, wait for range inputs, fill them, and click filter button', async ({ page }) => {
        const windowsCheckbox = page.locator('#windows-checkbox');
        const macCheckbox = page.locator('#mac-checkbox');
        const linuxCheckbox = page.locator('#linux-checkbox');
        const windowsMinInput = page.locator('#windows-min');
        const windowsMaxInput = page.locator('#windows-max');
        const macMinInput = page.locator('#mac-min');
        const macMaxInput = page.locator('#mac-max');
        const linuxMinInput = page.locator('#linux-min');
        const linuxMaxInput = page.locator('#linux-max');
        const filterButton = page.locator('#filter-button');

        await windowsCheckbox.check();
        
        await expect(windowsCheckbox).toBeChecked();

        await windowsMinInput.waitFor({ state: 'visible' });
        await windowsMaxInput.waitFor({ state: 'visible' });

        await windowsMinInput.fill('20');
        await windowsMaxInput.fill('60');

        await filterButton.click();

        await page.waitForTimeout(10000);
    });
});
