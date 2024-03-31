import { ColumnContainer } from '@/components/ColumnContainer'
import { InputWithButton } from '@/components/InputWithButton'
import useIssuesStore from '@/store/index'

import { useEffect } from 'react'

export function Main() {
  const issues = useIssuesStore((state) => state.all)
  const todoIssues = useIssuesStore((state) => state.openedWithAssignee)
  const InProgressIssues = useIssuesStore((state) => state.inProgress)
  const doneIssues = useIssuesStore((state) => state.closed)

  const getTodoIssues = useIssuesStore((state) => state.getOpenedIssuesWithAssignee)
  const getInProgressIssues = useIssuesStore((state) => state.getInProgressIssues)
  const geDoneIssues = useIssuesStore((state) => state.getClosedIssues)

  useEffect(() => {
    getTodoIssues(issues)
    getInProgressIssues(issues)
    geDoneIssues(issues)
  }, [])

  useEffect(() => {
    getTodoIssues(issues)
    getInProgressIssues(issues)
    geDoneIssues(issues)
  }, [issues])

  return (
    <main>
      <InputWithButton />
      <div className="flex border-collapse gap-4 rounded-lg border-2 border-solid border-indigo-600 bg-slate-300 p-[20px]">
        <ColumnContainer column="ToDo" issues={todoIssues} />
        <ColumnContainer column="In Progress" issues={InProgressIssues} />
        <ColumnContainer column="Done" issues={doneIssues} />
      </div>
    </main>
  )
}
