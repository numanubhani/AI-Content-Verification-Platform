import { NextResponse } from 'next/server';

export async function GET() {
  // Mock values; replace with real metrics source later
  const stats = {
    totalChecks: 10000000 + Math.floor(Math.random() * 5000),
    accuracyRate: 99.9,
    countriesServed: 127,
    activeUsers: 15000 + Math.floor(Math.random() * 50),
  };
  return NextResponse.json(stats, { headers: { 'Cache-Control': 'no-store' } });
}


