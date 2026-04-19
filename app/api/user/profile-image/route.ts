import { type NextRequest, NextResponse } from 'next/server';

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://api-gateway:8080';

/**
 * 유저 프로필 이미지 변경 프록시 라우트
 * 백엔드 가이드: POST /apis/user/users/profile-image (multipart/form-data)
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const response = await fetch(
      `${GATEWAY_URL}/apis/user/users/profile-image`,
      {
        method: 'POST',
        headers: {
          cookie: request.headers.get('cookie') ?? '',
        },
        body: formData,
        cache: 'no-store',
      },
    );

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error('Profile image upload proxy error:', error);
    return NextResponse.json(
      {
        success: false,
        message: '프로필 이미지 업로드에 실패했습니다.',
        data: null,
      },
      { status: 500 },
    );
  }
}
