import { type NextRequest, NextResponse } from 'next/server';
import { clearAuthCookies, setAuthCookies } from '@/lib/auth-cookies';
import {
  createAccessToken,
  createRefreshToken,
  type SessionUser,
  type UserRole,
  verifyToken,
} from '@/lib/auth-jwt';

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
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      await clearAuthCookies();

      return NextResponse.json(
        {
          success: false,
          message: '리프레시 토큰이 없습니다.',
          data: null,
        },
        {
          status: 401,
        },
      );
    }

    const payload = await verifyToken(refreshToken, 'refresh');

    const sessionUser: SessionUser = {
      userId: payload.userId,
      name: payload.name,
      orgId: payload.org_id ?? '',
      role: normalizeRole(payload.roles?.[0]),
    };

    const newAccessToken = await createAccessToken(sessionUser);
    const newRefreshToken = await createRefreshToken(sessionUser);

    await setAuthCookies({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      userId: sessionUser.userId,
      name: sessionUser.name,
      role: sessionUser.role,
      orgId: sessionUser.orgId,
    });

    return NextResponse.json({
      success: true,
      message: 'success',
      data: null,
    });
  } catch {
    await clearAuthCookies();

    return NextResponse.json(
      {
        success: false,
        message: '세션이 만료되었습니다.',
        data: null,
      },
      {
        status: 401,
      },
    );
  }
}
