'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';

const API_BASE = (process.env.BACK_APP_URL ?? 'http://localhost:3000');
const LOGIN_URL = `${API_BASE}/api/auth/login-url`;

export default function LoginButton() {
    const router = useRouter();
    const { setAuthed } = useAuth();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const params = useSearchParams();

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

    async function handleLogin() {
        setLoading(true);
        setErr(null);
        try {
            const res = await fetch(LOGIN_URL, {
                method: 'GET',
                headers: { Accept: 'application/json' },
            });
            const data = await res.json();
            sessionStorage.setItem('authFlow', 'strava');
            window.location.assign(data.data.url);

        } catch (e: any) {
            setErr(e?.message || 'Erreur réseau');
            setLoading(false);
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className={`inline-flex justify-center items-center rounded-xl text-sm font-semibold px-4 py-3
              bg-gradient-to-br from-[#FFD400] via-[#FF8A00] to-[#FF3D00]
              text-neutral-900 shadow-[0_20px_60px_rgba(255,138,0,0.4)]
              hover:shadow-[0_30px_80px_rgba(255,138,0,0.55)]
              active:scale-[0.99]
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all
          ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow'}
          bg-black text-white`}
                aria-busy={loading}
                aria-live="polite"
            >
                {loading ? (
                    <>
                        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-b-transparent" />
                        Connexion en cours…
                    </>
                ) : (
                    'Connexion'
                )}
            </button>

            {loading && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/10 backdrop-blur-sm">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-black border-b-transparent" />
                    <p className="text-sm text-gray-800">Récupération de tes activités…</p>
                </div>
            )}
        </>
    );

}