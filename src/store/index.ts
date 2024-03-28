import { Issue, SearchState } from '@/types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface StoreState {
  count: number
  increaseCount: (by: number) => void
  fetchRepoData: (repoUrl: string, searchState: SearchState) => Promise<void>
  repoData: Issue[]
}

const useStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        repoData: [],
        increaseCount: (by) => set((state) => ({ count: state.count + by })),
        async fetchRepoData(repoUrl: string, searchState: SearchState) {
          try {
            const queryParams = new URLSearchParams({
              per_page: '60',
              direction: 'desc',
              state: `${searchState}`,
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
