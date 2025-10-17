'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

export default function LoginPage() {
    const router = useRouter();
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated()) router.replace('/');
    }, [isAuthenticated, router]);

    const handleStravaLogin = () => {
        // Redirige vers ton backend (il renverra ensuite sur /login/callback?token=...)
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/strava`;
    };

    return (
        <main className="grid min-h-screen place-items-center p-6">
            <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
                <h1 className="text-xl font-semibold">Connexion</h1>
                <p className="mt-2 text-sm text-neutral-600">
                    Connecte-toi avec Strava pour accéder à Runalytics.
                </p>

                <button
                    onClick={handleStravaLogin}
                    className="mt-6 w-full rounded-xl border border-neutral-300 bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                >
                    Se connecter via Strava
                </button>
            </div>
        </main>
    );
}
