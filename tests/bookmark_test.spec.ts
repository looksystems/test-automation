import { test, expect, Page } from '@playwright/test';
import { chromium } from 'playwright';
import { login, teriURL } from './utils.ts';
import { HomePage } from './home-page.ts';
import { BookmarkPage } from './bookmark-page.ts';

let testPage: Page;
let testTime = (new Date).toUTCString();
let bookmarkName = 'Test Bookmark ' + testTime;

test.beforeAll(async ({ browser }) => {
  testPage = await browser.newPage();
  await login(testPage);
});

test.afterAll(async () => {
  await testPage.close();
});


test('it can save a bookmark', async () => {
  let homePage = new HomePage(testPage);
  homePage.goto();
  homePage.search('hello');
  homePage.addBookmark(bookmarkName);
  await expect(testPage.locator('#app')).toContainText('Bookmark saved');
});

/*
test('it can save a bookmark', async () => {
  await testPage.goto(teriURL, { timeout: 30000});
  await expect(testPage.locator('#app')).toContainText('Ask me anything about finance');
  await testPage.getByRole('button', { name: 'Retirement goals and pension' }).first().click();
  await expect(testPage.locator('#conversation-wrapper .aimsg')).toContainText('retirement', { timeout: 30000});
  await testPage.getByRole('banner').getByRole('button').nth(1).click(); // bookmark button
  await testPage.getByPlaceholder('eg pension consolidation...').fill(bookmarkName); // set bookmark name
  await testPage.getByRole('button', { name: 'Save bookmark' }).click(); // save
  await expect(testPage.locator('#app')).toContainText('Bookmark saved');
});

test('it lists the recorded bookmark', async () => {
  await testPage.goto(teriURL, { timeout: 30000});
  await expect(testPage.locator('#app')).toContainText('Ask me anything about finance');
  await testPage.getByRole('button').filter({ hasText: /^$/ }).nth(2).click(); // open sidebar
  await testPage.getByRole('link', { name: 'Bookmarks' }).click();
  await testPage.goto('https://teri-for-ops.dev.aviva.fabricfintech.com/bookmarks');
  await expect(testPage.locator('#app')).toContainText(bookmarkName);
});

test('it can be saved to a group', async () => {
  await testPage.goto(teriURL, { timeout: 30000});
  await expect(testPage.locator('#app')).toContainText('Ask me anything about finance');
  await testPage.getByRole('button').filter({ hasText: /^$/ }).nth(2).click(); // open sidebar
  await testPage.getByRole('link', { name: 'Bookmarks' }).click();
  await testPage.goto('https://teri-for-ops.dev.aviva.fabricfintech.com/bookmarks');
  await expect(testPage.locator('#app')).toContainText(bookmarkName);
  await testPage.getByRole('button')
  await testPage.locator('div:nth-child(2) > div > .ml-auto > div > .transition-colors').click();
  await testPage.getByRole('button', { name: 'New Group' }).nth(1).click();
  await testPage.getByPlaceholder('eg pensions...').first().fill('automationTestGroup');
  await testPage.getByRole('button', { name: 'Save group' }).first().click();
  await testPage.getByText('automationTestGroup').nth(1).click();
  //await testPage.locator('#addBookmark34bf19c9-430c-409d-9401-6148376a2ad1 > div > div:nth-child(5) > form > .btn').click();
  await testPage.locator('.fixed > .absolute > div > .transition-colors').first().click();
  await testPage.getByRole('link', { name: 'Groups' }).click();
  await testPage.getByRole('link', { name: 'automationTestGroup a few' }).click();
  await expect(testPage.locator('#app')).toContainText(bookmarkName);
})

test('it can be saved to a group', async () => {
  await testPage.goto(teriURL, { timeout: 30000});
  await expect(testPage.locator('#app')).toContainText('Ask me anything about finance');
  await testPage.getByRole('button').filter({ hasText: /^$/ }).nth(2).click(); // open sidebar
  await testPage.getByRole('link', { name: 'Bookmarks' }).click();
  await testPage.goto('https://teri-for-ops.dev.aviva.fabricfintech.com/bookmarks');
  await expect(testPage.locator('#app')).toContainText(bookmarkName);
  await testPage.getByRole('button');
  await testPage.locator('div:nth-child(3) > div > .ml-auto > div > .transition-colors').click();
  await testPage.getByRole('button', { name: 'New Group' }).nth(2).click();
  await testPage.getByPlaceholder('eg pensions...').first().fill('automationTestGroup');
  await testPage.getByRole('button', { name: 'Save group' }).first().click();
  await testPage.getByText('automationTestGroup').nth(2).click();
  await testPage.locator('#addBookmark19d956d7-a9ab-4f54-ada1-c8244c453c1d > form > button').click();
  await testPage.locator('#addBookmark19d956d7-a9ab-4f54-ada1-c8244c453c1d > div > div:nth-child(5) > form > .btn').click();
  await testPage.locator('.fixed > .absolute > div > .transition-colors').first().click();
  await testPage.getByRole('link', { name: 'Groups' }).click();
  await testPage.getByRole('link', { name: 'automationTestGroup' }).first().click();
  await expect(testPage.locator('#app')).toContainText(bookmarkName);
}) 

test('bookmark can be deleted', async () => {
  await testPage.goto(teriURL, { timeout: 30000});
  await expect(testPage.locator('#app')).toContainText('Ask me anything about finance');
  await testPage.getByRole('button').filter({ hasText: /^$/ }).nth(2).click(); // open sidebar
  await testPage.getByRole('link', { name: 'Bookmarks' }).click();
  await testPage.goto('https://teri-for-ops.dev.aviva.fabricfintech.com/bookmarks');
  await expect(testPage.locator('#app')).toContainText(bookmarkName);
  const bookmarkTitle = testPage.getByText(bookmarkName);
  const bookmarkContainer = testPage.locator('.bookmark').filter({ has: bookmarkTitle });
  await bookmarkContainer.getByRole('button').click();
  //await testPage.locator('.m-1 > button').nth(-1).getByRole('button', { name: 'Delete bookmark' }).click();
  //await testPage.locator('.m-1 > button').nth(-1).getByRole('button', { name: 'Yes' }).click();
  //await expect(testPage.locator('#app')).not.toContainText(bookmarkName);
})

*/