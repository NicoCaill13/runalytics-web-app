import { decodePayload } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, jwt } = await req.json();
  const res = await fetch(
    `${process.env.BACK_APP_URL}/api/activities/sync-runs/${userId}`,
    {
      method: 'POST', credentials: 'include',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return new Response(null, { status: res.ok ? 204 : res.status });
}

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const hasCookie = cookieStore.has('runalytics.jwt');
    if (!hasCookie) {
      throw new Error(`Response status:`);
    }

    const token = cookieStore.get('runalytics.jwt')?.value;
    const payload = decodePayload(token)
    const { id } = payload.user
    const response = await fetch(

      `${process.env.BACK_APP_URL}/api/coach/vma/estimate/${id}`,
      {
        method: 'GET', credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return NextResponse.json(result);

  } catch (error: any) {
    console.error(error.message);
  }
}