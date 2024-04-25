import { Endpoints } from '@octokit/types'

export type IssuesListResponse = Endpoints['GET /repos/{owner}/{repo}/issues']['response']['data']

export type ResponseIssue = IssuesListResponse[number]

export type IssueStatus = 'todo' | 'in-progress' | 'done'

export interface Issue extends ResponseIssue {
  status: IssueStatus
}
