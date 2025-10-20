'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
type Props = { className?: string };

export default function LogoutButton({ className }: Props) {
    const router = useRouter();
    const { setAuthed } = useAuth();


    async function handleLogout() {
        try {
            localStorage.removeItem('runalytics.jwt');
            try {
                await fetch('/api/session', { method: 'DELETE', credentials: 'include' });
                setAuthed(false);
            } catch { }
            router.replace('/login');
        } catch {
            router.replace('/login');
        }
    }

    return (
        <button
            type="button"
            onClick={handleLogout}
            className={
                className ??
                'inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-neutral-900 text-white font-medium hover:opacity-90 active:opacity-80 transition'
            }
            aria-label="Se déconnecter"
            title="Se déconnecter"
        >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path d="M10 3a1 1 0 0 1 1 1v3h-2V5H6v14h3v-2h2v3a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5zm5.293 5.293 1.414 1.414L15.414 12l1.293 1.293-1.414 1.414L12.586 12l2.707-2.707z" fill="currentColor" />
                <path d="M20 11v2h-8v-2h8z" fill="currentColor" />
            </svg>
            Logout
        </button>
    );
}
