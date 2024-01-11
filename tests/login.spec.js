import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://test-admin-am.platforms.team');
    page.pause();
});