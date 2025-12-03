import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, BarChart3, Calendar, Users, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

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

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export function FeaturesSection() {
    return (
        <section id="features" className="py-20 px-4 bg-gray-900/50 relative">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Powerful Features
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Everything you need to manage your projects and boost team productivity.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={item}
                                whileHover={{
                                    scale: 1.05,
                                    rotateY: 5,
                                    rotateX: 5,
                                }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="perspective-1000"
                            >
                                <Card className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 border-gray-800 hover:border-purple-500/50 transition-all duration-300 h-full backdrop-blur-sm group">
                                    <CardHeader>
                                        <motion.div
                                            whileHover={{ rotate: 360, scale: 1.2 }}
                                            transition={{ duration: 0.6 }}
                                            className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-purple-500/50"
                                        >
                                            <Icon className="w-6 h-6 text-purple-500" />
                                        </motion.div>
                                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-400">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
