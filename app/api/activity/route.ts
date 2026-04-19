import { type NextRequest, NextResponse } from 'next/server';

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://api-gateway:8080';

export async function GET(request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams.toString();
    const response = await fetch(
      `${GATEWAY_URL}/apis/activity/activities${search ? `?${search}` : ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          cookie: request.headers.get('cookie') ?? '',
        },
        cache: 'no-store',
      },
    );

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (_error) {
    return NextResponse.json(
      {
        success: false,
        message: '활동 목록을 불러오지 못했습니다.',
        data: null,
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // 백엔드 가이드: POST /apis/activity/activities (Multipart 통합 전송)
    const response = await fetch(`${GATEWAY_URL}/apis/activity/activities`, {
      method: 'POST',
      headers: {
        // multipart/form-data 전달 시 헤더는 브라우저/fetch가 경계값(boundary)과 함께 자동 설정함
        cookie: request.headers.get('cookie') ?? '',
      },
      body: formData,
      cache: 'no-store',
    });

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error('Activity register proxy error:', error);
    return NextResponse.json(
      {
        success: false,
        message: '활동 등록에 실패했습니다.',
        data: null,
      },
      { status: 500 },
    );
  }
}
