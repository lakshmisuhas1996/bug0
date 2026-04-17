/**
 * Configuration utilities
 */
export default class ConfigUtilities {
  /**
   * Get value from environment variable with fallback
   * @param {string} key
   * @param {string} defaultValue
   * @returns {string}
   */
  static getValueFromEnv(key, defaultValue) {
    return process.env[key] || defaultValue;
  }

  /**
   * Get base URL from environment
   * @returns {string}
   */
  static getBaseUrl() {
    return this.getValueFromEnv('BASE_URL', 'http://localhost:3000');
  }

  /**
   * Get browser type from environment
   * @returns {string}
   */
  static getBrowserType() {
    return this.getValueFromEnv('BROWSER', 'chromium');
  }

  /**
   * Check if headless mode
   * @returns {boolean}
   */
  static isHeadless() {
    return process.env.HEADLESS !== 'false';
  }

  /**
   * Get timeout value
   * @returns {number}
   */
  static getTimeout() {
    return parseInt(this.getValueFromEnv('TIMEOUT', '30000'), 10);
  }
}

