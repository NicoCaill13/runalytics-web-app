'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { FormField } from '@/components/form/FormField';
import { UserCard } from '@/components/user/UserCard';

import type { PanelKey } from "@/components/user/UserCard";
import { ProfilePanel } from '@/components/user/ProfilePanel';

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

    const [selectedPanel, setSelectedPanel] = useState<PanelKey>("profile");

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

                <UserCard firstName={firstName} lastName={lastName} age={age} profile={profile} vma={vma} hrMax={hrMax} hrRest={hrRest} top={vma} onSelect={(panel) => {
                    setSelectedPanel(panel);
                }} />

                <section className="rounded-3xl border border-neutral-700/60 bg-[#0f1624] text-neutral-100 shadow-[0_30px_120px_rgba(0,0,0,0.8)] p-6 flex flex-col">
                    {selectedPanel === "profile" && (
                        <ProfilePanel
                            err={err}
                            vma={vma}
                            setVma={setVma}
                            age={age}
                            setAge={setAge}
                            hrMax={hrMax}
                            setHrMax={setHrMax}
                            hrRest={hrRest}
                            setHrRest={setHrRest}
                            submitting={submitting}
                            handleSubmit={handleSubmit}
                        />
                    )}
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
