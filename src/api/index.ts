import { Issue, IssueGetState } from '@/types'
import { modifyUrlToApiUrl } from '@/utils'

const queryParams = new URLSearchParams({
  per_page: '20',
  direction: 'desc',
  state: `${IssueGetState.All}`,
})

export const getAllRepositoryIssues = async (repoUrl: string) => {
  try {
    const url = `${modifyUrlToApiUrl(repoUrl)}/issues?${queryParams}`

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
