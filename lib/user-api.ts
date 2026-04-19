import { fetchWithAuth } from '@/lib/fetch-with-auth';

/**
 * @page: 유저 api
 * @descriptition: 유저 프로필 이미지 업로드 api입니다.
 * @author: 이승빈
 * @date: 2026-04-17
 */

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

async function parseResponse<T>(response: Response): Promise<T> {
  const result = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !result.success) {
    throw new Error(result.message || '요청에 실패했습니다.');
  }

  return result.data;
}

/**
 * 프로필 이미지 업로드
 */
export async function updateProfileImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetchWithAuth('/api/user/profile-image', {
    method: 'POST',
    body: formData,
  });

  return parseResponse(response);
}
