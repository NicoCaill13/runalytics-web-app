import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export const getCookies = async () => {
    const cookieStore = await cookies();
    const hasJwt = cookieStore.has("runalytics.jwt");
    if (!hasJwt) return NextResponse.json({ error: 'NO_JWT' }, { status: 401 });

    const jwt = cookieStore.get('runalytics.jwt')?.value;
    return jwt
}
