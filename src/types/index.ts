export enum IssueGetState {
  All = 'all',
  Open = 'open',
  Closed = 'closed',
}

export type Id = string | number

export type Column = {
  id: Id
  title: string
}

export interface RepoInfo {
  owner: string
  repo: string
  url: string
}


