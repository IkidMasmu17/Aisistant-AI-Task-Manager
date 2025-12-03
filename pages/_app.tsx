import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { Sidebar } from "@/components/sidebar";
import Head from "next/head";
import { Bell, Search, Moon, Sun } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { useTheme } from "next-themes";

function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg relative"
        >
            {/* Sun: Visible in Dark (scale-100), Hidden in Light (scale-0) */}
            <Sun className="h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            {/* Moon: Visible in Light (scale-100), Hidden in Dark (scale-0) */}
            <Moon className="absolute top-2 left-2 h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}

function AppContent({ Component, pageProps }: AppProps) {
    const { user } = useAuth();
    const router = useRouter();
    const isStandalonePage = router.pathname === "/" || router.pathname === "/login";

    if (isStandalonePage) {
        return <Component {...pageProps} />;
    }

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                            <p className="text-sm text-gray-500">Monitor all of your projects and tasks here</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search anything"
                                    className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                                />
                                <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 rounded">
                                    ⌘ K
                                </kbd>
                            </div>

                            {/* Theme Toggle */}
                            <ThemeToggle />

                            {/* Notifications */}
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>

                            {/* User Avatar */}
                            {user && (
                                <div className="flex items-center gap-2">
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName || "User"}
                                            className="w-8 h-8 rounded-full"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                                            {user.displayName?.charAt(0) || "U"}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Component {...pageProps} />
                </main>
            </div>
        </div>
    );
}

export default function App(props: AppProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <AuthProvider>
                <Head>
                    <title>Aisistant - AI Task Manager</title>
                    <meta name="description" content="Personal task manager with AI integration" />
                </Head>
                <AppContent {...props} />
            </AuthProvider>
        </ThemeProvider>
    );
}
