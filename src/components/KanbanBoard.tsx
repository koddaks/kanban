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
import { useEffect, useState } from 'react'
import useIssuesStore from '@/store'
import { IssueCard } from './IssueCard'
import { RepoInfo } from '@/types'
import { extractOwnerAndRepo } from '@/utils'
import { Issue, IssueStatus } from '@/types/issues'

const columnsId = KANBAN_COLUMNS.map((col) => col.id)

export function KanbanBoard() {
  const setIssuesForRepo = useIssuesStore((state) => state.setIssuesForRepo)
  const setRepoToRepoList = useIssuesStore((state) => state.setRepoToRepoList)
  const currentRepoUrl = useIssuesStore((state) => state.currentRepoUrl)
  const issuesByStore = useIssuesStore((state) => state.issuesByStore)

  const [activeIssue, setActiveIssue] = useState<Issue | null>(null)
  const [issueList, setIssueList] = useState<Issue[]>([])
  
  const ownerAndRepoInfo: RepoInfo | null = extractOwnerAndRepo(currentRepoUrl)

  useEffect(() => {
    if (ownerAndRepoInfo) {
      setRepoToRepoList(ownerAndRepoInfo)
    }
  }, [currentRepoUrl])

  useEffect(() => {
    setIssueList(issuesByStore[currentRepoUrl] || [])
  }, [currentRepoUrl, issuesByStore])

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
              issues={issueList.filter((issue) => issue.status === col.id)}
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
    setIssuesForRepo(issueList)

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

        if (issueList[activeIndex].status != issueList[overIndex].status) {
          issueList[activeIndex].status = issueList[overIndex].status
          return arrayMove(issueList, activeIndex, overIndex - 1)
        }

        return arrayMove(issueList, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === 'Column'

    if (isActiveATask && isOverAColumn) {
      setIssueList((issueList) => {
        const activeIndex = issueList.findIndex((t) => t.id === activeId)
        issueList[activeIndex].status = overId as IssueStatus
    
        return arrayMove(issueList, activeIndex, activeIndex)
      })
    }   
  }
}
