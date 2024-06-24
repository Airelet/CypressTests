import ProductListPage from "../../support/page_objects/productListPage";

describe('Search tag displays search query', () => {

    beforeEach(() => {
        cy.visit('https://zwinger.pm.epages.com');
        ProductListPage.acceptCookies()
    })

    const testCases: string[] = [
        'aRMCHAIR',
        'plnt',
        'plan      t',
        'plant plant plant plant plant plant plant plant plant plant plant plant plant plant plant plant plant plant ' +
        'plant plant plant plant plant plant plant plant plant plant plant plant plant plant plant pl',
    ];

    testCases.forEach((searchString) => {
        it(`should match the ${searchString}`, () => {
            ProductListPage.searchViaButtonClick(searchString);
            ProductListPage.verifySearchTag(searchString);
        })
    });

    it(`should be not longer than 200 characters`, () => {
        const queryWithTooManyCharacters = 'plant plant plant plant plant plant plant plant plant plant ' +
            'plant plant plant plant plant plant plant plant plant plant plant plant plant plant plant plant plant ' +
            'plant plant plant plant plant plant pl'
        ProductListPage.searchViaButtonClick(queryWithTooManyCharacters);
        cy.get('.search-filter-tag')
            .invoke('text')
            .should('have.length.of.at.most', 200)
    })
});