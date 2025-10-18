import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_PATHS = ['/login', '/login/callback', '/favicon.ico', '/robots.txt', '/sitemap.xml'];
const ASSET_PREFIXES = ['/_next', '/static', '/images', '/fonts'];

const startsWithAny = (p: string, bases: string[]) => bases.some((b) => p === b || p.startsWith(b));

function decodePayload(token: string): any | null {
    try {
        const parts = token.split('.');
        if (parts.length < 2) return null;
        const b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const pad = '='.repeat((4 - (b64.length % 4)) % 4);
        const json = atob(b64 + pad);
        return JSON.parse(json);
    } catch {
        return null;
    }
}

async function verifyJwt(token: string): Promise<boolean> {
    const secret = process.env.AUTH_SECRET;
    if (secret) {
        await jwtVerify(token, new TextEncoder().encode(secret)); // HS256 attendu
        return true;
    }
    // fallback : vérifie exp uniquement (moins sûr)
    const payload = decodePayload(token);
    if (!payload || typeof payload.exp !== 'number') return false;
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
}

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (startsWithAny(pathname, ASSET_PREFIXES)) return NextResponse.next();

    if (startsWithAny(pathname, PUBLIC_PATHS)) {
        // Si déjà authentifié, éviter /login → /
        if (pathname === '/login') {
            const tok = req.cookies.get('runalytics.jwt')?.value;
            if (tok) {
                try {
                    const ok = await verifyJwt(tok);
                    if (ok) {
                        const url = req.nextUrl.clone();
                        url.pathname = '/';
                        return NextResponse.redirect(url);
                    }
                } catch {
                    /* stay on /login */
                }
            }
        }
        return NextResponse.next();
    }

    // Routes privées → JWT requis (via cookie)
    const token = req.cookies.get('runalytics.jwt')?.value;
    if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        url.searchParams.set('next', pathname || '/');
        return NextResponse.redirect(url);
    }

    try {
        const ok = await verifyJwt(token);
        if (ok) return NextResponse.next();
    } catch {
        /* invalid */
    }

    const res = NextResponse.redirect(new URL('/login', req.url));
    res.cookies.set('runalytics.jwt', '', { path: '/', maxAge: 0 });
    return res;
}

export const config = {
    matcher: ['/((?!_next/|static/|images/|fonts/|favicon.ico).*)'],
};
