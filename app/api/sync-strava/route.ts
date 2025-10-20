export async function POST(req: Request) {
  const { userId, jwt } = await req.json(); 
  console.log("userid from api next", userId)
  const res = await fetch(
    `${process.env.BACK_APP_URL}/api/activities/sync-runs/${userId}`,
    { method: 'POST', credentials: 'include', headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json',
        }, }
  );
  return new Response(null, { status: res.ok ? 204 : res.status });
}