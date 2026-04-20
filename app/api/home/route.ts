import { type NextRequest, NextResponse } from 'next/server';

import { GATEWAY_ENDPOINTS } from '@/lib/backend-endpoints';
import { readJsonSafely } from '@/lib/read-json-safely';

const GATEWAY_URL = process.env.GATEWAY_URL ?? 'http://api-gateway:8080';

type UserHomeResponse = {
  success: boolean;
  message?: string;
  data?: {
    userName: string;
    myPoint: number;
    orgId: number | string | null;
    donationRate?: number;
  };
};

type PrayerItem = {
  receiverId: number;
  relation: string;
};

type PrayerResponse = {
  success: boolean;
  data?: PrayerItem[];
};

type UserListItem = {
  userId: number;
  name: string;
  imageType?: 'man' | 'woman' | 'baby';
};

type UserListResponse = {
  success: boolean;
  data?: UserListItem[];
};

type OrgSummaryResponse = {
  success: boolean;
  data?: {
    orgName?: string;
    totalDonation?: number;
  };
};

function createGatewayHeaders(request: NextRequest): HeadersInit {
  return {
    'Content-Type': 'application/json',
    cookie: request.headers.get('cookie') ?? '',
  };
}

export async function GET(request: NextRequest) {
  try {
    const headers = createGatewayHeaders(request);

    const userHomeRes = await fetch(
      `${GATEWAY_URL}${GATEWAY_ENDPOINTS.user.meHome}`,
      {
        headers,
        cache: 'no-store',
      },
    );
    console.log(headers);
    
    const userHome = await readJsonSafely<UserHomeResponse>(userHomeRes);

    if (!userHomeRes.ok || !userHome?.success || !userHome.data) {
      return NextResponse.json(
        {
          success: false,
          message: userHome?.message ?? '사용자 정보를 찾을 수 없습니다.',
          data: null,
        },
        {
          status: userHomeRes.status || 401,
        },
      );
    }

    const orgId = userHome.data.orgId;

    const [orgResult, prayerResult] = await Promise.all([
      orgId
        ? fetch(`${GATEWAY_URL}${GATEWAY_ENDPOINTS.org.summary(orgId)}`, {
            headers,
            cache: 'no-store',
          }).then((response) => readJsonSafely<OrgSummaryResponse>(response))
        : Promise.resolve<OrgSummaryResponse | null>(null),
      fetch(`${GATEWAY_URL}${GATEWAY_ENDPOINTS.prayer.me}`, {
        headers,
        cache: 'no-store',
      }).then((response) => readJsonSafely<PrayerResponse>(response)),
    ]);

    const prayers = Array.isArray(prayerResult?.data) ? prayerResult.data : [];
    const ids = prayers
      .map((item) => item.receiverId)
      .filter(Boolean)
      .join(',');

    let prayerPeople: Array<{
      id: number;
      name: string;
      type: 'man' | 'woman' | 'baby';
      relation: string;
    }> = [];

    if (ids) {
      const userListRes = await fetch(
        `${GATEWAY_URL}${GATEWAY_ENDPOINTS.user.list}?ids=${ids}`,
        {
          headers,
          cache: 'no-store',
        },
      );

      const userList = await readJsonSafely<UserListResponse>(userListRes);
      const userDetails = Array.isArray(userList?.data) ? userList.data : [];

      prayerPeople = prayers.map((prayer) => {
        const user = userDetails.find(
          (item) => item.userId === prayer.receiverId,
        );

        return {
          id: prayer.receiverId,
          name: user?.name ?? '성도',
          type: user?.imageType ?? 'man',
          relation: prayer.relation,
        };
      });
    }

    return NextResponse.json({
      success: true,
      message: 'success',
      data: {
        userName: userHome.data.userName,
        myPoint: userHome.data.myPoint,
        churchName: orgResult?.data?.orgName ?? '소속 교회 없음',
        totalDonation: orgResult?.data?.totalDonation ?? 0,
        prayerPeople,
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
