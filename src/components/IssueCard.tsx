import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { getTimeStringSinceIssueOpened } from '@/utils'
import { Issue } from '@/types/issues'


type IssueCardProps = {
  issue: Issue
}

export function IssueCard({ issue }: IssueCardProps) {
  const { html_url, title, number, created_at, state } = issue  
  const userUrl = issue?.user?.html_url
  console.log(issue);

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
        `w-full break-all sm:max-w-52 md:max-w-56 lg:max-w-72 xl:max-w-80 cursor-grab  ${isDragging ? ' border-2 border-rose-500 opacity-30' : ''}`
      )}
    >
      <CardHeader className="flex flex-col items-center justify-between gap-1 space-y-0 pb-2">
        <CardTitle className="line-clamp-2 text-balance text-center px-2 text-xs font-medium md:text-sm">
          <a href={html_url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>          
        </CardTitle>
        <p className="text-xs">Opened by {issue?.user?.login} | {issue?.user?.type}</p>
        <div className=" w-1/3 flex flex-col items-center gap-1">
          <Avatar className="size-8 rounded-full text-muted-foreground md:size-12">
            <AvatarImage src={issue?.user?.avatar_url} alt="avatar image" />
            <AvatarFallback>{userUrl}</AvatarFallback>
          </Avatar>
          <p className="text-[10px] leading-4 font-bold">{issue?.user?.login}</p>
        </div> 
      </CardHeader>
      <CardContent className="flex flex-col gap-2 items-center">
        <div className="flex flex-col items-center text-xs font-bold xl:text-sm">
          #{number} created {getTimeStringSinceIssueOpened(created_at)}
        </div>
        <p className="text-xs text-muted-foreground md:text-base">{state}</p>
      </CardContent>
    </Card>
  )
}



