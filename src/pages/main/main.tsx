import { BreadCrumbs } from '@/components/BreadCrumbs'
import { InputWithButton } from '@/components/InputWithButton'
import { KanbanBoard } from '@/components/KabanBoard'
import KanbanBoardDnD from "@/components/DndTest/KanbanBoardDnD";




export function Main() {
  return (
    <main>
      <InputWithButton />
      <BreadCrumbs owner="facebook" repo="react" />
      <KanbanBoard/>

      <KanbanBoardDnD/>      
    </main>
  )
}
