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
    <Table className="w-1/3">
      <TableHead>{column}</TableHead>
      <TableBody>{issues?.map((issue) => <IssueCard data={issue} />)}</TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
