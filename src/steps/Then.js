const { expect } = require('chai');
const { Then } = require('@cucumber/cucumber');
const commonChecksInterface = require('../support/checks/commonChecksInterface');
const commonActionsInterface = require('../support/actions/commonActionsInterface');



const Checks = new commonChecksInterface();
const Actions = new commonActionsInterface();

Then(/^I expect that element "([^"]*)?" is displayed$/, async (selector) => {
  await Checks.expectDisplayed(selector);
}); 

Then(/^I expect that element "([^"]*)?" is not displayed$/, async (selector) => {  
  await Checks.expectNotDisplayed(selector);
});

Then(/^I expect that element "([^"]*)?" becomes displayed$/, async (selector) => {
  await Checks.waitForDisplayed(selector);
  await Checks.expectDisplayed(selector);
});

Then(/^I expect that element "([^"]*)?" text equals "([^"]*)?"$/, async (selector, expectedText) => {
  await Checks.expectTextEquals(selector, expectedText);
});

Then(/^I expect that element "([^"]*)?" contains text "([^"]*)?"$/, async (selector, expectedText) => {
  await Checks.expectTextContains(selector, expectedText);
});

Then(/^I expect that element "([^"]*)?" is enabled$/, async (selector) => {
  await Checks.expectEnabled(selector);
});

Then(/^I expect that element "([^"]*)?" is disabled$/, async (selector) => {
  await Checks.expectDisabled(selector);
});

Then(/^I expect the URL to contain "([^"]*)?"$/, async (expectedUrl) => {
  await Checks.expectUrlContains(expectedUrl);
});

Then(/^I expect the URL to be "([^"]*)?"$/, async (expectedUrl) => {
  await Checks.expectUrlEquals(expectedUrl);
});

Then(/^I expect that element "([^"]*)?" exists$/, async (selector) => {
  const exists = await Checks.elementExists(selector);
  expect(exists).to.be.true;
});

Then(/^I expect that element "([^"]*)?" does not exist$/, async (selector) => {
  const exists = await Checks.elementExists(selector);
  expect(exists).to.be.false;
});

Then(/^I expect the count of "([^"]*)?" to be (\d+)$/, async (selector, expectedCount) => {
  const count = await Checks.getElementCount(selector);
  expect(count).to.equal(parseInt(expectedCount, 10));
});

Then(/^I get text from element "([^"]*)?" and it should contain "([^"]*)?"$/, async (selector, expectedText) => {
  const text = await Checks.getText(selector);
  expect(text).to.include(expectedText);
});

Then(/^I get text from element "([^"]*)?" and it should contain "([^"]*)?"$/, async (selector, expectedText) => {
  const text = await Checks.getText(selector);
  expect(text).to.include(expectedText);
});

