import { NextResponse } from 'next/server';

/**
 * @page: 일시 헌금 오케스트레이션 route (BFF)
 * @description: User, Offering 서비스를 조합하여 헌금 등록을 처리합니다. 후처리는 백엔드에서 담당합니다.
 * @author: 이승빈
 * @date: 2026-04-14
 */

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://api-gateway:8080';

// 인터페이스 정의
interface GivingOnceUser {
  name: string;
  maxPoint: number;
  bankAccount: string;
  orgId: number;
  accountId: number;
  donationRate: number;
}

interface GivingOnceRequest {
  type: string; // 헌금 종류
  amount: number; // 금액
  usedPoint: number; // 사용 포인트
  personType: string; // 기명/무기명
  name: string | null; // 성함
  prayerTopic: string; // 기도 제목
}

export async function GET() {
  try {
    // 1. [user-service] 내 송금용 정보 가져오기
    const userRes = await fetch(
      `${GATEWAY_URL}/apis/user/users/me/givingOnce`,
      {
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      },
    );

    const userResult = await userRes.json();

    if (!userRes.ok || !userResult.success || !userResult.data) {
      return NextResponse.json(
        {
          code: userResult.code || 'U000',
          message: userResult.message || '사용자 정보를 불러오지 못했습니다.',
          data: null,
        },
        { status: userRes.status },
      );
    }

    const userData = userResult.data;

    // 2. [org-service] 교회 이름 가져오기
    let churchName = '정보 없음';
    try {
      const orgRes = await fetch(
        `${GATEWAY_URL}/apis/org/orgs/${userData.orgId}/summary`,
        {
          cache: 'no-store',
        },
      );
      const orgResult = await orgRes.json();
      churchName = orgResult.data?.orgName || '정보 없음';
    } catch (_error) {
      console.error('Failed to fetch org summary');
    }

    return NextResponse.json({
      success: true,
      message: 'success',
      data: {
        name: userData.name,
        maxPoint: userData.maxPoint,
        bankAccount: userData.bankAccount,
        churchName,
        donationRate: userData.donationRate,
        orgId: userData.orgId,
        accountId: userData.accountId,
      },
    });
  } catch (_error) {
    return NextResponse.json(
      {
        code: 'G001',
        message: '서버 내부 오류가 발생했습니다.',
        data: null,
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: GivingOnceRequest = await request.json();

    // 1. [user-service] 부족한 정보(orgId, accountId) 가져오기
    const userMeRes = await fetch(
      `${GATEWAY_URL}/apis/user/users/me/givingOnce`,
      {
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      },
    );
    const userMe = await userMeRes.json();

    if (!userMeRes.ok || !userMe.success || !userMe.data) {
      return NextResponse.json(
        {
          code: userMe.code || 'U000',
          message: userMe.message || '사용자 정보를 불러오지 못했습니다.',
          data: null,
        },
        { status: userMeRes.status },
      );
    }

    const { orgId, accountId } = userMe.data;

    // 2. [offering-service] 헌금 내역 저장 (백엔드 내부에서 포인트 차감/적립 등 후처리 자동 수행)
    const offeringRes = await fetch(
      `${GATEWAY_URL}/apis/offering/offerings/once`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orgId,
          accountId,
          type: body.type,
          amount: body.amount,
          usedPoint: body.usedPoint,
          personType: body.personType,
          name: body.name,
          prayerTopic: body.prayerTopic,
        }),
      },
    );

    const offeringResult = await offeringRes.json();

    if (!offeringRes.ok || !offeringResult.success) {
      let errorMessage = offeringResult.message || '헌금 저장에 실패했습니다.';
      // 백엔드의 잔액 부족 에러 메시지를 한국어로 변환
      if (errorMessage === 'Insufficient balance') {
        errorMessage = '계좌 잔액이 부족합니다.';
      }

      return NextResponse.json(
        {
          code: offeringResult.code || 'OF001',
          message: errorMessage,
          data: null,
        },
        { status: offeringRes.status },
      );
    }

    return NextResponse.json(offeringResult);
  } catch (error: unknown) {
    const err = error as Error;
    console.error('API Error (Giving/Once POST Orchestration)');
    return NextResponse.json(
      {
        code: 'G001',
        message: err.message || '서버 내부 오류가 발생했습니다.',
        data: null,
      },
      { status: 500 },
    );
  }
}
