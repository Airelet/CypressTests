class ProductListPage {
    elements = {
        searchField: (): Cypress.Chainable<JQuery<HTMLElement>> => cy.get('.search-form-field'),
        submitButton: (): Cypress.Chainable<JQuery<HTMLElement>> => cy.get('button[type=submit]'),
        productList: (): Cypress.Chainable<JQuery<HTMLElement>> => cy.get('.product-list'),
        searchTag: (): Cypress.Chainable<JQuery<HTMLElement>> => cy.get('.search-filter-tag'),
    }

    acceptCookies(): void {
        cy.get('.cc-dialog-button-accept').click()
    }

    enterSearch(search_string: string): void {
        this.elements.searchField().type(search_string)
    }

    waitSuggestedSearch(): void {
        cy.intercept('/api/v2/suggestedSearch?*').as('load')
        cy.wait('@load')
    }

    clickSearchButton(): void {
        this.elements.submitButton().click()
    }

    searchViaButtonClick(searchString: string): void {
        this.enterSearch(searchString)
        this.clickSearchButton()
        this.waitSuggestedSearch()
    }

    searchViaEnter(searchString: string): void {
        this.enterSearch(searchString)
        this.elements.searchField().type('{enter}')
        this.waitSuggestedSearch()
    }

    verifyProductListContainProduct(productName: string): void {
        this.elements.productList()
            .should('exist')
            .each(($el) => {
                cy.wrap($el)
                    .invoke('text')
                    .should('contain', productName, {matchCase: false});
            });
    }

    verifySearchTag(productName: string): void {
        this.elements.searchTag()
            .should('exist')
            .invoke('text')
            .should('contain', productName, {matchCase: false});
    }
}

export default new ProductListPage()