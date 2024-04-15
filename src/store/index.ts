import { Issue, Owner, Repo } from '@/types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { getAllRepositoryIssues } from './api'
import { extractOwnerAndRepo, sortIssuesByColumn } from '@/utils'

interface IssuesState {
  getIssues: (repoUrl: string) => Promise<void>
  currentRepoUrl: string
  currentOwnerAndRepo: {
    owner: Owner | undefined
    repo: Repo | undefined
  }
  setCurrentOwnerAndRepo: () => void
  issuesByStore: {
    [repoUrl: string]: Issue[]
  }
}

const useIssuesStore = create<IssuesState>()(
  devtools(
    persist(
      (set, get) => ({
        issuesByStore: {},
        currentRepoUrl: '',
        currentOwnerAndRepo: { owner: undefined, repo: undefined },
        async getIssues(repoUrl: string) {
          const { issuesByStore } = get()

          if (issuesByStore[repoUrl] && issuesByStore[repoUrl].length != 0) {
            console.log('repository already exist in LocalStorage')
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

        setCurrentOwnerAndRepo() {
          const { currentRepoUrl } = get()
          const data = extractOwnerAndRepo(currentRepoUrl)

          set({
            currentOwnerAndRepo: {
              owner: data?.owner,
              repo: data?.repo,
            },
          })
        },
      }),
      { name: 'repository-issues' }
    )
  )
)

export default useIssuesStore
