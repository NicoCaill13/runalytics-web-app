import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decodePayload, getCookies } from '@/lib/auth';

// A adapter : URL de ton backend Nest
const API_BASE = process.env.BACK_APP_URL



export async function GET() {
    const jwt = await getCookies()
    const payload = decodePayload(jwt)
    const userId = payload.id

    if (!userId) {
        return NextResponse.json({ error: 'NO_USER_ID' }, { status: 401 });
    }

    const me = await getMe(userId, jwt)
    return NextResponse.json({ ...me });
}


const getMe = async (userId: string, jwt: string) => {
    const route = `api/users/${userId}`
    const response = await fetch(`${API_BASE}/${route}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    });

    const result = await response.json();
    return result.data
}