import { NextResponse } from 'next/server';

/**
 * @page: 내 정보 조회 route
 * @description: 로그인한 사용자의 정보를 백엔드에서 실시간으로 가져옵니다.
 * @author: Gemini CLI
 * @date: 2026-04-15 (백엔드 엔드포인트 반영)
 */

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://api-gateway:8080';

export async function GET() {
  try {
    // UserController의 패턴을 반영하여 /me/home 또는 /me/profile 등을 호출 (여기서는 /me/home 활용 예시)
    const response = await fetch(`${GATEWAY_URL}/user/api/users/me/home`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      return NextResponse.json(
        {
          code: result.code || 'U000',
          message: result.message || '사용자 정보를 불러오지 못했습니다.',
          status: response.status,
        },
        { status: response.status },
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error (Me):', error);
    return NextResponse.json(
      {
        code: 'G000',
        message: '서버 내부 오류가 발생했습니다.',
        status: 500,
      },
      { status: 500 },
    );
  }
}
