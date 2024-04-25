import { ResponseIssue } from '@/types/issues'
import { modifyUrlToApiUrl } from '@/utils'

const queryParams = new URLSearchParams({
  per_page: '20',
  direction: 'desc',
  state: `all`,
})

export const fetchIssues = async (repoUrl: string) => {
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

    const data: ResponseIssue[] = await response.json()

    if (!data) {
      throw new Error('Issues not found')
    }

    return data

  } catch (error) {
    return []
    // console.error('Error fetching data:', error)
  }
}
