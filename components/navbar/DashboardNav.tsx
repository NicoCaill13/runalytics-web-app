'use client';

import LogoutButton from "../button/LogoutButton";
import Image from "next/image";

export default function DashboardNav() {
    return (
        <header className="sticky top-0 z-20 h-[150px] w-full bg-white">
            <div className="flex h-full w-full items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <Image
                        src="/logo.png"
                        width={120}
                        height={120}
                        alt="Runalytics"
                        className="h-[120px] w-[120px] object-contain"
                        priority
                    />
                    <span className="text-2xl text-center font-semibold leading-none">Runalytics, tu cours, on analyse</span>
                </div>
                <nav className="flex items-center gap-3">
                    <LogoutButton />
                </nav>
            </div>
        </header>
    );
}
