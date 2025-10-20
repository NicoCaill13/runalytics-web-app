'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { looksLikeJwt } from '@/lib/auth';
import { useAuth } from '@/components/auth/AuthProvider';


const API_BASE = (process.env.BACK_APP_URL ?? 'http://localhost:3000');
const LOGIN_URL = `${API_BASE}/api/auth/login-url`;

export default function LoginPage() {
    const router = useRouter();
    const params = useSearchParams();
    const { setAuthed } = useAuth();

    const getCookies = async () => {
        await fetch('/api/session', { method: 'DELETE', credentials: 'include' });
        setAuthed(false);
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
                    <button
                        type="button"
                        onClick={startLogin}
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-black text-white font-semibold shadow hover:opacity-90 active:opacity-80 transition disabled:opacity-50"
                    >
                        {loading ? 'Connexion…' : 'Se connecter'}
                    </button>
                    {err && <div className="mt-4 text-[12px] leading-5 text-red-600">{err}</div>}
                </div>
            </div>
        </div>
    );
}
