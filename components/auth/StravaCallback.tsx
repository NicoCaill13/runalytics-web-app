// app/(private)/profile/ProfileCallbackEffect.tsx
"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "./UserProvider";

export default function StravaCallback() {
    const sp = useSearchParams();
    const router = useRouter();
    const { refresh } = useUser();

    useEffect(() => {
        const status = sp.get("status");
        const provider = sp.get("provider");
        if (!status && !provider) return;

        (async () => {
            await refresh();
            router.replace("/profile");
        })();
    }, [sp]);

    return null;
}
