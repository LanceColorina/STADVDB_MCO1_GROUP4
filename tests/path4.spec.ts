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
        await macCheckbox.check();
        await linuxCheckbox.check();
        
        await expect(windowsCheckbox).toBeChecked();
        await expect(macCheckbox).toBeChecked();
        await expect(linuxCheckbox).toBeChecked();

        await windowsMinInput.waitFor({ state: 'visible' });
        await windowsMaxInput.waitFor({ state: 'visible' });
        await macMinInput.waitFor({ state: 'visible' });
        await macMaxInput.waitFor({ state: 'visible' });
        await linuxMinInput.waitFor({ state: 'visible' });
        await linuxMaxInput.waitFor({ state: 'visible' });

        await windowsMinInput.fill('1');
        await windowsMaxInput.fill('10');

        await macMinInput.fill('5');
        await macMaxInput.fill('15');

        await linuxMinInput.fill('2');
        await linuxMaxInput.fill('8');

        await filterButton.click();

        await page.waitForTimeout(300);
    });
});
