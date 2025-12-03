import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const screenshots = [
    {
        title: "Dashboard Overview",
        description: "Track all your projects and tasks at a glance",
        image: "/screenshots/dashboard.png",
    },
    {
        title: "Task Management",
        description: "Organize and prioritize with AI-powered suggestions",
        image: "/screenshots/tasks.png",
    },
    {
        title: "Calendar Integration",
        description: "Seamlessly sync with your Google Calendar",
        image: "/screenshots/calendar.png",
    },
];

export function ProductShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-20 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        See Aisistant in Action
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Experience the power of AI-driven task management
                    </p>
                </motion.div>

                {/* Screenshot Display */}
                <div className="relative">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative mx-auto max-w-6xl"
                    >
                        <div
                            className="relative rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20"
                            style={{
                                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
                            }}
                        >
                            <div className="p-4 md:p-8">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative aspect-video rounded-lg overflow-hidden shadow-xl"
                                >
                                    <Image
                                        src={screenshots[activeIndex].image}
                                        alt={screenshots[activeIndex].title}
                                        width={1920}
                                        height={1080}
                                        layout="responsive"
                                        className="object-cover"
                                        priority
                                    />
                                </motion.div>
                            </div>
                        </div>

                        {/* Glow effect */}
                        <div
                            className="absolute inset-0 -z-10 rounded-2xl opacity-20 blur-3xl"
                            style={{
                                background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
                            }}
                        />
                    </motion.div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center gap-3 mt-8">
                        {screenshots.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`transition-all duration-300 rounded-full ${index === activeIndex
                                    ? "w-12 h-3 bg-gradient-to-r from-purple-500 to-blue-500"
                                    : "w-3 h-3 bg-gray-600 hover:bg-gray-500"
                                    }`}
                                aria-label={`View ${screenshots[index].title}`}
                            />
                        ))}
                    </div>

                    {/* Screenshot Info */}
                    <motion.div
                        key={`info-${activeIndex}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-center mt-8"
                    >
                        <h3 className="text-2xl font-bold text-white mb-2">
                            {screenshots[activeIndex].title}
                        </h3>
                        <p className="text-gray-400">
                            {screenshots[activeIndex].description}
                        </p>
                    </motion.div>
                </div>

                {/* Feature Grid below screenshots */}
                <div className="grid md:grid-cols-3 gap-6 mt-16">
                    {screenshots.map((item, index) => (
                        <motion.button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-6 rounded-xl border transition-all duration-300 text-left ${index === activeIndex
                                ? "border-purple-500/50 bg-purple-500/10"
                                : "border-gray-800 bg-gray-900/30 hover:border-gray-700"
                                }`}
                        >
                            <h4 className="font-semibold text-lg mb-2 text-white">
                                {item.title}
                            </h4>
                            <p className="text-gray-400 text-sm">
                                {item.description}
                            </p>
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    );
}
