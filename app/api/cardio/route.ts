import { decodePayload } from "@/lib/auth";
import { getCookies } from "@/lib/server";
import { NextResponse } from 'next/server';


const API_BASE = process.env.BACK_APP_URL ?? 'http://localhost:3333';
export async function POST(request: Request) {
  const jwt = await getCookies()
  const payload = decodePayload(jwt)
  const userId = payload.id

  if (!userId) {
    return NextResponse.json({ error: 'NO_USER_ID' }, { status: 401 });
  }

  const body = await request.json();

  const nestRes = await fetch(`${API_BASE}/api/coach/cardio/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      ...body
    }),
  });

  if (!nestRes.ok) {
    const txt = await nestRes.text();
    return NextResponse.json(
      { error: 'NEST_SAVE_FAILED', detail: txt },
      { status: nestRes.status }
    );
  }

  const data = await nestRes.json();
  return NextResponse.json(data, { status: 201 });
}