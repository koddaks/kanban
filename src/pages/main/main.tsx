import { BreadCrumbs } from '@/components/BreadCrumbs'
import { InputWithButton } from '@/components/InputWithButton'
import { KanbanBoard } from '@/components/KanbanBoard'

export function Main() {
  return (
    <main className="container max-w-5xl flex flex-col gap-2">
      <InputWithButton />
      <BreadCrumbs />
      <KanbanBoard />
    </main>
  )
}
