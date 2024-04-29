const validGithubUrl = Cypress.env('validGithubUrl')

describe('Load Issues with GitHub URL', () => {
  it('Get repository issues and drag and drop issue to Work in progress column', () => {
    cy.visit('/')

    cy.get('[data-testid="search-repo-issues-input"]')
      .should('exist')
      .type(validGithubUrl)
      .should('to.have.value', validGithubUrl)

    cy.get('[data-testid="search-repo-issues-button"]')
      .should('exist')
      .should('to.have.text', 'Load issues')
      .click()

    cy.get('[data-testid="todo-column-header"]').should('exist').should('to.have.text', 'Todo')
    cy.get('[data-testid="in-progress-column-header"]')
      .should('exist')
      .should('to.have.text', 'Work in progress')
    cy.get('[data-testid="done-column-header"]').should('exist').should('to.have.text', 'Done')

    cy.get('[data-testid="owner-dropdown-trigger"]')
      .should('exist')
      .should('to.have.text', 'facebook')
    cy.get('[data-testid="repo-dropdown-trigger"]').should('exist').should('to.have.text', 'react')

    cy.get('[data-testid="owner-url"]')
      .should('exist')
      .should('to.have.text', 'facebook')
      .should('to.have.attr', 'href', 'https://github.com/facebook')
    cy.get('[data-testid="repo-url"]')
      .should('exist')
      .should('to.have.text', 'react')
      .should('to.have.attr', 'href', 'https://github.com/facebook/react')

    cy.get(
      '[data-testid="done-column"], [data-testid="todo-column"], [data-testid="in-progress-column"]'
    )
      .should('exist')
      .children()
      .should('have.length.greaterThan', 0)

    cy.get('[data-testid="todo-column"]')
      .children()
      .first()
      .invoke('attr', 'data-testid')
      .then((issueTestId) => {
        cy.get('[data-testid="todo-column"]')
          .children()
          .first()
          .focus()
          .type('{enter}')
          .wait(1000)
          .type('{rightarrow}')
          .wait(1000)

        cy.get('[data-testid="done-column"]')
          .children()
          .first()
          .focus()
          .type('{enter}')
          .type('{leftarrow}')

        cy.get(`[data-testid="in-progress-column"]`)
          .children()
          .should('have.attr', 'data-testid', issueTestId)
      })
    cy.reload()
  })
})
