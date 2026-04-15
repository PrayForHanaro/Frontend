import { NextResponse } from 'next/server';

/**
 * @page: 홈 데이터 조립 route (BFF)
 * @description: user, org, prayer 서비스의 데이터를 조합하여 홈 화면에 필요한 데이터를 생성합니다.
 * @author: 이승빈
 * @date: 2026-04-14
 */

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://api-gateway:8080';

export async function GET() {
  try {
    // 1. [user-service] 내 기본 정보 가져오기 (orgId 획득을 위해 선행 호출)
    const userMeRes = await fetch(`${GATEWAY_URL}/user/api/users/me/home`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    const userMe = await userMeRes.json();

    if (!userMeRes.ok || userMe.success === false) {
      return NextResponse.json(
        {
          code: userMe.code || 'U000',
          message: userMe.message || '사용자 정보를 불러오지 못했습니다.',
          status: userMeRes.status,
        },
        { status: userMeRes.status },
      );
    }

    const { userName, myPoint, orgId } = userMe.data;

    // 2. [org-service] & [prayer-service] 동시 호출 (속도 최적화)
    const [orgData, giftData] = await Promise.all([
      fetch(`${GATEWAY_URL}/org/api/orgs/${orgId}/summary`, {
        cache: 'no-store',
      }).then((res) => res.json()),
      fetch(`${GATEWAY_URL}/prayer/api/gifts/myReceivers`, {
        cache: 'no-store',
      }).then((res) => res.json()),
    ]);

    // 3. [user-service] 기도 대상자들의 상세 정보(이름, 이미지 타입) 가져오기
    let prayerPeople = [];
    if (
      giftData.success &&
      giftData.data &&
      (giftData.data as Gift[]).length > 0
    ) {
      const receiverIds = (giftData.data as Gift[])
        .map((g: Gift) => g.receiverId)
        .join(',');
      const userDetailsRes = await fetch(
        `${GATEWAY_URL}/user/api/users/list?ids=${receiverIds}`,
        {
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
        },
      );
      const userDetails = await userDetailsRes.json();

      if (userDetails.success && userDetails.data) {
        // 기도 정보와 유저 상세 정보 매핑
        prayerPeople = (giftData.data as Gift[]).map((gift: Gift) => {
          const detail = (userDetails.data as UserDetail[]).find(
            (u: UserDetail) => u.id === gift.receiverId,
          );
          return {
            id: gift.receiverId,
            name: detail?.name || '알 수 없는 성도',
            type: detail?.imageType || 'man',
            relation: gift.relation,
          };
        });
      }
    }

    // 4. 최종 데이터 조립 (HomeData 인터페이스 규격)
    return NextResponse.json({
      success: true,
      message: '성공',
      data: {
        userName,
        myPoint,
        churchName: orgData.data?.orgName || '정보 없음',
        totalDonation: orgData.data?.totalDonation || 0,
        prayerPeople,
      },
    });
  } catch (error) {
    console.error('API Error (Home BFF):', error);
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
