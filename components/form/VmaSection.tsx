import { useEffect, useMemo, useState } from "react";
import { useUser } from "@/components/auth/UserProvider";
import { VmaMetric } from "@/lib/type";


export default function VmaSection() {
  const { user, loading, refresh } = useUser();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [Vma, setVma] = useState<string>("");

  const vmaMetric = useMemo<VmaMetric | undefined>(() => {
    if (!user) return undefined;

    // Adapte ici si ton user n'a pas `metrics` mais un autre nom de propriété
    const metrics: VmaMetric[] | undefined = (user as any).metrics;
    if (!metrics) return undefined;

    return metrics.find((m) => m.metric === "VMA" && m.windowEnd === null);
  }, [user]);

  // Pré-remplir le champ à partir de la VMA existante
  useEffect(() => {
    if (!loading && vmaMetric && !Vma) {
      setVma(vmaMetric.value.toFixed(2));
    }
  }, [loading, vmaMetric, Vma]);

  async function handleSaveVMA() {
    if (!Vma) return;

    const numericVma = parseFloat(Vma);
    if (Number.isNaN(numericVma)) {
      setError("La valeur de VMA n'est pas valide.");
      return;
    }
    setIsSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/cardio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metric: "VMA",
          value: numericVma,
          source: "USER",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.message || "Impossible d'enregistrer ta VMA pour le moment."
        );
      }
      await refresh();
    } catch (error: any) {
      setError(error?.message || 'Erreur réseau');
    }
    finally {
      setIsSaving(false);
    }
  }

  const isSubmitDisabled = isSaving || !Vma

  return (
    // <section className={`bg-white border mt-5 border-gray-100 rounded-xl shadow-sm`}>
    //   <div className="p-6 border-b border-gray-100">
    //     <h2 className="text-secondary text-[22px] font-bold tracking-[-0.015em]">Vitesse Maximale Aérobique (VMA)</h2>
    //   </div>

    //   <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
    //     <label className="flex flex-col">
    //       <div className="flex items-center gap-2 pb-2">
    //         <p className="text-text-primary text-base font-medium">
    //           VMA
    //         </p>
    //         <div className="group relative">
    //           <span className="material-symbols-outlined text-text-secondary text-base cursor-pointer">
    //             info
    //           </span>
    //           <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 bg-secondary text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-border-color">
    //             La VMA est la vitesse la plus élevée que tu peux maintenir en utilisant principalement ton système aérobie.
    //             C’est ta vitesse “plafond” en endurance, et sert de base pour calibrer tous tes entraînements.
    //           </div>
    //         </div>
    //       </div>
    //       <input
    //         type="number"
    //         min={8}
    //         max={25}
    //         step="0.1"
    //         onChange={(e) => setVma(e.target.value)}
    //         className="h-12 px-3 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
    //         value={Vma ?? ""}
    //       />
    //     </label>
    //   </div>

    //   <div className="p-6 border-t border-gray-100 flex justify-end">
    //     <button
    //       id="personnal_submit"
    //       type="button"
    //       onClick={handleSaveVMA}
    //       disabled={isSubmitDisabled}
    //       className="relative flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-secondary text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
    //     >
    //       {isSaving && (
    //         <svg
    //           className="absolute left-4 animate-spin size-5"
    //           viewBox="0 0 24 24"
    //           fill="none"
    //           aria-hidden="true"
    //         >
    //           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    //           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
    //         </svg>
    //       )}
    //       {isSaving ? "Enregistrement…" : "Enregistrer les modifications"}
    //     </button>
    //   </div>

    // </section>

    <section className="bg-white border mt-5 border-gray-100 rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-secondary text-[22px] font-bold tracking-[-0.015em]">
          Vitesse Maximale Aérobique (VMA)
        </h2>
        {!loading && vmaMetric && (
          <div className="mt-3 text-sm rounded-lg border border-dashed border-secondary/30 bg-secondary/5 px-3 py-2 text-text-secondary">
            {vmaMetric.source === "ESTIMATED" ? (
              <>
                <span className="font-semibold text-secondary">
                  Estimation Runalytics
                </span>{" "}
                : nous avons estimé ta VMA à{" "}
                <span className="font-semibold">
                  {vmaMetric.value.toFixed(2)} km/h
                </span>{" "}
                à partir de{" "}
                <span className="font-semibold">
                  {vmaMetric.runsCount} sorties
                </span>
                {windowStartFormatted && (
                  <>
                    {" "}
                    analysées depuis le{" "}
                    <span className="font-semibold">
                      {windowStartFormatted}
                    </span>
                  </>
                )}
                {windowEndFormatted && (
                  <>
                    {" "}
                    jusqu'au{" "}
                    <span className="font-semibold">{windowEndFormatted}</span>
                  </>
                )}
                . Tu peux la conserver telle quelle ou la modifier si tu connais
                ta VMA mesurée (test VMA, demi-Cooper, etc.).
              </>
            ) : (
              <>
                <span className="font-semibold text-secondary">
                  VMA définie par toi
                </span>{" "}
                : ta VMA actuelle est fixée à{" "}
                <span className="font-semibold">
                  {vmaMetric.value.toFixed(2)} km/h
                </span>
                . Tu peux la ajuster si ta condition physique évolue ou si tu as
                refait un test.
              </>
            )}
          </div>
        )}
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="flex flex-col">
          <div className="flex items-center gap-2 pb-2">
            <p className="text-text-primary text-base font-medium">VMA</p>
            <span className="text-xs text-text-secondary">(en km/h)</span>
            <div className="group relative">
              <span className="material-symbols-outlined text-text-secondary text-base cursor-pointer">
                info
              </span>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 bg-secondary text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-border-color z-10">
                La VMA est la vitesse la plus élevée que tu peux maintenir en
                utilisant principalement ton système aérobie. C’est ta vitesse
                “plafond” en endurance et elle sert de base pour calibrer tous
                tes entraînements.
              </div>
            </div>
          </div>
          <input
            type="number"
            min={8}
            max={25}
            step="0.1"
            onChange={(e) => setVma(e.target.value)}
            className="h-12 px-3 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={Vma ?? ""}
          />
          <p className="mt-1 text-xs text-text-secondary">
            Si tu ne connais pas ta VMA exacte, tu peux garder notre estimation.
          </p>
        </label>

      </div>

      {error && (
        <div className="px-6 pb-2 text-sm text-red-600">{error}</div>
      )}

      <div className="p-6 border-t border-gray-100 flex justify-end">
        <button
          id="personnal_submit"
          type="button"
          onClick={handleSaveVMA}
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
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
              />
            </svg>
          )}
          {isSaving ? "Enregistrement…" : "Enregistrer les modifications"}
        </button>
      </div>
    </section>
  )
}
