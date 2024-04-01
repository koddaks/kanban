import { ReactNode } from "react";

interface KanbanBoardProps {
    children: ReactNode;
}

export function KanbanBoard({children}: KanbanBoardProps) {
    return (
        <div className="flex  border-collapse gap-4 rounded-lg border-2 border-solid border-indigo-600 bg-slate-300 p-[20px]">
            {children}
        </div>
    )
}