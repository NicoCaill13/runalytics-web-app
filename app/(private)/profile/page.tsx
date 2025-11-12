"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/components/auth/UserProvider";
import { useSearchParams, useRouter } from "next/navigation";
import PersonalInfoSection from "@/components/form/PersonalInfoSection";
import PreferenceSection from "@/components/form/PreferenceSection";
import PerformanceSection from "@/components/form/PerformanceSection";
import ThirdPartySection from "@/components/form/ThirdPartySection";
import StravaCallback from "@/components/auth/StravaCallback";

export default function ProfilePage() {
  return (
    <div className="relative flex min-h-screen w-full">
      <main className="flex-1 p-6 lg:p-10 bg-background">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex flex-wrap justify-between gap-3">
              <div className="flex flex-col gap-2">
                <h1 className="text-secondary text-4xl font-black leading-tight tracking-[-0.033em]">Mon Profil</h1>
                <p className="text-text-secondary text-base">Gérez vos informations personnelles et préférences de l'application.</p>
              </div>
            </div>
          </header>

          <div className="space-y-8">
            <StravaCallback />
            <PersonalInfoSection />
            {/* Préférences */}
            <PreferenceSection />

            {/* Services connectés */}
            <ThirdPartySection />
          </div>
        </div>
      </main>
    </div>
  );
}
