type FetchWithAuthOptions = RequestInit & {
  retry?: boolean;
  timeoutMs?: number;
};

export async function fetchWithAuth(
  input: string,
  options: FetchWithAuthOptions = {},
): Promise<Response> {
  const { retry = true, timeoutMs = 10000, ...requestOptions } = options;

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(input, {
      ...requestOptions,
      credentials: 'include',
      signal: controller.signal,
    });

    if (response.status !== 401 || !retry) {
      return response;
    }

    const refreshResponse = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
    });

    if (refreshResponse.ok) {
      return fetchWithAuth(input, {
        ...requestOptions,
        retry: false,
        timeoutMs,
      });
    }

    if (refreshResponse.status === 401 || refreshResponse.status === 403) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include',
        });
      } finally {
        window.location.href = '/onboarding/auth/login';
      }

      throw new Error('세션이 만료되었습니다.');
    }

    return response;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('요청 시간이 초과되었습니다.');
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('네트워크 오류가 발생했습니다.');
  } finally {
    window.clearTimeout(timeoutId);
  }
}
