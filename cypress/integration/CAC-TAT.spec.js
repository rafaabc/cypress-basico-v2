/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('../../src/index.html');
    })
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Gostaria de revisar os conceitos básicos de Cypress!';
        cy.get('#firstName').type('Rafael');
        cy.get('#lastName').type('Costa');
        cy.get('#email').type('rafael@teste.com');
        cy.get('#open-text-area').type(longText, {delay: 0});
        cy.contains('button','Enviar').click();
        cy.get('.success > strong').should('be.visible');
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Rafael');
        cy.get('#lastName').type('Costa');
        cy.get('#email').type('rafael.teste.com');
        cy.get('#open-text-area').type('Teste');
        cy.contains('button','Enviar').click();
        cy.get('.error').should('be.visible');
    });

    it('exibe campo vazio ao tentar preencher um telefone com formatação inválida', () => {
        cy.get('#phone').type('abc');
        cy.get('#phone').should('have.value', '');
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Rafael');
        cy.get('#lastName').type('Costa');
        cy.get('#email').type('rafael@teste.com');
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').type('Teste');
        cy.contains('button','Enviar').click();
        cy.get('.error').should('be.visible');
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Rafael').should('have.value', 'Rafael').clear().should('have.value', '');
        cy.get('#lastName').type('Costa').should('have.value', 'Costa').clear().should('have.value', '');;
        cy.get('#email').type('rafael@teste.com').should('have.value', 'rafael@teste.com').clear().should('have.value', '');;    
        cy.get('#phone').type('01234567').should('have.value', '01234567').clear().should('have.value', '');;
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button','Enviar').click();
        cy.get('.error').should('be.visible');
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('.success > strong').should('be.visible');
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube');
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria');
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1).should('have.value', 'blog');
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[value="feedback"]').check().should('have.value', 'feedback');
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type=radio]').should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check();
            cy.wrap($radio).should('be.checked');
        });
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]').check().should('be.checked');
        cy.get('input[type="checkbox"]').last().uncheck().should('not.be.checked');
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json');
        })
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json');
            });
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json', {encoding: null}).as('exampleFile')
        cy.get('#file-upload')
        .selectFile('@exampleFile')
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.json');
    });
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('Política de Privacidade').should('have.attr', 'target', '_blank');
  });

  it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
    cy.contains('Política de Privacidade').invoke('removeAttr', 'target').click();
    cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade');
  });
});