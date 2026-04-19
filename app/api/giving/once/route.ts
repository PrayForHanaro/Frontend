import { type NextRequest, NextResponse } from 'next/server';

/**
 * @page: 일시 헌금 오케스트레이션 route (BFF)
 * @description: User, Offering, Org 서비스를 조합하여 헌금 등록을 처리합니다.
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
  offeringType: string;
  amount: number;
  point: number;
  prayerContent: string;
  offererName: string | null;
}

function createJsonHeaders(request: NextRequest): HeadersInit {
  return {
    'Content-Type': 'application/json',
    cookie: request.headers.get('cookie') ?? '',
  };
}

function createMultipartHeaders(request: NextRequest): HeadersInit {
  return {
    cookie: request.headers.get('cookie') ?? '',
  };
}

export async function GET(request: NextRequest) {
  try {
    // 1. [user-service] 내 송금용 정보 가져오기
    const userRes = await fetch(
      `${GATEWAY_URL}/apis/user/users/me/givingOnce`,
      {
        headers: createJsonHeaders(request),
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
        {
          status: userRes.status || 500,
        },
      );
    }

    const userData = userResult.data as GivingOnceUser;

    // 2. [org-service] 교회 이름 가져오기
    let churchName = '정보 없음';

    try {
      const orgRes = await fetch(
        `${GATEWAY_URL}/apis/org/orgs/${userData.orgId}/summary`,
        {
          headers: createMultipartHeaders(request),
          cache: 'no-store',
        },
      );

      const orgResult = await orgRes.json();
      churchName = orgResult.data?.orgName || '정보 없음';
    } catch {
      churchName = '정보 없음';
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
  } catch {
    return NextResponse.json(
      {
        code: 'G001',
        message: '서버 내부 오류가 발생했습니다.',
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
    const body = (await request.json()) as GivingOnceRequest;

    // 1. [user-service] 부족한 정보(orgId, accountId) 가져오기
    const userMeRes = await fetch(
      `${GATEWAY_URL}/apis/user/users/me/givingOnce`,
      {
        headers: createJsonHeaders(request),
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
        {
          status: userMeRes.status || 500,
        },
      );
    }

    const { orgId, accountId } = userMe.data as GivingOnceUser;

    // 2. [offering-service] 헌금 내역 저장
    const offeringRes = await fetch(
      `${GATEWAY_URL}/apis/offering/offerings/once`,
      {
        method: 'POST',
        headers: createJsonHeaders(request),
        body: JSON.stringify({
          orgId,
          accountId,
          offeringType: body.offeringType,
          amount: body.amount,
          offererName: body.offererName,
          prayerContent: body.prayerContent,
        }),
      },
    );

    const offeringResult = await offeringRes.json();

    if (!offeringRes.ok || !offeringResult.success) {
      return NextResponse.json(
        {
          code: offeringResult.code || 'OF001',
          message: offeringResult.message || '헌금 저장에 실패했습니다.',
          data: null,
        },
        {
          status: offeringRes.status || 500,
        },
      );
    }

    // 3. [org-service] 교회 헌금 누적액 업데이트
    await fetch(`${GATEWAY_URL}/apis/org/orgs/${orgId}/offering-amount`, {
      method: 'PUT',
      headers: createJsonHeaders(request),
      body: JSON.stringify({
        amount: body.amount,
      }),
    }).catch(() => null);

    return NextResponse.json(offeringResult, {
      status: offeringRes.status,
    });
  } catch (error: unknown) {
    const err = error as Error;

    return NextResponse.json(
      {
        code: 'G001',
        message: err.message || '서버 내부 오류가 발생했습니다.',
        data: null,
      },
      {
        status: 500,
      },
    );
  }
}
