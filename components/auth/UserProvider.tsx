'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UserProfile } from "@/lib/type";
import { hasActiveProvider } from "@/lib/auth";


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
    const pathname = usePathname();

    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>();

    // const fetchMe = async () => {
    //     setError(null);
    //     try {
    //         const res = await fetch("/api/profile/init", { cache: "no-store" });
    //         if (res.status === 401) {
    //             router.replace("/login");
    //             return;
    //         }
    //         const data = await res.json().catch(() => null);
    //         setUser(data ?? null);
    //         const isOnProfile = pathname?.startsWith("/profile");
    //         const ready = hasActiveProvider(user);
    //         if (!ready && !isOnProfile) {
    //             router.replace("/profile?setup=1");
    //             return;
    //         }
    //     } catch (e: any) {
    //         setError(e?.message ?? "Une erreur est survenue.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const fetchMe = useCallback(async () => {
        setError(null);
        try {
            const res = await fetch("/api/profile/init", { cache: "no-store" });

            if (res.status === 401) {
                // non authentifié -> login
                router.replace("/login");
                setLoading(false);
                return;
            }

            const data = await res.json().catch(() => null);
            // adapte si ton API renvoie { data: user } au lieu de user direct :
            // setUser(data?.data ?? null);
            setUser(data ?? null);
        } catch (e: any) {
            setError(e?.message ?? "Une erreur est survenue.");
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        fetchMe();
    }, [fetchMe]);


    useEffect(() => {
        if (loading) return;
        if (!user) return;

        const isOnProfile = pathname?.startsWith("/profile");
        const ready = hasActiveProvider(user);

        if (!ready && !isOnProfile) {
            router.replace("/profile?setup=1");
        }
    }, [user, pathname, loading, router]);



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