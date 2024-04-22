import { Issue, RepoInfo } from '@/types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { sortIssuesByColumn } from '@/utils'
import { getAllRepositoryIssues } from '@/api'

interface IssuesStore {
  fetchIssues: (repoUrl: string) => Promise<void>
  currentRepoUrl: string
  issuesByStore: {
    [repoUrl: string]: Issue[]
  }
  setCurrentRepoUrl: (url: string) => void
  repoList: RepoInfo[]
  setRepoToRepoList: (repoInfo: RepoInfo) => void
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

          if (issuesByStore[repoUrl] && issuesByStore[repoUrl].length != 0) {
            set({
              currentRepoUrl: repoUrl,
              issuesByStore: {
                ...issuesByStore,
              },
            })
            return
          }

          const data = await getAllRepositoryIssues(repoUrl)

          if (!data) return

          const todoIssues: Issue[] = sortIssuesByColumn(data, 'todo')
          const doingIssues: Issue[] = sortIssuesByColumn(data, 'doing')
          const doneIssues: Issue[] = sortIssuesByColumn(data, 'done')

          const sortedIssues = [...todoIssues, ...doingIssues, ...doneIssues]

          set({
            currentRepoUrl: repoUrl,
            issuesByStore: {
              ...issuesByStore,
              [repoUrl]: sortedIssues,
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
