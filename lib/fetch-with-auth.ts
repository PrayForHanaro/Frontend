type FetchWithAuthOptions = RequestInit & {
  retry?: boolean;
  timeoutMs?: number;
};

export async function fetchWithAuth(
  input: string,
  options: FetchWithAuthOptions = {},
): Promise<Response> {
  const controller = new AbortController();
  const timeout = window.setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? 10000,
  );

  try {
    const response = await fetch(input, {
      ...options,
      credentials: 'include',
      signal: controller.signal,
    });

    if (response.status !== 401 || options.retry === false) {
      return response;
    }

    const refreshResponse = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshResponse.ok) {
      return fetchWithAuth(input, {
        ...options,
        retry: false,
      });
    }

    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    window.location.href = '/onboarding/auth/login';

    throw new Error('세션이 만료되었습니다.');
  } finally {
    window.clearTimeout(timeout);
  }
}
