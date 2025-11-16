// components/private/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../homePage/Logo";
import { useRouter } from 'next/navigation';
import { useUser } from "./UserProvider";


const NAV = [
    { href: "/dashboard", icon: "dashboard", label: "Tableau de bord" },
    { href: "/performances", icon: "avg_pace", label: "Performances" },
    { href: "/activities", icon: "map", label: "Mes courses" },
    { href: "/stats", icon: "bar_chart", label: "Statistiques" },
    { href: "/goals", icon: "check_circle", label: "Objectifs" },
    { href: "/profile", icon: "person", label: "Profil" },
];

export default function Sidebar() {
    const router = useRouter();
    const { user, loading } = useUser();
    const userName = user?.userName || user?.email || "Utilisateur";
    async function handleLogout() {
        try {
            await fetch('/api/session', { method: 'DELETE', credentials: 'include' });
        } catch { }
        router.replace('/login');
    }

    const pathname = usePathname();

    return (
        <aside className="flex-shrink-0 w-64 bg-white border-r border-gray-100 p-4">
            <div className="flex flex-col h-full">
                {/* Brand */}
                <div className="flex items-center p-2 mb-2 ml-5">
                    <Logo width="150" height="150" />
                </div>

                {/* User */}
                <div className="flex gap-3 items-center p-2">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                        style={{ backgroundImage: `url("/profile.svg")` }}
                        aria-label="User profile picture"
                    />
                    <div className="flex flex-col">
                        <h1 className="text-text-primary text-base font-medium">{userName}</h1>
                        <p className="text-text-secondary text-sm">Coureur passionné</p>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex flex-col gap-2 mt-4">
                    {NAV.map((item) => {
                        const active = pathname === item.href || pathname?.startsWith(item.href + "/");
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${active ? "bg-primary/10 text-primary" : "text-text-secondary hover:bg-gray-100"}`}
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto flex flex-col gap-1">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-text-secondary"
                        title="Déconnexion"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        <p className="text-sm font-medium">Déconnexion</p>
                    </button>
                </div>
            </div>
        </aside>
    );
}
