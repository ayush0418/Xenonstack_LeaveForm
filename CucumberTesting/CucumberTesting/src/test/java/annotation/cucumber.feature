Feature: Open Google homepage
Scenario: Open Google homepage and verify title

  Given I open the Chrome browser
  When I navigate to the localhost
  Then I verify the title is "MyApp"
  Then I Enter the details