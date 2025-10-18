'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

import AppShell from '@/components/layout/AppShell';
import { Card, CardTitle } from '@/components/ui/Card';
import { Stat } from '@/components/ui/Stat';

function Stats({ label, value, tone }: { label: string; value: string; tone?: 'up' | 'down' | 'flat' }) {
  const toneClasses = tone === 'up' ? 'text-success' : tone === 'down' ? 'text-danger' : 'text-muted';
  const arrow = tone === 'up' ? '▲' : tone === 'down' ? '▼' : '•';
  return (
    <div className="card p-5">
      <div className="text-sm text-muted">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <div className="text-2xl font-semibold">{value}</div>
        <div className={`text-sm ${toneClasses}`}>{arrow}</div>
      </div>
    </div>
  );
}

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
    <main className="mx-auto max-w-6xl px-6 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted">Vue d’ensemble de ta semaine</p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button className="btn btn-ghost">Sync Strava</button>
          <button className="btn btn-primary">Nouvelle analyse</button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat label="Distance semaine" value="42.8 km" tone="up" />
        <Stat label="Charge (AU)" value="318" tone="down" />
        <Stat label="ACWR" value="1.12" tone="flat" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <div className="text-base font-semibold">Évolution de la charge</div>
          <div className="mt-3 h-56 rounded-xl bg-gray-100" />
        </div>
        <div className="card p-5">
          <div className="text-base font-semibold">Répartition FC (Z1–Z5)</div>
          <div className="mt-3 h-56 rounded-xl bg-gray-100" />
        </div>
      </div>
    </main>
  );
}
