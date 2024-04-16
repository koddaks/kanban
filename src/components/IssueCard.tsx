import { Issue } from '@/types'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { cn } from '@/lib/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { getTimeStringSinceIssueOpened } from '@/utils'

type IssueCardProps = {
  issue: Issue
}

export function IssueCard({ issue }: IssueCardProps) {
  const { html_url, title, number, created_at, state } = issue
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
        `xl:max-w-80 lg:max-w-72 md:max-w-56 sm:max-w-52 break-all w-4/5 ${
          isDragging ? 'cursor-grab border-2 border-rose-500 opacity-30' : ''
        }`
      )}
    >
      <CardHeader>
        <a href={html_url} target="_blank" rel="noopener noreferrer">
          <CardTitle className="pb-2 text-balance">{title}</CardTitle>
          <CardDescription>
            #{number} opened {getTimeStringSinceIssueOpened(created_at)}
          </CardDescription>
        </a>
        <CardDescription className='flex flex-col items-center gap-2'>
          Opened by {login} | {type} <img className="size-16 rounded-full" src={avatar_url} />
        </CardDescription>
      </CardHeader>
      <CardFooter className='flex flex-col items-center'>
        <p className=' w-1/3 bg-sky-400/100 rounded-md p-1'>{state.toUpperCase()}</p>
      </CardFooter>
    </Card>
  )
}