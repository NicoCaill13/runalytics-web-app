// app/(private)/dashboard/page.tsx

export default function DashboardPage() {
  return (
    <div className="p-8 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-900 text-4xl font-black leading-tight tracking-[-0.033em] font-display">
              Tableau de bord
            </h1>
            <p className="text-gray-500 text-base font-normal leading-normal font-display">
              Aperçu de vos performances de course.
            </p>
          </div>
        </header>

        {/* Stat cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="flex flex-1 flex-col gap-2 rounded-xl p-6 bg-white border border-gray-200">
            <p className="text-gray-600 text-base font-medium leading-normal font-display">
              Distance (ce mois-ci)
            </p>
            <p className="text-gray-900 tracking-light text-3xl font-bold leading-tight font-display">
              124 km
            </p>
            <p className="text-green-600 text-base font-medium leading-normal font-display">
              +5.2%
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-2 rounded-xl p-6 bg-white border border-gray-200">
            <p className="text-gray-600 text-base font-medium leading-normal font-display">
              Séances (ce mois-ci)
            </p>
            <p className="text-gray-900 tracking-light text-3xl font-bold leading-tight font-display">
              16
            </p>
            <p className="text-green-600 text-base font-medium leading-normal font-display">
              +2.1%
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-2 rounded-xl p-6 bg-white border border-gray-200">
            <p className="text-gray-600 text-base font-medium leading-normal font-display">
              Durée totale
            </p>
            <p className="text-gray-900 tracking-light text-3xl font-bold leading-tight font-display">
              18h 32min
            </p>
            <p className="text-red-600 text-base font-medium leading-normal font-display">
              -1.5%
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-2 rounded-xl p-6 bg-white border border-gray-200">
            <p className="text-gray-600 text-base font-medium leading-normal font-display">
              Dénivelé positif
            </p>
            <p className="text-gray-900 tracking-light text-3xl font-bold leading-tight font-display">
              1,200 m
            </p>
            <p className="text-green-600 text-base font-medium leading-normal font-display">
              +8.0%
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Chart bloc */}
            <section className="flex flex-col rounded-xl bg-white border border-gray-200">
              <header className="flex justify-between items-center p-4">
                <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-[-0.015em] font-display">
                  Évolution de ma distance
                </h2>
                <div className="flex h-10 w-auto items-center justify-center rounded-lg bg-gray-100 p-1">
                  <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-3 has-[:checked]:bg-white has-[:checked]:shadow-sm has-[:checked]:text-gray-800 text-gray-500 text-sm font-medium leading-normal font-display">
                    <span className="truncate">Semaine</span>
                    <input
                      className="invisible w-0"
                      name="period-chart"
                      type="radio"
                      value="Semaine"
                    />
                  </label>
                  <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-3 has-[:checked]:bg-white has-[:checked]:shadow-sm has-[:checked]:text-gray-800 text-gray-500 text-sm font-medium leading-normal font-display">
                    <span className="truncate">Mois</span>
                    <input
                      className="invisible w-0"
                      name="period-chart"
                      type="radio"
                      value="Mois"
                      defaultChecked
                    />
                  </label>
                  <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-3 has-[:checked]:bg-white has-[:checked]:shadow-sm has-[:checked]:text-gray-800 text-gray-500 text-sm font-medium leading-normal font-display">
                    <span className="truncate">Année</span>
                    <input
                      className="invisible w-0"
                      name="period-chart"
                      type="radio"
                      value="Année"
                    />
                  </label>
                </div>
              </header>
              <div className="p-4">
                <img
                  alt="Bar chart showing weekly running distance."
                  className="w-full h-64 object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHthxLKOnq0ZHm2UL-R63L2mBgiILKkK2g4eoMVRv0iTgvfj68VqfH7EdOmgeYJ36EpuQiTtY2pvXcFudt09kCtiITQ80N4y8G-ZuHyjmCy1IEwnG6dwRNVBUF3T3_o6Cj3DRc7Y_4ifAJsA0wfbV_AFUKuL-axFQ1flbEx-_sXKE-f_S20kT10yuk9yfOGV31ZDkf2-9nNlRMPdD30x0Y2T21CJg7FyEkmyJ0gJ0LjxJhYCFlQfbaGeHi3xY-7yY4eojqH_kShQ"
                />
              </div>
            </section>

            {/* Dernières activités */}
            <section className="flex flex-col rounded-xl bg-white border border-gray-200">
              <header className="flex justify-between items-center p-4">
                <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-[-0.015em] font-display">
                  Dernières activités
                </h2>
                <button className="text-sm font-medium text-primary hover:underline">
                  Voir tout
                </button>
              </header>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                  <div className="bg-primary/20 text-primary p-3 rounded-lg">
                    <span className="material-symbols-outlined">
                      directions_run
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      Sortie longue du dimanche
                    </p>
                    <p className="text-sm text-gray-500">24 mars 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">15.2 km</p>
                    <p className="text-sm text-gray-500">5:10 /km</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                  <div className="bg-primary/20 text-primary p-3 rounded-lg">
                    <span className="material-symbols-outlined">timer</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      Séance de fractionné
                    </p>
                    <p className="text-sm text-gray-500">22 mars 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">8.5 km</p>
                    <p className="text-sm text-gray-500">4:35 /km</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                  <div className="bg-primary/20 text-primary p-3 rounded-lg">
                    <span className="material-symbols-outlined">
                      directions_run
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      Footing de récupération
                    </p>
                    <p className="text-sm text-gray-500">21 mars 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">6.0 km</p>
                    <p className="text-sm text-gray-500">5:45 /km</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Colonne de droite : records */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <section className="flex flex-col rounded-xl bg-white border border-gray-200">
              <header className="p-4">
                <h2 className="text-gray-900 text-xl font-bold leading-tight tracking-[-0.015em] font-display">
                  Mes Records
                </h2>
              </header>
              <div className="p-4 pt-0 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary">
                    military_tech
                  </span>
                  <div>
                    <p className="font-semibold text-gray-800">1km</p>
                    <p className="text-sm text-gray-500">
                      3:45 <span className="mx-1">·</span> 12 fév. 2024
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary">
                    military_tech
                  </span>
                  <div>
                    <p className="font-semibold text-gray-800">5km</p>
                    <p className="text-sm text-gray-500">
                      20:15 <span className="mx-1">·</span> 02 mars 2024
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary">
                    military_tech
                  </span>
                  <div>
                    <p className="font-semibold text-gray-800">10km</p>
                    <p className="text-sm text-gray-500">
                      42:30 <span className="mx-1">·</span> 15 jan. 2024
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary">
                    military_tech
                  </span>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Semi-marathon
                    </p>
                    <p className="text-sm text-gray-500">
                      1:35:10 <span className="mx-1">·</span> 28 oct. 2023
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
