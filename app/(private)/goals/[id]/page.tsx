// app/(private)/goals/[id]/page.tsx

export default function GoalDetailPage() {
  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row flex-wrap justify-between items-start gap-6 p-6 bg-white border border-gray-100 rounded-xl shadow-sm mb-8">
          <div className="flex flex-col gap-2">
            <p className="text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
              Préparation Marathon de Paris 2024
            </p>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-normal leading-normal">
              01 Janvier 2024 - 15 Avril 2024
            </p>
          </div>

          <div className="w-full md:w-auto flex-shrink-0">
            <div className="flex flex-col gap-3 w-full md:w-72">
              <div className="flex gap-6 justify-between items-center">
                <p className="text-base font-medium leading-normal">Progression</p>
                <p className="text-lg font-bold leading-normal text-primary">75%</p>
              </div>
              <div className="h-3 rounded-full bg-border-light dark:bg-border-dark">
                <div
                  className="h-3 rounded-full bg-primary"
                  style={{ width: "75%" }}
                />
              </div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal">
                Plus que 3 semaines !
              </p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left column : plan + actions */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Plan */}
            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
              <div className="space-y-4">
                {/* Semaine 12 */}
                <details className="group" open>
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="font-semibold">Semaine 12: Pic d&apos;intensité</span>
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                      expand_more
                    </span>
                  </summary>
                  <ul className="mt-4 space-y-3 pl-2 border-l-2 border-primary">
                    <li className="pl-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Lundi: Repos
                    </li>
                    <li className="pl-4 text-sm">Mardi: 5x1000m fractionné</li>
                    <li className="pl-4 text-sm">Mercredi: 8km allure footing</li>
                    <li className="pl-4 text-sm">Jeudi: Repos</li>
                    <li className="pl-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Vendredi: 12km allure modérée
                    </li>
                    <li className="pl-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Samedi: Repos
                    </li>
                    <li className="pl-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      Dimanche: 25km sortie longue
                    </li>
                  </ul>
                </details>

                <div className="border-t border-border-light dark:border-border-dark" />

                {/* Semaine 13 */}
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="font-semibold">Semaine 13: Récupération</span>
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                      expand_more
                    </span>
                  </summary>
                  <ul className="mt-4 space-y-3 pl-2 border-l-2 border-primary">
                    <li className="pl-4 text-sm">...</li>
                  </ul>
                </details>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="flex flex-1  items-center justify-center rounded-lg h-14 px-6 text-base font-bold text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-colors"
              >
                <span className="truncate">Marquer comme terminé</span>
              </button>
              <button
                className="flex flex-1 items-center justify-center rounded-lg h-14 px-6 text-base font-bold text-white bg-primary hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-colors"
              >
                <span className="truncate">Modifier l'objectif</span>
              </button>
            </div>
          </div>

          {/* Right column : historique des courses */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            <div className="flex flex-col gap-4">
              {/* Run 1 */}
              <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center size-10 rounded-lg bg-success/10 text-success">
                    <span className="material-symbols-outlined">thumb_up</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sortie Longue</p>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      03 Avril 2024 - Objectif atteint
                    </p>
                  </div>
                </div>
                <div className="w-full sm:w-auto grid grid-cols-2 sm:flex gap-4 text-center sm:text-left">
                  <div className="flex flex-col">
                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      Distance
                    </span>
                    <span className="font-bold">21.1 km</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      Durée
                    </span>
                    <span className="font-bold">1h 45m</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      Allure
                    </span>
                    <span className="font-bold">5:00/km</span>
                  </div>
                </div>
              </div>

              {/* Run 2 */}
              <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center size-10 rounded-lg bg-failure/10 text-failure">
                    <span className="material-symbols-outlined">thumb_down</span>
                  </div>
                  <div>
                    <p className="font-semibold">Fractionné 5x1000m</p>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      01 Avril 2024 - Plus lent que prévu
                    </p>
                  </div>
                </div>
                <div className="w-full sm:w-auto grid grid-cols-2 sm:flex gap-4 text-center sm:text-left">
                  <div className="flex flex-col">
                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      Distance
                    </span>
                    <span className="font-bold">8.2 km</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      Durée
                    </span>
                    <span className="font-bold">42m 10s</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      Allure
                    </span>
                    <span className="font-bold">5:08/km</span>
                  </div>
                </div>
              </div>

              {/* Run 3 */}
              <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center size-10 rounded-lg bg-success/10 text-success">
                    <span className="material-symbols-outlined">thumb_up</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sortie footing</p>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      30 Mars 2024 - Objectif atteint
                    </p>
                  </div>
                </div>
                <div className="w-full sm:w-auto grid grid-cols-2 sm:flex gap-4 text-center sm:text-left">
                  <div className="flex flex-col">
                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      Distance
                    </span>
                    <span className="font-bold">10.0 km</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      Durée
                    </span>
                    <span className="font-bold">55m 02s</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      Allure
                    </span>
                    <span className="font-bold">5:30/km</span>
                  </div>
                </div>
              </div>
              {/* fin cards */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
