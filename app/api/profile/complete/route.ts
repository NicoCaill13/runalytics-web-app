import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

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

const API_BASE = process.env.NEST_API_URL ?? 'http://localhost:3333';

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const jwt = cookieStore.get('auth_token')?.value; // ajuste le nom du cookie
    const userId = getUserIdFromJwt(jwt);
    if (!userId) {
        return NextResponse.json({ error: 'NO_USER_ID' }, { status: 401 });
    }

    const body = await request.json();

    // body attendu par Nest: { vmaKph, age, hrMaxBpm, hrRestBpm }
    // On forward tel quel. Si ton Nest attend aussi l'userId explicite,
    // tu peux l'ajouter ici.
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
