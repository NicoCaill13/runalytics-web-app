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
function decodePayload(token: string): any | null {
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

/** "Validité" côté client = présence + exp future (signature NON vérifiée côté client) */
export function isJwtValid(token: string | null): boolean {
  if (!token) return false;
  const payload = decodePayload(token);
  if (!payload) return false;
  // exp = seconds since epoch
  if (typeof payload.exp !== "number") return false;
  const nowSec = Math.floor(Date.now() / 1000);
  return payload.exp > nowSec;
}

/** Détecte une forme JWT simple */
export function looksLikeJwt(value: string): boolean {
  return /^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/.test(value);
}
