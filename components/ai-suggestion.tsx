"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Loader2 } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";

export function AISuggestion() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const { addTask } = useTasks();

    const handleSuggest = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
        try {
            const response = await fetch("/api/suggest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();

            if (data.tasks && Array.isArray(data.tasks)) {
                // Add suggested tasks
                for (const taskTitle of data.tasks) {
                    await addTask(taskTitle, "AI Suggested");
                }
                setPrompt("");
            }
        } catch (error) {
            console.error("Failed to get suggestions", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded-lg bg-secondary/20 mb-6">
            <div className="flex items-center gap-2 mb-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                AI Task Assistant
            </div>
            <div className="flex gap-2">
                <Input
                    placeholder="e.g., 'Plan a trip to Japan' or 'Prepare for job interview'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSuggest()}
                    disabled={loading}
                    className="bg-background"
                />
                <Button onClick={handleSuggest} disabled={loading || !prompt.trim()}>
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        "Suggest"
                    )}
                </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
                Enter a goal, and AI will break it down into tasks for you.
            </p>
        </div>
    );
}
