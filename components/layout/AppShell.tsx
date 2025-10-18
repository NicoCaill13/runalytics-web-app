'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavItem = ({ href, label, icon }: { href: string; label: string; icon?: React.ReactNode }) => {
    const pathname = usePathname();
    const active = pathname === href;
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm
        ${active ? 'bg-primary-100 text-primary' : 'text-ink hover:bg-gray-100'}`}
        >
            {icon}{label}
        </Link>
    );
};

export default function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-bg">
            <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-3">
                        <Image src="/logo.png" alt="Runalytics" width={36} height={36} />
                        <span className="text-lg font-semibold text-ink">Runalytics</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/profile" className="text-sm text-muted hover:text-ink">Profil</Link>
                        <Link href="/logout" className="rounded-xl border px-3 py-1.5 text-sm text-ink hover:bg-gray-50">Déconnexion</Link>
                    </div>
                </div>
            </header>

            <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-6">
                <aside className="col-span-3 lg:col-span-2">
                    <nav className="space-y-1">
                        <NavItem href="/" label="Dashboard" />
                        <NavItem href="/analysis" label="Analyse" />
                        <NavItem href="/activities" label="Activités" />
                        <NavItem href="/coach" label="Coach" />
                    </nav>
                </aside>
                <main className="col-span-9 lg:col-span-10">{children}</main>
            </div>
        </div>
    );
}
