import 'server-only';

import { cookies } from 'next/headers';

export type AuthCookiePayload = {
  accessToken: string;
  refreshToken: string;
  userId: string;
  name: string;
  role: string;
  orgId: string;
};

const isProduction = process.env.NODE_ENV === 'production';
const accessCookieName = process.env.JWT_COOKIE_NAME ?? 'accessToken';

export async function setAuthCookies(payload: AuthCookiePayload) {
  const cookieStore = await cookies();

  cookieStore.set(accessCookieName, payload.accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60,
  });

  cookieStore.set('refreshToken', payload.refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set('userId', payload.userId, {
    httpOnly: false,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set('name', payload.name, {
    httpOnly: false,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set('role', payload.role, {
    httpOnly: false,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set('orgId', payload.orgId, {
    httpOnly: false,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();

  const cookieNames = [
    accessCookieName,
    'accessToken',
    'refreshToken',
    'userId',
    'name',
    'role',
    'orgId',
  ];

  for (const cookieName of cookieNames) {
    cookieStore.set(cookieName, '', {
      httpOnly:
        cookieName === accessCookieName ||
        cookieName === 'accessToken' ||
        cookieName === 'refreshToken',
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });
  }
}
