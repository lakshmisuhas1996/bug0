@bug0 @chrome
Feature: Bug0 Website Verification
  As a user
  I want to verify the functionality of the Bug0 website
  So that I can ensure key pages and features are working correctly

  Background:
    Given I navigate to "https://bug0.com/"
    And I wait till the page is fully loaded   
    And I wait for 3 seconds

  @bug0-001
  Scenario: Verify Homepage URL and Logo
    Then I expect the URL to contain "bug0.com"
    And I expect that element "Bug0Logo" is displayed

  @bug0-002
  Scenario: Verify Voice AI Testing Link
    When I click on the element "VoiceAITestingMenu"
    And I wait for 3 seconds
    Then I expect the URL to contain "voice-ai-testing"
    And I expect that element "VoiceAITestingHeading" is displayed

  @bug0-003
  Scenario: Verify Chat AI Testing Link
    When I click on the element "ChatAITestingMenu"
    And I wait for 3 seconds
    Then I expect the URL to contain "chat-ai-testing"
    And I expect that element "ChatAITestingHeading" is displayed

  @bug0-004
  Scenario: Verify Managed QA Link
    When I click on the element "ManagedMenu"
    And I wait for 3 seconds
    Then I expect the URL to contain "managed-qa"
    And I expect that element "ManagedHeading" is displayed

  @bug0-005
  Scenario: Verify Studio Link
    When I click on the element "StudioMenu"
    And I wait for 3 seconds
    Then I expect the URL to contain "studio"
    And I expect that element "StudioHeading" is displayed
