import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decodePayload } from '@/lib/auth';

const API_BASE = process.env.BACK_APP_URL

export async function GET() {
    const cookieStore = await cookies();
    const jwt = cookieStore.get('runalytics.jwt')?.value;
    const payload = decodePayload(jwt)
    const userId = payload.user.id

    if (!userId) {
        return NextResponse.json({ error: 'NO_USER_ID' }, { status: 401 });
    }


    const me = await getMe(userId, jwt)
    const vma = await estimateVma(userId, jwt)
    const zones = await getZones(userId, jwt)
    return NextResponse.json({ ...me, ...vma, ...zones });
}


const getMe = async (userId: string, jwt: string) => {
    const route = `api/me/${userId}`
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


const estimateVma = async (userId: string, jwt: string) => {
    const route = `api/coach/vma/estimate/${userId}`

    const response = await fetch(`${API_BASE}/${route}`, {
        method: 'GET', credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    });
    const result = await response.json();
    return result.data
}

const getZones = async (userId: string, jwt: string) => {


    const route = `api/coach/cardio/zones/${userId}`
    const response = await fetch(`${API_BASE}/${route}`, {
        method: 'GET', credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    });
    const result = await response.json();

    return result.statusCode === 200 ? result.data : []

}