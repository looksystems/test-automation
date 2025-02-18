import { test, expect } from '@playwright/test';
import { login } from './utils.ts';

test.beforeEach(async ({ page }) => {
  login(page);
});

test('test', async ({ page }) => {
  await page.getByRole('button', { name: 'Retirement goals and pension' }).first().click();
  await page.getByRole('banner').getByRole('button').nth(1).click();
  await page.getByPlaceholder('eg pension consolidation...').click();
  await page.getByPlaceholder('eg pension consolidation...').fill('pension planning');
  await page.getByRole('button', { name: 'Save bookmark' }).click();
  await page.locator('div').filter({ hasText: 'Bookmark saved' }).nth(4).click();
  await page.locator('.fixed > .absolute > div > .transition-colors').first().click();
  await page.getByRole('link', { name: 'Bookmarks' }).click();
  await page.getByRole('heading', { name: 'pension planning' }).click();
  await expect(page.locator('#app')).toContainText('pension planning');
});