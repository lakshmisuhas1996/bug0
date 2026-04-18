# Bug0-playwright-webapp

Web automation framework using Playwright and Cucumber with JavaScript.

## Overview

This framework provides a structure for web automation testing using:
- **Playwright** - For browser automation
- **Cucumber** - For BDD-style test scenarios
- **JavaScript** - Programming language

## Project Structure

```
roxas-playwright-webapp/
├── features/              # Feature files (Gherkin scenarios)
│   └── example/          # Example feature files
├── selectors/            # YAML files containing selectors
├── src/
│   ├── steps/           # Step definitions (Given, When, Then)
│   └── support/
│       ├── actions/     # Action methods (commonActionsInterface.js)
│       ├── checks/      # Assertion methods (commonChecksInterface.js)
│       ├── utilities/   # Utility functions
│       └── world.js     # Custom Cucumber World
├── scripts/             # Pre/post test scripts
├── logs/               # Test logs, screenshots, videos
├── test-results/       # Test execution results
├── hooks.js           # Cucumber hooks
├── playwright.config.js # Playwright configuration
└── package.json       # Project dependencies
```

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Configuration

### Environment Variables

You can configure the framework using environment variables:

- `BASE_URL` - Base URL for the application (default: `http://localhost:3000`)
- `BROWSER` - Browser to use: `chromium`, `firefox`, or `webkit` (default: `chromium`)
- `HEADLESS` - Run in headless mode: `true` or `false` (default: `true`)
- `TIMEOUT` - Default timeout in milliseconds (default: `30000`)

### Selectors

Selectors are defined in YAML files under the `selectors/` directory. Each YAML file contains key-value pairs where:
- Key: Selector name (used in feature files)
- Value: CSS selector or other Playwright locator

Example (`selectors/common.yml`):
```yaml
searchIcon: '[data-testid="search-icon"]'
searchField: 'input[type="search"]'
loginButton: 'button[data-testid="login"]'
```

## Running Tests

### Run all tests
```bash
npm run e2e
```

### Run tests in specific browser
```bash
# Chrome
npm run cucumber:chrome

# Firefox
npm run cucumber:firefox

# Safari/WebKit
npm run cucumber:webkit
```

### Run with Playwright Test (without Cucumber)
```bash
npm test
```

### Run in headed mode
```bash
HEADLESS=false npm run e2e
```

### Run with debug
```bash
npm run test:debug
```

## Writing Tests

### Feature Files

Create feature files in the `features/` directory using Gherkin syntax:

```gherkin
@smoke @chrome
Feature: Search Functionality
  As a user
  I want to search for content
  So that I can find what I'm looking for

  Background:
    Given I navigate to "/"
    And I wait on element "searchIcon" to be displayed

  @search-001
  Scenario: Perform a search
    When I tap on the element "searchIcon"
    And I wait on element "searchField" for 10000ms to be displayed
    When I add "playwright" to the inputfield "searchField"
    And I press the "Enter" key
    Then I expect the URL to contain "search"
```

### Available Step Definitions

#### Given Steps
- `Given I login for "<userType>" with "<userId>"`
- `Given I navigate to "<url>"`
- `Given I wait on element "<selector>" to be displayed`
- `Given I wait on element "<selector>" for <timeout>ms to be displayed`
- `Given I am on the "<pageName>" page`

#### When Steps
- `When I tap on the element "<selector>"`
- `When I click on the element "<selector>"`
- `When I add "<text>" to the inputfield "<selector>"`
- `When I type "<text>" into "<selector>"`
- `When I clear the input field "<selector>"`
- `When I hover over "<selector>"`
- `When I select "<value>" from "<selector>"`
- `When I upload file "<filePath>" to "<selector>"`
- `When I press the "<key>" key`
- `When I scroll to element "<selector>"`
- `When I go back`
- `When I go forward`
- `When I reload the page`
- `When I navigate to "<url>"`
- `When I wait for <seconds> seconds`

#### Then Steps
- `Then I expect that element "<selector>" is displayed`
- `Then I expect that element "<selector>" is not displayed`
- `Then I expect that element "<selector>" becomes displayed`
- `Then I expect that element "<selector>" text equals "<expectedText>"`
- `Then I expect that element "<selector>" contains text "<expectedText>"`
- `Then I expect that element "<selector>" is enabled`
- `Then I expect that element "<selector>" is disabled`
- `Then I expect the URL to contain "<expectedUrl>"`
- `Then I expect the URL to be "<expectedUrl>"`
- `Then I expect that element "<selector>" exists`
- `Then I expect that element "<selector>" does not exist`
- `Then I expect the count of "<selector>" to be <count>`

## Extending the Framework

### Adding Custom Actions

Extend `commonActionsInterface.js` in `src/support/actions/`:

```javascript
async customAction(selector) {
  const page = await this.getPage();
  const elementSelector = this.getSelector(selector);
  // Your custom logic here
}
```

### Adding Custom Checks

Extend `commonChecksInterface.js` in `src/support/checks/`:

```javascript
async customCheck(selector) {
  const page = await this.getPage();
  const elementSelector = this.getSelector(selector);
  // Your custom assertion logic here
}
```

### Adding New Step Definitions

Add step definitions in `src/steps/`:

```javascript
import { When } from '@cucumber/cucumber';
import commonActionsInterface from '../support/actions/commonActionsInterface.js';

const Actions = new commonActionsInterface();

When(/^I perform custom action on "([^"]*)?"$/, async (selector) => {
  await Actions.customAction(selector);
});
```

## Test Results

- **Screenshots**: Saved to `logs/screenshots/` on test failure
- **Videos**: Saved to `logs/videos/` if `RECORD_VIDEO=true`
- **Cucumber Reports**: Generated in `test-results/`
- **Playwright Reports**: View with `npx playwright show-report`

## Code Quality

### Linting
```bash
npm run lint
npm run lint:fix
```

### Formatting
```bash
npm run prettier
npm run prettier:fix
```

## Troubleshooting

### Issues with Selectors

If selectors are not found, check:
1. Selector is defined in a YAML file under `selectors/`
2. YAML file is properly formatted
3. Selector name matches exactly (case-sensitive)

### Browser Launch Issues

If browsers fail to launch:
1. Run `npx playwright install` to ensure browsers are installed
2. Check system dependencies: `npx playwright install-deps`

### Timeout Issues

Increase timeout by:
1. Setting `TIMEOUT` environment variable
2. Using explicit wait steps in feature files
3. Modifying timeout in step definitions

## License

[Your License Here]

