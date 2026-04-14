import { NextResponse } from 'next/server';

/**
 * @page: 홈 route
 * @description: 홈 route 입니다. 지정된 백엔드 데이터 양식에 따라 값을 받고 에러를 뱉습니다.
 * @author: 이승빈
 * @date: 2026-04-14
 */

//docker-compose 컨테이너 이름 사용
const GATEWAY_URL = process.env.GATEWAY_URL || 'http://api-gateway:8080';

export async function GET() {
  try {
    const response = await fetch(`${GATEWAY_URL}/user/home`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Backend response not ok: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error (Home):', error);
    return NextResponse.json(
      { code: '500', message: '서버 내부 오류가 발생했습니다.', data: null },
      { status: 500 },
    );
  }
}
