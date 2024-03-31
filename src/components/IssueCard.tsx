import { Issue } from '@/types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { differenceInDays } from '@/lib/utils'

type IssueCardProps = {
  data: Issue
}

export function IssueCard({ data }: IssueCardProps) {
  return (
    <Card className="flex max-w-[360px] flex-col items-center bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 duration-500 hover:scale-105 hover:from-pink-500 hover:to-yellow-500">
      <CardHeader>
        <a href={data.html_url} target="_blank" rel="noopener noreferrer">
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>
            #{data.number} opened {differenceInDays(data.created_at)}
          </CardDescription>
        </a>
        <CardDescription className="flex flex-col items-center">
          Opened by {data.user.login} | {data.user.type}{' '}
          <img className="size-16 rounded-full" src={data.user.avatar_url} />
        </CardDescription>
      </CardHeader>
      <CardContent className="max-w-96 overflow-visible">
        <p className="truncate">{data.body}</p>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="rounded-lg bg-sky-400/100 p-1">{data.state.toUpperCase()}</p>
      </CardFooter>
    </Card>
  )
}
