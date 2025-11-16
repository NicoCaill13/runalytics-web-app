// app/(private)/goals/page.tsx
import Link from "next/link";

export default function GoalsPage() {
  return (
    <div className="p-8 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-text-primary text-4xl font-black leading-tight tracking-[-0.033em]">
              Mes Objectifs de Running
            </h1>
            <p className="text-text-secondary text-base font-normal leading-normal">
              Suivez et gérez votre progression.
            </p>
          </div>
          <Link
            href="/goals/create"
            className="relative flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-secondary text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined">add_circle</span>
            <span className="truncate">Créer un Objectif</span>
          </Link>
        </header>

        {/* Onglets */}
        <div className="mb-8">
          <div className="flex border-b border-border gap-8">
            <button className="flex flex-col items-center justify-center border-b-[3px] border-b-primary text-primary pb-[13px] pt-4">
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                Actifs
              </p>
            </button>
            <button className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-text-secondary pb-[13px] pt-4">
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                Atteints
              </p>
            </button>
            <button className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-text-secondary pb-[13px] pt-4">
              <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                Archivés
              </p>
            </button>
          </div>
        </div>

        {/* Cartes objectifs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Objectif 1 */}
          <Link
            href="/goals/1"
            className="flex flex-col  bg-white border border-gray-100 rounded-xl shadow-sm cursor-pointer"
          >
            <div className="p-6 flex flex-col gap-4 h-full">
              <div className="flex flex-col gap-1">
                <p className="text-text-secondary text-sm font-normal leading-normal">
                  Distance
                </p>
                <p className="text-text-primary text-lg font-bold leading-tight tracking-[-0.015em]">
                  Préparation Semi-Marathon
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-6 justify-between items-center">
                  <p className="text-text-primary text-base font-medium leading-normal">
                    Progression
                  </p>
                  <p className="text-primary-dark text-sm font-bold leading-normal">
                    75%
                  </p>
                </div>
                <div className="rounded-full bg-gray-200">
                  <div
                    className="h-4 rounded-full bg-secondary"
                    style={{ width: "75%" }}
                  />
                </div>
                <p className="text-text-secondary text-sm font-normal leading-normal text-right">
                  15.7 / 21 km
                </p>
              </div>
              <div className="flex items-center gap-3 mt-auto pt-4">
                <p className="text-text-secondary text-sm font-normal leading-normal">
                  Cible : 25/10/2024
                </p>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    className="flex cursor-pointer items-center justify-center rounded-lg size-8 bg-gray-100 text-text-secondary hover:bg-gray-200 hover:text-text-primary"
                  >
                    <span className="material-symbols-outlined text-base">
                      edit
                    </span>
                  </button>
                  <button
                    type="button"
                    className="flex cursor-pointer items-center justify-center rounded-lg size-8 bg-gray-100 text-text-secondary hover:bg-gray-200 hover:text-text-primary"
                  >
                    <span className="material-symbols-outlined text-base">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </Link>

          {/* Objectif 2 */}
          <Link
            href="/goals/2"
            className="flex flex-col rounded-xl shadow-sm bg-card border border-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="p-6 flex flex-col gap-4 h-full">
              <div className="flex flex-col gap-1">
                <p className="text-text-secondary text-sm font-normal leading-normal">
                  Fréquence
                </p>
                <p className="text-text-primary text-lg font-bold leading-tight tracking-[-0.015em]">
                  Courir 3 fois par semaine
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-6 justify-between items-center">
                  <p className="text-text-primary text-base font-medium leading-normal">
                    Progression
                  </p>
                  <p className="text-primary-dark text-sm font-bold leading-normal">
                    33%
                  </p>
                </div>
                <div className="rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: "33%" }}
                  />
                </div>
                <p className="text-text-secondary text-sm font-normal leading-normal text-right">
                  1 / 3 séances
                </p>
              </div>
              <div className="flex items-center gap-3 mt-auto pt-4">
                <p className="text-text-secondary text-sm font-normal leading-normal">
                  Cette semaine
                </p>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    className="flex cursor-pointer items-center justify-center rounded-lg size-8 bg-gray-100 text-text-secondary hover:bg-gray-200 hover:text-text-primary"
                  >
                    <span className="material-symbols-outlined text-base">
                      edit
                    </span>
                  </button>
                  <button
                    type="button"
                    className="flex cursor-pointer items-center justify-center rounded-lg size-8 bg-gray-100 text-text-secondary hover:bg-gray-200 hover:text-text-primary"
                  >
                    <span className="material-symbols-outlined text-base">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </Link>

          {/* Objectif 3 */}
          <Link
            href="/goals/3"
            className="flex flex-col  bg-white border border-gray-100 rounded-xl shadow-sm cursor-pointer"
          >
            <div className="p-6 flex flex-col gap-4 h-full">
              <div className="flex flex-col gap-1">
                <p className="text-text-secondary text-sm font-normal leading-normal">
                  Allure
                </p>
                <p className="text-text-primary text-lg font-bold leading-tight tracking-[-0.015em]">
                  10km sous 50 minutes
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-6 justify-between items-center">
                  <p className="text-text-primary text-base font-medium leading-normal">
                    Progression
                  </p>
                  <p className="text-primary-dark text-sm font-bold leading-normal">
                    58%
                  </p>
                </div>
                <div className="rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: "58%" }}
                  />
                </div>
                <p className="text-text-secondary text-sm font-normal leading-normal text-right">
                  Meilleure allure : 5:12 min/km
                </p>
              </div>
              <div className="flex items-center gap-3 mt-auto pt-4">
                <p className="text-text-secondary text-sm font-normal leading-normal">
                  Cible : 5:00 min/km
                </p>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    className="flex cursor-pointer items-center justify-center rounded-lg size-8 bg-gray-100 text-text-secondary hover:bg-gray-200 hover:text-text-primary"
                  >
                    <span className="material-symbols-outlined text-base">
                      edit
                    </span>
                  </button>
                  <button
                    type="button"
                    className="flex cursor-pointer items-center justify-center rounded-lg size-8 bg-gray-100 text-text-secondary hover:bg-gray-200 hover:text-text-primary"
                  >
                    <span className="material-symbols-outlined text-base">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
