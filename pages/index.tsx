import { StatCard } from "@/components/dashboard/stat-card";
import { TeamSection } from "@/components/dashboard/team-section";
import { useTasks } from "@/hooks/useTasks";
import dynamic from "next/dynamic";

// Import charts dengan dynamic import untuk menghindari SSR issues
const AnalyticsChart = dynamic(
    () => import("@/components/dashboard/analytics-chart").then(mod => mod.AnalyticsChart),
    { ssr: false }
);

const ProgressChart = dynamic(
    () => import("@/components/dashboard/progress-chart").then(mod => mod.ProgressChart),
    { ssr: false }
);

export default function Home() {
    const { tasks } = useTasks();

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === "completed").length;
    const pendingTasks = tasks.filter(t => t.status === "pending").length;
    const runningTasks = Math.floor(totalTasks * 0.5); // Mock data

    return (
        <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Project"
                    value={totalTasks}
                    trend={5}
                    trendLabel="Increased form last month"
                />
                <StatCard
                    title="Completed Projects"
                    value={completedTasks}
                    trend={8}
                    trendLabel="Increased form last month"
                />
                <StatCard
                    title="Running Project"
                    value={runningTasks}
                    trend={-10}
                    trendLabel="Increased form last month"
                />
                <StatCard
                    title="Pending projects"
                    value={pendingTasks}
                    trend={-6}
                    trendLabel="Increased form last month"
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnalyticsChart />
                <ProgressChart />
            </div>

            {/* Team Section */}
            <TeamSection />
        </div>
    );
}
