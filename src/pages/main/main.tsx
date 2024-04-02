import { BreadCrumbs } from '@/components/BreadCrumbs'
import { ColumnContainer } from '@/components/ColumnContainer'
import { InputWithButton } from '@/components/InputWithButton'
import { KanbanBoard } from '@/components/KabanBoard'
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
      <BreadCrumbs owner="facebook" repo="react" />
      <KanbanBoard>
        <ColumnContainer column="ToDo" issues={todoIssues} />
        <ColumnContainer column="In Progress" issues={InProgressIssues} />
        <ColumnContainer column="Done" issues={doneIssues} />
      </KanbanBoard>
    </main>
  )
}
