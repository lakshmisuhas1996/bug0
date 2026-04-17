const { When } = require('@cucumber/cucumber');
const commonActionsInterface = require('../support/actions/commonActionsInterface');
const commonChecksInterface = require('../support/checks/commonChecksInterface');

const Actions = new commonActionsInterface();
const Checks = new commonChecksInterface();


When(/^I click on the element "([^"]*)?"$/, async (selector) => {
  await Actions.clickElement(selector);
});

When(/^I add "([^"]*)?" to the inputfield "([^"]*)?"$/, async (text, selector) => {
  await Actions.typeText(selector, text);
});
 
When(/^I type "([^"]*)?" into "([^"]*)?"$/, async (text, selector) => { 
  await Actions.typeText(selector, text); 
});

When(/^I clear the input field "([^"]*)?"$/, async (selector) => {
  await Actions.clearText(selector);
});

When(/^I hover over "([^"]*)?"$/, async (selector) => {
  await Actions.hoverElement(selector);
});

When(/^I select "([^"]*)?" from "([^"]*)?"$/, async (value, selector) => {
  await Actions.selectOption(selector, value);
});


When(/^I click on "([^"]*)?" if it is displayed$/, async (selector) => {
  const clicked = await Actions.clickElementIfExists(selector);
  if (clicked) {
    console.log(`Clicked on element: ${selector}`);
  } else {
    console.log(`Element "${selector}" not found or not visible, skipping click`);
  }
});

When(/^I scroll to element "([^"]*)?"$/, async (selector) => {
  await Actions.scrollToElement(selector);
});

When(/^I go back$/, async () => {
  await Actions.goBack();
});

When(/^I go forward$/, async () => {
  await Actions.goForward();
});

When(/^I reload the page$/, async () => {
  await Actions.reload();
});

When(/^I wait for (\d+) seconds$/, async (seconds) => {
  const page = await Actions.getPage();
  await page.waitForTimeout(parseInt(seconds, 10) * 1000);
});

When(/^I switch to iFrame "([^"]*)"$/, async function (iframeXpath) {
  // Convert XPath to locator
  const iframeLocator = page.locator(`xpath=${iframeXpath}`);

  // Wait for iframe to be visible
  await iframeLocator.waitFor({ state: 'visible' });

  // Store frameLocator in World (NOT global)
  this.currentFrame = page.frameLocator(`xpath=${iframeXpath}`);
});

When('I accept the cookies', async function () {
  await this.page.locator("//button[contains(translate(normalize-space(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'accept')]").click();
});


