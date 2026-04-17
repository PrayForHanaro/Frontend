import { type NextRequest, NextResponse } from 'next/server';

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://api-gateway:8080';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ activityId: string }> },
) {
  try {
    const { activityId } = await context.params;

    const response = await fetch(
      `${GATEWAY_URL}/apis/activity/activities/${activityId}/apply`,
      {
        method: 'POST',
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
        message: '활동 참여에 실패했습니다.',
        data: null,
      },
      { status: 500 },
    );
  }
}
