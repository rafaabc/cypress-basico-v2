Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Rafael');
    cy.get('#lastName').type('Costa');
    cy.get('#email').type('rafael@teste.com');
    cy.get('#open-text-area').type('Gostaria de revisar os conceitos básicos de Cypress!', {delay: 0});
    cy.contains('button','Enviar').click();
})