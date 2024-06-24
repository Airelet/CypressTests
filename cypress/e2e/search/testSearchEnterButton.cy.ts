import ProductListPage from "../../support/page_objects/productListPage";
import productListPage from "../../support/page_objects/productListPage";

describe('Search using Enter instead of the search button', () => {

  beforeEach(() => {
    cy.visit('https://zwinger.pm.epages.com');
    ProductListPage.acceptCookies()
  });

  it(`should display products matching Cherry Jam product name`, () => {
    ProductListPage.searchViaEnter('Cherry Jam');
    ProductListPage.verifyProductListContainProduct('Cherry Jam');
  });

  it(`should indicate no products found matching cherryjam`, () => {
    ProductListPage.searchViaButtonClick('cherryjam')
    cy.get('.product-list').should('not.exist');
    cy.get('.search-no-result-form-headline').should('be.visible')
  });

  it(`shouldn't execute the search with an empty string`, () => {
    cy.url().then(url => {
      cy.get('.search-form-field').type('{enter}');
      cy.url().should('deep.equal', url);
    });
  });

  it(`shouldn't execute the search with spaces as a string`, () => {
    cy.url().then(url => {
      productListPage.enterSearch('                    ')
      cy.get('.search-form-field').type('{enter}');
      cy.url().should('deep.equal', url);
    });
  });
});