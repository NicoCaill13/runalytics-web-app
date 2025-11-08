import Cta from "@/components/homePage/Cta";
import Footer from "@/components/homePage/Footer";
import Header from "@/components/homePage/Header";
import Main from "@/components/homePage/Main";

// app/page.tsx
export default function HomePage() {
  return (
    <div className="flex h-full grow flex-col">
      <Header />
      <Main />
      <div className="flex flex-1 justify-center">
        <div className="flex flex-col w-full max-w-[960px] flex-1">

          <main className="flex flex-col gap-10 md:gap-16 lg:gap-20">

            <section className="flex flex-col gap-10 px-4 @container">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 text-center">
                  <h1 className="text-3xl font-bold @[480px]:text-4xl max-w-2xl mx-auto text-primary">
                    Découvrez des analyses que vous ne trouverez nulle part ailleurs
                  </h1>
                  <p className="text-base max-w-3xl mx-auto text-slate-600">
                    Notre plateforme transforme vos données brutes en informations claires pour vous aider à atteindre vos objectifs plus rapidement et à éviter le surentraînement.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: "query_stats",
                    title: "Analyse de performance avancée",
                    desc:
                      "Plongez dans les détails de votre allure, cadence, et oscillation verticale pour identifier vos points forts.",
                  },
                  {
                    icon: "favorite",
                    title: "Maîtrisez vos zones cardiaques",
                    desc:
                      "Optimisez chaque entraînement en comprenant précisément le temps passé dans chaque zone de fréquence cardiaque.",
                  },
                  {
                    icon: "calendar_month",
                    title: "Visualisez votre progression",
                    desc:
                      "Suivez l'évolution de vos performances sur le long terme avec des graphiques et un historique complet.",
                  },
                ].map((f) => (
                  <div
                    key={f.title}
                    className="flex flex-1 gap-4 rounded-xl border border-slate-200 bg-white p-6 flex-col items-start text-left shadow-sm"
                  >
                    <div className="text-secondary">
                      <span className="material-symbols-outlined" style={{ fontSize: 32 }}>
                        {f.icon}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg font-bold text-primary-dark">{f.title}</h2>
                      <p className="text-sm text-slate-500">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>


            <section className="px-4 py-10">
              <div className="flex flex-col gap-8 items-center">
                <h2 className="text-3xl font-bold text-center text-primary">Comment ça marche ?</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full pt-4">
                  {[
                    {
                      step: 1,
                      title: "Importez vos données",
                      desc:
                        "Connectez votre montre GPS ou importez vos fichiers d'activité (.gpx, .fit) en un seul clic.",
                    },
                    {
                      step: 2,
                      title: "Laissez la magie opérer",
                      desc:
                        "Nos algorithmes analysent chaque aspect de votre course pour en extraire des informations précieuses.",
                    },
                    {
                      step: 3,
                      title: "Progressez",
                      desc:
                        "Utilisez nos tableaux de bord interactifs pour comprendre votre performance et planifier vos prochains entraînements.",
                    },
                  ].map((s) => (
                    <div key={s.step} className="flex flex-col items-center text-center gap-4">
                      <div className="flex items-center justify-center size-12 rounded-full bg-secondary/10 text-secondary font-bold text-lg">
                        {s.step}
                      </div>
                      <h3 className="font-bold text-lg text-primary-dark">{s.title}</h3>
                      <p className="text-sm text-slate-600">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
      <Cta />
      <Footer />
    </div>
  );
}
