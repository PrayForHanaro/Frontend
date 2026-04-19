import { type NextRequest, NextResponse } from 'next/server';

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://api-gateway:8080';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: '업로드할 파일이 없습니다.',
          data: null,
        },
        {
          status: 400,
        },
      );
    }

    const forwardFormData = new FormData();
    forwardFormData.append('file', file);

    const response = await fetch(
      `${GATEWAY_URL}/apis/user/users/profile-image`,
      {
        method: 'POST',
        headers: {
          cookie: request.headers.get('cookie') ?? '',
        },
        body: forwardFormData,
      },
    );

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: '프로필 이미지 업로드에 실패했습니다.',
        data: null,
      },
      {
        status: 500,
      },
    );
  }
}
