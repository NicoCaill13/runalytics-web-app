'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { looksLikeJwt } from '@/lib/auth';
import { useAuth } from '@/components/auth/AuthProvider';


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

            try { localStorage.setItem('runalytics.jwt', token); } catch { }

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

            router.replace('/');
        })();
    }, [params, router]);

    return null;
}
