import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckSquare, ArrowLeft, Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const { user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("🔄 Login page useEffect triggered");
        console.log("📊 State - loading:", loading, "user:", user?.email || "null");

        if (!loading && user) {
            console.log("✅ User logged in, redirecting to dashboard...");
            router.push("/dashboard");
        } else if (!loading && !user) {
            console.log("⚠️ No user, staying on login page");
        } else if (loading) {
            console.log("⏳ Still loading auth state...");
        }
    }, [user, loading, router]);

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (isSignUp) {
                await signUpWithEmail(email, password);
            } else {
                await signInWithEmail(email, password);
            }
            // Redirect handled by useEffect
        } catch (err: any) {
            setError(err.message || "Authentication failed");
        } finally {
            setIsLoading(false);
        }
    };

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

                    <h2 className="text-3xl font-bold tracking-tight">
                        {isSignUp ? "Create an account" : "Welcome back"}
                    </h2>
                    <p className="mt-2 text-gray-400">
                        {isSignUp ? "Start your AI productivity journey" : "Sign in to access your workspace"}
                    </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
                    <form onSubmit={handleEmailAuth} className="space-y-4">
                        {error && (
                            <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                <Input
                                    type="email"
                                    placeholder="Email address"
                                    className="pl-10 bg-black/50 border-gray-700 focus:border-purple-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    className="pl-10 bg-black/50 border-gray-700 focus:border-purple-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : null}
                            {isSignUp ? "Sign Up" : "Sign In"}
                        </Button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-800" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-black px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full h-12 bg-white text-black hover:bg-gray-200 border-0 font-medium text-base flex items-center justify-center gap-3"
                        onClick={() => {
                            console.log("🔵 Button clicked!");
                            console.log("🔵 signInWithGoogle exists?", typeof signInWithGoogle);
                            if (signInWithGoogle) {
                                signInWithGoogle();
                            } else {
                                alert("ERROR: signInWithGoogle is undefined!");
                            }
                        }}
                        disabled={isLoading}
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
                        Google
                    </Button>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-purple-400 hover:text-purple-300 font-medium hover:underline"
                        >
                            {isSignUp ? "Sign In" : "Sign Up"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
