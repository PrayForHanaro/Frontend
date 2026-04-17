import { type NextRequest, NextResponse } from 'next/server';
import { setAuthCookies } from '@/lib/auth-cookies';

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://api-gateway:8080';

type GatewaySignupResponse = {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    userId: string | number;
    name: string;
    role: string;
    orgId: string | number;
  };
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${GATEWAY_URL}/apis/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const result = (await response.json()) as GatewaySignupResponse;

    if (!response.ok || !result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message || '회원가입에 실패했습니다.',
          data: null,
        },
        { status: response.status },
      );
    }

    await setAuthCookies(result.data);

    return NextResponse.json({
      success: true,
      message: '회원가입에 성공했습니다.',
      data: {
        userId: result.data.userId,
        name: result.data.name,
        role: result.data.role,
        orgId: result.data.orgId,
      },
    });
  } catch (_error) {
    return NextResponse.json(
      {
        success: false,
        message: '회원가입 처리 중 오류가 발생했습니다.',
        data: null,
      },
      { status: 500 },
    );
  }
}
