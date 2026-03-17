import { NextRequest, NextResponse } from 'next/server';
import { getLightningDistance } from '@/lib/weather';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lat = parseFloat(searchParams.get('lat') || '61.5');
  const lon = parseFloat(searchParams.get('lon') || '23.8');

  try {
    const distance = await getLightningDistance(lat, lon);
    return NextResponse.json({ distance });
  } catch {
    return NextResponse.json({ distance: null });
  }
}
