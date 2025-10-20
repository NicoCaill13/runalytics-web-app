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

            console.log("token from callback ", await syncStrava(token))

            router.replace('/');
        })();
    }, [params, router]);

    return null;
}
