import { IssueCard } from './IssueCard'
import { useMemo } from 'react'
import { Column } from '@/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { Issue } from '@/types/issues'

type ColumnContainerProps = {
  column: Column
  issues: Issue[]
}

export function ColumnContainer({ column, issues }: ColumnContainerProps) {
  const issuesIds = useMemo(() => {
    return issues.map((issue) => issue.id)
  }, [issues])

  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  })
  return (
    <div ref={setNodeRef}>
      <div data-testid={`${column.id}-column-header`} className="flex items-center justify-center rounded-t-lg bg-slate-600 text-neutral-100">
        {column.title}
      </div>
      <div className="flex w-full flex-col">
        <ScrollArea className="h-[80vh] w-full rounded-b-md border bg-slate-300 p-4">
          <div data-testid={`${column.id}-column`} id={`${column.id}-column`} className="flex flex-col items-center gap-4">
            <SortableContext items={issuesIds}>
              {issues?.map((issue) => <IssueCard key={issue.id} issue={issue} />)}
            </SortableContext>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
