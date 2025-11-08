// app/(auth)/register/page.tsx
import Image from "next/image";
import Footer from "@/components/homePage/Footer";
import Header from "@/components/homePage/Header";
import PasswordInput from "@/components/form/PasswordInput";


export default function RegisterPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      {/* Colonne gauche (visuel) */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-primary p-12">
        <div className="w-full max-w-md text-white">

          <div className="w-full h-auto rounded-xl overflow-hidden">
            <Image
              src="/runalytics_real2.png"
              alt="Abstract data visualization"
              width={800}
              height={600}
              className="object-cover w-full h-auto"
              priority
            />
          </div>

          <h1 className="text-4xl font-black mt-8 leading-tight">Transformez vos données en performances.</h1>
          <p className="text-lg text-white/80 mt-4">Analysez chaque course, suivez vos progrès et atteignez de nouveaux sommets.</p>
        </div>
      </div>

      {/* Colonne droite (formulaire) */}
      <main className="w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <h2 className="text-primary dark:text-white text-xl font-bold">Runalytics</h2>
          </div>

          <div className="mb-8">
            <p className="text-4xl font-black leading-tight tracking-[-0.033em]">Créez votre compte</p>
            <p className="text-base text-text-secondary-light dark:text-text-secondary-dark mt-2">Rejoignez la communauté et commencez votre analyse.</p>
          </div>

          {/* TODO: brancher une Server Action ou un endpoint API */}
          <form action={signup} className="space-y-6">
            <div>
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2">Nom complet</p>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Entrez votre nom complet"
                  required
                  className="form-input w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-background-dark/50 h-14 p-[15px]"
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2">Adresse e-mail</p>
                <input
                  type="email"
                  name="email"
                  placeholder="Entrez votre adresse e-mail"
                  required
                  className="form-input w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-background-dark/50 h-14 p-[15px]"
                />
              </label>
            </div>

            <div>
              <PasswordInput name="password" label="Mot de passe" placeholder="8 caractères minimum" required />
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2">Confirmer le mot de passe</p>
                <input
                  type="password"
                  name="passwordConfirm"
                  placeholder="Confirmez votre mot de passe"
                  required
                  className="form-input w-full rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-background-dark/50 h-14 p-[15px]"
                />
              </label>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-lg h-14 px-6 text-base font-bold text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-colors"
            >
              Créer un compte
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-text-secondary-light dark:text-text-secondary-dark">
            En créant un compte, vous acceptez notre{" "}
            <a className="font-medium text-accent hover:underline" href="/legal/privacy">Politique de confidentialité</a> et nos{" "}
            <a className="font-medium text-accent hover:underline" href="/legal/terms">Conditions d'utilisation</a>.
          </div>

          <div className="mt-8 text-center text-base text-text-secondary-light dark:text-text-secondary-dark">
            Déjà un compte ?{" "}
            <a className="font-bold text-accent hover:underline" href="/login">Se connecter</a>
          </div>
        </div>
      </main>

    </div>
  );
}
async function signup(formData: FormData) {
  "use server";
  const fullName = formData.get("fullName")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();
  const passwordConfirm = formData.get("passwordConfirm")?.toString();

  if (!fullName || !email || !password || !passwordConfirm) {
    throw new Error("Champs requis manquants");
  }
  if (password !== passwordConfirm) {
    throw new Error("Les mots de passe ne correspondent pas");
  }

  // TODO: insérer la création en base, hash (bcrypt), etc.
  // await createUser({ fullName, email, passwordHash: await hash(password) });

  // Redirection simple (Next 15):
  return { redirect: "/onboarding" };
}