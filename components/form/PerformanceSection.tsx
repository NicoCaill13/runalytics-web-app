"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/components/auth/UserProvider";


export default function FrequenceSection() {
    const { user, loading, refresh } = useUser();
    const [isSaving, setIsSaving] = useState(false);


    useEffect(() => {
        if (user) {
            console.log(user)
        }

    }, [user])

    async function handleSavePersonnal() {
        // try {
        //     setIsSaving(true);
        //     const payload = {
        //         firstName: firstName?.trim() || null,
        //         lastName: lastName?.trim() || null,
        //         weight: Number.isFinite(weight) ? weight : null,
        //         age
        //     };
        //     const res = await fetch("/api/profile/complete", {
        //         method: "PATCH",
        //         headers: { "Content-Type": "application/json", Accept: "application/json" },
        //         body: JSON.stringify(payload),
        //         cache: "no-store",
        //     });
        //     if (!res.ok) {
        //         const msg = await res.text().catch(() => "");
        //         throw new Error(msg || "Échec de la mise à jour du profil.");
        //     }
        //     await refresh();
        // } catch (error) {
        //     console.error(error);
        // }
        // finally {
        //     setIsSaving(false);
        // }
    }
    return (
        <section className={`bg-white border border-gray-100 rounded-xl shadow-sm`}>
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-secondary text-[22px] font-bold tracking-[-0.015em]">Performances</h2>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <label className="flex flex-col">
                    <p className="text-text-primary text-base font-medium pb-2">FC Max</p>
                    <input
                        type="number"
                        max={220}
                        min={100}
                        // onChange={(e) => setLastName(e.target.value)}
                        className="h-12 px-3 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
                    // value={lastName}
                    />
                </label>
                <label className="flex flex-col">
                    <p className="text-text-primary text-base font-medium pb-2">FC Min</p>
                    <input
                        type="number"
                        min={30}
                        max={70}
                        // onChange={(e) => setFirstName(e.target.value)}
                        className="h-12 px-3 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
                    // value={firstName}
                    />
                </label>

                <label className="flex flex-col">
                    <p className="text-text-primary text-base font-medium pb-2">VMA</p>
                    <input
                        type="number"
                        min={5}
                        max={30}
                        className="h-12 px-3 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
                    // value={age}
                    />
                </label>
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