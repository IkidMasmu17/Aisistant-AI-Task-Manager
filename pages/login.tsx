import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { CheckSquare, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const { user, loading, signInWithGoogle } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push("/dashboard");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="z-10 w-full max-w-md space-y-8">
                <div className="text-center">
                    <Link href="/">
                        <a className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-8 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </a>
                    </Link>

                    <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <CheckSquare className="w-7 h-7 text-white" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
                    <p className="mt-2 text-gray-400">
                        Sign in to access your AI-powered workspace
                    </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
                    <div className="space-y-4">
                        <Button
                            className="w-full h-12 bg-white text-black hover:bg-gray-200 font-medium text-base flex items-center justify-center gap-3"
                            onClick={signInWithGoogle}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Sign in with Google
                        </Button>
                    </div>

                    <div className="mt-6 text-center text-xs text-gray-500">
                        By continuing, you agree to our{" "}
                        <a href="#" className="underline hover:text-gray-400">Terms of Service</a>
                        {" "}and{" "}
                        <a href="#" className="underline hover:text-gray-400">Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </div>
    );
}
