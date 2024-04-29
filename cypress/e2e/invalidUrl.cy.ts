const invalidGithubUrl = Cypress.env('invalidGithubUrl')
const invalidRepositoryOrOwnerUrl = Cypress.env('invalidRepositoryOrOwnerUrl')
const repositoryIssuesEmptyUrl = Cypress.env('repositoryIssuesEmptyUrl')

describe('Load Issues with invalid URL', () => {
  it('Get repository issues with invalid GitHub URL', () => {
    cy.visit('/')

    cy.get('[data-testid="search-repo-issues-input"]')
      .should('exist')
      .type(invalidGithubUrl)
      .should('to.have.value', invalidGithubUrl)

    cy.get('[data-testid="search-repo-issues-button"]')
      .should('exist')
      .should('to.have.text', 'Load issues')
      .click()

    cy.get('[data-testid="error"]').should('exist')
    cy.get('[data-testid="error-message"]')
      .should('exist')
      .should('to.have.text', 'Invalid GitHub URL')
  })

  it('Get repository issues with invalid repository or owner', () => {
    cy.visit('/')

    cy.get('[data-testid="search-repo-issues-input"]')
      .should('exist')
      .type(invalidRepositoryOrOwnerUrl)
      .should('to.have.value', invalidRepositoryOrOwnerUrl)

    cy.get('[data-testid="search-repo-issues-button"]')
      .should('exist')
      .should('to.have.text', 'Load issues')
      .click()

    cy.get('[data-testid="error"]').should('exist')
    cy.get('[data-testid="error-message"]')
      .should('exist')
      .should('to.have.text', 'Network response was not ok: 404. Check the URL and try again.')
  })

  it('Get repository issues when the repository issues is empty', () => {
    cy.visit('/')

    cy.get('[data-testid="search-repo-issues-input"]')
      .should('exist')
      .type(repositoryIssuesEmptyUrl)
      .should('to.have.value', repositoryIssuesEmptyUrl)

    cy.get('[data-testid="search-repo-issues-button"]')
      .should('exist')
      .should('to.have.text', 'Load issues')
      .click()

    cy.get('[data-testid="error"]').should('exist')
    cy.get('[data-testid="error-message"]')
      .should('exist')
      .should('to.have.text', 'The list of issues is empty')
  })
})
