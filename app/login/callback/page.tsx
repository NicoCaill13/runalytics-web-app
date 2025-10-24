'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { looksLikeJwt, decodePayload } from '@/lib/auth';
import { useAuth } from '@/components/auth/AuthProvider';

const syncStrava = async (token: string) => {
    const payload = decodePayload(token)
    const { id } = payload.user
    await fetch('/api/sync-strava', {
        method: 'POST',
        body: JSON.stringify({ userId: id, jwt: token }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });
    return payload.user.id
}

const getSetup = async () => {
    const res = await fetch(
        `/api/sync-strava`,
        {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    const result = await res.json();
    return result

}

export default function LoginCallback() {
    const router = useRouter();
    const params = useSearchParams();
    const { setAuthed } = useAuth();

    useEffect(() => {
        (async () => {
            const token = params.get('token') || '';

            if (!looksLikeJwt(token)) {
                router.replace('/login');
                return;
            }

            const res = await fetch('/api/session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ token }),
            });
            setAuthed(true);
            if (!res.ok) {
                router.replace('/login');
                return;
            }

            await syncStrava(token)
            const setup = await getSetup()
            if (setup.needsSetup) {
                router.replace('/profile');
            }
            else {
                router.replace('/');
            }

        })();
    }, [params, router]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/10 backdrop-blur-sm">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-black border-b-transparent" />
            <p className="text-sm text-gray-800">Récupération de tes activités…</p>
        </div>
    );
}
