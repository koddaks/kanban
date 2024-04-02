import { ReactNode } from "react";

interface KanbanBoardProps {
    children: ReactNode;
}

export function KanbanBoard({children}: KanbanBoardProps) {   
    return (
        <div className="flex  border-collapse gap-4 p-[20px]">
            {children}
        </div>
    )
}