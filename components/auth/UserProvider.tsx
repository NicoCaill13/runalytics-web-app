'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/lib/type";


type Ctx = {
    user: UserProfile | null;
    loading: boolean;
    error?: string | null;
    refresh: () => Promise<void>;
    setUser: (u: UserProfile | null) => void;
};

const UserContext = createContext<Ctx | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>();

    const fetchMe = async () => {
        setError(null);
        try {
            const res = await fetch("/api/profile/init", { cache: "no-store" });
            if (res.status === 401) {
                router.replace("/login");
                return;
            }
            const data = await res.json().catch(() => null);
            setUser(data ?? null);
        } catch (e: any) {
            setError(e?.message ?? "Une erreur est survenue.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMe();
    }, []);

    const value = useMemo<Ctx>(() => ({
        user,
        loading,
        error,
        refresh: fetchMe,
        setUser,
    }), [user, loading, error]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser must be used within <UserProvider />");
    return ctx;
}