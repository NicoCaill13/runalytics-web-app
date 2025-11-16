// app/(private)/goals/new/page.tsx
"use client";

export default function CreateGoalPage() {
  return (
    <div className="p-8 w-full">
      <div className="max-w-3xl mx-auto">
        {/* Header / intro */}
        <div className="flex flex-wrap justify-between gap-3 mb-8">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-custom-primary text-4xl font-black leading-tight tracking-[-0.033em]">
              Définissez votre prochain défi
            </p>
            <p className="text-custom-text-body text-base font-normal leading-normal">
              Créez un nouvel objectif de course pour suivre vos progrès et rester
              motivé.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Type d'objectif */}
          <section>
            <h3 className="text-custom-primary text-[22px] font-bold leading-tight tracking-[-0.015em] text-left pb-3 pt-5">
              Type d&apos;objectif
            </h3>
            <div className="flex gap-3 flex-wrap">
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-custom-action/20 pl-4 pr-4 border border-custom-action">
                <p className="text-custom-action text-sm font-bold leading-normal">
                  Distance
                </p>
              </button>
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 hover:bg-gray-200 pl-4 pr-4 border border-transparent">
                <p className="text-custom-text-body text-sm font-medium leading-normal">
                  Durée
                </p>
              </button>
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 hover:bg-gray-200 pl-4 pr-4 border border-transparent">
                <p className="text-custom-text-body text-sm font-medium leading-normal">
                  Allure
                </p>
              </button>
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 hover:bg-gray-200 pl-4 pr-4 border border-transparent">
                <p className="text-custom-text-body text-sm font-medium leading-normal">
                  Course spécifique
                </p>
              </button>
            </div>
          </section>

          {/* Détails de l'objectif */}
          <section>
            <h3 className="text-custom-primary text-[22px] font-bold leading-tight tracking-[-0.015em] text-left pb-3 pt-5">
              Détails de l&apos;objectif
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              {/* Nom de l'objectif */}
              <div className="flex flex-col">
                <label
                  className="flex flex-col min-w-40 flex-1"
                  htmlFor="goal-name"
                >
                  <p className="text-custom-primary text-base font-medium leading-normal pb-2">
                    Nom de l&apos;objectif
                  </p>
                  <input
                    id="goal-name"
                    placeholder="Ex: Marathon de Paris 2024"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-custom-text-body focus:outline-0 focus:ring-2 focus:ring-custom-action/50 border border-custom-border bg-white h-12 placeholder:text-custom-text-placeholder p-3 text-base font-normal leading-normal"
                  />
                </label>
              </div>

              {/* Valeur cible */}
              <div className="flex flex-col">
                <label
                  className="flex flex-col min-w-40 flex-1"
                  htmlFor="goal-target"
                >
                  <p className="text-custom-primary text-base font-medium leading-normal pb-2">
                    Valeur Cible
                  </p>
                  <div className="relative">
                    <input
                      id="goal-target"
                      type="number"
                      placeholder="42.195"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-custom-text-body focus:outline-0 focus:ring-2 focus:ring-custom-action/50 border border-custom-border bg-white h-12 placeholder:text-custom-text-placeholder p-3 text-base font-normal leading-normal pr-16"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-custom-text-body text-sm">km</span>
                    </div>
                  </div>
                </label>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label
                  className="flex flex-col min-w-40 flex-1"
                  htmlFor="goal-description"
                >
                  <p className="text-custom-primary text-base font-medium leading-normal pb-2">
                    Description (Optionnel)
                  </p>
                  <textarea
                    id="goal-description"
                    placeholder="Ajoutez plus de contexte sur votre objectif..."
                    className="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-custom-text-body focus:outline-0 focus:ring-2 focus:ring-custom-action/50 border border-custom-border bg-white h-24 placeholder:text-custom-text-placeholder p-3 text-base font-normal leading-normal"
                  />
                </label>
              </div>

              {/* Date de début */}
              <div className="flex flex-col">
                <label
                  className="flex flex-col min-w-40 flex-1"
                  htmlFor="start-date"
                >
                  <p className="text-custom-primary text-base font-medium leading-normal pb-2">
                    Date de début
                  </p>
                  <div className="relative">
                    <input
                      id="start-date"
                      type="date"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-custom-text-body focus:outline-0 focus:ring-2 focus:ring-custom-action/50 border border-custom-border bg-white h-12 placeholder:text-custom-text-placeholder p-3 text-base font-normal leading-normal pr-10"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="material-symbols-outlined text-custom-text-body">
                        calendar_today
                      </span>
                    </div>
                  </div>
                </label>
              </div>

              {/* Date de fin */}
              <div className="flex flex-col">
                <label
                  className="flex flex-col min-w-40 flex-1"
                  htmlFor="end-date"
                >
                  <p className="text-custom-primary text-base font-medium leading-normal pb-2">
                    Date de fin
                  </p>
                  <div className="relative">
                    <input
                      id="end-date"
                      type="date"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-custom-text-body focus:outline-0 focus:ring-2 focus:ring-custom-action/50 border border-custom-border bg-white h-12 placeholder:text-custom-text-placeholder p-3 text-base font-normal leading-normal pr-10"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="material-symbols-outlined text-custom-text-body">
                        calendar_today
                      </span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </section>

          {/* Bouton submit */}
          <div className="flex justify-start pt-6">
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-lg h-14 px-6 text-base font-bold text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-colors"
            >
              <span className="truncate">Créer l&apos;objectif</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
