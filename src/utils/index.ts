
import { Issue, IssueStatus, ResponseIssue } from '@/types/issues'

export function getTimeStringSinceIssueOpened(createdAt: string): string {
  const postDate = new Date(createdAt)

  const currentDate = new Date()

  const differenceInMillis = currentDate.getTime() - postDate.getTime()

  const differenceInDays = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24))
  const dayWord = differenceInDays === 1 ? 'day' : 'days'

  return `${differenceInDays} ${dayWord} ago`
}

export function extendIssuesWithStatus(issues: ResponseIssue[]): Issue[] {
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

export function validateGithubUrl(repoUrl: string) {
  return repoUrl.startsWith('https://github.com/') || repoUrl.startsWith('http://github.com')
}

export function extractOwnerAndRepo(url: string) {
  const regex = /github\.com\/([^/]+)\/([^/]+)/
  const matches = url.match(regex)

  if (matches && matches.length === 3) {
    const owner = matches[1]
    const repo = matches[2]
    const ownerLink = `https://github.com/${owner}`
    return {
      owner: owner,
      ownerUrl: ownerLink,
      repo: repo,
      repoUrl: url,
    }
  } else {
    return null
  }
}

export function modifyUrlToApiUrl(originalUrl: string) {
  return originalUrl.replace(/github\.com/, 'api.github.com/repos')
}
