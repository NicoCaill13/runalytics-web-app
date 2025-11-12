"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/components/auth/UserProvider";
import { Unit, HeartUnit } from "@/lib/type";
import SegmentedToggle from "../button/SegmentedToggle";

export default function PreferenceSection() {
  const { user, refresh } = useUser();
  const [unit, setUnit] = useState<Unit>("METRIC");
  const [heartUnit, setHeartUnit] = useState<HeartUnit>("HRR");
  const [saving, setSaving] = useState(false);
  const [justSavedUnit, setJustSavedUnit] = useState(false);
  const [justSavedHeartUnit, setJustHeartUnit] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setUnit((user.measurementUnit as Unit) ?? "METRIC");
    setHeartUnit((user.heartUnit as HeartUnit) ?? "HRR");
  }, [user]);


  const updatePreferences = async (body: any, preference: string) => {
    try {
      const res = await fetch("/api/profile/complete", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || "Échec de la mise à jour des préférences.");
      }

      await refresh();

      if (preference === "unit") {
        setJustSavedUnit(true);
        setTimeout(() => setJustSavedUnit(false), 1500);
      } else {
        setJustHeartUnit(true);
        setTimeout(() => setJustHeartUnit(false), 1500);
      }
    } catch (e: any) {
      if (preference === "unit") {
        setUnit(unit);
      } else {
        setHeartUnit(heartUnit)
      }


      setError(e?.message ?? "Erreur réseau");
    } finally {
      setSaving(false);
    }
  }

  async function toggleUnit() {

    const next: Unit = unit === "METRIC" ? "IMPERIAL" : "METRIC";
    setUnit(next);
    const body = { measurementUnit: next }
    setSaving(true);
    setError(null);
    await updatePreferences(body, "unit")

  }

  async function toggleHeartUnit() {

    const next: HeartUnit = heartUnit === "HRR" ? "FC_MAX" : "HRR";
    setHeartUnit(next);
    const body = { heartUnit: next }
    setSaving(true);
    setError(null);
    await updatePreferences(body, "heartUnit")

  }

  return (
    <section className="bg-white border border-gray-100 rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-secondary text-[22px] font-bold tracking-[-0.015em]">
          Préférences
        </h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Toggle unités de mesure */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-primary font-medium">Unités de mesure</p>
            <p className="text-sm text-text-secondary">
              Choisis entre le système métrique et impérial.
            </p>
          </div>

          <SegmentedToggle
            value={unit}
            onChange={toggleUnit}
            loading={saving}
            options={[
              {
                value: "METRIC",
                label: "Métrique",
                icon: <span className="material-symbols-outlined">straighten</span>,
              },
              {
                value: "IMPERIAL",
                label: "Impérial",
                icon: <span className="material-symbols-outlined">straighten</span>,
              },
            ]}
          />
        </div>

        {/* État de sauvegarde / erreurs */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {error && (
            <span className="text-sm text-red-600">{error}</span>
          )}
          {justSavedUnit && !error && (
            <span className="text-sm text-green-600">Unités de mesure sauvegardée</span>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Toggle unités de mesure */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-primary font-medium">Fréquence cardiaque</p>
            <p className="text-sm text-text-secondary">
              Choisis entre la fréquence cardiaque de réserve ou maximale
            </p>
          </div>

          <SegmentedToggle
            value={heartUnit}
            onChange={toggleHeartUnit}
            loading={saving}
            options={[
              {
                value: "HRR",
                label: "FC Réserve",
                icon: <span className="material-symbols-outlined">heart_check</span>,
              },
              {
                value: "FC_MAX",
                label: "FC Max",
                icon: <span className="material-symbols-outlined">heart_plus</span>,
              },
            ]}
          />
        </div>

        {/* État de sauvegarde / erreurs */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {error && (
            <span className="text-sm text-red-600">{error}</span>
          )}
          {justSavedHeartUnit && !error && (
            <span className="text-sm text-green-600">Unités de mesure sauvegardée</span>
          )}
        </div>
      </div>
    </section>
  )
}