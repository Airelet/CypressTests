import ProductListPage from "../../support/page_objects/productListPage";

describe('Search with the valid category name', () => {
    let categoriesProducts: string[] = [];

    beforeEach(() => {
        cy.visit('https://zwinger.pm.epages.com');
        ProductListPage.acceptCookies()
    })

    it(`should display all products included in category Category_with_less_than_12_products`, () => {
        cy.intercept('/api/v2/products?*').as('loadProducts')
        cy.get('.navigation').contains('Category_with_less_than_12_products').click()
        cy.wait('@loadProducts')
        cy.get('.product-item-title').then(($els) => {
            categoriesProducts = Array.from($els, el => el.innerText);
        });
        cy.get('.navigation').contains('Category_with_exactly_12_products').click()
        cy.wait('@loadProducts')
        cy.get('.product-item-title').each(($el) => {
            if (categoriesProducts.includes($el.text()) === false) {
                categoriesProducts.push($el.text());
            }
        });
        ProductListPage.searchViaButtonClick('12 products');
        cy.get('.product-item-title')
            .each(($el) => {
                cy.wrap($el)
                    .invoke('text')
                    .should('be.oneOf', categoriesProducts);
            })
    })

});

