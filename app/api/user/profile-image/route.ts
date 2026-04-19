import { type NextRequest, NextResponse } from 'next/server';

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://api-gateway:8080';

/**
 * 유저 프로필 이미지 변경 프록시 라우트
 * 백엔드 가이드: POST /apis/user/users/profile-image (multipart/form-data)
 */
export async function POST(request: NextRequest) {
  console.log('--- [BFF] 프로필 업로드 요청 수신 ---');
  try {
    const formData = await request.formData();
    console.log('--- [BFF] FormData 파싱 완료 ---');
    console.log('GATEWAY_URL:', GATEWAY_URL);

    const response = await fetch(`${GATEWAY_URL}/apis/user/users/profile-image`, {
      method: 'POST',
      headers: {
        cookie: request.headers.get('cookie') ?? '',
      },
      body: formData,
      cache: 'no-store',
    });

    console.log('--- [BFF] 백엔드 응답 수신 ---');
    console.log('Status:', response.status);

    const result = await response.json();
    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error: any) {
    console.error('--- [BFF] 프로필 업로드 프록시 에러 발생 ---');
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    if (error.cause) console.error('Error Cause:', error.cause);

    return NextResponse.json(
      {
        success: false,
        message: '프로필 이미지 업로드에 실패했습니다. (BFF 에러)',
        data: null,
      },
      { status: 500 },
    );
  }
}
