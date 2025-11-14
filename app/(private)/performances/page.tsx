// app/(private)/zones/page.tsx
"use client";

import { useUser } from "@/components/auth/UserProvider";
import PerformanceSection from "@/components/form/PerformanceSection";
import { useEffect, useState } from "react";

type Zone = {
  id: "Z1" | "Z2" | "Z3" | "Z4" | "Z5";
  label: string;
  description: string;
  color: string;
  percent: string;
  width: string;
};

const ZONES: Zone[] = [
  {
    id: "Z1",
    label: "Z1 : Échauffement",
    description: "Idéal pour les sorties de récupération active et l'échauffement.",
    color: "#93C5FD",
    percent: "50-60% FC Max",
    width: "w-1/2", // 50%
  },
  {
    id: "Z2",
    label: "Z2 : Endurance fondamentale",
    description: "Améliore l'endurance de base et l'oxydation des graisses.",
    color: "#60A5FA",
    percent: "60-70% FC Max",
    width: "w-[10%]",
  },
  {
    id: "Z3",
    label: "Z3 : Seuil aérobie",
    description: "Développe la capacité cardiovasculaire. Sensation d'effort modéré.",
    color: "#2563EB",
    percent: "70-80% FC Max",
    width: "w-[10%]",
  },
  {
    id: "Z4",
    label: "Z4 : Seuil anaérobie",
    description: "Augmente le seuil lactique pour soutenir un effort intense plus longtemps.",
    color: "#FDBA74",
    percent: "80-90% FC Max",
    width: "w-[20%]",
  },
  {
    id: "Z5",
    label: "Z5 : PMA",
    description: "Travail de la puissance maximale aérobie. Effort très intense.",
    color: "#F97316",
    percent: "90-100% FC Max",
    width: "w-[10%]",
  },
];

function computeRange(fcMax: number, from: number, to: number) {
  if (!fcMax || fcMax <= 0) return { min: null, max: null };
  const min = Math.round(fcMax * from);
  const max = Math.round(fcMax * to);
  return { min, max };
}

export default function PerformancePage() {
  const { user, loading, refresh } = useUser();
  const [vma, setVma] = useState<number>(17.5);

  const fc = 0;

  const ranges = {
    Z1: computeRange(fc, 0.5, 0.6),
    Z2: computeRange(fc, 0.6, 0.7),
    Z3: computeRange(fc, 0.7, 0.8),
    Z4: computeRange(fc, 0.8, 0.9),
    Z5: computeRange(fc, 0.9, 1.0),
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-between gap-3 mb-2">
        <p className="text-text-primary text-4xl font-black leading-tight tracking-[-0.033em]">
          Calculateur de Zones Cardiaques
        </p>
      </div>
      <p className="text-text-secondary text-base font-normal pb-8 pt-1">
        Entrez vos métriques personnelles pour calculer et visualiser vos zones d&apos;entraînement personnalisées.
      </p>

      <PerformanceSection />

      {/* <div className="mt-6">
          <button
            type="button"
            className="relative flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-secondary text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined">calculate</span>
            Calculer mes zones
          </button>
        </div> */}

      {/* Zones */}
      <section className="mt-10">
        <h3 className="text-text-primary text-2xl font-bold tracking-[-0.015em] pb-5">
          Vos Zones Personnalisées
        </h3>

        {/* Barres empilées */}
        <div className="mb-8">
          <div className="w-full flex h-10 rounded-lg overflow-hidden">
            {ZONES.map((zone) => (
              <div
                key={zone.id}
                className={`flex items-center justify-center ${zone.width}`}
                style={{ backgroundColor: zone.color }}
              >
                <span
                  className={`text-xs font-bold ${zone.id === "Z1" || zone.id === "Z4" ? "text-secondary" : "text-white"
                    }`}
                >
                  {zone.id}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cartes zones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ZONES.map((zone) => {
            const range = ranges[zone.id];
            const min = range.min;
            const max = range.max;
            const isLight = zone.id === "Z1" || zone.id === "Z4";

            return (
              <div
                key={zone.id}
                className="bg-card rounded-xl p-5 border border-gray-100 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="size-3 rounded-full"
                    style={{ backgroundColor: zone.color }}
                  />
                  <h4 className="text-text-primary font-bold">{zone.label}</h4>
                </div>
                <p className="text-2xl font-bold text-text-primary">
                  {min != null && max != null ? (
                    <>
                      {min} - {max}{" "}
                      <span className="text-base font-normal text-text-secondary">
                        bpm
                      </span>
                    </>
                  ) : (
                    <span className="text-base font-normal text-text-secondary">
                      Renseigne ta FC max
                    </span>
                  )}
                </p>
                <p className="text-sm text-text-secondary">{zone.percent}</p>
                <p
                  className={`text-sm ${isLight ? "text-text-primary/80" : "text-text-primary/80"
                    }`}
                >
                  {zone.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
