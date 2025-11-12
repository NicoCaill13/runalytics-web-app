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

        // on vient visiblement d’un callback OAuth → recharge profil (providers connectés)
        (async () => {
            await refresh();
            // nettoie l’URL pour enlever ?provider=...&status=...
            router.replace("/profile");
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sp]);

    return null;
}
