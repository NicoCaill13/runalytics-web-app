'use client';

export default function LoginPage() {
    const apiBase = process.env.BACK_APP_URL ?? 'http://localhost:3000';
    const backendLogin = `${apiBase.replace(/\/+$/, '')}/api/auth/login`; // si ton Nest a un prefix 'api'

    function startLogin() {
        // redirige le navigateur : Nest -> Strava -> callback front
        window.location.href = backendLogin;
    }

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
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-black text-white font-semibold shadow hover:opacity-90 active:opacity-80 transition"
                    >
                        Se connecter
                    </button>
                </div>
            </div>
        </div>
    );
}
