class NoSearchResultPage {
    elements = {
        noResultForm: (): Cypress.Chainable<JQuery<HTMLElement>> => cy.get('.search-no-result-form'),
        searchField: (): Cypress.Chainable<JQuery<HTMLElement>> => cy.get('.search-no-result-form')
            .find('.search-form-field'),
        submitButton: (): Cypress.Chainable<JQuery<HTMLElement>> => cy.get('.search-no-result-form')
            .find('button[type=submit]'),
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
}

export default new NoSearchResultPage()