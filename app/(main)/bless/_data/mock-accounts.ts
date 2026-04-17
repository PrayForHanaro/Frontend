import type { RegisteredAccount } from '../_types';

export const MOCK_ACCOUNTS: RegisteredAccount[] = [
  {
    id: 'acc-1',
    targetId: '1',
    targetName: '승빈',
    targetRelation: 'CHILD',
    accountNumber: '110-XXX-XXXXXX',
  },
  {
    id: 'acc-2',
    targetId: '2',
    targetName: '정수',
    targetRelation: 'CHILD',
    accountNumber: '110-XXX-XXXXXX',
  },
  {
    id: 'acc-3',
    targetId: '3',
    targetName: '지혜',
    targetRelation: 'GRANDCHILD',
    accountNumber: '110-XXX-XXXXXX',
  },
];
