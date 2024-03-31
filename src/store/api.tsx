import { Issue, IssueState } from '@/types'

export const getRepositoryIssues = async (repoUrl: string, IssueState: IssueState) => {
  try {
    const queryParams = new URLSearchParams({
      per_page: '100',
      direction: 'desc',
      state: `${IssueState}`,
    })
    const url = `${repoUrl}/issues?${queryParams}`

    const response = await fetch(url, {
      headers: {
        accept: 'application/vnd.github+json',
      },
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data: Issue[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
