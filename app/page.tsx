'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

export default function DashboardPage() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  if (!token) return null;

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Bienvenue {user?.username ?? 'Runner'} — tu es connecté ✅
      </p>

      <div className="mt-6 rounded-xl border bg-white p-4 shadow-sm">
        <p className="text-sm text-neutral-700">
          Ici on affichera <strong>/me</strong>, la semaine en cours et les insights.
        </p>
      </div>
    </main>
  );
}
