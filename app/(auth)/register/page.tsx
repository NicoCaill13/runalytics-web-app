'use client'
import Image from "next/image";
import PasswordInput from "@/components/form/PasswordInput";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const GENDERS = ["MALE", "FEMALE", "OTHER"] as const;
type Gender = (typeof GENDERS)[number];
const API_URL = process.env.BACK_APP_URL ?? "http://localhost:3000";


export default function RegisterPage() {
  const router = useRouter();
  // en haut du composant
  const [fieldErrors, setFieldErrors] = useState<{ userName?: string; email?: string; password?: string; gender?: string; birthDay?: string }>({});

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState<Gender | "">(""); // pas de valeur par défaut
  const [birthDay, setBirthDay] = useState(""); // yyyy-mm-dd

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const params = useSearchParams();


  const deleteCookies = async () => {
    await fetch('/api/session', { method: 'DELETE', credentials: 'include' });
  }

  const validate = (): boolean => {
    const errs: typeof fieldErrors = {};

    if (!userName.trim()) errs.userName = "Le nom d’utilisateur est requis.";
    else if (userName.trim().length < 5) errs.userName = "Minimum 5 caractères.";

    if (!email.trim()) errs.email = "L’email est requis.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Email invalide.";

    if (!password || password.length < 8) errs.password = "Mot de passe : 8 caractères minimum.";

    if (!gender) errs.gender = "Veuillez sélectionner un genre.";

    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDay)) errs.birthDay = "Date invalide (AAAA-MM-JJ).";

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }


  useEffect(() => {
    try {
      const next = params.get('next') || '/register';
      router.replace(next);
    } catch { }
  }, [params, router]);


  async function handleRegister() {
    setError(null);
    if (!validate()) return;


    const payload = {
      email: email.trim().toLowerCase(),
      password,
      userName: userName.trim(),
      gender,
      birthDay, // ISO yyyy-mm-dd
    };

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = "Inscription échouée.";
        try {
          const data = await res.json();
          const arr = data?.error?.message || data?.message;
          if (Array.isArray(arr) && arr.length) msg = arr[0];
          else if (typeof data?.message === "string") msg = data.message;
        } catch { }
        if (/userName/i.test(msg)) setFieldErrors(prev => ({ ...prev, userName: msg }));
        else setError(msg);
        return;
      }
      const data = await res.json();
      const { accessToken } = data.data

      await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ accessToken }),
      });

      router.push("/profile");
    } catch (error: any) {
      setError(error?.message || 'Erreur réseau');
    }
    finally {
      setLoading(false);
    }
  }
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

          <div className="space-y-6">
            <div>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">Nom d’utilisateur</span>
                <input
                  name="userName"
                  placeholder="ex : nicolas.run"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="h-12 px-3 rounded-lg border border-border-light dark:border-border-dark bg-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </label>
              {fieldErrors.userName && (
                <p id="err-username" className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.userName}</p>
              )}
            </div>

            <div>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="vous@exemple.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 px-3 rounded-lg border border-border-light dark:border-border-dark bg-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </label>
              {fieldErrors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.email}</p>}
            </div>

            <div>
              <PasswordInput name="password" label="Mot de passe" placeholder="8 caractères minimum" value={password} onValueChange={setPassword} required />
              {fieldErrors.password && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.password}</p>}
            </div>

            <div>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">Genre</span>
                <select
                  name="gender"
                  required
                  value={gender}
                  onChange={(e) => setGender(e.target.value as Gender)}
                  className="h-12 px-3 rounded-lg border border-border-light dark:border-border-dark bg-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
                >
                  <option value="">Choisir…</option>
                  {GENDERS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </label>
              {fieldErrors.gender && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.gender}</p>}
            </div>

            <div>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">Date de naissance</span>
                <input
                  type="date"
                  name="birthDay"
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                  required
                  className="h-12 px-3 rounded-lg border border-border-light dark:border-border-dark bg-transparent focus:outline-none focus:ring-2 focus:ring-accent/50" />
              </label>
              {fieldErrors.birthDay && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.birthDay}</p>}
            </div>

            <button
              type="submit"
              onClick={handleRegister}
              disabled={loading}
              className="flex w-full items-center justify-center rounded-lg h-14 px-6 text-base font-bold text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-colors"
            >
              {loading && (
                <svg
                  className="absolute left-5 animate-spin size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
                </svg>
              )}
              {loading ? "Création en cours..." : "Créer mon compte"}
            </button>
          </div>

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
