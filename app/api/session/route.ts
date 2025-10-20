// app/api/session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { looksLikeJwt } from '@/lib/auth';

export const dynamic = 'force-dynamic';


export async function POST(req: NextRequest) {
  const { token, maxAge } = await req.json().catch(() => ({} as any));

  if (!token || !looksLikeJwt(token)) {
    return NextResponse.json({ ok: false, error: 'Invalid token' }, { status: 400 });
  }
  const cookieStore = await cookies()

  cookieStore.set('runalytics.jwt', token, { secure: true })

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