'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type AuthCtx = { authed: boolean; setAuthed: (v: boolean) => void };
const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ initialAuthed, children }: { initialAuthed: boolean; children: ReactNode }) {
    const [authed, setAuthed] = useState<boolean>(initialAuthed);
    return <Ctx.Provider value={{ authed, setAuthed }}>{children}</Ctx.Provider>;
}

export function useAuth() {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
}
