import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookies } from '@/lib/auth-cookies';

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://api-gateway:8080';

export async function POST(request: NextRequest) {
  try {
    await fetch(`${GATEWAY_URL}/apis/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: request.headers.get('cookie') ?? '',
      },
      cache: 'no-store',
    });
  } catch (_error) {
  } finally {
    await clearAuthCookies();
  }

  return NextResponse.json({
    success: true,
    message: '로그아웃되었습니다.',
    data: null,
  });
}
