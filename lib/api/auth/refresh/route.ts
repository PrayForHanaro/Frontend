import { type NextRequest, NextResponse } from 'next/server';
import { clearAuthCookies, setAuthCookies } from '@/lib/auth-cookies';

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://api-gateway:8080';

type GatewayRefreshResponse = {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken?: string;
    userId?: string | number;
    name?: string;
    role?: string;
    orgId?: string | number;
  };
};

export async function POST(request: NextRequest) {
  try {
    const response = await fetch(`${GATEWAY_URL}/apis/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: request.headers.get('cookie') ?? '',
      },
      cache: 'no-store',
    });

    const result = (await response.json()) as GatewayRefreshResponse;

    if (!response.ok || !result.success || !result.data?.accessToken) {
      await clearAuthCookies();

      return NextResponse.json(
        {
          success: false,
          message: result.message || '토큰 재발급에 실패했습니다.',
          data: null,
        },
        { status: response.status || 401 },
      );
    }

    await setAuthCookies({
      accessToken: result.data.accessToken,
      refreshToken:
        result.data.refreshToken ??
        request.cookies.get('refreshToken')?.value ??
        '',
      userId: result.data.userId ?? request.cookies.get('userId')?.value ?? '',
      name: result.data.name ?? request.cookies.get('name')?.value ?? '',
      role: result.data.role ?? request.cookies.get('role')?.value ?? 'USER',
      orgId: result.data.orgId ?? request.cookies.get('orgId')?.value ?? '',
    });

    return NextResponse.json({
      success: true,
      message: '토큰이 재발급되었습니다.',
      data: null,
    });
  } catch (_error) {
    await clearAuthCookies();

    return NextResponse.json(
      {
        success: false,
        message: '토큰 재발급 처리 중 오류가 발생했습니다.',
        data: null,
      },
      { status: 500 },
    );
  }
}
