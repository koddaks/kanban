import { Issue, RepoInfo } from '@/types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { getAllRepositoryIssues } from './api'
import { sortIssuesByColumn } from '@/utils'

interface IssuesState {
  getIssues: (repoUrl: string) => Promise<void>
  currentRepoUrl: string 
  issuesByStore: {
    [repoUrl: string]: Issue[]
  }
  setCurrentRepoUrl: (url: string) => void
  repoList: RepoInfo[];
  addRepo: (repoInfo: RepoInfo) => void;
}

const useIssuesStore = create<IssuesState>()(
  devtools(
    persist(
      (set, get) => ({
        issuesByStore: {},
        currentRepoUrl: '', 
        repoList: [],       
        async getIssues(repoUrl: string) {
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
        addRepo: (repoInfo: RepoInfo) => {
          if (!get().repoList.some(r => r.url === repoInfo.url)) {
            set(state => ({
              repoList: [...state.repoList, repoInfo]
            }));
          }
        },
        setCurrentRepoUrl: (url) => {          
          set(() => ({
            currentRepoUrl: url
          }))
        }
        
      }),
      { name: 'repository-issues' }
    )
  )
)

export default useIssuesStore
