import ProductListPage from "../../support/page_objects/productListPage";

describe('Search with the valid name with minor misspelling', () => {

    beforeEach(() => {
        cy.visit('https://zwinger.pm.epages.com');
        ProductListPage.acceptCookies()
    })

    const variationsMisspelling: string[][] = [
        ['relaese', 'release'],
        ['plnt', 'Plant'],
        ['sailling', 'Sailing'],
    ];

    variationsMisspelling.forEach(([searchString, productName]) => {
        it(`should display products matching ${productName} product name, regardless the misspelling`, () => {
            ProductListPage.searchViaButtonClick(searchString);
            ProductListPage.verifyProductListContainProduct(productName);
        })
    });

});