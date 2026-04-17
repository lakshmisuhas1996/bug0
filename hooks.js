const { Before, After, BeforeAll, AfterAll, setDefaultTimeout, AfterStep } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('@playwright/test');
require('dotenv').config();

// Import World to ensure it's set up (includes RPWorld if Report Portal is configured)
require('./src/support/world');

// Set default timeout for all steps to 60 seconds
setDefaultTimeout(60 * 1000);

/**
 * BeforeAll Hook
 * Runs once before all scenarios
 */
BeforeAll(async function () {
  console.log('Starting test execution...');
});

/**
 * Before Hook
 * Runs before each scenario
 */
Before(async function (scenario) {
  const browserType = process.env.BROWSER || 'chromium';
  const baseURL = process.env.BASE_URL || 'http://localhost:3000';
  const headless = process.env.HEADLESS === 'true';

  let browser;
  // Browser launch options - maximize window when not headless
  const launchOptions = {
    headless,
  };

  // Add maximize argument for visible browsers
  if (!headless) {
    if (browserType === 'chromium') {
      // launchOptions.args = ['--start-maximized'];
      launchOptions.args = ['--window-size=1470,956'];
    } else if (browserType === 'firefox') {
      // Firefox uses different approach
      launchOptions.args = [];
    } else if (browserType === 'webkit') {
      // WebKit doesn't support maximize args
      launchOptions.args = [];
    }
  }

  

  // Create browser instance based on environment
  if (browserType === 'firefox') {
    browser = await firefox.launch(launchOptions);
  } else if (browserType === 'webkit') {
    browser = await webkit.launch(launchOptions);
  } else {
    browser = await chromium.launch(launchOptions);
  }

  // Create context with viewport settings
  // Setting viewport to null allows the browser to use the actual window size (maximized)
  const context = await browser.newContext({
    viewport: {width: 1470, height: 956 },
    baseURL: baseURL,
    recordVideo: process.env.RECORD_VIDEO === 'true' ? { dir: 'logs/videos/' } : undefined,
    // Ignore HTTPS errors if needed
    ignoreHTTPSErrors: false,
  });

  // Set default timeout for context
  context.setDefaultTimeout(60000);
  context.setDefaultNavigationTimeout(60000);

  // Create page
  const page = await context.newPage();
  
  // Set default timeout for page
  page.setDefaultTimeout(60000);
  page.setDefaultNavigationTimeout(60000);
  // await page.keyboard.press('Control+Meta+f');


  // Store page, context, and browser in world
  this.page = page;
  this.context = context;
  this.browser = browser;

  // Store in global for easy access
  global.page = page;
  global.context = context;
  global.browser = browser;

  // console.log(`Starting scenario: ${scenario.pickle.name}`);
});

/**
 * After Hook
 * Runs after each scenario
 */
After(async function (scenario) {
  // Take screenshot on failure
  if (scenario.result.status === 'FAILED') {
    const screenshotPath = `logs/screenshots/${scenario.pickle.name.replace(/\s+/g, '_')}_${Date.now()}.png`;
    if (this.page) {
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Screenshot saved: ${screenshotPath}`);
    }
  }

  // Close page and context
  try {
    if (this.page) {
      await this.page.close();
    }
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  } catch (error) {
    console.error(`Error closing browser resources: ${error.message}`);
  }

  // Clear global references
  global.page = null;
  global.context = null;
  global.browser = null;

  console.log(`\nScenario Result: ${scenario.result.status}\n`);

});

AfterStep(function ({ pickleStep, result }) {
  const status = result.status === 'PASSED' ? '✓ PASSED' : `✗ ${result.status}`;
  console.log(`    ${pickleStep.text} - ${status}`);
});


/**
 * AfterAll Hook
 * Runs once after all scenarios
 */
AfterAll(async function () {
  console.log('Test execution completed.');
});

