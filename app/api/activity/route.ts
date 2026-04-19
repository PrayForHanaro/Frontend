import { type NextRequest, NextResponse } from 'next/server';

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://api-gateway:8080';

function createHeaders(request: NextRequest) {
  return {
    cookie: request.headers.get('cookie') ?? '',
  };
}

export async function GET(request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams.toString();

    const response = await fetch(
      `${GATEWAY_URL}/apis/activity/activities${search ? `?${search}` : ''}`,
      {
        method: 'GET',
        headers: createHeaders(request),
        cache: 'no-store',
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
        message: '활동 목록을 불러오지 못했습니다.',
        data: null,
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const response = await fetch(`${GATEWAY_URL}/apis/activity/activities`, {
      method: 'POST',
      headers: createHeaders(request),
      body: formData,
      cache: 'no-store',
    });

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: '활동 등록에 실패했습니다.',
        data: null,
      },
      {
        status: 500,
      },
    );
  }
}
