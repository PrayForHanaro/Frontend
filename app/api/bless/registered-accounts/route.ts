import { type NextRequest, NextResponse } from 'next/server';

/**
 * @page: bless 등록 계좌 즐겨찾기 조회 BFF
 * @description: 일회성 송금 시 과거 수신 계좌 즐겨찾기 목록. prayer-service에서
 *               자동 UPSERT 된 데이터(최근 사용순).
 *   - prayer-service: GET /apis/prayer/registered-accounts → accountId, accountNumber, alias?, lastUsedAt
 * BLESS_SPEC §5-1-5 계좌번호 필드 포커스 시 즐겨찾기 드롭다운.
 * M1: holderName·relation 미제공 (계좌번호↔user 매핑 경로 부재).
 */

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://api-gateway:8080';

interface RegisteredAccountFromGateway {
  accountId: number;
  accountNumber: string;
  alias: string | null;
  lastUsedAt: string;
}

export async function GET(request: NextRequest) {
  try {
    const res = await fetch(`${GATEWAY_URL}/apis/prayer/registered-accounts`, {
      headers: {
        'Content-Type': 'application/json',
        cookie: request.headers.get('cookie') ?? '',
      },
      cache: 'no-store',
    });
    const body = await res.json();

    if (!res.ok || !body.success) {
      return NextResponse.json(
        {
          success: false,
          message: body.message || '등록 계좌 목록을 불러오지 못했습니다.',
          data: null,
        },
        { status: res.status },
      );
    }

    const serverData = (body.data ?? []) as RegisteredAccountFromGateway[];
    const mapped = serverData.map((a) => ({
      id: String(a.accountId),
      accountNumber: a.accountNumber,
      alias: a.alias ?? undefined,
      lastUsedAt: a.lastUsedAt,
    }));

    return NextResponse.json({
      success: true,
      message: 'success',
      data: mapped,
    });
  } catch (_err) {
    return NextResponse.json(
      { success: false, message: '서버 내부 오류가 발생했습니다.', data: null },
      { status: 500 },
    );
  }
}
