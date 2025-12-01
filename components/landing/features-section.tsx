import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, BarChart3, Calendar, Users, Zap, Shield } from "lucide-react";

const features = [
    {
        icon: Sparkles,
        title: "Gemini 3.0 Suggestions",
        description: "Get smart task recommendations powered by Google's latest Gemini 3.0 model."
    },
    {
        icon: BarChart3,
        title: "Advanced Analytics",
        description: "Visualize your productivity with detailed charts and progress tracking."
    },
    {
        icon: Calendar,
        title: "Calendar Sync",
        description: "Seamlessly integrate with Google Calendar to manage your schedule in one place."
    },
    {
        icon: Users,
        title: "Team Collaboration",
        description: "Invite team members, assign tasks, and track progress together in real-time."
    },
    {
        icon: Zap,
        title: "Instant Actions",
        description: "Quickly create and organize tasks with natural language processing."
    },
    {
        icon: Shield,
        title: "Enterprise Security",
        description: "Bank-grade encryption and secure authentication via Google."
    }
];

export function FeaturesSection() {
    return (
        <section id="features" className="py-20 px-4 bg-gray-900/50">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Everything you need to manage your projects and boost team productivity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <Card key={index} className="bg-card/50 border-gray-800 hover:border-purple-500/50 transition-colors">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6 text-purple-500" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-400">{feature.description}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
