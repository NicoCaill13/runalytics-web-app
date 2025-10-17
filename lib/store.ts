'use client';

import { create } from 'zustand';
import { clearToken, decodeJwt, getTokenFromStorage, isTokenExpired, setTokenFromString } from './auth';

type UserState = {
  id: string;
  username?: string | null;
};

type AuthState = {
  token: string | null;
  user: UserState | null;
  setToken: (t: string | null) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  bootstrapFromStorage: () => void;
  bootstrapFromToken: (token: string) => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,

  setToken: (t) => set({ token: t }),

  logout: () => {
    clearToken();
    set({ token: null, user: null });
  },

  isAuthenticated: () => {
    const t = get().token ?? getTokenFromStorage();
    if (!t) return false;
    return !isTokenExpired(t);
  },

  bootstrapFromStorage: () => {
    const t = getTokenFromStorage();
    if (!t) return;
    set({ token: t });
    const payload = decodeJwt(t);
    if (payload?.sub) {
      set({ user: { id: payload.sub as string } });
    }
  },

  bootstrapFromToken: (token: string) => {
    setTokenFromString(token);
    set({ token });
    const payload = decodeJwt(token);
    if (payload?.sub) {
      set({ user: { id: payload.sub as string } });
    }
  },
}));

// auto-boot au premier import côté client
if (typeof window !== 'undefined') {
  const s = useAuthStore.getState();
  if (!s.token) s.bootstrapFromStorage();
}
