import { type NextRequest, NextResponse } from 'next/server';

import { createAccessToken, createRefreshToken, type SessionUser, type UserRole } from '@/lib/auth-jwt';
import { setAuthCookies } from '@/lib/auth-cookies';
import { GATEWAY_ENDPOINTS } from '@/lib/backend-endpoints';
import { readJsonSafely } from '@/lib/read-json-safely';

const GATEWAY_URL = process.env.GATEWAY_URL ?? 'http://api-gateway:8080';

type LoginRequestBody = {
  phoneNumber: string;
  password: string;
};

type LoginCheckResponse = {
  success: boolean;
  message?: string;
  data?: {
    userId: number | string;
    name: string;
    role: string;
    orgId?: number | string | null;
  };
};

function normalizeRole(role: string | undefined): UserRole {
  if (role === 'ADMIN') {
    return 'ADMIN';
  }

  if (role === 'CLERGY') {
    return 'CLERGY';
  }

  return 'USER';
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginRequestBody;

    const response = await fetch(`${GATEWAY_URL}${GATEWAY_ENDPOINTS.user.login}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: body.phoneNumber.replaceAll('-', ''),
        password: body.password,
      }),
      cache: 'no-store',
    });

    const result = await readJsonSafely<LoginCheckResponse>(response);

    if (!response.ok || !result?.success || !result.data) {
      return NextResponse.json(
        {
          success: false,
          message: result?.message ?? '로그인에 실패했습니다.',
          data: null,
        },
        {
          status: response.status || 401,
        },
      );
    }

    const sessionUser: SessionUser = {
      userId: String(result.data.userId),
      name: result.data.name,
      orgId: String(result.data.orgId ?? ''),
      role: normalizeRole(result.data.role),
    };

    const accessToken = await createAccessToken(sessionUser);
    const refreshToken = await createRefreshToken(sessionUser);

    await setAuthCookies({
      accessToken,
      refreshToken,
      userId: sessionUser.userId,
      name: sessionUser.name,
      role: sessionUser.role,
      orgId: sessionUser.orgId,
    });

    return NextResponse.json({
      success: true,
      message: 'success',
      data: {
        userId: sessionUser.userId,
        name: sessionUser.name,
        role: sessionUser.role,
        orgId: sessionUser.orgId,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: '로그인 처리 중 오류가 발생했습니다.',
        data: null,
      },
      {
        status: 500,
      },
    );
  }
}