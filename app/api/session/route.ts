// app/api/session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { looksLikeJwt } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const env = process.env.NODE_ENV
export async function POST(req: NextRequest) {
  const { accessToken, maxAge } = await req.json().catch(() => ({} as any));

  if (!accessToken || !looksLikeJwt(accessToken)) {
    return NextResponse.json({ ok: false, error: 'Invalid token' }, { status: 400 });
  }
  const cookieStore = await cookies()

  cookieStore.set('runalytics.jwt', accessToken, {
    secure: env === 'development' ? false : true, httpOnly: true,
    path: '/',
  })

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('runalytics.jwt');

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const hasCookie = (await cookies()).has('runalytics.jwt');
  return new Response(JSON.stringify({ authed: hasCookie }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}