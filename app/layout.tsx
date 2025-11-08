export const metadata: Metadata = {
  title: "Runalytics - Donnez un sens à chaque foulée",
  description:
    "Importez vos données de course et découvrez des analyses approfondies pour progresser plus vite et éviter les blessures.",
};

import { cookies } from 'next/headers';
import { AuthProvider } from '@/components/auth/AuthProvider';
import '../styles/globals.css';

import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import '../styles/globals.css';

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});



export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const initialAuthed = cookieStore.has('runalytics.jwt');

  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className={`${lexend.className} bg-background-light text-text-light`}>
        <AuthProvider initialAuthed={initialAuthed}>
          <div className="relative flex min-h-dvh w-full flex-col overflow-x-hidden">
            {children}
          </div>
        </AuthProvider>

      </body>
    </html>
  );
}
