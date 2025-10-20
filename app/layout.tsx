export const metadata = {
  title: 'Runalytics',
  description: 'Coach Intelligence for runners',
};
import { cookies } from 'next/headers';
import { AuthProvider } from '@/components/auth/AuthProvider';
import DashboardNav from '@/components/navbar/DashboardNav';
import '../styles/globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const initialAuthed = cookieStore.has('runalytics.jwt');

  return (
    <html lang="fr">
      <body className="min-h-dvh bg-white text-black">
        <AuthProvider initialAuthed={initialAuthed}>
          <DashboardNav />
          <main className="min-h-[calc(100dvh-150px)]">{children}</main>
        </AuthProvider>

      </body>
    </html>
  );
}
