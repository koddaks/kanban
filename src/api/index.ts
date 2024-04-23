import { IssueGetState } from '@/types'
import { Issue } from '@/types/issues'


const queryParams = new URLSearchParams({
  per_page: '20',
  direction: 'desc',
  state: `${IssueGetState.All}`,
})

export const fetchIssues = async ({ owner, repo }: { owner: string; repo: string }) => {
  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/issues?${queryParams}`

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
