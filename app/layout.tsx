export const metadata = {
  title: 'Runalytics',
  description: 'Coach Intelligence for runners',
};

import '../styles/globals.css';
import Image from 'next/image';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen">
        {/* Header minimal pour check visuel */}
        <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" width={36} height={36} alt="Runalytics" />
              <span className="text-lg font-semibold">Runalytics</span>
            </div>
            <nav className="flex gap-3">
              <Link href="/login" className="btn btn-ghost text-sm">Login</Link>
              <Link href="/" className="btn btn-primary text-sm">Dashboard</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
