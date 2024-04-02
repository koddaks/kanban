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
    <Card className="flex flex-col items-center w-[100%] max-w-[320px]">
      <CardHeader className='w-[100%]'>
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
      <CardContent className="max-w-64">
        <p className="truncate">{body}</p>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="rounded-lg bg-sky-400/100 p-1">{state.toUpperCase()}</p>
      </CardFooter>
    </Card>
  )
}
