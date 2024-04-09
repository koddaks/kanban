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

export function sortIssuesByColumn(issues: Issue[], column: string): Issue[] {
  switch (column) {
    case 'todo':
      return getOpenedIssuesWithAssignee(issues)
    case 'done':
      return getClosedIssues(issues)
    case 'doing':
      return getInProgressIssues(issues)
    default:
      return issues
  }
}
