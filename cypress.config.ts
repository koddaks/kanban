import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173/',
    env: {
      validGithubUrl: 'https://github.com/facebook/react',
      invalidGithubUrl: 'ttps://github.com/facebook/react/issues',
      invalidRepositoryOrOwnerUrl: 'https://github.com/facesbook/react',
      repositoryIssuesEmptyUrl: 'https://github.com/koddaks/repository-issues-is-empty',
    },
    experimentalRunAllSpecs: true,
    
  },
})
