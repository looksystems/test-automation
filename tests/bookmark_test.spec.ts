import { test, expect } from '@playwright/test';
import { login } from './utils.ts';

test.beforeEach(async ({ page }) => {
  login(page);
});

test('test', async ({ page }) => {
  await page.getByRole('button', { name: 'Retirement goals and pension' }).first().click();
  await expect(page.locator('#conversation-wrapper .aimsg')).toContainText('retirement goals', { timeout: 30000});
  await page.getByRole('banner').getByRole('button').nth(1).click(); // bookmark button
  await page.getByPlaceholder('eg pension consolidation...').fill('retirement goals'); // set bookmark name
  await page.getByRole('button', { name: 'Save bookmark' }).click(); // save
  await expect(page.locator('#app')).toContainText('Bookmark saved');
});