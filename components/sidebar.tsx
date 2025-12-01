"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/components/auth-provider";
import {
    LayoutDashboard,
    CheckSquare,
    Calendar,
    BarChart3,
    Users,
    Settings,
    HelpCircle,
    Plus,
    UserPlus,
    LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: CheckSquare, label: "Tasks", href: "/tasks" },
    { icon: Calendar, label: "Calendar", href: "/calendar" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: Users, label: "Team", href: "/team" },
];

const generalItems = [
    { icon: Settings, label: "Setting", href: "/settings" },
    { icon: HelpCircle, label: "Help", href: "/help" },
];

export function Sidebar() {
    const router = useRouter();
    const { user, logout } = useAuth();

    return (
        <aside className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <CheckSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg">Aisistant</h1>
                        <p className="text-xs text-gray-500">AI Task Manager</p>
                    </div>
                </div>
            </div>

            {/* Main Menu */}
            <div className="flex-1 overflow-y-auto py-4">
                <div className="px-4 mb-6">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Main Menu</p>
                    <nav className="space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = router.pathname === item.href;
                            return (
                                <Link key={item.href} href={item.href}>
                                    <a
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${isActive
                                                ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="font-medium">{item.label}</span>
                                    </a>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* General */}
                <div className="px-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-3">General</p>
                    <nav className="space-y-1">
                        {generalItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link key={item.href} href={item.href}>
                                    <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                                        <Icon className="w-5 h-5" />
                                        <span className="font-medium">{item.label}</span>
                                    </a>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                </Button>
                <Button variant="outline" className="w-full">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Member
                </Button>
                {user && (
                    <Button
                        variant="ghost"
                        className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={logout}
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Log Out
                    </Button>
                )}
            </div>
        </aside>
    );
}
