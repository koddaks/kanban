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
import { useEffect, useMemo, useState } from 'react'
import useIssuesStore from '@/store'
import { IssueCard } from './IssueCard'
import { Issue } from '@/types'

export function KanbanBoard() {
  const allIssues = useIssuesStore((state) => state.all)
  const getSortedIssues = useIssuesStore((state) => state.getSortedIssues)
  const sortedIssues = useIssuesStore((state) => state.sortedIssues)
  const [columns] = useState(KANBAN_COLUMNS)
  const columnsId = useMemo(() => columns.map((col) => col.id), [KANBAN_COLUMNS])
  const [activeTask, setActiveTask] = useState<Issue | null>(null)

  const [issueList, setIssueList] = useState<Issue[]>(sortedIssues)

  useEffect(() => {    
    setIssueList(getSortedIssues())
  }, [allIssues, getSortedIssues])

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
        onDragOver={onDragOver}
      >
        <div className="m-auto flex ">
          <div className="flex gap-6">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  issues={issueList.filter((issue) => issue.columnId === col.id)}
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
    if (isActiveATask && isOverATask) {
      setIssueList((issueList): Issue[] => {
        const activeIndex = issueList.findIndex((t) => t.id === activeId)
        const overIndex = issueList.findIndex((t) => t.id === overId)

        if (issueList[activeIndex].columnId != issueList[overIndex].columnId) {
          // Fix introduced after video recording
          issueList[activeIndex].columnId = issueList[overIndex].columnId
          return arrayMove(issueList, activeIndex, overIndex - 1)
        }

        return arrayMove(issueList, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === 'Column'

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setIssueList((issueList) => {
        const activeIndex = issueList.findIndex((t) => t.id === activeId)

        issueList[activeIndex].columnId = overId
        console.log('DROPPING ISSUE OVER COLUMN', { activeIndex })
        return arrayMove(issueList, activeIndex, activeIndex)
      })
    }
  }
}
