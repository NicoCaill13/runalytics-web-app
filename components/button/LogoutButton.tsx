'use client';

export default function LogoutButton() {
    function logout() {
        try {
            localStorage.removeItem('runalytics.jwt');
            document.cookie = 'runalytics.jwt=; Path=/; Max-Age=0; SameSite=Lax; Secure';
        } finally {
            window.location.href = '/login';
        }
    }
    return (
        <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-neutral-900 text-white font-medium hover:opacity-90 active:opacity-80 transition"
        >
            Logout
        </button>
    );
}
