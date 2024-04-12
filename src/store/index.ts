import { Issue } from '@/types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { getAllRepositoryIssues } from './api'
import { sortIssuesByColumn } from '@/utils'

interface StoreState {
  getAllIssues: (repoUrl: string) => Promise<void>
  all: Issue[]
  sortedIssues: Issue[]
  getSortedIssues: () => Issue[]
}

const useIssuesStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        all: [],
        sortedIssues: [],
        async getAllIssues(repoUrl: string) {
          const data = await getAllRepositoryIssues(repoUrl)
          set({ all: data })
        },
        getSortedIssues: () => {
          const { all } = get()
          const todoIssues: Issue[] = sortIssuesByColumn(all, 'todo')
          const doingIssues: Issue[] = sortIssuesByColumn(all, 'doing')
          const doneIssues: Issue[] = sortIssuesByColumn(all, 'done')
          const sortedIssues = [...todoIssues, ...doingIssues, ...doneIssues]
          set({ sortedIssues })
          return sortedIssues
        },
      }),
      { name: 'repository-issues' }
    )
  )
)

export default useIssuesStore
