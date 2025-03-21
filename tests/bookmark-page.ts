import { Page, Locator } from '@playwright/test';
import { teriURL } from './utils';

export class BookmarkPage {
    private readonly bookmarkItems: Locator;
  
    constructor(public readonly page: Page) {
      this.page = page;
      this.bookmarkItems = this.page.locator('_vue=bookmark-items');
    }
  
    async goto() {
      await this.page.goto(teriURL + '/bookmarks');
    }
  
    async removeByName(name: string) {
      const bookmark = this.bookmarkItems.filter({ hasText: name });
      await bookmark.getByRole('button').last().click();
      await bookmark.getByText('Delete bookmark').click();
    }
  
    async removeAll() {
      while ((await this.bookmarkItems.count()) > 0) {
        const bookmark = this.bookmarkItems.first();;
        await bookmark.getByRole('button').last().click();
        await bookmark.getByText('Delete bookmark').click();
      }
    }
};
