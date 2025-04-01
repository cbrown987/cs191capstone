import { NextRequest, NextResponse } from 'next/server';
import { handleRequest } from '@/app/lib/api';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await handleRequest(body);

    const statusCode = result.success ? 200 : result.message === 'Invalid credentials' ? 401 : 400;
    return NextResponse.json(result, { status: statusCode });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}