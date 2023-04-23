describe('Test App', () => {
  it('Check that search bar is present on main page', () => {
    cy.visit('/');
    cy.get('input').should('have.value', '');
  });
});
