import { TaskList } from "@/components/task-list";
import { Analytics } from "@/components/analytics";

export default function Home() {
    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">My Tasks</h1>
                <p className="text-muted-foreground">Manage your daily goals with AI assistance.</p>
            </div>
            <Analytics />
            <TaskList />
        </div>
    );
}
