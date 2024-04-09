import { Table, TableBody, TableFooter, TableHead } from '@/components/ui/table'
import { IssueCard } from './IssueCard'
import { Column, Issue } from '@/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { useMemo } from 'react'


type ColumnContainerProps = {
  column: Column
  issues: Issue[]
}

export function ColumnContainer({ column, issues }: ColumnContainerProps) {
  const issuesId = useMemo(() => {
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
    <Table ref={setNodeRef} className="flex flex-col items-center w-[380px]">
      <TableHead className="flex w-full items-center justify-center rounded-t-lg bg-slate-600 text-neutral-100">
        {column.title}
      </TableHead>
      <TableBody className="flex w-full flex-col">
        <ScrollArea className="h-[80vh] w-full rounded-b-md border bg-slate-300 p-4">
          <div className="flex flex-col items-center gap-2">
            <SortableContext items={issuesId}>
              {issues?.map((issue) => <IssueCard key={issue.id} issue={issue} />)}
            </SortableContext>
          </div>
        </ScrollArea>
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  )
}
