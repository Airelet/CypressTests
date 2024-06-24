import ProductListPage from "../../support/page_objects/productListPage";
import NoSearchResultPage from "../../support/page_objects/noSearchResultPage";

describe('Search on “no results found” page', () => {

    beforeEach(() => {
        cy.visit('https://zwinger.pm.epages.com');
        ProductListPage.acceptCookies()
        ProductListPage.searchViaButtonClick('cool')
    });

    it(`should display products matching Cherry Jam product name`, () => {
        NoSearchResultPage.searchViaButtonClick('Cherry Jam');
        ProductListPage.verifyProductListContainProduct('Cherry Jam');
    });

    it(`should indicate no products found matching cherryjam`, () => {
        NoSearchResultPage.searchViaButtonClick('cherryjam')
        cy.get('.product-list').should('not.exist');
        cy.get('.search-no-result-form-headline').should('be.visible')
    });

    it(`shouldn't execute the search with an empty string`, () => {
        cy.url().then(url => {
            NoSearchResultPage.clickSearchButton()
            cy.url().should('deep.equal', url);
        });
    });

    it(`shouldn't execute the search with spaces as a string`, () => {
        cy.url().then(url => {
            NoSearchResultPage.enterSearch('                    ')
            NoSearchResultPage.clickSearchButton()
            cy.url().should('deep.equal', url);
        });
    });
});