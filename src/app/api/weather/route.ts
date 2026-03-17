import { NextRequest, NextResponse } from 'next/server';
import { getDryingWindows } from '@/lib/weather';
import type { GrainType } from '@/lib/emc';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = parseFloat(searchParams.get('lat') || '61.5');
  const lon = parseFloat(searchParams.get('lon') || '23.8');
  const grain = (searchParams.get('grain') || 'ohra') as GrainType;

  try {
    const windows = await getDryingWindows(lat, lon, grain);
    return NextResponse.json({ windows });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}
