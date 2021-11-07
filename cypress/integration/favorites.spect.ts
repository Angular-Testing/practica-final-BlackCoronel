describe('GIVEN navigating to the launch card', () => {
    beforeEach(() => {
        // Arrange
        cy.visit('/');
        cy.get(':nth-child(2) > aside > h3 > a').click();
    });
    context('WHEN add one item to favorites', () => {
        beforeEach(() => {
            // Act
            cy.get('[data-testid=addToFavorites-button]').click();
        });
        it('THEN stay in url /favorites', () => {
            // Assert
            cy.url().should('include', '/favorites');
        });
        it('THEN contain remove from favorites button', () => {
            // Assert
            cy.contains('Remove from favorites');
        });
    });

    context('WHEN remove one item from favourites', () => {
        beforeEach(() => {
            // Act
            cy.get(':nth-child(2) > aside > [data-testid=removeFromFavorites-button]').click();
        });
        it('THEN stay in url /favorites', () => {
            // Assert
            cy.url().should('include', '/favorites');
        });
        it('THEN found one launches', () => {
            // Assert
            cy.contains('Found 1 launches');
        });
    });
});

