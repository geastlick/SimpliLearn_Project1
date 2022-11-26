Feature: Add new client

  Scenario: Create new Client
    Given User is on the Clients page
    When User clicks on the New Client button
    Then User adds required data to the new client fields
    Then User clicks on the new client Save button
    Then Entered Client should be visible in Clients list
