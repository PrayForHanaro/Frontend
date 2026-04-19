import { type NextRequest, NextResponse } from 'next/server';
import type { GiftReceiverType } from '@/app/(main)/bless/_constants';
import { BACKEND_ENDPOINTS } from '@/lib/backend-endpoints';
import { readJsonSafely } from '@/lib/read-json-safely';

/**
 * @page: bless 기도적금 대상자 목록 조회 BFF
 * @description: prayer-service의 대상자 목록과 user-service의 사용자 정보를 조합하여
 *               FE BlessTarget shape 로 반환합니다.
 *   - prayer-service: GET /apis/prayer/prayers/me → giftId, receiverId, relation, monthlyAmount, cumulativeTotal, daysOfPrayer
 *   - user-service: GET /apis/user/users/list?ids=... → userId, name, imageType
 * BLESS_SPEC §2-2 b-1 대상자 목록(이름·관계), §2-6/§2-6a/§2-6b 금액·누적·기도일수.
 * BlessTarget.id 는 giftId 기반 (메시지 API 및 상세 라우팅 식별자).
 */

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://api-gateway:8080';

interface PrayerReceiverDetail {
  giftId: number;
  receiverId: number;
  relation: GiftReceiverType;
  monthlyAmount: number;
  cumulativeTotal: number;
  daysOfPrayer: number;
}

interface UserListItem {
  userId: number;
  name: string;
  imageType: 'man' | 'woman' | 'baby';
}

export async function GET(request: NextRequest) {
  const cookie = request.headers.get('cookie') ?? '';
  try {
    const prayerRes = await fetch(
      `${GATEWAY_URL}${BACKEND_ENDPOINTS.prayer.receiversMe}`,
      {
        headers: {
          'Content-Type': 'application/json',
          cookie,
        },
        cache: 'no-store',
      },
    );
    const prayerJson = await prayerRes.json();

    if (!prayerRes.ok || !prayerJson.success) {
      return NextResponse.json(
        {
          code: prayerJson.code || 'P001',
          message: prayerJson.message || '대상자 목록을 불러오지 못했습니다.',
          data: null,
        },
        { status: prayerRes.status },
      );
    }

    const prayers = ((prayerJson.data ?? []) as PrayerReceiverDetail[]).filter(
      (p) => p.receiverId > 0,
    );
    if (prayers.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'success',
        data: [],
      });
    }

    const ids = prayers.map((p) => p.receiverId).join(',');

    let userDetails: UserListItem[] = [];
    if (ids) {
      const userListRes = await fetch(
        `${GATEWAY_URL}${BACKEND_ENDPOINTS.user.list}?ids=${ids}`,
        {
          headers: {
            'Content-Type': 'application/json',
            cookie,
          },
          cache: 'no-store',
        },
      );
      const userListJson = await readJsonSafely<{
        success: boolean;
        data: UserListItem[];
      }>(userListRes);
      if (userListJson?.success) {
        userDetails = userListJson.data;
      }
    }

    const targets = prayers.map((p) => {
      const u = userDetails.find((x) => x.userId === p.receiverId);
      return {
        id: String(p.giftId),
        name: u?.name ?? '성도',
        relation: p.relation,
        avatar: u?.imageType ?? 'man',
        daysOfPrayer: p.daysOfPrayer,
        totalAmount: p.cumulativeTotal,
        dailyAmount: Math.floor(p.monthlyAmount / 30),
      };
    });

    return NextResponse.json({
      success: true,
      message: 'success',
      data: targets,
    });
  } catch (_err) {
    return NextResponse.json(
      { code: 'G001', message: '서버 내부 오류가 발생했습니다.', data: null },
      { status: 500 },
    );
  }
}
