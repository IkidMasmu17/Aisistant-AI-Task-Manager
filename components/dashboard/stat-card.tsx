import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
    title: string;
    value: number;
    trend?: number;
    trendLabel?: string;
}

export function StatCard({ title, value, trend, trendLabel }: StatCardProps) {
    const isPositive = trend && trend > 0;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {title}
                </CardTitle>
                <button className="text-gray-400 hover:text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="3" r="1" fill="currentColor" />
                        <circle cx="8" cy="8" r="1" fill="currentColor" />
                        <circle cx="8" cy="13" r="1" fill="currentColor" />
                    </svg>
                </button>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">{value}</div>
                {trend !== undefined && (
                    <div className="flex items-center gap-1 mt-2">
                        {isPositive ? (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                            <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            {Math.abs(trend)}%
                        </span>
                        <span className="text-xs text-gray-500">{trendLabel}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
