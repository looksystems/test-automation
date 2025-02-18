import { test, expect } from '@playwright/test';

let emailAddress = 'ross.chapman@fabricfintech.com';
let password = 'Password123';

export async function login(page) {
  await page.goto('https://teri-for-ops.dev.aviva.fabricfintech.com/login');
  await page.waitForLoadState("networkidle"); //waiting until all network calls have been made e.g. csrf token
  await page.locator('label').filter({ hasText: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill(emailAddress);
  await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  await expect(page).toHaveURL('https://teri-for-ops.dev.aviva.fabricfintech.com/'/*, { timeout: 20000}*/); //timeout extends time test waits
}
