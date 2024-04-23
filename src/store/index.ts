import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Issue } from '@/types/issues'
import { RepoInfo } from '@/types'

interface IssuesStore {
  currentRepoInfo: RepoInfo | null
  issuesByOwner: Record<string, Record<string, Issue[]>>
  setCurrentRepoInfo: (repoInfo: RepoInfo) => void
  setIssuesForRepo: (issues: Issue[], repoInfo?: RepoInfo) => void
  getIssuesForRepo: (repoInfo?: RepoInfo) => Issue[]
}

const useIssuesStore = create<IssuesStore>()(
  devtools(
    persist(
      (set, get) => ({
        currentRepoInfo: null,
        issuesByOwner: {},
        setCurrentRepoInfo: (repoInfo) => set({ currentRepoInfo: repoInfo }),
        setIssuesForRepo: (issues, repoInfo) => {
          const info = repoInfo || get().currentRepoInfo
          if (!info) return
          const { owner, repo } = info
          set((state) => ({
            issuesByOwner: {
              ...state.issuesByOwner,
              [owner]: {
                ...(state.issuesByOwner[owner] || {}),
                [repo]: issues,
              },
            },
          }))
        },
        getIssuesForRepo: (repoInfo) => {
          const info = repoInfo || get().currentRepoInfo
          if (!info) return []
          const { owner, repo } = info
          return get().issuesByOwner[owner]?.[repo] || []
        },
      }),
      { name: 'repository-issues' }
    )
  )
)

export default useIssuesStore
