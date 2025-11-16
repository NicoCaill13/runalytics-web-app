import { decodePayload } from "@/lib/auth";
import { getCookies } from "@/lib/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE = process.env.BACK_APP_URL ?? 'http://localhost:3333';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const action = searchParams.get("action");
        const jwt = await getCookies()
        const payload = decodePayload(jwt)
        const userId = payload.id

        if (!userId) {
            return NextResponse.json({ error: 'NO_USER_ID' }, { status: 401 });
        }

        const response = await fetch(`${API_BASE}/api/oauth/strava/${action}/${userId}`, {
            method: 'GET', credentials: 'include',
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return NextResponse.json(result);

    } catch (error: any) {
        console.error(error.message);
    }
}