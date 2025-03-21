import { Page, Locator, expect } from '@playwright/test';
import { teriURL } from './utils';

export class HomePage {
    private readonly aiMessages: Locator;
    private readonly userMessages: Locator;
  
    constructor(public readonly page: Page) {
      this.page = page;
      this.aiMessages = this.page.locator('_vue=ai-msg');
      this.userMessages = this.page.locator('_vue=user-msg');
    }
  
    async goto() {
      await this.page.goto(teriURL, {timeout: 30000});
    }

    async search(text: string) {
        await this.page.getByPlaceholder('Feel free to ask any question').fill(text);
        await this.page.getByPlaceholder('Feel free to ask any question').press('Enter');
        const aiMessageCount = await this.aiMessages.count();
        await expect(this.aiMessages).toHaveCount(aiMessageCount + 1);
    }
  
    async addBookmark(name: string) {
      await this.page.getByText('Save to bookmarks').click();
      await this.page.getByPlaceholder('eg pension consolidation...').fill(name);
      await this.page.getByText('Save bookmark').click();
    }
};
