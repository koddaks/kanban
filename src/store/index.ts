import { Issue, IssueState } from '@/types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface StoreState {
  fetchRepoData: (repoUrl: string, IssueState: IssueState) => Promise<void>
  repoData: Issue[]
}

const useStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        repoData: [],
        async fetchRepoData(repoUrl: string, IssueState: IssueState) {
          try {
            const queryParams = new URLSearchParams({
              per_page: '30',
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
            set({ repoData: data })
          } catch (error) {
            console.error('Error fetching data:', error)
          }
        },
      }),
      { name: 'repositoryIssues' }
    )
  )
)

export default useStore
