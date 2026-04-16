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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/bless/targets`,
  );
  if (!res.ok) throw new Error('Failed to fetch targets');
  return res.json();
}

export async function getTarget(id: string): Promise<BlessTarget | null> {
  if (USE_MOCK) return MOCK_TARGETS.find((t) => t.id === id) ?? null;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/bless/targets/${id}`,
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch target');
  return res.json();
}

export async function getMessages(blessId: string): Promise<BlessMessage[]> {
  if (USE_MOCK) return MOCK_MESSAGES[blessId] ?? [];
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/bless/targets/${blessId}/messages`,
  );
  if (!res.ok) throw new Error('Failed to fetch messages');
  return res.json();
}

export async function getRegisteredAccounts(): Promise<RegisteredAccount[]> {
  if (USE_MOCK) return MOCK_ACCOUNTS;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/bless/accounts`,
  );
  if (!res.ok) throw new Error('Failed to fetch registered accounts');
  return res.json();
}
