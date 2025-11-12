'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoginButton from '@/components/button/LoginButton';


const API_BASE = (process.env.BACK_APP_URL ?? 'http://localhost:3000');
const LOGIN_URL = `${API_BASE}/api/auth/login-url`;

export default function LoginPage() {
    const router = useRouter();
    const params = useSearchParams();

    const getCookies = async () => {
        await fetch('/api/session', { method: 'DELETE', credentials: 'include' });
    }

    useEffect(() => {
        try {
            getCookies()
            const next = params.get('next') || '/';
            router.replace(next);
        } catch { }
    }, [params, router]);

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const startLogin = useCallback(async () => {
        setLoading(true);
        setErr(null);
        try {
            const res = await fetch(LOGIN_URL, {
                method: 'GET',
                headers: { Accept: 'application/json' },
            });
            if (!res.ok) throw new Error(`Backend HTTP ${res.status}`);
            const data = await res.json();
            if (!data?.url) throw new Error('URL OAuth manquante');
            window.location.assign(data.url);
        } catch (e: any) {
            setErr(e?.message || 'Erreur réseau');
            setLoading(false);
        }
    }, []);

    return (
        <div className="min-h-dvh grid place-items-center px-4">
            <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <div className="p-6">
                    <div className="mb-6 text-center">
                        <div className="text-2xl font-semibold tracking-tight">Runalytics</div>
                        <div className="mt-1 text-sm text-neutral-500">Connecte-toi pour continuer</div>
                    </div>
                    <LoginButton />
                </div>
            </div>
        </div>
    );
}
