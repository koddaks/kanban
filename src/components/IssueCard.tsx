import { Issue } from '@/types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { getTimeStringSinceIssueOpened } from '@/lib/utils'

type IssueCardProps = {
  issue: Issue
}

export function IssueCard({ issue }: IssueCardProps) {
  const { html_url, title, number, created_at, state, body } = issue
  const { login, type, avatar_url } = issue.user

  return (
    <Card className="flex max-w-[360px] flex-col items-center bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 duration-500 hover:scale-105 hover:from-pink-500 hover:to-yellow-500">
      <CardHeader>
        <a href={html_url} target="_blank" rel="noopener noreferrer">
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            #{number} opened {getTimeStringSinceIssueOpened(created_at)}
          </CardDescription>
        </a>
        <CardDescription className="flex flex-col items-center">
          Opened by {login} | {type} <img className="size-16 rounded-full" src={avatar_url} />
        </CardDescription>
      </CardHeader>
      <CardContent className="max-w-96 overflow-visible">
        <p className="truncate">{body}</p>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="rounded-lg bg-sky-400/100 p-1">{state.toUpperCase()}</p>
      </CardFooter>
    </Card>
  )
}
