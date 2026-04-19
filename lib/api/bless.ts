import { MOCK_ACCOUNTS } from '@/app/(main)/bless/_data/mock-accounts';
import { MOCK_MESSAGES } from '@/app/(main)/bless/_data/mock-messages';
import { MOCK_TARGETS } from '@/app/(main)/bless/_data/mock-targets';
import type {
  BlessMessage,
  BlessTarget,
  RegisteredAccount,
} from '@/app/(main)/bless/_types';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_BLESS !== 'false';

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
  const res = await fetch(`/api/bless/targets/${blessId}/messages`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch messages');
  const body = await res.json();
  return body.data as BlessMessage[];
}

export async function getRegisteredAccounts(): Promise<RegisteredAccount[]> {
  if (USE_MOCK) return MOCK_ACCOUNTS;
  const res = await fetch('/api/bless/registered-accounts', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch registered accounts');
  const body = await res.json();
  return body.data as RegisteredAccount[];
}

export async function createMessage(
  blessId: string,
  content: string,
): Promise<void> {
  if (USE_MOCK) return;
  const res = await fetch(`/api/bless/targets/${blessId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error('Failed to create message');
}
