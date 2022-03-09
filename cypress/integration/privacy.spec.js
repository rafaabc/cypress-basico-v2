/// <reference types="Cypress" />

it('testa a página da política de privavidade de forma independente', () => {
    cy.visit('/src/privacy.html');
    cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade');
});