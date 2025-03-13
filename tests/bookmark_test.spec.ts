import { test, expect, Page } from '@playwright/test';
import { chromium } from 'playwright';
import { login } from './utils.ts';

let testPage: Page;
let testTime = (new Date).toUTCString();

test.beforeAll(async ({ browser }) => {
  testPage = await browser.newPage();
  await login(testPage);
});

test.afterAll(async () => {
  await testPage.close();
});

test('it can save a bookmark', async () => {
  await testPage.goto('https://teri-for-ops.dev.aviva.fabricfintech.com/', { timeout: 30000});
  await expect(testPage.locator('#app')).toContainText('Ask me anything about finance');
  await testPage.getByRole('button', { name: 'Retirement goals and pension' }).first().click();
  await expect(testPage.locator('#conversation-wrapper .aimsg')).toContainText('retirement goals', { timeout: 30000});
  await testPage.getByRole('banner').getByRole('button').nth(1).click(); // bookmark button
  await testPage.getByPlaceholder('eg pension consolidation...').fill('Test Bookmark ' + testTime); // set bookmark name
  await testPage.getByRole('button', { name: 'Save bookmark' }).click(); // save
  await expect(testPage.locator('#app')).toContainText('Bookmark saved');
});

test('it lists the recorded bookmark', async () => {
  await testPage.goto('https://teri-for-ops.dev.aviva.fabricfintech.com/', { timeout: 30000});
  await expect(testPage.locator('#app')).toContainText('Ask me anything about finance');
  await testPage.getByRole('button').filter({ hasText: /^$/ }).nth(2).click(); // open sidebar
  await testPage.getByRole('link', { name: 'Bookmarks' }).click();
  await testPage.goto('https://teri-for-ops.dev.aviva.fabricfintech.com/bookmarks');
  await expect(testPage.locator('#app')).toContainText('Test Bookmark ' + testTime);
});