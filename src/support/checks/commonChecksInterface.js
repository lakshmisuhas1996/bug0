const { expect: playwrightExpect } = require('@playwright/test');
const { expect } = require('chai');
const SelectorLoader = require('../utilities/selectorLoader');

class commonChecksInterface {
  constructor() {
    this.selectorLoader = new SelectorLoader();
  }

  /**
   * Get the current page from world context
   * @returns {Promise<Page>}
   */
  async getPage() {
    if (global.page) {
      return global.page;
    }
    if (this.page) {
      return this.page;
    }
    throw new Error('Page is not initialized. Make sure hooks are properly set up.');
  }

  /**
   * Wait for element to be displayed
   * @param {string} selector
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForDisplayed(selector, timeout = 30000) {
    const page = await this.getPage();
    const elementSelector = this.getSelector(selector);
    // Handle XPath selectors
    const waitSelector = elementSelector.startsWith('//') || elementSelector.startsWith('xpath=')
      ? (elementSelector.startsWith('xpath=') ? elementSelector : `xpath=${elementSelector}`)
      : elementSelector;
    await page.waitForSelector(waitSelector, { state: 'visible', timeout });
  }

  /**
   * Check if element is displayed
   * @param {string} selector
   * @returns {Promise<boolean>}
   */
  async isDisplayed(selector) {
    const page = await this.getPage();
    const elementSelector = this.getSelector(selector);
    try {
      // Handle XPath selectors
      const waitSelector = elementSelector.startsWith('//') || elementSelector.startsWith('xpath=')
        ? (elementSelector.startsWith('xpath=') ? elementSelector : `xpath=${elementSelector}`)
        : elementSelector;
      await page.waitForSelector(waitSelector, { state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Expect element to be displayed
   * @param {string} selector
   */
  async expectDisplayed(selector) {
    const page = await this.getPage();
    const elementSelector = this.getSelector(selector);
    
    // Debug logging (can be removed later)
    if (elementSelector === selector) {
      console.warn(`Selector "${selector}" not found in YAML files, using as-is`);
    }
    
    // Check if it's an XPath selector (starts with // or contains xpath=)
    let element;
    if (elementSelector.startsWith('//') || elementSelector.startsWith('xpath=')) {
      // For XPath selectors, use the xpath= prefix
      const xpath = elementSelector.startsWith('xpath=') 
        ? elementSelector.substring(6) 
        : elementSelector;
      element = page.locator(`xpath=${xpath}`);
    } else {
      element = page.locator(elementSelector);
    }
    await playwrightExpect(element).toBeVisible({ timeout: 30000 });
  }

  /**
   * Expect element not to be displayed
   * @param {string} selector
   */
  async expectNotDisplayed(selector) {
    const page = await this.getPage();
    const elementSelector = this.getSelector(selector);
    const element = page.locator(elementSelector);
    await playwrightExpect(element).not.toBeVisible();
  }

  /**
   * Expect element text to equal
   * @param {string} selector
   * @param {string} expectedText
   */
  async expectTextEquals(selector, expectedText) {
    const page = await this.getPage();
    const elementSelector = this.getSelector(selector);
    const element = page.locator(elementSelector);
    await playwrightExpect(element).toHaveText(expectedText);
  }

  /**
   * Expect element text to contain
   * @param {string} selector
   * @param {string} expectedText
   */
  async expectTextContains(selector, expectedText) {
    const page = await this.getPage();
    const elementSelector = this.getSelector(selector);
    const element = page.locator(elementSelector);
    await playwrightExpect(element).toContainText(expectedText);
  }

  /**
   * Get text from element
   * @param {string} selector
   * @returns {Promise<string>}
   */
  async getText(selector) {
    const page = await this.getPage();
    const elementSelector = this.getSelector(selector);
    const element = page.locator(elementSelector);
    return await element.textContent();
  }

  /**
   * Expect element to be enabled
   * @param {string} selector
   */
  async expectEnabled(selector) {
    const page = await this.getPage();
    const elementSelector = this.getSelector(selector);
    const element = page.locator(elementSelector);
    await playwrightExpect(element).toBeEnabled();
  }

  /**
   * Expect element to be disabled
   * @param {string} selector
   */
  async expectDisabled(selector) {
    const page = await this.getPage();
    const elementSelector = this.getSelector(selector);
    const element = page.locator(elementSelector);
    await playwrightExpect(element).toBeDisabled();
  }

  /**
   * Expect URL to contain
   * @param {string} expectedUrl
   */
  async expectUrlContains(expectedUrl) {
    const page = await this.getPage();
    const url = page.url();
    expect(url).to.include(expectedUrl);
  }

  /**
   * Expect URL to equal
   * @param {string} expectedUrl
   */
  async expectUrlEquals(expectedUrl) {
    const page = await this.getPage();
    const url = page.url();
    expect(url).to.equal(expectedUrl);
  }

  /**
   * Get selector from YAML files
   * @param {string} selectorName
   * @returns {string}
   */
  getSelector(selectorName) {
    return this.selectorLoader.getSelector(selectorName);
  }

  /**
   * Check if element exists
   * @param {string} selector
   * @returns {Promise<boolean>}
   */
  async elementExists(selector) {
    const page = await this.getPage();
    const elementSelector = this.getSelector(selector);
    const count = await page.locator(elementSelector).count();
    return count > 0;
  }

  /**
   * Get count of elements
   * @param {string} selector
   * @returns {Promise<number>}
   */
  async getElementCount(selector) {
    const page = await this.getPage();
    const elementSelector = this.getSelector(selector);
    return await page.locator(elementSelector).count();
  }
}

module.exports = commonChecksInterface;
