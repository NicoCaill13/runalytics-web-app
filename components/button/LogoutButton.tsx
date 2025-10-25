'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
type Props = { className?: string };

export default function LogoutButton({ className }: Props) {
    const router = useRouter();
    const { setAuthed } = useAuth();


    async function handleLogout() {
        try {
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
            Logout
        </button>
    );
}
