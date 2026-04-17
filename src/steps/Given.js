const { Given } = require('@cucumber/cucumber');
const commonActionsInterface = require('../support/actions/commonActionsInterface');
const commonChecksInterface = require('../support/checks/commonChecksInterface');


const Actions = new commonActionsInterface();
const Checks = new commonChecksInterface();

Given(/^I login for "([^"]*)?" with "([^"]*)?"$/, async (userType, userId) => {
  await Actions.login(userType, userId);
});

Given(/^I navigate to "([^"]*)?"$/, async (url) => {  
  await Actions.navigateTo(url);
}); 

Given(/^I wait on element "([^"]*)?" to be displayed$/, async (selector) => {
  await Checks.waitForDisplayed(selector);
});

Given(/^I wait on element "([^"]*)?" for (\d+)ms to be displayed$/, async (selector, timeout) => {
  await Checks.waitForDisplayed(selector, parseInt(timeout, 10));
});

Given(/^I am on the "([^"]*)?" page$/, async (pageName) => {
  // Navigate to a specific page based on page name
  // This can be extended based on your application's routing
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const url = `${baseUrl}/${pageName.toLowerCase().replace(/\s+/g, '-')}`;
  await Actions.navigateTo(url);
});

Given('I wait till the page is fully loaded', async function () {
  await this.page.waitForLoadState('load');
});

