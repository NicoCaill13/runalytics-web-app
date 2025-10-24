'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { FormField } from '@/components/form/FormField';
import { UserCard } from '@/components/user/UserCard';


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

    const [vma, setVma] = useState('');
    const [age, setAge] = useState('');
    const [hrMax, setHrMax] = useState('');
    const [hrRest, setHrRest] = useState('');
    const [profile, setProfile] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


    const [loadingInit, setLoadingInit] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [err, setErr] = useState<string | null>(null);

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

                <UserCard firstName={firstName} lastName={lastName} age={age} profile={profile} vma={vma} hrMax={hrMax} hrRest={hrRest} top={vma} />

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
