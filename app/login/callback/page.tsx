'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { setTokenFromString } from '@/lib/auth';

export default function LoginCallbackPage() {
    const router = useRouter();
    const params = useSearchParams();
    const setToken = useAuthStore((s) => s.setToken);
    const bootstrapFromToken = useAuthStore((s) => s.bootstrapFromToken);

    useEffect(() => {
        const token = params.get('token');
        if (token) {
            setTokenFromString(token); // localStorage
            setToken(token);
            bootstrapFromToken(token); // récupère user du payload si dispo
            router.replace('/');
        } else {
            router.replace('/login');
        }
    }, [params, router, setToken, bootstrapFromToken]);

    return (
        <main className="grid min-h-screen place-items-center p-6">
            <p className="text-sm text-neutral-600">Connexion en cours…</p>
        </main>
    );
}
