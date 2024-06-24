import ProductListPage from "../../support/page_objects/productListPage";

describe('Empty search query', () => {

  beforeEach(() => {
    cy.visit('https://zwinger.pm.epages.com');
    ProductListPage.acceptCookies()
  })

  it(`shouldn't execute the search`, () => {
    cy.url().then(url => {
      ProductListPage.clickSearchButton();
      cy.url().should('deep.equal', url);
    });
  })
});