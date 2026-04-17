import { NextResponse } from 'next/server';

/**
 * @page: 내 정보 조회 route
 * @description: 로그인한 사용자의 프로필 정보를 최종 명세에 맞춰 가져옵니다.
 */

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://api-gateway:8080';

export async function GET() {
  try {
    const response = await fetch(`${GATEWAY_URL}/apis/user/users/me/home`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return NextResponse.json(
        {
          code: result.code || 'U001',
          message: result.message || '사용자 정보를 불러오지 못했습니다.',
          data: null,
        },
        { status: response.status },
      );
    }

    // 명세 필드 반영: name, totalPoint, orgId
    return NextResponse.json({
      success: true,
      message: 'success',
      data: {
        id: result.data.id,
        name: result.data.name,
        totalPoint: result.data.totalPoint,
        orgId: result.data.orgId,
      },
    });
  } catch (_error) {
    console.error('API Error (Me)');
    return NextResponse.json(
      { code: 'G001', message: '서버 내부 오류가 발생했습니다.', data: null },
      { status: 500 },
    );
  }
}
