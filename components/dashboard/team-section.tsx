import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export function TeamSection() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Team Collaboration</CardTitle>
                <button className="text-purple-600 hover:text-purple-700">
                    <Plus className="w-5 h-5" />
                </button>
            </CardHeader>
            <CardContent>
                <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">No team members yet</p>
                    <p className="text-xs mt-1">Click the + button to add team members</p>
                </div>
            </CardContent>
        </Card>
    );
}
