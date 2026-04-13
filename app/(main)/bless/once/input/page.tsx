'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Nav from '@/components/ui/cmm/Nav';
import BlessActionButton from '../../_components/bless-action-button';
import BlessHeader from '../../_components/bless-header';
import MessageTextarea from '../../_components/message-textarea';
import { MOCK_ACCOUNTS } from '../../_data/mock-accounts';

export default function BlessOnceInput() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientRelation, setRecipientRelation] = useState('');
  const [showAccounts, setShowAccounts] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAmountChange = (value: string) => {
    const digits = value.replace(/\D/g, '');
    setAmount(digits);
  };

  const formattedAmount = amount ? Number(amount).toLocaleString() : '';

  const handleAccountSelect = (account: (typeof MOCK_ACCOUNTS)[number]) => {
    setAccountNumber(account.accountNumber);
    setRecipientName(account.targetName);
    setRecipientRelation(account.targetRelation);
    setShowAccounts(false);
  };

  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    if (!amount || Number(amount) <= 0) {
      newErrors.amount = '금액을 입력해주세요';
    }
    if (!accountNumber.trim()) {
      newErrors.account = '계좌번호를 입력해주세요';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    sessionStorage.setItem(
      'bless-once-form',
      JSON.stringify({
        message,
        amount: Number(amount),
        accountNumber,
        recipientName,
        recipientRelation,
      }),
    );
    router.push('/bless/once/complete');
  };

  return (
    <div className="relative h-full w-full">
      <div className="flex h-full flex-col overflow-y-auto pb-[70px]">
        <BlessHeader
          title="기도 보내기"
          subtitle="사랑하는 사람에게 기도와 마음을 전하세요"
        />

        <div className="flex flex-col gap-5 px-6 pt-6">
          <p className="font-hana-medium text-gray-900 text-sm">
            축복을 보낼 대상의 정보를 작성해주세요
          </p>

          <MessageTextarea value={message} onChange={setMessage} />

          {/* Amount */}
          <div className="flex flex-col gap-1.5">
            <span className="font-hana-bold text-gray-900 text-sm">금액</span>
            <input
              type="text"
              inputMode="numeric"
              value={formattedAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="₩ 금액을 입력하세요"
              className="rounded-xl bg-hana-input-bg px-4 py-3 font-hana-regular text-gray-900 text-sm placeholder:text-hana-gray-400 focus:outline-none focus:ring-2 focus:ring-hana-main/30"
            />
            {errors.amount ? (
              <p className="font-hana-regular text-hana-red text-xs">
                {errors.amount}
              </p>
            ) : (
              <p className="font-hana-regular text-hana-gray-500 text-xs">
                숫자만 입력해주세요
              </p>
            )}
          </div>

          {/* Account */}
          <div className="relative flex flex-col gap-1.5">
            <span className="font-hana-bold text-gray-900 text-sm">
              계좌번호
            </span>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => {
                setAccountNumber(e.target.value);
                setRecipientName('');
                setRecipientRelation('');
              }}
              onFocus={() => setShowAccounts(true)}
              placeholder="계좌번호를 입력하세요"
              className="rounded-xl bg-hana-input-bg px-4 py-3 font-hana-regular text-gray-900 text-sm placeholder:text-hana-gray-400 focus:outline-none focus:ring-2 focus:ring-hana-main/30"
            />
            {errors.account && (
              <p className="font-hana-regular text-hana-red text-xs">
                {errors.account}
              </p>
            )}

            {/* Account dropdown */}
            {showAccounts && (
              <div className="absolute top-full z-10 mt-1 w-full rounded-xl bg-white shadow-lg">
                {MOCK_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleAccountSelect(acc)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors first:rounded-t-xl last:rounded-b-xl hover:bg-hana-gray-100"
                  >
                    <div>
                      <p className="font-hana-medium text-gray-900 text-sm">
                        {acc.targetName} ({acc.targetRelation})
                      </p>
                      <p className="font-hana-regular text-hana-gray-500 text-xs">
                        {acc.accountNumber}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-auto px-6 pt-6 pb-6">
          <BlessActionButton onClick={handleNext}>
            다음 단계로
          </BlessActionButton>
        </div>
      </div>
      <Nav />
    </div>
  );
}
