export const metadata = {
  title: 'Runalytics',
  description: 'Coach Intelligence for runners',
};

import DashboardNav from '@/components/navbar/DashboardNav';
import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-dvh bg-white text-black">
        {/* Synchronise localStorage -> cookie pour le middleware */}
        {/* Header global, full width */}
        <DashboardNav />
        {/* Contenu de page (tu peux le contraindre en largeur ici si tu veux) */}
        <main className="min-h-[calc(100dvh-150px)]">{children}</main>
      </body>
    </html>
  );
}
