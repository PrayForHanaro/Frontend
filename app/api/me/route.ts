import { type NextRequest, NextResponse } from 'next/server';

import { GATEWAY_ENDPOINTS } from '@/lib/backend-endpoints';
import { readJsonSafely } from '@/lib/read-json-safely';

const GATEWAY_URL = process.env.GATEWAY_URL ?? 'http://api-gateway:8080';

type GatewayMeHomeResponse = {
  success: boolean;
  message?: string;
  data?: {
    userName: string;
    myPoint: number;
    orgId: number | string | null;
    donationRate?: number;
  };
};

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(
      `${GATEWAY_URL}${GATEWAY_ENDPOINTS.user.meHome}`,
      {
        headers: {
          'Content-Type': 'application/json',
          cookie: request.headers.get('cookie') ?? '',
        },
        cache: 'no-store',
      },
    );

    const result = await readJsonSafely<GatewayMeHomeResponse>(response);

    if (!response.ok || !result?.success || !result.data) {
      return NextResponse.json(
        {
          success: false,
          message: result?.message ?? '사용자 정보를 불러오지 못했습니다.',
          data: null,
        },
        {
          status: response.status || 500,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'success',
      data: {
        id: request.cookies.get('userId')?.value ?? null,
        name: result.data.userName,
        totalPoint: result.data.myPoint,
        orgId: result.data.orgId,
        role: request.cookies.get('role')?.value ?? 'USER',
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: '서버 내부 오류가 발생했습니다.',
        data: null,
      },
      {
        status: 500,
      },
    );
  }
}
