import { Issue, IssueState } from '@/types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { getRepositoryIssues } from './api'

interface StoreState {
  getIssues: (repoUrl: string, IssueState: IssueState) => Promise<void>
  issues: Issue[]
  opened: Issue[]
  closed: Issue[]
  inProgress: Issue[]
}

const useIssuesStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        issues: [],
        opened: [],
        closed: [],
        inProgress: [],
        async getIssues(repoUrl: string, IssueState: IssueState) {
          const data = await getRepositoryIssues(repoUrl, IssueState);
            set({ issues: data });
        },
      }),
      { name: 'repositoryIssues' }
    )
  )
)

export default useIssuesStore
