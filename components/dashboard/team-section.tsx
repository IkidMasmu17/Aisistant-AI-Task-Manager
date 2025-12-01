import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const teamMembers = [
    { name: "Steve Wuckert", email: "steve@example.com", status: "Complete", avatar: "SW" },
    { name: "Carlton Littel", email: "carlton@example.com", status: "In progress", avatar: "CL" },
    { name: "Ricky Auer", email: "ricky@example.com", status: "Pending", avatar: "RA" },
    { name: "Terrence Marvin", email: "terrence@example.com", status: "Complete", avatar: "TM" },
    { name: "Kenneth Donnelly", email: "kenneth@example.com", status: "In progress", avatar: "KD" },
];

const statusColors = {
    "Complete": "bg-green-100 text-green-700",
    "In progress": "bg-yellow-100 text-yellow-700",
    "Pending": "bg-red-100 text-red-700",
};

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
                <div className="space-y-3">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-semibold text-sm">
                                    {member.avatar}
                                </div>
                                <div>
                                    <div className="font-medium text-sm">{member.name}</div>
                                    <div className="text-xs text-gray-500">{member.email}</div>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[member.status as keyof typeof statusColors]}`}>
                                {member.status}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
