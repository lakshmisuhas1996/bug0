/**
 * Helper utility for handling different selector types
 */
export default class SelectorHelper {
  /**
   * Get Playwright locator based on selector type
   * @param {Page} page - Playwright page object
   * @param {string} selector - Selector string (CSS, XPath, etc.)
   * @returns {Locator} Playwright locator
   */
  static getLocator(page, selector) {
    // Handle XPath selectors (starts with // or xpath=)
    if (selector.startsWith('//') || selector.startsWith('xpath=')) {
      const xpath = selector.startsWith('xpath=') 
        ? selector.substring(6) 
        : selector;
      return page.locator(`xpath=${xpath}`);
    }
    // Handle CSS selectors or other selectors
    return page.locator(selector);
  }

  /**
   * Get selector string for waitForSelector
   * @param {string} selector - Selector string
   * @returns {string} Formatted selector for waitForSelector
   */
  static getWaitSelector(selector) {
    // Handle XPath selectors
    if (selector.startsWith('//') || selector.startsWith('xpath=')) {
      const xpath = selector.startsWith('xpath=') 
        ? selector.substring(6) 
        : selector;
      return `xpath=${xpath}`;
    }
    return selector;
  }
}

