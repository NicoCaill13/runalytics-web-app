"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/components/auth/UserProvider";
import { Provider } from "@/lib/type";


const API_BASE = (process.env.BACK_APP_URL ?? 'http://localhost:3000');

interface ProviderConfig {
    name: Provider;
    label: string;
    logo: string;
}

export default function ThirdPartySection() {
    const { user, refresh } = useUser();
    const [loading, setLoading] = useState<Provider | null>(null);
    const [error, setError] = useState<string | null>(null);

    const providers: ProviderConfig[] = [
        { name: "STRAVA", label: "Strava", logo: "/strava.svg" },
        { name: "GOOGLE_HEALTH", label: "Google Health", logo: "/google-health.svg" },
        { name: "GARMIN", label: "Garmin Connect", logo: "/garmin.svg" },
        { name: "APPLE_HEALTH", label: "Apple Health", logo: "/apple.svg" },
    ];

    const getAccount = (p: Provider) => user?.providerAccounts?.find((a: any) => a.provider === p) ?? null;

    const isActive = (p: Provider) => {
        const acc = getAccount(p);
        return Boolean(acc && acc.isActive === true);
    };

    const toggleActive = async (provider: Provider, isActive: boolean) => {
        const status = isActive ? "reactivate" : "deactivate"
        setLoading(provider);
        setError(null);
        try {
            const LOGIN_URL = `api/provider/status?action=${status}`;
            await fetch(LOGIN_URL, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                },
            });
            await refresh();

        } catch (error: any) {
            setError(error?.message || 'Erreur réseau');
            setLoading(null);
        }
        finally {
            setLoading(null);
        }
    }


    async function deactivateProvider(provider: Provider) {
        await toggleActive(provider, false)
    }
    async function reactivateProvider(provider: Provider) {
        await toggleActive(provider, true)
    }

    async function connectProvider(provider: Provider) {
        setLoading(provider);
        setError(null);
        try {
            const LOGIN_URL = `api/sync-strava`;
            const response = await fetch(LOGIN_URL, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                },
            });
            const data = await response.json();
            if (data.statusCode !== 200) throw new Error(`Backend HTTP ${response.status}`);
            const url = data.data.url
            if (!url) throw new Error('URL OAuth manquante');
            window.location.assign(url);

        } catch (error: any) {
            setError(error?.message || 'Erreur réseau');
            setLoading(null);
        }
    }
    return (
        <section className="bg-white border border-gray-100 rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-secondary text-[22px] font-bold tracking-[-0.015em]">Services Connectés</h2>
            </div>

            <div className="p-6 space-y-4">
                {providers.map((p) => {
                    const acc = getAccount(p.name);
                    const active = isActive(p.name);
                    const isLoading = loading === p.name;

                    // État & action
                    let buttonLabel = "Connecter";
                    let buttonClass = "bg-secondary text-white hover:opacity-90";
                    let onClick = () => connectProvider(p.name);

                    if (acc && !active) {
                        buttonLabel = "Réactiver";
                        buttonClass = "bg-amber-500 text-white hover:bg-amber-600";
                        onClick = () => reactivateProvider(p.name);
                    }
                    if (acc && active) {
                        buttonLabel = "Déconnecter";
                        buttonClass = "bg-red-500 text-white hover:bg-red-600";
                        onClick = () => deactivateProvider(p.name);
                    }

                    return (
                        <div key={p.name} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                            <div className="flex items-center gap-4">
                                <img src={p.logo} alt={p.label} className="w-10 h-10 rounded" />
                                <div className="flex flex-col">
                                    <span className="font-medium text-text-primary">{p.label}</span>

                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={onClick}
                                disabled={isLoading}
                                className={`relative h-10 px-4 text-sm font-bold rounded-lg transition ${buttonClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="absolute left-3 animate-spin size-4" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
                                        </svg>
                                        {buttonLabel}…
                                    </>
                                ) : (
                                    buttonLabel
                                )}
                            </button>
                        </div>
                    );
                })}

                {error && <p className="text-sm text-red-600 text-right">{error}</p>}
            </div>
        </section>
    )
}