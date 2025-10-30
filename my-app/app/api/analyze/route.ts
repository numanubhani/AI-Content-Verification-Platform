export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const kind = (searchParams.get('kind') || 'text') as 'text' | 'image' | 'video';

  const base = {
    label: 'Partially AI-assisted',
    trust_score: 74,
    details: {
      text: ["Detected repetition anomalies", "GPT-like phrasing"],
      image: ["Low EXIF data", "GAN noise"],
      video: ["Synthetic speech patterns"],
    },
  };

  const id = `mock-${Date.now()}`;
  return Response.json({ id, kind, ...base });
}


