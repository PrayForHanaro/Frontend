import { NextResponse } from 'next/server';

/**
 * @page: 홈 데이터 조립 route (BFF)
 * @description: user, org, prayer 서비스의 데이터를 조합하여 홈 화면에 필요한 데이터를 생성합니다.
 * @author: 이승빈
 * @date: 2026-04-14
 **/

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://api-gateway:8080';

type GiftItem = {
  giftId: number;
  receiverId: number;
  giftReceiverType: 'SON' | 'DAUGHTER' | 'GRANDCHILD';
  savingsProductName: string;
};

type UserListItem = {
  userId: number;
  name: string;
};

export async function GET() {
  try {
    const userMeRes = await fetch(`${GATEWAY_URL}/apis/user/users/me/home`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    const userMe = await userMeRes.json();
    if (!userMeRes.ok) {
      return NextResponse.json(
        {
          code: userMe.code || 'U001',
          message: userMe.message || '사용자 정보를 찾을 수 없습니다.',
          data: null,
        },
        { status: userMeRes.status },
      );
    }

    const { userName, myPoint, orgId } = userMe.data;

    const [orgData, prayerData] = await Promise.all([
      fetch(`${GATEWAY_URL}/apis/org/orgs/${orgId}/summary`, {
        cache: 'no-store',
      })
        .then((res) => res.json())
        .catch(() => ({ success: false, data: null })),
      fetch(`${GATEWAY_URL}/apis/prayer/gifts/me`, { cache: 'no-store' })
        .then((res) => res.json())
        .catch(() => ({ success: false, data: [] })),
    ]);

    let prayerPeople: {
      id: number;
      name: string;
      type: string;
    }[] = [];

    if (Array.isArray(prayerData.data) && prayerData.data.length > 0) {
      const gifts = prayerData.data as GiftItem[];
      const ids = gifts
        .map((g) => g.receiverId)
        .filter(Boolean)
        .join(',');

      if (ids) {
        const userListRes = await fetch(
          `${GATEWAY_URL}/apis/user/users/list?ids=${ids}`,
          { cache: 'no-store' },
        );
        const userList = await userListRes.json();

        if (userList.success) {
          const userDetails = userList.data as UserListItem[];
          prayerPeople = gifts.map((g) => {
            const detail = userDetails.find((u) => u.userId === g.receiverId);
            return {
              id: g.giftId,
              name: detail?.name || '성도',
              type: g.giftReceiverType.toLowerCase(), // 'son', 'daughter', 'grandchild'
            };
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'success',
      data: {
        userName,
        myPoint: myPoint || 0,
        churchName: orgData.data?.orgName || '소속 교회 없음',
        totalDonation: orgData.data?.totalDonation || 0,
        prayerPeople,
      },
    });
  } catch (_error) {
    return NextResponse.json(
      { code: 'G001', message: '서버 내부 오류가 발생했습니다.', data: null },
      { status: 500 },
    );
  }
}
