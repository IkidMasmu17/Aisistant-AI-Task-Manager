import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
    const { signInWithGoogle } = useAuth();

    return (
        <section className="pt-32 pb-20 px-4 relative">
            <div className="container mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 mb-8 border border-purple-500/20"
                >
                    <motion.span
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="relative flex h-2 w-2"
                    >
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </motion.span>
                    <span className="text-sm font-medium">New: Gemini 3.0 Integration</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                        Manage Tasks with <br />
                    </span>
                    <motion.span
                        className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 inline-flex items-center gap-3"
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 5, repeat: Infinity }}
                    >
                        AI Intelligence
                        <Sparkles className="w-10 h-10 md:w-14 md:h-14 text-purple-400" />
                    </motion.span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl text-gray-400 max-w-2xl mx-auto mb-10"
                >
                    Boost your productivity with AI-powered task suggestions, smart analytics, and seamless team collaboration.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/login">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                size="lg"
                                className="h-12 px-8 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white w-full sm:w-auto shadow-lg shadow-purple-500/30"
                            >
                                Start for free
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </motion.div>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500"
                >
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-2"
                    >
                        <CheckCircle2 className="w-4 h-4 text-purple-500" />
                        <span>No credit card required</span>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-2"
                    >
                        <CheckCircle2 className="w-4 h-4 text-purple-500" />
                        <span>14-day free trial</span>
                    </motion.div>
                </motion.div>

                {/* Floating icons */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 left-10 hidden lg:block"
                >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-purple-400" />
                    </div>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-40 right-10 hidden lg:block"
                >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30" />
                </motion.div>
            </div>
        </section>
    );
}
