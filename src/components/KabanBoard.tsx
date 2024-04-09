import { KANBAN_COLUMNS } from '@/const'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import { ColumnContainer } from './ColumnContainer'
import { useMemo, useState } from 'react'
import useIssuesStore from '@/store'
import { sortIssuesByColumn } from '@/utils'
import { IssueCard } from './IssueCard'
import { Issue } from '@/types'

export function KanbanBoard() {
  const issues = useIssuesStore((state) => state.all)
  const columnsId = useMemo(() => KANBAN_COLUMNS.map((col) => col.id), [KANBAN_COLUMNS])


  const [activeTask, setActiveTask] = useState<Issue | null>(null)

  const [tasks, setTasks] = useState<Issue[]>(issues)
  

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )


  return(
  <div className="flex border-collapse gap-4 p-[20px] ">
     <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {KANBAN_COLUMNS.map((col) => (
               <ColumnContainer key={col.id} column={col} issues={sortIssuesByColumn(tasks, col.id)}/>
              ))}
            </SortableContext>
          </div>
        </div>

        {createPortal(
          <DragOverlay>           
            {activeTask && <IssueCard issue={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
  </div>
  )

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Issue') {
      setActiveTask(event.active.data.current.task)
      return
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveTask(null)

    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveATask = active.data.current?.type === 'Issue'
    const isOverATask = over.data.current?.type === 'Issue'

    if (!isActiveATask) return

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)
        const overIndex = tasks.findIndex((t) => t.id === overId)

        // if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
        //   // Fix introduced after video recording
        //   tasks[activeIndex].columnId = tasks[overIndex].columnId
        //   return arrayMove(tasks, activeIndex, overIndex - 1)
        // }

        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === 'Column'

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId)

        // tasks[activeIndex].columnId = overId
        console.log('DROPPING TASK OVER COLUMN', { activeIndex })
        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }
}
