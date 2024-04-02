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
      <TableHead className="flex justify-center items-center bg-slate-600 w-full text-neutral-100 rounded-t-lg">{column}</TableHead>
      <TableBody className="flex flex-col w-full">
        <ScrollArea className="h-[80vh] rounded-b-md border p-4 bg-slate-300">
          <div className='flex flex-col gap-2 items-center'>
          {issues?.map((issue) => <IssueCard key={issue.id} issue={issue} />)}
          </div>         
        </ScrollArea>
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  )
}
