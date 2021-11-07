describe('GIVEN navigating to the launch card', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get(':nth-child(2) > aside > h3 > a').click();
    });
    context('WHEN add one item to favorites', () => {
        beforeEach(() => {
            cy.get('[data-testid=favorites]').click();
        });
        it('THEN stay in url /favorites', () => {
            cy.url().should('include', '/favorites');
        });
        it('THEN contain remove from favorites button', () => {
            cy.contains(' Remove from favorites 💔');
        });
        it('THEN found 1 launches', function () {
            cy.contains('Found 1 launches');
        });
    });
});

