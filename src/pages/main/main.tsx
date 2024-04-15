import { BreadCrumbs } from '@/components/BreadCrumbs'
import { InputWithButton } from '@/components/InputWithButton'
import { KanbanBoard } from '@/components/KanbanBoard'

export function Main() {  
  return (
    <main>
      <InputWithButton />
      <BreadCrumbs/>
      <KanbanBoard />
    </main>
  )
}
