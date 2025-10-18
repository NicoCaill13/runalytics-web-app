'use client';

import { useEffect, useState } from 'react';

function looksLikeJwt(v: string) {
    return /^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/.test(v);
}

function getNextParam() {
    try {
        const p = new URLSearchParams(window.location.search);
        const n = p.get('next');
        if (n && n.startsWith('/')) return n;
    } catch { }
    return '/';
}

export default function LoginCallbackPage() {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token') || '';
            if (!looksLikeJwt(token)) {
                setError('Token invalide ou manquant.');
                return;
            }

            // 1) stocke en localStorage (specs)
            localStorage.setItem('runalytics.jwt', token);

            // 2) set cookie lisible par le middleware (non HttpOnly)
            document.cookie = `runalytics.jwt=${token}; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax; Secure`;

            // 3) redirige vers next=/... ou /
            const next = getNextParam();
            window.location.replace(next);
        } catch (e: any) {
            setError(e?.message || 'Erreur inconnue.');
        }
    }, []);

    if (error) {
        return (
            <div className="min-h-dvh grid place-items-center p-6">
                <div className="max-w-md text-center">
                    <h1 className="text-xl font-semibold mb-2">Échec de la connexion</h1>
                    <p className="text-sm text-neutral-600 mb-4">{error}</p>
                    <a href="/login" className="underline">Retour à la page de connexion</a>
                </div>
            </div>
        );
    }

    // Évite le flash
    return null;
}
