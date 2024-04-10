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

  const [issueList, setIssueList] = useState<Issue[]>(issues)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  return (
    <div className="flex border-collapse p-[20px] ">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        // onDragOver={onDragOver}
      >
        <div className="m-auto flex ">
          <div className="flex gap-6">
            <SortableContext items={columnsId}>
              {KANBAN_COLUMNS.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  issues={sortIssuesByColumn(issueList, col.id)}
                />
              ))}
            </SortableContext>
          </div>
        </div>

        {createPortal(
          <DragOverlay>{activeTask && <IssueCard issue={activeTask} />}</DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )

  function onDragStart(event: DragStartEvent) {    
    if (event.active.data.current?.type === 'Issue') {
      setActiveTask(event.active.data.current.issue)      
      return
    }
  }


  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event
    const activeId = active.id
    const overId = over?.id

    if (event.active.id === event.over?.id) {
      return
    }

    setIssueList((issueList): Issue[] => {
      let activeIndex = issueList.findIndex((issue) => issue.id === activeId)
      let overIndex = issueList.findIndex((issue) => issue.id === overId)

      return arrayMove(issueList, activeIndex, overIndex)
    })
  }
}
