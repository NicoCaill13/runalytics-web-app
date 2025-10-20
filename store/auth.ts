'use client';

import { isJwtValid, looksLikeJwt } from '@/lib/auth';
import { create } from 'zustand';

type AuthState = {
  jwt: string | null;
  isAuthenticated: boolean;
  hydrate: () => void;
  login: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  jwt: null,
  isAuthenticated: false,

  hydrate: () => {
    try {
      const t = localStorage.getItem('runalytics.jwt');
      set({ jwt: t, isAuthenticated: isJwtValid(t) });
    } catch {
      set({ jwt: null, isAuthenticated: false });
    }
  },

  login: (token: string) => {
    if (!looksLikeJwt(token)) return;
    try {
      localStorage.setItem('runalytics.jwt', token);
    } catch {}
    set({ jwt: token, isAuthenticated: isJwtValid(token) });
  },

  logout: () => {
    try {
      localStorage.removeItem('runalytics.jwt');
    } catch {}
    set({ jwt: null, isAuthenticated: false });
  },
}));

if (typeof window !== 'undefined') {
  useAuthStore.getState().hydrate();
  window.addEventListener('storage', (e) => {
    if (e.key === 'runalytics.jwt') useAuthStore.getState().hydrate();
  });
}
