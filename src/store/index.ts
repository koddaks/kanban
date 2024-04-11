import { Issue } from '@/types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { getAllRepositoryIssues } from './api'

interface StoreState {
  getAllIssues: (repoUrl: string) => Promise<void>
  all: Issue[]
}

const useIssuesStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        all: [],
        async getAllIssues(repoUrl: string) {
          const data = await getAllRepositoryIssues(repoUrl)
          set({ all: data })
        },
      }),
      { name: 'repository-issues' }
    )
  )
)

export default useIssuesStore
