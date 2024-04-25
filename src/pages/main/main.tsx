import { Search } from '@/components/Search'
import { KanbanBoard } from '@/components/KanbanBoard'

export function Main() {
  return (
    <main className="container flex max-w-5xl flex-col gap-2 pt-5">
      <Search />
      <KanbanBoard />
    </main>
  )
}
