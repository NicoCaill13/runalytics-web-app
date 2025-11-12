import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { isJwtValid } from './lib/auth';

const PUBLIC_PATHS = ['/', '/login', '/register', '/login/callback', '/api/session', '/robots.txt', '/sitemap.xml'];
const PUBLIC_FILE = /\.(?:png|jpg|jpeg|webp|gif|svg|ico|txt|xml|json|map|css|js|webm|mp4)$/i;

const isPublicPath = (path: string): boolean => PUBLIC_PATHS.includes(path)

const startsWithAny = (path: string, prefixes: string[]) =>
    prefixes.some((p) => path.startsWith(p));


const redirectToLoginPage = (request: NextRequest) => {
    const loginPath = 'login';
    return NextResponse.redirect(new URL(`/${loginPath}`, request.url));
};

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        startsWithAny(pathname, ['/_next', '/static', '/images', '/fonts', '/api']) ||
        isPublicPath(pathname) ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    if (isPublicPath(pathname) === false) {
        const cookieStore = await cookies()
        const hasCookie = cookieStore.has('runalytics.jwt')
        const jwt = cookieStore.get('runalytics.jwt')?.value

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
