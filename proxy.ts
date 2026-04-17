import { type NextRequest, NextResponse } from 'next/server';

const protectedPrefixes = ['/home', '/activity', '/mypage'];
const publicOnlyPrefixes = [
  '/onboarding/auth/login',
  '/onboarding/auth/signup',
];
const adminPrefixes = ['/admin'];

function matches(pathname: string, prefixes: string[]) {
  return prefixes.some((prefix) => {
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
  });
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get('accessToken')?.value;
  const role = request.cookies.get('role')?.value;

  if (matches(pathname, protectedPrefixes) && !accessToken) {
    return NextResponse.redirect(
      new URL('/onboarding/auth/login', request.url),
    );
  }

  if (matches(pathname, publicOnlyPrefixes) && accessToken) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (matches(pathname, adminPrefixes) && role !== 'ADMIN') {
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
