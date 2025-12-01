"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { useAuth } from "@/components/auth-provider";
import { TaskItem } from "./task-item";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AISuggestion } from "./ai-suggestion";

export function TaskList() {
    const { tasks, loading, addTask, toggleTask, deleteTask } = useTasks();
    const { isPro } = useAuth();
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        await addTask(newTaskTitle);
        setNewTaskTitle("");
    };

    if (loading) {
        return <div className="text-center py-10">Loading tasks...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <AISuggestion isPro={isPro} />

            <form onSubmit={handleAddTask} className="flex gap-2 mb-8">
                <Input
                    placeholder="Add a new task..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="flex-1"
                />
                <Button type="submit">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                </Button>
            </form>

            <div className="space-y-2">
                {tasks.length === 0 ? (
                    <div className="text-center text-muted-foreground py-10">
                        No tasks yet. Add one above!
                    </div>
                ) : (
                    tasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
