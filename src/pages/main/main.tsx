import { ColumnContainer } from '@/components/ColumnContainer'
import { InputWithButton } from '@/components/InputWithButton'
import useStore from '@/store/index'
import { Issue, IssueState } from '@/types'

export function Main() {
  const repoData = useStore((state) => state.repoData)

  const todoIssues = repoData.filter((issue: Issue) => {
    const currentDate = Date.now()
    const issueDate = new Date(issue.created_at).getTime()
    const threeDaysAgo = currentDate - 3 * 24 * 60 * 60 * 1000

    return issueDate >= threeDaysAgo && issue.state !== IssueState.Closed ? issue : null
  })

  const InProgressIssues = repoData.filter((issue) => IssueState.Open && issue.assignee !== null)

  const doneIssues = repoData.filter((issue) => issue.state === IssueState.Closed)

  return (
    <>
      <div className="flex w-full border-collapse rounded-lg border-2 border-solid border-indigo-600 bg-slate-300 p-[20px]">
        <ColumnContainer column="ToDo" issues={todoIssues} />
        <ColumnContainer column="In Progress" issues={InProgressIssues} />
        <ColumnContainer column="Done" issues={doneIssues} />
      </div>
    </>
  )
}
