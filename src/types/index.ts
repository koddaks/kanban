export type Id = string | number

export type Column = {
  id: Id
  title: string
}

export interface RepoInfo {
  owner: string
  ownerUrl: string
  repo: string
  repoUrl: string
}