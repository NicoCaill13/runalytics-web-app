import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { decodeExp, decodePayload, isJwtValid } from './lib/auth';

const PUBLIC_PATHS = ['/login', '/login/callback', '/api/session', '/robots.txt', '/sitemap.xml'];
const ASSET_PREFIXES = ['/_next', '/static', '/images', '/fonts'];

const isPublicPath = (path: string): boolean => PUBLIC_PATHS.includes(path)

const redirectToLoginPage = (request: NextRequest) => {
    const loginPath = 'login';
    return NextResponse.redirect(new URL(`/${loginPath}`, request.url));
};

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('runalytics.jwt')

    console.log("path", path)
    console.log("isPublicPath", isPublicPath(path))


    const jwt = cookieStore.get('runalytics.jwt')?.value

    if (isPublicPath(path) === false) {
        if (!hasCookie) {
            return redirectToLoginPage(request);
        }
        if (!isJwtValid(jwt)) {
            return redirectToLoginPage(request);
        }
    }
}

export const config = {
    matcher: ['/((?!_next/|static/|images/|fonts/|favicon.ico).*)'],
};
