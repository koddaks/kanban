import { RepoInfo } from '@/types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { extendIssuesWithStatus } from '@/utils'
import { fetchIssues } from '@/api'
import { Issue } from '@/types/issues'

interface IssuesStore {
  fetchIssues: (repoUrl: string) => Promise<void>
  currentRepoUrl: string
  issuesByStore: {
    [repoUrl: string]: Issue[]
  }
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
        async fetchIssues(repoUrl: string) {
          const { issuesByStore } = get()

          const data = await fetchIssues(repoUrl)

          if (!data) return
      

          const sortedIssues = extendIssuesWithStatus(data)

          set({
            currentRepoUrl: repoUrl,
            issuesByStore: {
              ...issuesByStore,
              [repoUrl]: sortedIssues,
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
        setRepoToRepoList: (repoInfo: RepoInfo) => {
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
