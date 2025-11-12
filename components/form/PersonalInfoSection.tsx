"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/components/auth/UserProvider";


export default function PersonalInfoSection() {
  const { user, loading, refresh } = useUser();

  const [isSaving, setIsSaving] = useState(false);
  const [age, setAge] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState(80);

  const calculateAge = (birthday: string | Date): number => {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    return (Math.abs(ageDate.getUTCFullYear() - 1970));
  }

  useEffect(() => {
    if (user) {
      if (user.firstName != null) setFirstName(user.firstName);
      if (user.lastName != null) setLastName(user.lastName);
      if (user.birthDay != null) setAge(calculateAge(user.birthDay));
      if (user.gender != null) setGender(user.gender);
      if (user.weight != null) setWeight(user.weight);
    }

  }, [user])

  async function handleSavePersonnal() {
    try {
      setIsSaving(true);
      const payload = {
        firstName: firstName?.trim() || null,
        lastName: lastName?.trim() || null,
        weight: Number.isFinite(weight) ? weight : null,
        age
      };
      const res = await fetch("/api/profile/complete", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });
      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || "Échec de la mise à jour du profil.");
      }
      await refresh();
    } catch (error) {
      console.error(error);
    }
    finally {
      setIsSaving(false);
    }
  }
  return (
    <section className={`bg-white border border-gray-100 rounded-xl shadow-sm`}>
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-secondary text-[22px] font-bold tracking-[-0.015em]">Informations Personnelles</h2>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="flex flex-col">
          <p className="text-text-primary text-base font-medium pb-2">Nom</p>
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            className="h-12 px-3 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={lastName}
          />
        </label>
        <label className="flex flex-col">
          <p className="text-text-primary text-base font-medium pb-2">Prénom</p>
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            className="h-12 px-3 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={firstName}
          />
        </label>

        <label className="flex flex-col">
          <p className="text-text-primary text-base font-medium pb-2">Âge</p>
          <input
            type="number"
            disabled
            className="h-12 px-3 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={age}
          />
        </label>

        <label className="flex flex-col">
          <p className="text-text-primary text-base font-medium pb-2">Poids (kg)</p>
          <input
            type="number"
            onChange={(e) => setWeight(Number(e.target.value))}
            className="h-12 px-3 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={weight}
          />
        </label>

        <div className="flex flex-col col-span-2">
          <p className="text-text-primary text-base font-medium pb-2">Genre</p>
          <input
            disabled
            className="h-12 px-3 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={gender}
          />
        </div>
      </div>

      <div className="p-6 border-t border-gray-100 flex justify-end">
        <button
          id="personnal_submit"
          type="button"
          onClick={handleSavePersonnal}
          disabled={isSaving}
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