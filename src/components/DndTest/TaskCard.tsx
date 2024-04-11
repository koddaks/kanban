import { Task } from './types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Props {
  task: Task
}

function TaskCard({ task }: Props) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        bg-mainBackgroundColor relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl border-2 border-rose-500 p-2.5  text-left opacity-30"
      />
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-mainBackgroundColor task relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-rose-500"
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>
    </div>
  )
}

export default TaskCard
