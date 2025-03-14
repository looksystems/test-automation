import * as dotenv from 'dotenv';

// Load the .env file
dotenv.config({path: __dirname+'/.env'});
import { test, expect } from '@playwright/test';
import { login } from './utils.ts';

test.beforeEach(async ({ page }) => {
  login(page);
});

test('it can login with valid credentials', async ({ page }) => {
  await expect(page.locator('#app')).toContainText('Ask me anything about finance');
  await page.getByRole('textbox', { name: 'Feel free to ask any question' }).click();
  await expect(page.getByPlaceholder('Feel free to ask any question')).toContainText('');
});

test('tests that teri responds', async ({ page }) => {
  await expect(page.locator('#app')).toContainText('Ask me anything about finance');
  await page.getByRole('textbox', { name: 'Feel free to ask any question' }).click();
  await page.getByRole('textbox', { name: 'Feel free to ask any question' }).fill('Can you tell me about pensions consolidation?');
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
  await expect(page.locator('#conversation-wrapper .aimsg')).toContainText('Pension consolidation', {timeout: 20000});
  await expect(page.locator('h2')).toContainText('Sources');
});