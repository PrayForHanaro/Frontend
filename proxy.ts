import { type NextRequest, NextResponse } from 'next/server';

const protectedPrefixes = ['/home', '/activity', '/mypage'];
const publicOnlyPrefixes = [
  '/onboarding/auth/login',
  '/onboarding/auth/signup',
];
const adminPrefixes = ['/admin'];

type UserRole = 'USER' | 'ADMIN' | 'CLERGY';

type AccessTokenPayload = {
  sub: string;
  userId: string;
  name: string;
  org_id: string;
  roles: UserRole[];
  iss: string;
  aud: string[];
  type: 'access' | 'refresh';
  iat: number;
  exp: number;
};

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function matches(pathname: string, prefixes: string[]) {
  return prefixes.some((prefix) => {
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
  });
}

function normalizeBase64Url(value: string) {
  const normalizedValue = value.replace(/-/g, '+').replace(/_/g, '/');
  const paddingLength = (4 - (normalizedValue.length % 4)) % 4;

  return `${normalizedValue}${'='.repeat(paddingLength)}`;
}

function decodeBase64UrlJson<T>(value: string): T {
  const normalizedValue = normalizeBase64Url(value);
  const decodedValue = atob(normalizedValue);
  const bytes = Uint8Array.from(decodedValue, (character) => {
    return character.charCodeAt(0);
  });

  return JSON.parse(textDecoder.decode(bytes)) as T;
}

function decodeBase64UrlToUint8Array(value: string) {
  const normalizedValue = normalizeBase64Url(value);
  const decodedValue = atob(normalizedValue);

  return Uint8Array.from(decodedValue, (character) => {
    return character.charCodeAt(0);
  });
}

async function verifyAccessToken(token: string) {
  const secret = process.env.JWT_SECRET;
  const issuer = process.env.JWT_ISSUER;
  const audience = process.env.JWT_AUDIENCE;

  if (!secret || !issuer || !audience) {
    return null;
  }

  const tokenParts = token.split('.');

  if (tokenParts.length !== 3) {
    return null;
  }

  const [encodedHeader, encodedPayload, encodedSignature] = tokenParts;
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  try {
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      textEncoder.encode(secret),
      {
        name: 'HMAC',
        hash: 'SHA-256',
      },
      false,
      ['verify'],
    );

    const isValidSignature = await crypto.subtle.verify(
      'HMAC',
      cryptoKey,
      decodeBase64UrlToUint8Array(encodedSignature),
      textEncoder.encode(signingInput),
    );

    if (!isValidSignature) {
      return null;
    }

    const payload = decodeBase64UrlJson<AccessTokenPayload>(encodedPayload);
    const now = Math.floor(Date.now() / 1000);

    if (payload.iss !== issuer) {
      return null;
    }

    if (!Array.isArray(payload.aud) || !payload.aud.includes(audience)) {
      return null;
    }

    if (payload.type !== 'access') {
      return null;
    }

    if (payload.exp <= now) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get('accessToken')?.value;
  const accessTokenPayload = accessToken
    ? await verifyAccessToken(accessToken)
    : null;
  const isAuthenticated = accessTokenPayload !== null;
  const currentRole = accessTokenPayload?.roles?.[0] ?? 'USER';

  if (matches(pathname, protectedPrefixes) && !isAuthenticated) {
    return NextResponse.redirect(
      new URL('/onboarding/auth/login', request.url),
    );
  }

  if (matches(pathname, publicOnlyPrefixes) && isAuthenticated) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (matches(pathname, adminPrefixes) && currentRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/home/:path*',
    '/activity/:path*',
    '/mypage/:path*',
    '/admin/:path*',
    '/onboarding/auth/login',
    '/onboarding/auth/signup',
  ],
};
