'use client';

import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { FormField } from '@/components/form/FormField';
import { UserCard } from '@/components/user/UserCard';

import type { PanelKey } from "@/components/user/UserCard";
import { ProfilePanel } from '@/components/user/ProfilePanel';
import { InfoCol } from "@/components/user/InfoCol"
import { ZonesPanel } from "@/components/user/RangeCompute";
import { mapBackendToUiZones, BackendZones } from "@/lib/zones";

type ProfileInitResponse = {
  userId: string;
  vmaKph: number | null;
  hrMaxBpm: number | null;
  hrRestBpm: number | null;
  age: number | null;
  birthDay: Date | null;
  firstName: string;
  lastName: string;
  runsCount: number
  firstRun: Date
  lastRun: Date
  qualityZones: any
  vmaBands: any
  enduranceZones: any
};

export default function HomePage() {
  const router = useRouter();

  const [vma, setVma] = useState('');
  const [vmaEstimate, setVmaEstimate] = useState('');
  const [age, setAge] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [hrMax, setHrMax] = useState('');
  const [hrRest, setHrRest] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [runsCount, setRunsCount] = useState<number | null>(null)
  const [firstRun, setFirstRun] = useState<Date | null>(null)
  const [lastRun, setLastRun] = useState<Date | null>(null)
  const [zones, setZones] = useState<BackendZones>()


  const [loadingInit, setLoadingInit] = useState(true);
  const [isDisabled, setDisabled] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [selectedPanel, setSelectedPanel] = useState<PanelKey>("profile");

  const calculateAge = (birthday: string | Date): string => {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    return (Math.abs(ageDate.getUTCFullYear() - 1970)).toString();
  }

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

        const response = await res.json();
        const data: ProfileInitResponse = response
        console.log(data)


        if (data.vmaKph != null) setVmaEstimate(data.vmaKph.toString());
        if (data.age != null) setAge(data.age.toString());
        if (data.birthDay != null) {
          setAge(calculateAge(data.birthDay));
          setBirthDay(data.birthDay.toString().slice(0, 10));
          setDisabled(true)
        }
        if (data.hrMaxBpm != null) setHrMax(data.hrMaxBpm.toString());
        if (data.hrRestBpm != null) setHrRest(data.hrRestBpm.toString());
        if (data.firstName != null) setFirstName(data.firstName);
        if (data.lastName != null) setLastName(data.lastName);
        if (data.runsCount != null) setRunsCount(data.runsCount);
        if (data.firstRun != null) setFirstRun(data.firstRun);
        if (data.lastRun != null) setLastRun(data.lastRun);

        if (data.PhysioHistory.length > 0) {
          const fcMax = data.PhysioHistory.find((el: any) => el.metric === 'FC_MAX')
          if (fcMax !== undefined) setHrMax(fcMax.value)
          const fcMin = data.PhysioHistory.find((el: any) => el.metric === 'FC_REPOS')
          if (fcMin !== undefined) setHrRest(fcMin.value)
          const vma = data.PhysioHistory.find((el: any) => el.metric === 'VMA')
          if (vma !== undefined) setVma(vma.value)
        }

        if (data.qualityZones.length > 0) {
          const allZones = { qualityZones: data.qualityZones, enduranceZones: data.enduranceZones, vmaBands: data.vmaBands }
          setZones(allZones)
        }

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

    if (!vma || !birthDay || !hrMax || !hrRest) {
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
          birthDay: new Date(birthDay),
          age: calculateAge(birthDay),
          fcm: parseInt(hrMax, 10),
          fcrepos: parseInt(hrRest, 10),
          runsCount,
          windowStart: firstRun,
          windowEnd: lastRun
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error('complete profile failed', txt);
        setErr("Impossible d'enregistrer tes infos.");
        setSubmitting(false);
        return;
      }

      // router.replace('/dashboard');
    } catch (e: any) {
      console.error('complete profile exception', e);
      setErr('Erreur réseau à la sauvegarde.');
      setSubmitting(false);
    }
  }

  if (loadingInit) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#1c2536] text-neutral-100 p-6 bg-black ">
        <LoaderBlock label="Préparation de ton profil…" />
      </main>
    );
  }

  return (
    <div className='grid grid-cols-[36%_64%] gap-6 p-6'>
      <div className="">
        <div className="rounded-3xl border border-custom-gray-200 bg-team-golden-primary dark:border-custom-gray-600 bg-orange-400">
          <UserCard firstName={firstName} lastName={lastName} top={vma} onSelect={(panel) => {
            setSelectedPanel(panel);
          }} />

          <div className="rounded-t-none rounded-3xl bg-white py-10 ring-1 ring-custom-gray-200 dark:bg-custom-gray-800 dark:ring-custom-gray-600">
            <div className="grid grid-cols-3 gap-y-5 px-6 md:grid-cols-[repeat(auto-fit,minmax(90px,1fr))]">
              <InfoCol top={vma || "—"} bottom="VMA (km/h)" />
              <InfoCol top={hrMax || "—"} bottom="FC Max" />
              <InfoCol top={hrRest || "—"} bottom="FC Repos" />
              <InfoCol top={age || calculateAge(birthDay) || "—"} bottom="ans" />
            </div>
          </div>

        </div>
      </div>

      <div className="pr-6">
        <div className="rounded-3xl border border-neutral-700/60 bg-[#0f1624] text-neutral-100 shadow-[0_30px_120px_rgba(0,0,0,0.8)] p-6">
          {selectedPanel === "profile" && (
            <ProfilePanel
              err={err}
              vma={vma}
              vmaEstimate={vmaEstimate}
              setVma={setVma}
              age={age}
              setAge={setAge}
              birthDay={birthDay}
              setBirthDay={setBirthDay}
              hrMax={hrMax}
              setHrMax={setHrMax}
              hrRest={hrRest}
              setHrRest={setHrRest}
              submitting={submitting}
              isDisabled={isDisabled}
              handleSubmit={handleSubmit} label={''} value={''} onChange={function (v: string): void {
                throw new Error('Function not implemented.');
              }} />
          )}

          {selectedPanel === "zones" && (
            <section className="flex flex-col gap-6">
              <h2 className="text-xl font-semibold">Vos Zones Personnalisées</h2>
              <ZonesPanel zones={mapBackendToUiZones(zones)} />
            </section>
          )}

          {selectedPanel === "trainingLoad" && (
            <PlaceholderPanel
              title="Charge hebdo"
              desc="Volume total, ratio EF/Qualité, fatigue subjective."
            />
          )}

          {selectedPanel === "goals" && (
            <PlaceholderPanel
              title="Objectifs"
              desc="Ici tu verras tes objectifs actifs (10 km, marathon...) et leur état de préparation."
            />
          )}


        </div>
      </div>
    </div>
  );
}

function PlaceholderPanel({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex flex-col flex-1">
      <header className="mb-4">
        <h2 className="text-white text-base font-semibold tracking-[-0.03em]">
          {title}
        </h2>
        <p className="text-[12px] text-neutral-400 leading-relaxed mt-1">
          {desc}
        </p>
      </header>

      <div className="text-[12px] text-neutral-500 leading-relaxed border border-neutral-700/60 bg-neutral-800/30 rounded-xl p-4">
        Cette section n'est pas encore interactive.
      </div>
    </div>
  );
}

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