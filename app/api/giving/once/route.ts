import { NextResponse } from 'next/server';

/**
 * @page: 일시 헌금 오케스트레이션 route (BFF)
 * @description: 헌금 저장, 포인트 사용, 교회 누적액 업데이트를 순차적/병렬적으로 처리합니다.
 * @author: 이승빈 (Gemini CLI 수정)
 * @date: 2026-04-14 (2026-04-15 POST 오케스트레이션 적용)
 */

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://api-gateway:8080';

export async function GET() {
  try {
    // 1. [user-service] 내 송금용 정보(이름, 포인트, 계좌, 소속교회ID) 가져오기
    const userRes = await fetch(`${GATEWAY_URL}/user/api/users/me/givingOnce`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const userResult = await userRes.json();

    if (!userRes.ok || userResult.success === false) {
      return NextResponse.json(
        {
          code: userResult.code || 'U000',
          message: userResult.message || '사용자 정보를 불러오지 못했습니다.',
          status: userRes.status,
        },
        { status: userRes.status },
      );
    }

    const { name, maxPoint, bankAccount, orgId } = userResult.data;

    // 2. [org-service] 교회 이름 가져오기 (user-service에서 받은 orgId 사용)
    const orgRes = await fetch(`${GATEWAY_URL}/org/api/orgs/${orgId}/summary`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const orgResult = await orgRes.json();
    const churchName = orgResult.data?.orgName || '정보 없음';

    return NextResponse.json({
      success: true,
      message: '성공',
      data: {
        name,
        maxPoint,
        bankAccount,
        churchName,
      },
    });
  } catch (error) {
    console.error('API Error (Giving/Once BFF GET):', error);
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

export async function POST(request: Request) {
  try {
    const body = await request.json(); // 프론트 payload: { type, amount, point, prayerTopic, ... }

    // 1. [user-service] 부족한 정보(orgId, accountId) 가져오기
    const userMeRes = await fetch(
      `${GATEWAY_URL}/user/api/users/me/givingOnce`,
      {
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      },
    );
    const userMe = await userMeRes.json();

    if (!userMeRes.ok || !userMe.success) {
      throw new Error(userMe.message || '사용자 정보를 불러오지 못했습니다.');
    }

    const { orgId, accountId } = userMe.data;

    // 2. [offering-service] 헌금 내역 저장
    const offeringRes = await fetch(
      `${GATEWAY_URL}/offering/api/offerings/once`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...body,
          orgId,
          accountId,
        }),
      },
    );

    const offeringResult = await offeringRes.json();

    if (!offeringRes.ok || !offeringResult.success) {
      throw new Error(offeringResult.message || '헌금 저장에 실패했습니다.');
    }

    // 3. [비동기/병렬 작업] 후처리
    // - 포인트 차감 (user-service)
    // - 교회 누적액 업데이트 (org-service)
    try {
      await Promise.all([
        // 포인트 사용 (차감)
        fetch(`${GATEWAY_URL}/user/api/users/me/points/use`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: body.point,
            refId: offeringResult.data, // 저장된 헌금 ID
          }),
        }),
        // 교회 헌금 누적액 업데이트
        fetch(`${GATEWAY_URL}/org/api/orgs/${orgId}/offering-amount`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: body.amount,
          }),
        }),
      ]);
    } catch (postError) {
      console.error('후처리 작업 중 일부 실패 (로그 기록):', postError);
    }

    // 4. 최종 결과 반환 (성공 시 offering-service의 응답 그대로 전달)
    return NextResponse.json(offeringResult);
  } catch (error: unknown) {
    console.error('API Error (Giving/Once POST Orchestration):', error);
    const message =
      error instanceof Error ? error.message : '서버 내부 오류가 발생했습니다.';
    return NextResponse.json(
      {
        code: 'G000',
        message,
        status: 500,
      },
      { status: 500 },
    );
  }
}
