"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Complete', value: 50, color: '#8b5cf6' },
    { name: 'Project Progress', value: 30, color: '#a78bfa' },
    { name: 'In complete', value: 20, color: '#e5e7eb' },
];

export function ProgressChart() {
    const totalProgress = data[0].value + data[1].value;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Project Progress</CardTitle>
                <button className="text-gray-400 hover:text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="3" r="1" fill="currentColor" />
                        <circle cx="8" cy="8" r="1" fill="currentColor" />
                        <circle cx="8" cy="13" r="1" fill="currentColor" />
                    </svg>
                </button>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center">
                    <div className="relative">
                        <ResponsiveContainer width={200} height={200}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx={100}
                                    cy={100}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-3xl font-bold">{totalProgress}%</div>
                            <div className="text-sm text-gray-500">Progress</div>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-4 mt-4">
                    {data.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-xs text-gray-600">{item.name}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
