'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import LoginButton from '@/components/button/LoginButton';


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

    return (
        <div className="grid place-items-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
            <div className="w-full max-w-sm p-8 bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-lg grid gap-2">
                <div className="p-2">
                    <div className="mb-6 text-center">
                        <div className="text-2xl font-semibold tracking-tight">Runalytics</div>
                        <div className="mt-1 text-sm text-neutral-500">Connecte-toi pour continuer</div>
                    </div>
                    <div className="mt-auto flex flex-col">
                        <LoginButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
