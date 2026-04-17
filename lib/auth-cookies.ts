import { cookies } from 'next/headers';

type AuthCookiePayload = {
  accessToken: string;
  refreshToken: string;
  userId: string | number;
  name: string;
  role: string;
  orgId: string | number;
};

const isProduction = process.env.NODE_ENV === 'production';

export async function setAuthCookies(payload: AuthCookiePayload) {
  const cookieStore = await cookies();

  cookieStore.set('accessToken', payload.accessToken, {
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

  cookieStore.set('userId', String(payload.userId), {
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

  cookieStore.set('orgId', String(payload.orgId), {
    httpOnly: false,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();

  const names = [
    'accessToken',
    'refreshToken',
    'userId',
    'name',
    'role',
    'orgId',
  ];

  for (const name of names) {
    cookieStore.set(name, '', {
      httpOnly: name === 'accessToken' || name === 'refreshToken',
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });
  }
}
