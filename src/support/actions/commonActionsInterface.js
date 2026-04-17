const SelectorLoader = require('../utilities/selectorLoader');

/**
 * Common Actions Interface
 * Provides common action methods for web automation
 */
class commonActionsInterface {
  constructor() {
    this.selectorLoader = new SelectorLoader();
  }

  /**
   * Get the current page from world context
   * @returns {Promise<Page>}
   */
  async getPage() {
    // This will be set in hooks
    if (global.page) {
      return global.page;
    }
    if (this.page) {
      return this.page;
    }
    throw new Error('Page is not initialized. Make sure hooks are properly set up.');
  }

  /**
   * Navigate to a URL
   * @param {string} url
   */
  async navigateTo(url) {
    const page = await this.getPage();
    await page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
  }

  /**
   * Clear all cookies and localStorage for the current page
   */
  async clearStorage() {
    const page = await this.getPage();
    const context = page.context();
    
    // Clear cookies
    await context.clearCookies();
    
    // Clear localStorage
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  }

  /**
   * Click on an element
   * @param {string} selector - Selector name from selectors YAML
   */
  async clickElement(selector) {
    const page = await this.getPage();
    const elementSelector = this.getSelector(selector);
    await page.click(elementSelector);
  }

  /**
   * Click on an element if it exists (conditional click)
   * @param {string} selector - Selector name from selectors YAML
   * @param {number} timeout - Timeout in milliseconds (default: 5000)
   */
  async clickElementIfExists(selector, timeout = 5000) {
    const page = await this.getPage();
    const elementSelector = this.getSelector(selector);
    try {
      let waitSelector;
      // Handle XPath selectors
      if (elementSelector.startsWith('//') || elementSelector.startsWith('xpath=')) {
        const xpath = elementSelector.startsWith('xpath=') 
          ? elementSelector.substring(6) 
          : elementSelector;
        waitSelector = `xpath=${xpath}`;
      } else {
        waitSelector = elementSelector;
      }
      
      // Wait for element to be visible, then click
      await page.waitForSelector(waitSelector, { state: 'visible', timeout });
      await page.click(waitSelector);
      return true;
    } catch (error) {
      // Element doesn't exist or is not visible within timeout
      return false;
    }
  }

  /**
   * Type text into an input field
   * @param {string} selector - Selector name
   * @param {string} text - Text to type
   */
  async typeText(selector, text) {
    const page = await this.getPage();
    const elementSelector = this.getSelector(selector);
    await page.fill(elementSelector, text);
  }

  /**
   * Clear input field
   * @param {string} selector - Selector name
   */
  async clearText(selector) {
    const page = await this.getPage();
    const elementSelector = this.getSelector(selector);
    await page.fill(elementSelector, '');
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
   * Login functionality
   * @param {string} userType
   * @param {string} userId
   */
  async login(userType, userId) {
    // Implementation for login
    console.log(`Logging in as ${userType} with ${userId}`);
  }

  /**
   * Hover over an element
   * @param {string} selector
   */
  async hoverElement(selector) {
    const page = await this.getPage();
    const elementSelector = this.getSelector(selector);
    await page.hover(elementSelector);
  }

  /**
   * Select option from dropdown
   * @param {string} selector
   * @param {string} value
   */
  async selectOption(selector, value) {
    const page = await this.getPage();
    const elementSelector = this.getSelector(selector);
    await page.selectOption(elementSelector, value);
  }

  /**
   * Upload file
   * @param {string} selector
   * @param {string} filePath
   */
  async uploadFile(selector, filePath) {
    const page = await this.getPage();
    const elementSelector = this.getSelector(selector);
    await page.setInputFiles(elementSelector, filePath);
  }

  /**
   * Press key
   * @param {string} key
   */
  async pressKey(key) {
    const page = await this.getPage();
    await page.keyboard.press(key);
  }

  /**
   * Scroll to element
   * @param {string} selector
   */
  async scrollToElement(selector) {
    const page = await this.getPage();
    const elementSelector = this.getSelector(selector);
    await page.locator(elementSelector).scrollIntoViewIfNeeded();
  }

  /**
   * Go back in browser
   */
  async goBack() {
    const page = await this.getPage();
    await page.goBack();
  }

  /**
   * Go forward in browser
   */
  async goForward() {
    const page = await this.getPage();
    await page.goForward();
  }

  /**
   * Reload page
   */
  async reload() {
    const page = await this.getPage();
    await page.reload();
  }

  async switchToContactFormIframe() {
    this.contactFormFrame = page.frameLocator('iframe.hs-form-iframe');

    // optional safety check
    await this.contactFormFrame.locator('input[name="firstname"]').waitFor();
  }

  async getContactFormFrame() {
    if (!this.contactFormFrame) {
      throw new Error('Contact form iframe not initialized');
    }
    return this.contactFormFrame;
  }
}

module.exports = commonActionsInterface;
