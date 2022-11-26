Feature: Add new client meeting

  Scenario: Create new Client Meeting
    Given User is on the Client Meetings page
    When User clicks on the New Client Meeting button
    Then User adds required data to the new client meeting fields
    Then User clicks on the client meeting Save button
    Then Entered Client Meeting should be visible in the client meeting list
