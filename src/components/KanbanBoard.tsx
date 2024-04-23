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
import { IssueCard } from './IssueCard'
import { Issue, IssueStatus } from '@/types/issues'
import useIssuesStore from '@/store'
import { useEffect, useState } from 'react'

const columnsId = KANBAN_COLUMNS.map((col) => col.id)

export function KanbanBoard() {
  const storeIssues = useIssuesStore((state) => state.getIssuesForRepo())
  const setStoreIssues = useIssuesStore((state) => state.setIssuesForRepo)
  const repoName = useIssuesStore((state) => state.currentRepoInfo?.repo)
  const [issues, setIssues] = useState<Issue[]>(storeIssues)
  const [activeIssue, setActiveIssue] = useState<Issue | null>(null)



  useEffect(() => {
    if (!repoName) return
    setIssues(storeIssues)
  }, [issues, repoName, storeIssues])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  return (
    <div className="flex gap-2">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <SortableContext items={columnsId}>
          {KANBAN_COLUMNS.map((col) => (
            <ColumnContainer
              key={col.id}
              column={col}
              issues={issues.filter((issue) => issue.status === col.id)}
            />
          ))}
        </SortableContext>
        {createPortal(
          <DragOverlay>{activeIssue && <IssueCard issue={activeIssue} />}</DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Issue') {
      setActiveIssue(event.active.data.current.issue)
      return
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveIssue(null)

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
      setIssues((issues): Issue[] => {
        const activeIndex = issues.findIndex((t) => t.id === activeId)
        const overIndex = issues.findIndex((t) => t.id === overId)

        if (issues[activeIndex].status != issues[overIndex].status) {
          issues[activeIndex].status = issues[overIndex].status
          return arrayMove(issues, activeIndex, overIndex - 1)
        }

        return arrayMove(issues, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === 'Column'

    if (isActiveATask && isOverAColumn) {
      setIssues((issues) => {
        const activeIndex = issues.findIndex((t) => t.id === activeId)   

        issues[activeIndex].status = overId as IssueStatus 
        return arrayMove(issues, activeIndex, activeIndex)
      })
    }
    setStoreIssues(issues)
  }
}
