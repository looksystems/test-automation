import * as dotenv from 'dotenv';

// Load the .env file
dotenv.config({path: __dirname+'/.env'});
import { test, expect } from '@playwright/test';

const emailAddress = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;
export const teriURL: string = "https://teri-for-ops.dev.aviva.fabricfintech.com";

export async function login(page) {
  await page.goto('https://teri-for-ops.dev.aviva.fabricfintech.com/login');
  await page.waitForLoadState("networkidle"); //waiting until all network calls have been made e.g. csrf token
  await page.locator('label').filter({ hasText: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill(emailAddress);
  await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  await expect(page).toHaveURL(teriURL, { timeout: 30000}); //timeout extends time test waits
} 

