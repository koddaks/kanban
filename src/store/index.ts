import { Issue, IssueState } from '@/types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { getAllRepositoryIssues } from './api'

interface StoreState {
  getAllIssues: (repoUrl: string) => Promise<void>
  all: Issue[]
  openedWithAssignee: Issue[]
  closed: Issue[]
  inProgress: Issue[]
  getOpenedIssuesWithAssignee: (issues: Issue[]) => void
  getClosedIssues: (issues: Issue[]) => void
  getInProgressIssues: (issues: Issue[]) => void
}

const useIssuesStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        all: [],
        openedWithAssignee: [],
        closed: [],
        inProgress: [],
        async getAllIssues(repoUrl: string) {
          const data = await getAllRepositoryIssues(repoUrl)
          set({ all: data })
        },
        getOpenedIssuesWithAssignee: (issues) => {
          const currentDate = Date.now()
          const threeDaysAgo = currentDate - 3 * 24 * 60 * 60 * 1000

          const openedIssues = issues.filter((issue: Issue) => {
            const issueDate = new Date(issue.created_at).getTime()
            return issueDate >= threeDaysAgo && issue.state !== IssueState.Closed
          })
          set({ openedWithAssignee: openedIssues })
        },
        getClosedIssues: (issues) => {
          const closedIssues = issues.filter((issue: Issue) => issue.state === IssueState.Closed)
          set({ closed: closedIssues })
        },
        getInProgressIssues: (issues) => {
          const inProgressIssues = issues.filter(
            (issue: Issue) => issue.state === IssueState.Open && issue.assignee !== null
          )
          set({ inProgress: inProgressIssues })
        },
      }),
      { name: 'repository-issues' }
    )
  )
)

export default useIssuesStore
