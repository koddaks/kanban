import { Issue } from '@/types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { cn, getTimeStringSinceIssueOpened } from '@/lib/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type IssueCardProps = {
  issue: Issue
}

export function IssueCard({ issue }: IssueCardProps) {
  const { html_url, title, number, created_at, state, body } = issue
  const { login, type, avatar_url } = issue.user

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: issue.id,
    data: {
      type: 'Issue',
      issue,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        `flex min-h-[328px] w-full max-w-[320px] flex-col items-center ${
          isDragging ? 'cursor-grab border-2 border-rose-500 opacity-30' : ''
        }`
      )}
    >
      <CardHeader className="w-full text-center">
        <a href={html_url} target="_blank" rel="noopener noreferrer">
          <CardTitle className="w-full overflow-hidden">{title}</CardTitle>
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
