import { MOCK_ACCOUNTS } from '@/app/(main)/bless/_data/mock-accounts';
import { MOCK_MESSAGES } from '@/app/(main)/bless/_data/mock-messages';
import { MOCK_TARGETS } from '@/app/(main)/bless/_data/mock-targets';
import type {
  BlessMessage,
  BlessTarget,
  RegisteredAccount,
} from '@/app/(main)/bless/_types';

const USE_MOCK = true;

export async function getTargets(): Promise<BlessTarget[]> {
  if (USE_MOCK) return MOCK_TARGETS;
  // BFF: prayer-service + user-service 조합 (app/api/bless/targets/route.ts)
  const res = await fetch('/api/bless/targets', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch targets');
  const body = await res.json();
  return body.data as BlessTarget[];
}

export async function getTarget(id: string): Promise<BlessTarget | null> {
  if (USE_MOCK) return MOCK_TARGETS.find((t) => t.id === id) ?? null;
  // BE에 단일 조회 엔드포인트 없음. 목록 결과에서 필터.
  const targets = await getTargets();
  return targets.find((t) => t.id === id) ?? null;
}

export async function getMessages(blessId: string): Promise<BlessMessage[]> {
  if (USE_MOCK) return MOCK_MESSAGES[blessId] ?? [];
  // TODO: BFF route 신설 예정 (/api/bless/targets/[id]/messages).
  //       prayer-service GET /apis/prayer/prayers/{giftId}/messages 래핑.
  throw new Error('getMessages: 실 API 연동 BFF route 미구현');
}

export async function getRegisteredAccounts(): Promise<RegisteredAccount[]> {
  if (USE_MOCK) return MOCK_ACCOUNTS;
  // TODO: BE에 등록 계좌 목록 API 없음. 합의·구현 필요 (일회성 송금 즐겨찾기 용도).
  throw new Error('getRegisteredAccounts: BE 엔드포인트 미정');
}
