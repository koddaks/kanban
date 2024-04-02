import { Table, TableBody, TableFooter, TableHead } from '@/components/ui/table'
import { IssueCard } from './IssueCard'
import { Issue } from '@/types'
import { ScrollArea } from '@/components/ui/scroll-area'

type ColumnContainerProps = {
  column: string
  issues?: Issue[]
}

export function ColumnContainer({ column, issues }: ColumnContainerProps) {
  return (
    <Table className="flex flex-col items-center ">
      <TableHead className="flex w-full items-center justify-center rounded-t-lg bg-slate-600 text-neutral-100">
        {column}
      </TableHead>
      <TableBody className="flex w-full flex-col">
        <ScrollArea className="h-[80vh] rounded-b-md border bg-slate-300 p-4">
          <div className="flex flex-col items-center gap-2">
            {issues?.map((issue) => <IssueCard key={issue.id} issue={issue} />)}
          </div>
        </ScrollArea>
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  )
}
