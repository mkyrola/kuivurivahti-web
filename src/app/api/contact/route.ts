import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, location, dryerBrand, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    // In production, send email via SendGrid/Resend/etc.
    console.log('Contact form submission:', { name, phone, email, location, dryerBrand, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to process contact form' }, { status: 500 });
  }
}
