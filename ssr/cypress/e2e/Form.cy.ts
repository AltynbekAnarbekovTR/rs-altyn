describe('Test Main Page', () => {
  it('Check that add book is showing errors on invalid submit', () => {
    cy.visit('/add-book');
    cy.get('form').should('exist');
    cy.get('button[type="submit"]').click();
    cy.contains('Title is required');
    cy.contains('Author is required');
    cy.contains('Book type is required');
    cy.contains('At least one genre must be selected');
    cy.contains('Stock status is required');
    cy.contains('Publication date is required');
    cy.contains('Page count is required');
    cy.contains('Image is required');
  });
  it('Check that card is created on submit with valid inputs', () => {
    cy.visit('/add-book');
    cy.get('input[data-testid="titleInput"]').type('War and Peace');
    cy.get('input[data-testid="authorInput"]').type('Tolstoy');
    cy.get('select').select('Hardcover');
    cy.get('input[type="checkbox"]').first().click();
    cy.contains('In Stock').click();
    // cy.get('[type="radio"]').first().check();
    // cy.get('input[data-testid="inStock"]').click();
    cy.get('input[data-testid="published"]').type('2020-05-12');

    // cy.get('input[data-testid="pagesInput""]').type('1200');
    cy.get('input[data-testid="pagesInput"]').type('1200');

    cy.get('input[type=file]').selectFile('cypress/fixtures/testImage.png');
    // cy.get('input[type="file"]').attachFile('../../src/assets/logo-min.png');

    cy.get('button[type="submit"]').click();
  });
});
