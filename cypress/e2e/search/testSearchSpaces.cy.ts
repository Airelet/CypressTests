import ProductListPage from "../../support/page_objects/productListPage";
import productListPage from "../../support/page_objects/productListPage";

describe('Spaces search query', () => {

    beforeEach(() => {
        cy.visit('https://zwinger.pm.epages.com');
        ProductListPage.acceptCookies()
    })

    it(`shouldn't execute the search`, () => {
        cy.url().then(url => {
            productListPage.enterSearch('                    ')
            productListPage.clickSearchButton()
            cy.url().should('deep.equal', url);
        });
    })
});