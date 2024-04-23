import { IssueGetState } from '@/types'
import { Issue, IssueStatus } from '@/types/issues'

export function getTimeStringSinceIssueOpened(createdAt: string): string {
  const postDate = new Date(createdAt)

  const currentDate = new Date()

  const differenceInMillis = currentDate.getTime() - postDate.getTime()

  const differenceInDays = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24))
  const dayWord = differenceInDays === 1 ? 'day' : 'days'

  return `${differenceInDays} ${dayWord} ago`
}

export function getOpenedIssuesWithAssignee(issues: Issue[]): Issue[] {
  const currentDate = Date.now()
  const threeDaysAgo = currentDate - 3 * 24 * 60 * 60 * 1000

  return issues.filter((issue: Issue) => {
    const issueDate = new Date(issue.created_at).getTime()
    return issueDate >= threeDaysAgo && issue.state !== IssueGetState.Closed && !issue.assignee
  })
}

export function getClosedIssues(issues: Issue[]): Issue[] {
  return issues.filter((issue: Issue) => issue.state === IssueGetState.Closed)
}

export function getInProgressIssues(issues: Issue[]): Issue[] {
  return issues.filter(
    (issue: Issue) => issue.state === IssueGetState.Open && issue.assignee !== null
  )
}

export function extendIssuesWithStatus(issues: Issue[]): Issue[] {
  return issues.map((issue) => {
    let status: IssueStatus

    if (issue.state === 'closed') {
      status = 'done'
    } else if (issue.assignee) {
      status = 'in-progress'
    } else {
      status = 'todo'
    }

    return { ...issue, status }
  })
}

export function extractOwnerAndRepoFromUrl(url: string) {
  const regex = /github\.com\/([^/]+)\/([^/]+)/
  const matches = url.match(regex)

  if (matches) {
    const owner = matches[1]
    const repo = matches[2]

    return {
      owner: owner,
      repo: repo,
    }
  }
  return null
}



export function validateGithubUrl(repoUrl: string) {
  return repoUrl.startsWith('https://github.com/') || repoUrl.startsWith('http://github.com')
}
