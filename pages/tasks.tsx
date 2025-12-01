import { TaskList } from "@/components/task-list";
import { Analytics } from "@/components/analytics";

export default function TasksPage() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">My Tasks</h2>
                <p className="text-gray-500">Manage your daily goals with AI assistance.</p>
            </div>
            <Analytics />
            <TaskList />
        </div>
    );
}
