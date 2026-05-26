import { NextResponse } from 'next/server';

export async function GET() {
  const evUrl = process.env.EVOLUTION_API_URL;
  const evKey = process.env.EVOLUTION_API_KEY;

  return NextResponse.json({
    environment: process.env.NODE_ENV,
    hasEvolutionUrl: !!evUrl,
    hasEvolutionKey: !!evKey,
    evolutionUrlPrefix: evUrl ? evUrl.substring(0, 30) + '...' : 'NOT SET',
    evolutionKeyPrefix: evKey ? evKey.substring(0, 10) + '...' : 'NOT SET',
    timestamp: new Date().toISOString(),
  });
}
