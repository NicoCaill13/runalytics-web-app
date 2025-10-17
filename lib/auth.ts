export type JwtPayload = {
  sub: string;
  exp?: number; // seconds since epoch
  iat?: number;
  [k: string]: unknown;
};

const STORAGE_KEY = 'runalytics.jwt';

export function setTokenFromString(token: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, token);
}

export function getTokenFromStorage(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY);
}

export function clearToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const base64 = token.split('.')[1];
    if (!base64) return null;
    const json = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeJwt(token);
  if (!payload?.exp) return false; // pas d'exp → on considère valide (dev)
  const now = Math.floor(Date.now() / 1000);
  return payload.exp <= now;
}
