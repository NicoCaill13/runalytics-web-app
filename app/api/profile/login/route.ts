import { NextResponse } from "next/server";

const API_BASE = process.env.BACK_APP_URL ?? 'http://localhost:3333';

export async function POST(request: Request) {

  const body = await request.json();

  const nestRes = await fetch(`${API_BASE}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ ...body }),
  });

  if (!nestRes.ok) {
    const txt = await nestRes.text();
    return NextResponse.json(
      { error: 'NEST_SAVE_FAILED', detail: txt },
      { status: nestRes.status }
    );
  }

  const data = await nestRes.json();
  return NextResponse.json(data, { status: 200 });
}