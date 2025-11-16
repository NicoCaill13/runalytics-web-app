"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/components/auth/UserProvider";
import { MetricUnit } from "@/lib/type";


export default function PerformanceSection() {
    const { user, loading, refresh } = useUser();
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const [fcMax, setFcMax] = useState<string>(""); // FC Max (bpm)
    const [fcMin, setFcMin] = useState<string>(""); // FC Min / repos (bpm)

    const getPhysio = (p: MetricUnit) => user?.physioHistory?.find((a: any) => a.metric === p) ?? null;

    useEffect(() => {
        if (!user) return;

        const fcMaxPhysio = getPhysio("FC_MAX");
        const fcMinPhysio = getPhysio("FC_REPOS");

        setFcMax(fcMaxPhysio && fcMaxPhysio.value != null ? String(fcMaxPhysio.value) : "");

        setFcMin(fcMinPhysio && fcMinPhysio.value != null ? String(fcMinPhysio.value) : "");
    }, [user])

    const isSubmitDisabled = isSaving || !fcMin || !fcMax;

    async function handleSavePersonnal() {
        try {
            setIsSaving(true);
            const payloads: {
                metric: MetricUnit;
                source: "USER";
                value: number;
            }[] = [];

            if (fcMin) {
                payloads.push({
                    metric: "FC_REPOS",
                    source: "USER",
                    value: Number(fcMin.replace(",", ".")),
                });
            }

            if (fcMax) {
                payloads.push({
                    metric: "FC_MAX",
                    source: "USER",
                    value: Number(fcMax.replace(",", ".")),
                });
            }

            if (fcMax && fcMin) {
                payloads.push({
                    metric: "FC_RESERVE",
                    source: "USER",
                    value: Number(fcMax.replace(",", ".")) - Number(fcMin.replace(",", ".")),
                });
            }

            if (payloads.length === 0) {
                return;
            }

            const results = await Promise.all(
                payloads.map((payload) =>
                    fetch("/api/cardio", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify(payload),
                        cache: "no-store",
                    })
                )
            );
            const firstError = results.find((r) => !r.ok);
            if (firstError) {
                const msg = await firstError.text().catch(() => "");
                throw new Error(msg || `Échec de la mise à jour du profil.`);
            }

            await refresh();
        } catch (error: any) {
            setError(error?.message || 'Erreur réseau');
        }
        finally {
            setIsSaving(false);
        }
    }
    return (
        <section className={`bg-white border border-gray-100 rounded-xl shadow-sm`}>
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-secondary text-[22px] font-bold tracking-[-0.015em]">Performances</h2>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col">
                    <div className="flex items-center gap-2 pb-2">
                        <p className="text-text-primary text-base font-medium">
                            Fréquence Cardiaque Min (FC Min)
                        </p>
                        <div className="group relative">
                            <span className="material-symbols-outlined text-text-secondary text-base cursor-pointer">
                                info
                            </span>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 bg-secondary text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-border-color">
                                Votre fréquence cardiaque minimale est le nombre le plus bas de
                                battements par minute que votre cœur peut atteindre.
                            </div>
                        </div>
                    </div>
                    <input
                        type="number"
                        min={30}
                        max={70}
                        onChange={(e) => setFcMin(e.target.value)}
                        className="h-12 px-3 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={fcMin ?? ""}
                    />
                </label>
                <label className="flex flex-col">
                    <div className="flex items-center gap-2 pb-2">
                        <p className="text-text-primary text-base font-medium">
                            Fréquence Cardiaque Max (FC Max)
                        </p>
                        <div className="group relative">
                            <span className="material-symbols-outlined text-text-secondary text-base cursor-pointer">
                                info
                            </span>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 bg-secondary text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-border-color">
                                Votre fréquence cardiaque maximale est le nombre le plus élevé de
                                battements par minute que votre cœur peut atteindre.
                            </div>
                        </div>
                    </div>
                    <input
                        type="number"
                        max={220}
                        min={100}
                        onChange={(e) => setFcMax(e.target.value)}
                        className="h-12 px-3 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={fcMax ?? ""}
                    />
                </label>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end">
                <button
                    id="personnal_submit"
                    type="button"
                    onClick={handleSavePersonnal}
                    disabled={isSubmitDisabled}
                    className="relative flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-secondary text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSaving && (
                        <svg
                            className="absolute left-4 animate-spin size-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                        >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
                        </svg>
                    )}
                    {isSaving ? "Enregistrement…" : "Enregistrer les modifications"}
                </button>
            </div>

        </section>
    )
}