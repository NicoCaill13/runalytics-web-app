import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decodePayload } from '@/lib/auth';

// A adapter : URL de ton backend Nest
const API_BASE = process.env.BACK_APP_URL

export async function GET() {
    const cookieStore = await cookies();
    const jwt = cookieStore.get('runalytics.jwt')?.value;
    const payload = decodePayload(jwt)
    const userId = payload.user.id

    console.log(payload)

    if (!userId) {
        return NextResponse.json({ error: 'NO_USER_ID' }, { status: 401 });
    }

    const res = await fetch(`${API_BASE}/api/me/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    });
    const data = await res.json();


    return NextResponse.json(data);
}
