import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IssueCard } from './IssueCard'
import { Issue } from '@/types'

type ColumnContainerProps = {
  column: string
  issues?: Issue[]
}

export function ColumnContainer({ column, issues }: ColumnContainerProps) {
  return (
    <Table className="flex flex-col items-center ">
      <TableHead className="text-center">{column}</TableHead>
      <TableBody className="flex flex-col gap-4">
        {issues?.map((issue) => <IssueCard data={issue} />)}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  )
}
