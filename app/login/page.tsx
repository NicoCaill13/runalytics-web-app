'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import Image from 'next/image';

const router = useRouter();
const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

export default function LoginPage() {
    useEffect(() => {
        if (isAuthenticated()) router.replace('/');
    }, [isAuthenticated, router]);

    const handleStravaLogin = () => {
        const api = process.env.NEXT_PUBLIC_API_URL!;
        const front = process.env.NEXT_PUBLIC_FRONT_URL || window.location.origin;
        const state = encodeURIComponent(front);
        window.location.href = `${api}/api/auth/login?state=${state}`;
    };

    return (
        <main className="grid min-h-screen place-items-center bg-gradient-to-br from-primary-100 to-white px-6">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-soft">
                <div className="flex flex-col items-center">
                    <Image src="/logo.png" alt="Runalytics" width={72} height={72} />
                    <h1 className="mt-4 text-2xl font-semibold text-ink">Bienvenue</h1>
                    <p className="mt-1 text-center text-sm text-muted">
                        Connecte-toi avec Strava pour analyser tes entraînements.
                    </p>
                </div>

                <button
                    onClick={handleStravaLogin}
                    className="mt-8 w-full rounded-xl bg-accent px-4 py-3 text-white transition hover:bg-accent-600"
                >
                    Se connecter via Strava
                </button>

                <p className="mt-4 text-center text-xs text-muted">
                    En continuant, tu acceptes l’accès en lecture à tes activités Strava.
                </p>
            </div>
        </main>
    );
}
