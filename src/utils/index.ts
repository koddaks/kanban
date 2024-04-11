import { Issue, IssueState } from '@/types'

export function getOpenedIssuesWithAssignee(issues: Issue[]): Issue[] {
  const currentDate = Date.now()
  const threeDaysAgo = currentDate - 3 * 24 * 60 * 60 * 1000

  return issues.filter((issue: Issue) => {
    const issueDate = new Date(issue.created_at).getTime()
    return issueDate >= threeDaysAgo && issue.state !== IssueState.Closed && !issue.assignee
  })
}

export function getClosedIssues(issues: Issue[]): Issue[] {
  return issues.filter((issue: Issue) => issue.state === IssueState.Closed)
}

export function getInProgressIssues(issues: Issue[]): Issue[] {
  return issues.filter((issue: Issue) => issue.state === IssueState.Open && issue.assignee !== null)
}

export function sortIssuesByColumn(issues: Issue[], column: string | number): Issue[] {
  let sortedIssues: Issue[] = []

  switch (column) {
    case 'todo':
      sortedIssues = getOpenedIssuesWithAssignee(issues).map((issue) => ({
        ...issue,
        columnId: 'todo',
      }))
      break
    case 'done':
      sortedIssues = getClosedIssues(issues).map((issue) => ({
        ...issue,
        columnId: 'done',
      }))
      break
    case 'doing':
      sortedIssues = getInProgressIssues(issues).map((issue) => ({
        ...issue,
        columnId: 'doing',
      }))
      break
    default:
      sortedIssues = issues.map((issue) => ({
        ...issue,
        columnId: 'all',
      }))
  }

  return sortedIssues
}
