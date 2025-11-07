import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decodePayload } from '@/lib/auth';


const API_BASE = process.env.BACK_APP_URL;

// PATCH to me/userId
// POST to 


const createPhysio = async (jwt: string, userId: string, metric: string, payload: any) => {
    const body = JSON.stringify({ metric: metric, source: "USER", ...payload })

    const nestRes = await fetch(`${API_BASE}/api/coach/cardio/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
        body: body
    });
    if (!nestRes.ok) {
        const txt = await nestRes.text();
        return NextResponse.json(
            { error: 'NEST_SAVE_FAILED', detail: txt },
            { status: nestRes.status }
        );
    }

    const data = await nestRes.json();

    return data
}

const updateUser = async (jwt: string, userId: string, payload: any) => {
    const nestRes = await fetch(`${API_BASE}/api/me/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
            ...payload,
            userId,
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

    return data
}

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const jwt = cookieStore.get('runalytics.jwt')?.value || 'jwt';
    const payload = decodePayload(jwt)
    const userId = payload.user.id
    if (!userId) {
        return NextResponse.json({ error: 'NO_USER_ID' }, { status: 401 });
    }

    const body = await request.json();

    console.log(body)

    const data = await updateUser(jwt, userId, body)
    const hrMax = await createPhysio(jwt, userId, "FC_MAX", { value: body.fcm })
    const hrMin = await createPhysio(jwt, userId, "FC_REPOS", { value: body.fcrepos })
    const hrRes = await createPhysio(jwt, userId, "FC_RESERVE", { value: body.fcm - body.fcrepos })
    const vma = await createPhysio(jwt, userId, "VMA", {
        value: body.vmaKph, runsCount: body.runsCount, windowStart: body.windowStart,
        windowEnd: body.windowEnd
    })

    return NextResponse.json({ ...hrMax, ...hrMin, hrRes, ...vma, ...data }, { status: 200 });
}
