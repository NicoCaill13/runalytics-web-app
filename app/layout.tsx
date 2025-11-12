export const metadata: Metadata = {
  title: "Runalytics - Donnez un sens à chaque foulée",
  description:
    "Importez vos données de course et découvrez des analyses approfondies pour progresser plus vite et éviter les blessures.",
};

import { cookies } from 'next/headers';
import '../styles/globals.css';

import type { Metadata } from "next";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const initialAuthed = cookieStore.has('runalytics.jwt');

  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className={`bg-background-light text-text-light`}>
        <div className="relative flex min-h-dvh w-full flex-col overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
