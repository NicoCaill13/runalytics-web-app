// app/(auth)/login/page.tsx
"use client";

import Logo from "@/components/homePage/Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSavePersonnal() {
    try {
      setIsSaving(true);
      const payload = {
        email: login?.trim() || null,
        password: pass?.trim() || null,
      };
      const res = await fetch("/api/profile/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });
      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || "Échec de la mise à jour du profil.");
      }
      const data = await res.json();
      const { accessToken } = data.data

      console.log(accessToken)

      await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ accessToken }),
      });
    } catch (error: any) {
      setError(error?.message || 'Erreur réseau');
    }
    finally {
      setIsSaving(false);
      router.push("/profile");
    }
  }

  return (
    <div className="bg-run-bg font-display text-run-blue min-h-dvh flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center">
            <Logo width="200" height="200" />
          </div>
        </div>

        {/* Card */}
        <div className="rounded-lg bg-white p-8 shadow-sm border border-gray-200">
          <form className="flex w-full flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col">
              <label
                className="text-sm font-medium text-run-blue mb-2"
                htmlFor="email"
              >
                Adresse e-mail
              </label>
              <div className="relative flex w-full items-center">
                <span className="material-symbols-outlined text-run-gray absolute left-3">
                  mail
                </span>
                <input
                  id="email"
                  type="email"
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="ton.email@exemple.com"
                  className="w-full h-12 px-3 rounded-lg border border-gray-300 bg-run-bg py-3 pl-10 pr-10 text-run-blue placeholder:text-run-gray focus:border-run-blue focus:outline-none focus:ring-2 focus:ring-run-orange/30"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label
                className="text-sm font-medium text-run-blue mb-2"
                htmlFor="password"
              >
                Mot de passe
              </label>
              <div className="relative flex w-full items-center">
                <span className="material-symbols-outlined text-run-gray absolute left-3">
                  lock
                </span>
                <input
                  id="password"
                  type="password"
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 px-3 rounded-lg border border-gray-300 bg-run-bg py-3 pl-10 pr-10 text-run-blue placeholder:text-run-gray focus:border-run-blue focus:outline-none focus:ring-2 focus:ring-run-orange/30"
                />
                <span className="material-symbols-outlined text-run-gray absolute right-3 cursor-pointer">
                  visibility_off
                </span>
              </div>
            </div>

            {/* Forgot password */}
            <div className="-mt-2 text-right">
              <Link
                href="#"
                className="text-run-blue hover:text-run-orange text-sm font-medium"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              onClick={handleSavePersonnal}
              disabled={isSaving}
              className="flex w-full items-center justify-center rounded-lg h-14 px-6 text-base font-bold text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-colors"
            >
              Se connecter
            </button>
          </form>
        </div>

        {/* Register link */}
        <p className="text-run-gray text-center text-sm mt-8">
          Pas encore de compte ?{" "}
          <Link
            href="/register"
            className="font-semibold text-run-blue hover:text-run-orange"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
