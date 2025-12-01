import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckSquare } from "lucide-react";
import { useAuth } from "@/components/auth-provider";

export function LandingNavbar() {
    const { user, signInWithGoogle } = useAuth();

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <CheckSquare className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl">Aisistant</span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="#features"><a className="text-sm font-medium hover:text-primary transition-colors">Features</a></Link>
                    <Link href="#pricing"><a className="text-sm font-medium hover:text-primary transition-colors">Pricing</a></Link>
                    <Link href="#contact"><a className="text-sm font-medium hover:text-primary transition-colors">Contact</a></Link>
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <Link href="/dashboard">
                            <Button>Go to Dashboard</Button>
                        </Link>
                    ) : (
                        <>
                            <Button variant="ghost" onClick={signInWithGoogle}>Login</Button>
                            <Button onClick={signInWithGoogle} className="bg-purple-600 hover:bg-purple-700 text-white">
                                Start for free
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
