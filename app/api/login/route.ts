import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';


const encoder = new TextEncoder();
const secret = encoder.encode(process.env.AUTH_SECRET ?? 'dev_secret');


export async function POST(req: Request) {
const { email, password } = await req.json();


// TODO: branchement réel. Pour MVP: n'importe quel email + mot de passe >= 4 chars
if (!email || !password || password.length < 4) {
return NextResponse.json({ message: 'Identifiants invalides' }, { status: 401 });
}


const token = await new SignJWT({ sub: email })
.setProtectedHeader({ alg: 'HS256' })
.setIssuedAt()
.setExpirationTime('7d')
.sign(secret);


const res = NextResponse.json({ ok: true });
res.cookies.set('auth_token', token, {
httpOnly: true,
secure: true,
sameSite: 'lax',
path: '/',
maxAge: 60 * 60 * 24 * 7,
});
return res;
}