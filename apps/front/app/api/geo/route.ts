import { geolocation } from '@vercel/functions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const geo = geolocation(request);
    return NextResponse.json({ country: geo.country });
  } catch (error) {
    return NextResponse.json({ country: '' });
  }
}
