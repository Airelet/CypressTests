import ProductListPage from "../../support/page_objects/productListPage";

describe('Search with the valid product name', () => {

    beforeEach(() => {
        cy.visit('https://zwinger.pm.epages.com');
        ProductListPage.acceptCookies()
    })

    const testCases: string[][] = [
        ['armchair', 'Armchair'],
        ['cherry jam', 'Cherry Jam'],
        ['_pos', '_pos'],
        ['bo', 'Bo'],
        ['   Indoor    Pl ant    ', 'Indoor Plant'],
        ['plant plant plant plant plant plant plant plant plant plant plant plant plant plant plant plant plant ' +
        'plant plant plant plant plant plant plant plant plant plant plant plant plant plant plant plant pl','Plant'],
        ['plant plant plant plant plant plant plant plant plant plant plant plant plant plant plant plant plant ' +
        'plant plant plant plant plant plant plant plant plant plant plant plant plant plant plant plant pla','Plant']
    ];

    testCases.forEach(([searchString, productName]) => {
        it(`should display products matching ${productName} product name`, () => {
            ProductListPage.searchViaButtonClick(searchString);
            ProductListPage.verifyProductListContainProduct(productName);
        })
    });
});