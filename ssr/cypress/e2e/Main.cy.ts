// // describe('template spec', () => {
// //   it('passes', () => {
// //     cy.visit('https://example.cypress.io')
// //   })
// // })

// // describe('My First Test', () => {
// //   it('Does not do much!', () => {
// //     expect(true).to.equal(true);
// //   });
// // });

// // describe('My First Test', () => {
// //   it('Does not do much!', () => {
// //     expect(true).to.equal(false);
// //   });
// // });

// // describe('My First Test', () => {
// //   it('Visits the Kitchen Sink', () => {
// //     cy.visit('https://example.cypress.io');
// //     cy.contains('type').click();
// //     cy.url().should('include', '/commands/actions');
// //   });
// // });

/// <reference types="cypress" />

describe('Test Main Page', () => {
  it('simulates a server error', () => {
    // const errorMsg = 'Failed to fetch books';

    // cy.intercept('GET', '**/search?query=cypress', { statusCode: 500 }).as('getServerFailure');

    // cy.visit('/');

    // cy.get('input').type('a');
    // // cy.get('[data-cy="search-field"]').should('be.visible').type('cypress{enter}');
    // cy.wait('@getServerFailure');

    // cy.contains(errorMsg).should('be.visible');

    const searchValue = 'discworld';

    // intercept the API request and respond with an error
    cy.intercept(
      `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&projection=lite&fields=items(id,volumeInfo(title,authors,categories,imageLinks/thumbnail,publishedDate,pageCount))`,
      {
        statusCode: 500,
        body: 'Internal Server Error',
        headers: {
          'access-control-allow-origin': '*',
        },
        delayMs: 2000, // delay the response to simulate slow network
      }
    ).as('apiRequest');

    // visit the page with the search value
    cy.visit(`/`);

    // wait for the API request to complete and the error message to be displayed
    cy.wait('@apiRequest');
    cy.contains('Failed to fetch books');
  });

  it('Check that search bar is working correctly', () => {
    cy.visit('/');
    cy.get('li[data-testid="homeCard"]').should('not.exist');
    cy.get('input').should('have.value', '').type('a').should('have.value', 'a');
    cy.get('button[type="submit"]').click();
    cy.get('li[data-testid="homeCard"]').should('exist');
  });
  it('Check that card modal is shown on card click and closing on close button click', () => {
    cy.visit('/');
    cy.get('[data-testid="modal"]').should('not.exist');
    cy.get('input').type('a');
    cy.get('button[type="submit"]').click();
    cy.get('li[data-testid="homeCard"]').first().click();
    cy.get('[data-testid="modal"]').should('exist');
    cy.get('[data-testid="modalClose"]').click();
  });
  it('Check that About Us navlink work correctly', () => {
    cy.visit('/');
    cy.get('li').contains('About Us').click();
  });
  it('Check that Error Page is displayed on invalid url', () => {
    cy.visit('/unknown');
    cy.get('[data-testid="not-found"]').should('exist');
  });
});
