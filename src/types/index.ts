export interface Issue {
  url: string
  repository_url: string
  labels_url: string
  comments_url: string
  events_url: string
  html_url: string
  id: number
  node_id: string
  number: number
  title: string
  user: {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
  }
  labels: Label[]
  state: State
  locked: boolean
  assignee: Assignee
  assignees: Assignee[]
  comments: number
  created_at: string
  updated_at: string
  closed_at: string | null
  repository: Repository
  author_association: string
  active_lock_reason: string | null
  body: string | null
  reactions: {
    url: string
    total_count: number
    '+1': number
    '-1': number
    laugh: number
    hooray: number
    confused: number
    heart: number
    rocket: number
    eyes: number
  }
  timeline_url: string
  performed_via_github_app: null
  milestone: null
  state_reason: string | null
  status: IssueStatus
}

type State = 'open' | 'closed'

interface Label {
  id: number
  node_id: string
  url: string
  name: string
  description: string
  color: string
  default: boolean
}

interface Assignee {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

interface Repository {
  id: number
  node_id: string
  name: string
  full_name: string
  owner: {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
  }
}

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
  ownerUrl: string
  repo: string
  repoUrl: string
}

export type IssueStatus = 'todo' | 'in-progress' | 'done'
