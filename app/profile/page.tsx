'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type ProfileInitResponse = {
    userId: string;
    vmaKph: number | null;
    hrMaxBpm: number | null;
    hrRestBpm: number | null;
    age: number | null;
};

export default function ProfilePage() {
    const router = useRouter();

    // form state
    const [vma, setVma] = useState('');
    const [age, setAge] = useState('');
    const [hrMax, setHrMax] = useState('');
    const [hrRest, setHrRest] = useState('');

    // computed preview
    const vmaNum = parseFloat(vma || '0');
    const hrMaxNum = parseInt(hrMax || '0', 10);
    const hrRestNum = parseInt(hrRest || '0', 10);
    const hrr = hrMaxNum && hrRestNum ? hrMaxNum - hrRestNum : 0;

    const endurance = vmaNum ? (vmaNum * 0.7).toFixed(1) : '—';
    const seuil = vmaNum ? (vmaNum * 0.88).toFixed(1) : '—';
    const z2Low = hrr ? Math.round(hrRestNum + 0.6 * hrr) : '—';
    const z2High = hrr ? Math.round(hrRestNum + 0.7 * hrr) : '—';

    // ui state
    const [loadingInit, setLoadingInit] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    // init load
    useEffect(() => {
        async function load() {
            try {
                const res = await fetch('/api/profile/init', {
                    method: 'GET',
                    credentials: 'include',
                    headers: { Accept: 'application/json' },
                });

                if (!res.ok) {
                    const txt = await res.text();
                    console.error('init profile failed', txt);
                    setErr('Impossible de charger les données initiales.');
                    setLoadingInit(false);
                    return;
                }

                const data: ProfileInitResponse = await res.json();

                if (data.vmaKph != null) setVma(data.vmaKph.toString());
                if (data.age != null) setAge(data.age.toString());
                if (data.hrMaxBpm != null) setHrMax(data.hrMaxBpm.toString());
                if (data.hrRestBpm != null) setHrRest(data.hrRestBpm.toString());

                setLoadingInit(false);
            } catch (e: any) {
                console.error('init profile exception', e);
                setErr('Erreur réseau lors du chargement.');
                setLoadingInit(false);
            }
        }

        load();
    }, []);

    // submit
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        setErr(null);

        if (!vma || !age || !hrMax || !hrRest) {
            setErr('Merci de remplir tous les champs.');
            setSubmitting(false);
            return;
        }

        try {
            const res = await fetch('/api/profile/complete', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    vmaKph: parseFloat(vma),
                    age: parseInt(age, 10),
                    hrMaxBpm: parseInt(hrMax, 10),
                    hrRestBpm: parseInt(hrRest, 10),
                }),
            });

            if (!res.ok) {
                const txt = await res.text();
                console.error('complete profile failed', txt);
                setErr("Impossible d'enregistrer tes infos.");
                setSubmitting(false);
                return;
            }

            router.replace('/dashboard');
        } catch (e: any) {
            console.error('complete profile exception', e);
            setErr('Erreur réseau à la sauvegarde.');
            setSubmitting(false);
        }
    }

    if (loadingInit) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center bg-[#1c2536] text-neutral-100 p-6">
                <LoaderBlock label="Préparation de ton profil…" />
            </main>
        );
    }

    return (
        <main className="min-h-screen w-full bg-[#1c2536] text-neutral-100 px-4 py-8 flex items-start justify-center">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
                {/* LEFT COLUMN = player card style */}
                <section className="rounded-3xl bg-white text-neutral-900 shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden border border-neutral-800/10">
                    {/* top banner */}
                    <div className="relative bg-gradient-to-br from-[#FFD400] via-[#FF8A00] to-[#FF3D00] text-white p-6 md:p-8">
                        {/* texture-ish topo lines vibe: we'll fake with an overlay subtle opacity pattern later if you want */}
                        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-8">
                            {/* left text */}
                            <div className="flex-1 flex flex-col">
                                <div className="text-xs font-semibold uppercase text-white/80 tracking-wide">
                                    Profil athlète
                                </div>

                                <div className="text-3xl md:text-4xl font-extrabold leading-[1.1] tracking-[-0.04em]">
                                    Ta Zone
                                    <br />
                                    d'Effort
                                </div>

                                <div className="inline-flex w-fit items-center mt-3 text-[11px] font-semibold uppercase tracking-wide text-neutral-900 bg-white rounded-full px-3 py-1 shadow-sm">
                                    Calibration • {age || 'Âge ?'} ans
                                </div>
                            </div>

                            {/* athlete avatar */}
                            <div className="relative shrink-0 flex items-end justify-center">
                                {/* avatar circle */}
                                <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-neutral-900/10 ring-4 ring-white/20 flex items-center justify-center overflow-hidden">
                                    {/* Placeholder silhouette runner */}
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-16 h-16 text-neutral-900/70"
                                        fill="currentColor"
                                    >
                                        <path d="M13.5 5.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 9a1 1 0 00-1 1v2.382l-1.724 1.724a2 2 0 00-.576 1.414V20a1 1 0 102 0v-4.059l1.724-1.724A2 2 0 0011 12.803V11a1 1 0 00-1-1zM14.293 9.293a1 1 0 011.414 0l.707.707a3 3 0 01.793 2.828l-.213.85a2 2 0 01-.548.95l-1.586 1.586A1 1 0 0114 17h-1.382l-.724.724A1 1 0 0110.5 17.5l1.724-1.724a2 2 0 00.576-1.414V13h.586l1-1-1-1-.293-.293a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* stats overlay card (right-ish on desktop) */}
                        <div className="mt-6 md:absolute md:right-8 md:bottom-[-32px] w-full md:w-auto">
                            <div className="rounded-xl bg-neutral-900 text-white shadow-xl overflow-hidden min-w-[260px]">
                                <div className="bg-neutral-800 text-[11px] font-semibold uppercase tracking-wide text-center py-2">
                                    zones calculées
                                </div>

                                <div className="grid grid-cols-3 divide-x divide-neutral-800 text-center">
                                    <StatCell
                                        value={endurance}
                                        label="Endurance"
                                        unit="km/h"
                                    />
                                    <StatCell
                                        value={seuil}
                                        label="Seuil"
                                        unit="km/h"
                                    />
                                    <StatCell
                                        value={
                                            z2Low === '—' || z2High === '—'
                                                ? '—'
                                                : `${z2Low}-${z2High}`
                                        }
                                        label="Z2 Cardio"
                                        unit="bpm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* bottom info bar */}
                    <div className="bg-white text-neutral-900 border-t border-neutral-200 pt-10 md:pt-16 pb-6 px-6 md:px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-3 text-center gap-6">
                            <InfoCol
                                top={vma || '—'}
                                bottom="VMA (km/h)"
                            />
                            <InfoCol
                                top={hrMax || '—'}
                                bottom="FC Max (bpm)"
                            />
                            <InfoCol
                                top={hrRest || '—'}
                                bottom="FC Repos (bpm)"
                            />
                        </div>

                        <div className="mt-6 text-[11px] text-neutral-500 text-center">
                            Ces valeurs servent à calibrer tes allures et ta charge d’entraînement.
                        </div>
                    </div>
                </section>

                {/* RIGHT COLUMN = form panel */}
                <section className="rounded-3xl border border-neutral-700/60 bg-[#0f1624] text-neutral-100 shadow-[0_30px_120px_rgba(0,0,0,0.8)] p-6 flex flex-col">
                    <header className="mb-4">
                        <h2 className="text-white text-base font-semibold tracking-[-0.03em] flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-br from-[#FFD400] via-[#FF8A00] to-[#FF3D00] shadow-[0_0_20px_rgba(255,138,0,0.7)]" />
                            Vérifie tes infos
                        </h2>
                        <p className="text-[12px] text-neutral-400 leading-relaxed mt-1">
                            Dis-nous où tu en es physiquement. On s’occupe du reste.
                        </p>
                    </header>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
                        <FormField
                            label="VMA"
                            helper="Ta vitesse max aérobie actuelle"
                            value={vma}
                            onChange={setVma}
                            placeholder="16.2"
                            unit="km/h"
                            required
                            inputMode="decimal"
                        />

                        <FormField
                            label="Âge"
                            helper="Pour estimer les zones cardiaques"
                            value={age}
                            onChange={setAge}
                            placeholder="32"
                            unit="ans"
                            required
                            inputMode="numeric"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <FormField
                                label="FC Max"
                                helper="Pic max en effort total"
                                value={hrMax}
                                onChange={setHrMax}
                                placeholder="190"
                                unit="bpm"
                                required
                                inputMode="numeric"
                            />
                            <FormField
                                label="FC Repos"
                                helper="Au calme, le matin"
                                value={hrRest}
                                onChange={setHrRest}
                                placeholder="52"
                                unit="bpm"
                                required
                                inputMode="numeric"
                            />
                        </div>

                        {err && (
                            <p className="text-red-400 text-[12px] leading-snug border border-red-500/30 bg-red-500/10 rounded-lg px-3 py-2">
                                {err}
                            </p>
                        )}

                        <div className="mt-auto flex flex-col gap-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="inline-flex justify-center items-center rounded-xl text-sm font-semibold px-4 py-3
                           bg-gradient-to-br from-[#FFD400] via-[#FF8A00] to-[#FF3D00]
                           text-neutral-900 shadow-[0_20px_60px_rgba(255,138,0,0.4)]
                           hover:shadow-[0_30px_80px_rgba(255,138,0,0.55)]
                           active:scale-[0.99]
                           disabled:opacity-40 disabled:cursor-not-allowed
                           transition-all"
                            >
                                {submitting ? 'Enregistrement…' : 'Valider et continuer →'}
                            </button>

                            <p className="text-[11px] text-neutral-500 leading-relaxed text-center">
                                Tu pourras ajuster ces valeurs ensuite dans ton profil.
                            </p>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
}

/* ---------------------
 * Subcomponents
 * -------------------*/

function LoaderBlock({ label }: { label: string }) {
    return (
        <>
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-600 border-t-white mb-4" />
            <p className="text-sm text-neutral-300 text-center max-w-[220px]">
                {label}
            </p>
        </>
    );
}

function StatCell({
    value,
    label,
    unit,
}: {
    value: string | number;
    label: string;
    unit: string;
}) {
    return (
        <div className="flex flex-col items-center justify-center py-4 px-3">
            <div className="text-lg font-semibold text-white leading-none">
                {value}
            </div>
            <div className="text-[10px] uppercase tracking-wide text-neutral-400 font-medium flex flex-col leading-tight">
                <span>{label}</span>
                <span className="text-[9px] normal-case text-neutral-500 font-normal">
                    {unit}
                </span>
            </div>
        </div>
    );
}

function InfoCol({ top, bottom }: { top: string | number; bottom: string }) {
    return (
        <div className="flex flex-col items-center">
            <div className="text-[15px] font-semibold text-neutral-900 leading-none">
                {top}
            </div>
            <div className="text-[10px] uppercase tracking-wide text-neutral-500 font-medium mt-1">
                {bottom}
            </div>
        </div>
    );
}

function FormField(props: {
    label: string;
    helper?: string;
    value: string;
    onChange: (v: string) => void;
    required?: boolean;
    placeholder?: string;
    unit?: string;
    inputMode?: 'decimal' | 'numeric';
}) {
    const {
        label,
        helper,
        value,
        onChange,
        required,
        placeholder,
        unit,
        inputMode,
    } = props;

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col leading-tight">
                <label className="text-[13px] text-neutral-100 font-semibold tracking-[-0.03em] flex items-baseline gap-1">
                    {label}
                    {required && (
                        <span className="text-[#FF8A00] text-[10px] font-normal">*</span>
                    )}
                </label>
                {helper && (
                    <span className="text-[11px] text-neutral-500 font-normal">
                        {helper}
                    </span>
                )}
            </div>

            <div
                className="group relative flex items-center rounded-xl border border-neutral-700 bg-[#1b2333]
                   focus-within:border-[#FF8A00] focus-within:shadow-[0_0_20px_rgba(255,138,0,0.4)]
                   transition-all"
            >
                <input
                    required={required}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    inputMode={inputMode}
                    className="w-full bg-transparent text-white placeholder-neutral-500 text-sm px-3 py-2.5 outline-none rounded-xl"
                />
                {unit && (
                    <div className="pr-3 text-[11px] text-neutral-500 select-none">
                        {unit}
                    </div>
                )}
            </div>
        </div>
    );
}
