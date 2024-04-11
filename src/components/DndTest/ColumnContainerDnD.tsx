import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { Column, Task } from './types'

import { useMemo } from 'react'
import TaskCard from './TaskCard'

interface Props {
  column: Column
  tasks: Task[]
}

function ColumnContainer({ column, tasks }: Props) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id)
  }, [tasks])

  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  })

  return (
    <div
      ref={setNodeRef}
      className="bg-columnBackgroundColor flex h-[500px] max-h-[500px] w-[350px] flex-col rounded-md"
    >
      {/* Column title */}
      <div className="bg-mainBackgroundColor text-md border-columnBackgroundColor flex h-[60px] items-center justify-between rounded-md rounded-b-none border-4 p-3 font-bold">
        {' '}
        {column.title}
      </div>

      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

export default ColumnContainer
