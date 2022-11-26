import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('User is on the Client Meetings page', () => {
  cy.visit('http://localhost:4200');
  cy.get('a#clientMeetingLink').click();
});

When('User clicks on the New Client Meeting button', () => {
  cy.get('button#btnnewmeeting').click();
});

Then('User adds required data to the new client meeting fields', () => {
  cy.get('form div > select#client').select("James Denver");
  cy.get('form div > input#topic').type("Intro");
  cy.get('form div > input#attendees').type("John, Jane");
  //cy.get('form div > ngb-datepicker#meetingDate').type();
  //cy.get('form div > ngb-timepicker#meetingTime').type()
});

Then('User clicks on the client meeting Save button', () => {
  cy.get('button#btnClientMeetingSave').click();
});

Then('Entered Client Meeting should be visible in the client meeting list', () => {
  cy.get('table').find('tbody tr:last').find('td:first')
    .should("include.text", 'James Denver')
    .next().should("include.text", 'Intro')
    .next().should("include.text", 'John, Jane');
    //.next().should("include.text", '')
    //.next().should("include.text", '');
});
