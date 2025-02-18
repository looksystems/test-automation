import { test, expect } from '@playwright/test';

/*beforeEach(function () {

}); */

test('it can login with valid credentials', async ({ page }) => {
  await page.goto('https://teri-for-ops.dev.aviva.fabricfintech.com/login');
  //await page.waitForTimeout(3000);
  await page.waitForLoadState("networkidle"); //waiting until all network calls have been made e.g. csrf token
  await page.locator('label').filter({ hasText: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('ross.chapman@fabricfintech.com');
  await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
  await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  await expect(page).toHaveURL('https://teri-for-ops.dev.aviva.fabricfintech.com/'/*, { timeout: 20000}*/); //timeout extends time test waits
  await expect(page.locator('#app')).toContainText('Ask me anything about finance');
  await page.getByRole('textbox', { name: 'Feel free to ask any question' }).click();
  await expect(page.getByPlaceholder('Feel free to ask any question')).toContainText('');
});

test('tests that teri responds', async ({ page }) => {
  await page.goto('https://teri-for-ops.dev.aviva.fabricfintech.com/login');
  await page.waitForLoadState("networkidle"); //waiting until all network calls have been made e.g. csrf token
  await page.locator('label').filter({ hasText: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('ross.chapman@fabricfintech.com');
  await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
  await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  await expect(page).toHaveURL('https://teri-for-ops.dev.aviva.fabricfintech.com/'/*, { timeout: 20000}*/); //timeout extends time test waits
  await expect(page.locator('#app')).toContainText('Ask me anything about finance');
  await page.getByRole('textbox', { name: 'Feel free to ask any question' }).click();
  await page.getByRole('textbox', { name: 'Feel free to ask any question' }).fill('Can you tell me about pensions consolidation?');
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
  await expect(page.locator('#conversation-wrapper .aimsg')).toContainText('Pension consolidation', {timeout: 20000});
  await expect(page.locator('h2')).toContainText('Sources');
});