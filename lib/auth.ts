// Utilitaires JWT côté client (validation "basique" = expiration uniquement)

export function getStoredJwt(): string | null {
  try {
    return localStorage.getItem("runalytics.jwt");
  } catch {
    return null;
  }
}

export function setStoredJwt(token: string) {
  try {
    localStorage.setItem("runalytics.jwt", token);
  } catch {
    // ignore
  }
}

export function removeStoredJwt() {
  try {
    localStorage.removeItem("runalytics.jwt");
  } catch {
    // ignore
  }
}

/** Decode base64url en objet, ou null si erreur */
export function decodePayload(token: string): any | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(parts[1].length / 4) * 4, "=");
    const json = atob(payload);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function isJwtValid(token: string | null): boolean {
  if (!token) return false;
  const payload = decodeExp(token);
  if (!payload) return false;
  // exp = seconds since epoch
  if (typeof payload !== "number") return false;
  const nowSec = Math.floor(Date.now() / 1000);
  return payload > nowSec;
}

/** Détecte une forme JWT simple */
export function looksLikeJwt(value: string): boolean {
  return /^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/.test(value);
}

export function decodeExp(token: string): number | null {
  try {
    const [, payload] = token.split('.');
    if (!payload) return null;
    const b64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const pad = '='.repeat((4 - (b64.length % 4)) % 4);
    const json = atob(b64 + pad);
    const data = JSON.parse(json);
    return typeof data.exp === 'number' ? data.exp : null;
  } catch {
    return null;
  }
}

export function isJwtValidInLocalStorage(): boolean {
  try {
    const t = localStorage.getItem('runalytics.jwt');
    if (!t || !looksLikeJwt(t)) return false;
    const exp = decodeExp(t);
    if (!exp) return false;
    const now = Math.floor(Date.now() / 1000);
    return exp > now;
  } catch {
    return false;
  }
}

export function hasJwt(): boolean {
  try {
    const t = localStorage.getItem('runalytics.jwt');
    return typeof t === 'string' && t.length > 0;
  } catch {
    return false;
  }
}