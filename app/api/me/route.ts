import { type NextRequest, NextResponse } from 'next/server';
import { BACKEND_ENDPOINTS } from '@/lib/backend-endpoints';
import { readJsonSafely } from '@/lib/read-json-safely';

/**
 * @page: 내 정보 조회 route
 * @description: 로그인한 사용자의 프로필 정보를 최종 명세에 맞춰 가져옵니다.
 */

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://api-gateway:8080';

type GatewayMeResponse = {
  success: boolean;
  message?: string;
  code?: string;
  data?: {
    id: number | string;
    name: string;
    totalPoint: number;
    orgId: number | string;
    role?: string;
  };
};

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(
      `${GATEWAY_URL}${BACKEND_ENDPOINTS.user.meHome}`,
      {
        headers: {
          'Content-Type': 'application/json',
          cookie: request.headers.get('cookie') ?? '',
        },
        cache: 'no-store',
      },
    );

    const result = await readJsonSafely<GatewayMeResponse>(response);

    if (!response.ok || !result?.success || !result.data) {
      return NextResponse.json(
        {
          success: false,
          message: result?.message || '사용자 정보를 불러오지 못했습니다.',
          data: null,
        },
        { status: response.status || 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'success',
      data: {
        id: result.data.id,
        name: result.data.name,
        totalPoint: result.data.totalPoint,
        orgId: result.data.orgId,
        role: result.data.role ?? request.cookies.get('role')?.value ?? 'USER',
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: '서버 내부 오류가 발생했습니다.',
        data: null,
      },
      { status: 500 },
    );
  }
}
