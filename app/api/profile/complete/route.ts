import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decodePayload } from '@/lib/auth';
import { getCookies } from '@/lib/server';


function getUserIdFromJwt(jwt: string | undefined): string | null {
    if (!jwt) return null;
    try {
        const payloadBase64 = jwt.split('.')[1];
        if (!payloadBase64) return null;
        const json = Buffer.from(payloadBase64, 'base64').toString('utf8');
        const payload = JSON.parse(json);
        return payload.sub ?? null;
    } catch {
        return null;
    }
}

const API_BASE = process.env.BACK_APP_URL ?? 'http://localhost:3333';

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const jwt = cookieStore.get('auth_token')?.value; // ajuste le nom du cookie
    const userId = getUserIdFromJwt(jwt);
    if (!userId) {
        return NextResponse.json({ error: 'NO_USER_ID' }, { status: 401 });
    }

    const body = await request.json();

    const nestRes = await fetch(`${API_BASE}/api/coach/vma/setup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
            ...body,
            userId, // si ton Nest a besoin du userId côté DTO
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
    return NextResponse.json(data, { status: 200 });
}


export async function PATCH(request: Request) {
    const jwt = await getCookies()
    const payload = decodePayload(jwt)
    const userId = payload.id
    if (!userId) {
        return NextResponse.json({ error: 'NO_USER_ID' }, { status: 401 });
    }
    const body = await request.json().catch(() => ({}));
    const upstream = await fetch(`${API_BASE}/api/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(body),
    });
    if (!upstream.ok) {
        const text = await upstream.text().catch(() => "");
        return NextResponse.json({ error: text || `UPSTREAM_${upstream.status}` }, { status: 502 });
    }

    const data = await upstream.json().catch(() => ({}));
    return NextResponse.json(data, { status: 200 });
}
