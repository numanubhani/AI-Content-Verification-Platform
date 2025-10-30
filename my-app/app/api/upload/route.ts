export const runtime = 'nodejs';

export async function POST() {
  // Mock accept uploads without parsing; just respond OK
  return Response.json({ status: 'ok' });
}


