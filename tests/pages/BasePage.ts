
import { Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export default class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
    await this.waitForPageLoad();
  }

  async waitForPageLoad(timeout: number = 60000): Promise<void> {
    try {
      await this.page.waitForLoadState('load', { timeout: timeout });
    } catch (error) {
      console.warn(`Page did not load within ${timeout / 1000}s`);
    }
  }

  async waitForElement(selector: string, timeout: number = 30000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  async clickElement(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async fillInputField(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
  }

  async getText(selector: string): Promise<string | null> {
    return await this.page.textContent(selector);
  }

  async getListOfText(selector: string): Promise<string[]> {
    try {
      const locator = this.page.locator(selector);
      const count = await locator.count();
      const results: string[] = [];
      for (let i = 0; i < count; i++) {
        const text = await locator.nth(i).textContent();
        if (text !== null) {
          const trimmed = text.trim();
          if (trimmed.length > 0) results.push(trimmed);
        }
      }
      return results;
    } catch (e) {
      return [];
    }
  }

  async waitForText(text: string): Promise<void> {
    await this.page.waitForSelector(`text=${text}`);
  }

  async takeScreenshot(name: string): Promise<void> {
    const screenshotsDir = path.resolve('tests', 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    const filePath = path.join(screenshotsDir, `${name}.png`);
    await this.page.screenshot({ path: filePath });
  }

  async scrollToElement(selector: string): Promise<void> {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  async waitForNavigation(): Promise<void> {
    await this.page.waitForNavigation();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async isElementVisible(selector: string, timeout: number = 5000): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  async verifyElementText(selector: string, expectedText: string): Promise<boolean> {
    try {
      const locator = this.page.locator(selector);
      await locator.first().waitFor({ state: 'attached', timeout: 3000 }).catch(() => {});
      const text = await locator.first().textContent();
      if (text === null) return false;
      return text.includes(expectedText);
    } catch (e) {
      return false;
    }
  }

  async verifyElementCount(selector: string, expectedCount: number): Promise<boolean> {
    try {
      const count = await this.page.locator(selector).count();
      return count === expectedCount;
    } catch (e) {
      return false;
    }
  }

  async waitForElementAttached(selector: string, timeout: number = 30000): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'attached', timeout });
  }

  async waitForElementDetached(selector: string, timeout: number = 30000): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'detached', timeout });
  }

  async waitForElementToBeVisible(selector: string, timeout: number = 30000): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  async waitForElementToBeHidden(selector: string, timeout: number = 30000): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'hidden', timeout });
  }

  async doubleClick(selector: string): Promise<void> {
    await this.page.dblclick(selector);
  }

  async rightClick(selector: string): Promise<void> {
    await this.page.click(selector, { button: 'right' });
  }

  async hover(selector: string): Promise<void> {
    await this.page.hover(selector);
  }

  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  async selectOption(selector: string, value: any): Promise<void> {
    await this.page.selectOption(selector, value);
  }

  async checkCheckbox(selector: string): Promise<void> {
    await this.page.check(selector);
  }

  async uncheckCheckbox(selector: string): Promise<void> {
    await this.page.uncheck(selector);
  }

  async uploadFile(selector: string, filePath: string | string[]): Promise<void> {
    await this.page.setInputFiles(selector, filePath);
  }

  async clearField(selector: string): Promise<void> {
    await this.page.fill(selector, '');
  }

  async getAttribute(selector: string, attribute: string): Promise<string | null> {
    return await this.page.getAttribute(selector, attribute);
  }

  async getInputValue(selector: string): Promise<string> {
    return await this.page.inputValue(selector);
  }

  async isChecked(selector: string): Promise<boolean> {
    return await this.page.isChecked(selector);
  }

  async isEnabled(selector: string): Promise<boolean> {
    return await this.page.isEnabled(selector);
  }

  async isDisabled(selector: string): Promise<boolean> {
    return await this.page.isDisabled(selector);
  }

  async waitForTimeout(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds);
  }

  async reload(): Promise<void> {
    await this.page.reload();
  }

  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  async goForward(): Promise<void> {
    await this.page.goForward();
  }

  async close(): Promise<void> {
    await this.page.close();
  }
}