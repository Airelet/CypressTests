import ProductListPage from "../../support/page_objects/productListPage";

describe('Search case sensitivity with the valid name', () => {

    beforeEach(() => {
        cy.visit('https://zwinger.pm.epages.com');
        ProductListPage.acceptCookies()
    })

    const variationsMisspelling: string[][] = [
        ['aRMCHAIR', 'Armchair'],
        ['ho', 'ho'],
    ];

    variationsMisspelling.forEach(([searchString, productName]) => {
        it(`should display products matching ${productName} product name, regardless the case`, () => {
            ProductListPage.searchViaButtonClick(searchString);
            ProductListPage.verifyProductListContainProduct(productName);
        })
    });
});