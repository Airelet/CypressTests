import ProductListPage from "../../support/page_objects/productListPage";

describe('Search with the invalid product name', () => {
    const testCases: string[] = [
        'puppy',
        'cherryjam',
        '\' OR \'1\'=\'1'
    ];

    beforeEach(() => {
        cy.visit('https://zwinger.pm.epages.com');
        ProductListPage.acceptCookies()
    })

    testCases.forEach((searchString) => {
        it(`should indicate no products found matching ${searchString}`, () => {
            ProductListPage.searchViaButtonClick(searchString)
            cy.get('.product-list').should('not.exist');
            cy.get('.search-no-result-form-headline').should('be.visible')
        })
    });
});