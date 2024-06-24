import ProductListPage from "../../support/page_objects/productListPage";

describe('Search suggestion dropdown with the valid product name', () => {

    beforeEach(() => {
        cy.visit('https://zwinger.pm.epages.com');
        ProductListPage.acceptCookies()
    })

    const variationsAutocomplete: string[][] = [
        ['dress', 'Dress'],
        ['Boat Decor 3', 'Boat Decor 3'],
        ['[example]', '[Example]'],
        ['fly', 'fly'],
    ];

    it(`should display search suggestion dropdown with a valid product name returns relevant results.`, () => {
        ProductListPage.enterSearch('dress');
        ProductListPage.waitSuggestedSearch();
        cy.get('.search-form-suggestions')
            .should('exist')

        cy.get('.search-form-results-item-name')
            .each(($el) => {
                cy.wrap($el)
                    .invoke('text')
                    .should('contain', 'Dress')
            })
    })
});