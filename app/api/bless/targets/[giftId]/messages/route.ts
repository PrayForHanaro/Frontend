import { type NextRequest, NextResponse } from 'next/server';
import { bffFetch } from '@/lib/bff-fetch';

/**
 * @page: bless 기도 메시지 목록 조회 BFF
 * @description: prayer-service GET /apis/prayer/prayers/{giftId}/messages 응답을
 *               FE BlessMessage shape 로 매핑. 최신순(createdAt DESC) 고정.
 * BLESS_SPEC §2-11 무한 스크롤, §2-12 최신순.
 */

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://api-gateway:8080';

const KOREAN_WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

interface PrayerMessage {
  messageId: number;
  content: string;
  startDate: string;
  createdAt: string;
  updatedAt: string;
}

interface PrayerMessagesPage {
  content: PrayerMessage[];
  page: number;
  size: number;
  totalElements: number;
  hasNext: boolean;
}

function toKoreanDayOfWeek(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00+09:00`);
  const idx = d.getDay();
  return KOREAN_WEEKDAYS[idx] ?? '';
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ giftId: string }> },
) {
  const { giftId } = await params;
  const search = request.nextUrl.searchParams;
  const page = search.get('page') ?? '0';
  const size = search.get('size') ?? '20';

  try {
    const res = await bffFetch(
      `${GATEWAY_URL}/apis/prayer/prayers/${giftId}/messages?page=${page}&size=${size}`,
      { cache: 'no-store' },
    );
    const body = await res.json();

    if (!res.ok || !body.success) {
      return NextResponse.json(
        {
          success: false,
          message: body.message || '메시지 목록을 불러오지 못했습니다.',
          data: null,
        },
        { status: res.status },
      );
    }

    const serverPage = body.data as PrayerMessagesPage;
    const mapped = serverPage.content.map((m) => ({
      id: String(m.messageId),
      targetId: giftId,
      date: m.startDate,
      dayOfWeek: toKoreanDayOfWeek(m.startDate),
      points: 0,
      content: m.content,
    }));

    return NextResponse.json({
      success: true,
      message: 'success',
      data: mapped,
      page: serverPage.page,
      hasNext: serverPage.hasNext,
    });
  } catch (_err) {
    return NextResponse.json(
      { success: false, message: '서버 내부 오류가 발생했습니다.', data: null },
      { status: 500 },
    );
  }
}
