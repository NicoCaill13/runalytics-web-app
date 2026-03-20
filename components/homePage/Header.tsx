"use client";
import { useRouter } from "next/navigation";
import Logo from "./Logo";

export default function Header() {
    const router = useRouter();
    return (
        <header className="sticky top-0 z-50 w-full bg-background-light/80 backdrop-blur-sm border-b border-gray-200">
            <div className="mx-auto w-full max-w-[1200px]  flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="text-secondary ">
                        <Logo width="100" height="100" />
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <nav className="flex items-center gap-9">
                        <a className="text-sm font-medium text-slate-600 hover:text-secondary" href="#">Fonctionnalités</a>
                        <a className="text-sm font-medium text-slate-600 hover:text-secondary" href="#">Tarifs</a>
                        <a className="text-sm font-medium text-slate-600 hover:text-secondary" href="#">À propos</a>
                    </nav>
                    <div className="flex gap-2">
                        <button className="h-10 px-4 rounded-lg border border-primary/20 text-primary text-sm font-bold hover:bg-primary/5"
                            onClick={() => router.push("/login")}>
                            Se connecter
                        </button>
                        <button className="h-10 px-4 rounded-lg border border-primary/20 text-primary text-sm font-bold hover:bg-primary/5"
                            onClick={() => router.push("/register")}>
                            S’inscrire
                        </button>
                        <button className="h-10 px-4 rounded-lg bg-secondary text-white text-sm font-bold hover:bg-opacity-90 shadow-md shadow-secondary/20 hover:shadow-lg hover:shadow-secondary/30">
                            Commencer l'analyse
                        </button>
                    </div>
                </div>

                <button className="md:hidden">
                    <span className="material-symbols-outlined">menu</span>
                </button>
            </div>
        </header>
    )
}