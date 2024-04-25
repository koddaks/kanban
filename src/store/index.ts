import { RepoInfo } from '@/types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Issue } from '@/types/issues'

interface IssuesStore {
  currentRepoUrl: string
  issuesByStore: {
    [repoUrl: string]: Issue[]
  }
  setIssuesByStore: (issues: Issue[]) => void
  setCurrentRepoUrl: (url: string) => void
  repoList: RepoInfo[]
  setRepoToRepoList: (repoInfo: RepoInfo) => void
  setIssuesForRepo: (issues: Issue[]) => void
}

const useIssuesStore = create<IssuesStore>()(
  devtools(
    persist(
      (set, get) => ({
        issuesByStore: {},
        currentRepoUrl: '',
        repoList: [],
        async setIssuesByStore(issues) {
          const { issuesByStore, currentRepoUrl } = get()

          set({
            currentRepoUrl: currentRepoUrl,
            issuesByStore: {
              ...issuesByStore,
              [currentRepoUrl]: issues,
            },
          })
        },
        setIssuesForRepo: (issues) => {
          const { issuesByStore, currentRepoUrl } = get()
          set({
            issuesByStore: {
              ...issuesByStore,
              [currentRepoUrl]: issues,
            },
          })
        },
        setRepoToRepoList: (repoInfo) => {
          if (!get().repoList.some((r) => r.repoUrl === repoInfo.repoUrl)) {
            set((state) => ({
              repoList: [...state.repoList, repoInfo],
            }))
          }
        },
        setCurrentRepoUrl: (url) => {
          set(() => ({
            currentRepoUrl: url,
          }))
        },
      }),
      { name: 'repository-issues' }
    )
  )
)

export default useIssuesStore
