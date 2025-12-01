import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function HeroSection() {
    const { signInWithGoogle } = useAuth();

    return (
        <section className="pt-32 pb-20 px-4">
            <div className="container mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 mb-8 border border-purple-500/20">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                    <span className="text-sm font-medium">New: Gemini 3.0 Integration</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    Manage Tasks with <br />
                    <span className="text-purple-500">AI Intelligence</span>
                </h1>

                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                    Boost your productivity with AI-powered task suggestions, smart analytics, and seamless team collaboration.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        size="lg"
                        className="h-12 px-8 text-lg bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto"
                        onClick={signInWithGoogle}
                    >
                        Start for free
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>

                </div>

                <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-500" />
                        <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-500" />
                        <span>14-day free trial</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
