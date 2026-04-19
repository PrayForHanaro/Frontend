import { cookies } from 'next/headers';

/**
 * BFF route 에서 api-gateway 로 호출할 때 사용하는 fetch wrapper.
 * 브라우저 쿠키의 accessToken 을 Authorization: Bearer 헤더로 재전송한다.
 *
 * 브라우저 → Next.js BFF 구간은 same-origin 쿠키로 자동 전달되지만,
 * Next.js BFF → api-gateway 구간에서는 쿠키가 전달되지 않으므로
 * 명시적으로 Authorization 헤더로 포워딩해야 한다.
 */
export async function bffFetch(
  input: string | URL,
  init: RequestInit = {},
): Promise<Response> {
  const accessToken = (await cookies()).get('accessToken')?.value;

  const headers = new Headers(init.headers);
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(input, { ...init, headers });
}
