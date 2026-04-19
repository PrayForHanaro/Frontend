import { type NextRequest, NextResponse } from 'next/server';
import { setAuthCookies } from '@/lib/auth-cookies';
import { BACKEND_ENDPOINTS } from '@/lib/backend-endpoints';
import { readJsonSafely } from '@/lib/read-json-safely';

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://api-gateway:8080';

type GatewaySignupWithTokenResponse = {
  success: boolean;
  message: string;
  data?: {
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

    const response = await fetch(
      `${GATEWAY_URL}${BACKEND_ENDPOINTS.auth.signup}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        cache: 'no-store',
      },
    );

    const result =
      await readJsonSafely<GatewaySignupWithTokenResponse>(response);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: result?.message || '회원가입에 실패했습니다.',
          data: null,
        },
        { status: response.status || 500 },
      );
    }

    // 백엔드가 회원가입 즉시 토큰까지 주는 경우
    if (
      result?.success &&
      result.data?.accessToken &&
      result.data.refreshToken
    ) {
      await setAuthCookies({
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
        userId: result.data.userId,
        name: result.data.name,
        role: result.data.role,
        orgId: result.data.orgId,
      });

      return NextResponse.json({
        success: true,
        message: result.message || '회원가입에 성공했습니다.',
        data: {
          autoLoggedIn: true,
        },
      });
    }

    // public main 기준: 201 Created + empty body
    return NextResponse.json({
      success: true,
      message: result?.message || '회원가입에 성공했습니다.',
      data: {
        autoLoggedIn: false,
      },
    });
  } catch {
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
