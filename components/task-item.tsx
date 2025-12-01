"use client";

import { Task } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar } from "lucide-react";

interface TaskItemProps {
    task: Task;
    onToggle: (id: string, status: "pending" | "completed") => void;
    onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
    return (
        <div className="flex items-center justify-between p-4 border rounded-lg bg-card text-card-foreground shadow-sm mb-2">
            <div className="flex items-center gap-3">
                <Checkbox
                    checked={task.status === "completed"}
                    onCheckedChange={() => onToggle(task.id, task.status)}
                    className="h-5 w-5"
                />
                <div className={task.status === "completed" ? "line-through text-muted-foreground" : ""}>
                    <h3 className="font-medium">{task.title}</h3>
                    {task.dueDate && (
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                    )}
                </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
        </div>
    );
}
