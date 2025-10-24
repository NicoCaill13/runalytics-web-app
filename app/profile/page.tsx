'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";


type ProfileInitResponse = {
    userId: string;
    vmaKph: number | null;
    hrMaxBpm: number | null;
    hrRestBpm: number | null;
    age: number | null;
    profile: string;
    firstName: string;
    lastName: string;
};

export default function ProfilePage() {
    const router = useRouter();

    // ----- form state -----
    const [vma, setVma] = useState('');
    const [age, setAge] = useState('');
    const [hrMax, setHrMax] = useState('');
    const [hrRest, setHrRest] = useState('');
    const [profile, setProfile] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // ----- derived preview numbers -----
    const vmaNum = parseFloat(vma || '0');
    const hrMaxNum = parseInt(hrMax || '0', 10);
    const hrRestNum = parseInt(hrRest || '0', 10);
    const hrr = hrMaxNum && hrRestNum ? hrMaxNum - hrRestNum : 0;

    const endurance = vmaNum ? (vmaNum * 0.7).toFixed(1) : '—';
    const seuil = vmaNum ? (vmaNum * 0.88).toFixed(1) : '—';
    const z2Low = hrr ? Math.round(hrRestNum + 0.6 * hrr) : '—';
    const z2High = hrr ? Math.round(hrRestNum + 0.7 * hrr) : '—';
    const z3Low = hrr ? Math.round(hrRestNum + 0.7 * hrr) : '—';
    const z3High = hrr ? Math.round(hrRestNum + 0.8 * hrr) : '—';

    // ----- UI state -----
    const [loadingInit, setLoadingInit] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    // ----- initial load from /api/profile/init -----
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
                console.log(data)

                if (data.vmaKph != null) setVma(data.vmaKph.toString());
                if (data.age != null) setAge(data.age.toString());
                if (data.hrMaxBpm != null) setHrMax(data.hrMaxBpm.toString());
                if (data.hrRestBpm != null) setHrRest(data.hrRestBpm.toString());
                if (data.profile != null) setProfile(data.profile);
                if (data.firstName != null) setFirstName(data.firstName);
                if (data.lastName != null) setLastName(data.lastName);

                setLoadingInit(false);
            } catch (e: any) {
                console.error('init profile exception', e);
                setErr('Erreur réseau lors du chargement.');
                setLoadingInit(false);
            }
        }

        load();
    }, []);

    // ----- submit to /api/profile/complete -----
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

            // après setup, go dashboard
            router.replace('/dashboard');
        } catch (e: any) {
            console.error('complete profile exception', e);
            setErr('Erreur réseau à la sauvegarde.');
            setSubmitting(false);
        }
    }

    // ----- loading state -----
    if (loadingInit) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center bg-[#1c2536] text-neutral-100 p-6">
                <LoaderBlock label="Préparation de ton profil…" />
            </main>
        );
    }

    // ----- main UI -----
    return (
        <main className="w-full text-neutral-100 py-8 flex items-start justify-center">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
                {/* ================= LEFT COLUMN : la ‘player card’ ================= */}

                <section className="rounded-3xl bg-white text-neutral-900 shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden border border-neutral-800/10 relative">
                    <div className="relative bg-gradient-to-br from-[#FFD400] via-[#FF8A00] to-[#FF3D00] text-white p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-8">
                            <div className="flex-1 flex flex-col">
                                <div>
                                    <span className='block text-3xl font-bold'>{firstName}</span>
                                    <span className='block uppercase text-5xl font-extrabold'>{lastName}</span>
                                </div>

                                <div className="inline-flex w-fit items-center mt-3 text-[11px] font-semibold uppercase tracking-wide text-neutral-900 bg-white rounded-full px-3 py-1 shadow-sm">
                                    Calibration • {age || 'Âge ?'} ans
                                </div>
                            </div>

                            {/* avatar placeholder */}
                            <div className="relative shrink-0 flex items-end justify-center">
                                <div className="w-32 h-32 rounded-2xl bg-neutral-900/10 ring-4 ring-white/20 flex items-center justify-center overflow-hidden">
                                    <Image
                                        src={profile}
                                        width={120}
                                        height={120}
                                        alt="Runalytics"
                                        className="rounded-2xl aspect-square object-cover"

                                    />
                                </div>
                            </div>
                        </div>

                        {/* stats overlay card */}
                        <div className="mt-6 md:absolute md:right-8 md:bottom-[-60px] w-full md:w-auto">
                            <div className="rounded-xl bg-neutral-900 text-white shadow-xl overflow-hidden min-w-[260px]">
                                <div className="bg-neutral-800 text-[11px] font-semibold uppercase tracking-wide text-center py-2">
                                    zones calculées
                                </div>

                                <div className="grid grid-cols-5 divide-x divide-neutral-800 text-center">
                                    <StatCell
                                        value={hrr}
                                        label="FC Réserve"
                                        unit="bpm"
                                    />
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
                                        label="Z2 EF"
                                        unit="bpm"
                                    />
                                    <StatCell
                                        value={
                                            z3Low === '—' || z3High === '—'
                                                ? '—'
                                                : `${z3Low}-${z3High}`
                                        }
                                        label="Z3 EA"
                                        unit="bpm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white text-neutral-900 border-t border-neutral-200 pt-25 pb-6 px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-3 text-center gap-6">
                            <InfoCol top={vma || '—'} bottom="VMA (km/h)" />
                            <InfoCol top={hrMax || '—'} bottom="FC Max (bpm)" />
                            <InfoCol top={hrRest || '—'} bottom="FC Repos (bpm)" />
                        </div>
                    </div>
                    <div className="bg-white text-neutral-900 border-t border-neutral-200 pt-10 pb-6 px-8">

                        <div className="mt-6 text-[11px] text-neutral-500 text-center">
                            Ces valeurs servent à calibrer tes allures et ta charge d’entraînement.
                        </div>
                    </div>
                </section>

                {/* ================= RIGHT COLUMN : form ================= */}
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

/* ------------------------------------------------------------------
 * Subcomponents
 * ------------------------------------------------------------------*/

function LoaderBlock({ label }: { label: string }) {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-600 border-t-white" />
            <p className="text-sm text-neutral-300 text-center max-w-[220px]">
                {label}
            </p>
        </div>
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
            <div className="text-[25px] font-semibold text-neutral-900 leading-none">
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
