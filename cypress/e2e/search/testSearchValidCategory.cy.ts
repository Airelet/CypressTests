import ProductListPage from "../../support/page_objects/productListPage";

describe('Search with the valid category name', () => {
    let categoryProducts: string[] = [];

    beforeEach(() => {
        cy.visit('https://zwinger.pm.epages.com');
        ProductListPage.acceptCookies()
        cy.intercept('/api/v2/products?*').as('loadProducts')
        cy.get('.navigation').contains('Category_with_less_than_12_products').click()
        cy.wait('@loadProducts')
        cy.get('.product-item-title').then(($els) => {
            categoryProducts = Array.from($els, el => el.innerText);
        });
        ProductListPage.searchViaButtonClick('Category_with_less_than_12_products');
    })

    it(`should display all products included in category Category_with_less_than_12_products`, () => {
        categoryProducts.forEach((productName) => {
            cy.get('.product-item-title')
                .invoke('text')
                .should('include', productName)
        })
    })
});