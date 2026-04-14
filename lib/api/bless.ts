import { MOCK_ACCOUNTS } from '@/app/(main)/bless/_data/mock-accounts';
import type { RegisteredAccount } from '@/app/(main)/bless/_types';

const USE_MOCK = true;

export async function getRegisteredAccounts(): Promise<RegisteredAccount[]> {
  if (USE_MOCK) return MOCK_ACCOUNTS;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/bless/accounts`,
  );
  if (!res.ok) throw new Error('Failed to fetch registered accounts');
  return res.json();
}
