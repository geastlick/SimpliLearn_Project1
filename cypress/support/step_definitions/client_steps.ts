import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('User is on the Clients page', () => {
  cy.visit('http://localhost:4200');
  cy.get('a#clientLink').click();
});

When('User clicks on the New Client button', () => {
  cy.get('button#btnnewclient').click();
});

Then('User adds required data to the new client fields', () => {
  cy.get('form div > input#name').type("Jane Doe");
  cy.get('form div > input#email').type("JDoe@email.com");
  cy.get('form div > input#address').type("123 State St, Anytown, USA");
  cy.get('form div > input#phone').type("123-456-7890");
});

Then('User clicks on the new client Save button', () => {
  cy.get('button#btnClientSave').click();
});

Then('Entered Client should be visible in Clients list', () => {
  cy.get('table').find('tbody tr:last').find('td:first')
    .should("include.text", 'Jane Doe')
    .next().should("include.text", 'JDoe@email.com')
    .next().should("include.text", '123 State St, Anytown, USA')
    .next().should("include.text", '123-456-7890');
});
