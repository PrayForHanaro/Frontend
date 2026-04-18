'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Header from '@/components/ui/cmm/Header';
import { getRegisteredAccounts } from '@/lib/api/bless';
import BlessActionButton from '../../_components/bless-action-button';
import BlessHeader from '../../_components/bless-header';
import MessageTextarea from '../../_components/message-textarea';
import { BLESS_ONCE_FORM_KEY } from '../../_constants';
import type { RegisteredAccount } from '../../_types';

const formatAccountNumber = (raw: string) => {
  const digits = raw.replace(/\D/g, '').slice(0, 14);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
};

export default function BlessOnceInput() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientRelation, setRecipientRelation] = useState('');
  const [showAccounts, setShowAccounts] = useState(false);
  const [accounts, setAccounts] = useState<RegisteredAccount[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const accountBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getRegisteredAccounts()
      .then(setAccounts)
      .catch(() => setAccounts([]));
  }, []);

  useEffect(() => {
    if (!showAccounts) return;
    const handleClickOutside = (e: PointerEvent) => {
      if (
        accountBlockRef.current &&
        !accountBlockRef.current.contains(e.target as Node)
      ) {
        setShowAccounts(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () =>
      document.removeEventListener('pointerdown', handleClickOutside);
  }, [showAccounts]);

  const handleAmountChange = (value: string) => {
    const digits = value.replace(/\D/g, '');
    setAmount(digits);
  };

  const formattedAmount = amount ? Number(amount).toLocaleString() : '';

  const handleAccountSelect = (account: RegisteredAccount) => {
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
      BLESS_ONCE_FORM_KEY,
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
    <div>
      <Header content="기도 보내기" />
      <div className="scrollbar-hide relative flex h-full w-full flex-col overflow-y-auto pb-[70px]">
        {/* <BackButton to="/home" /> */}

        <BlessHeader
          title="기도 보내기"
          subtitle="사랑하는 사람에게 기도와 마음을 전하세요"
        />

        <div className="flex flex-col gap-3 px-6 pt-2">
          <MessageTextarea value={message} onChange={setMessage} />

          <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between">
              <span className="font-hana-bold text-gray-900 text-sm">금액</span>
              {errors.amount && (
                <span className="font-hana-regular text-hana-red text-xs">
                  {errors.amount}
                </span>
              )}
            </div>
            <input
              type="text"
              inputMode="numeric"
              value={formattedAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="₩ 금액을 입력하세요"
              className="rounded-xl bg-[#EFEBE7] px-4 py-3 font-hana-regular text-gray-900 text-sm placeholder:text-hana-gray-400 focus:outline-none focus:ring-2 focus:ring-hana-main/30"
            />
          </div>

          <div ref={accountBlockRef} className="relative flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between">
              <span className="font-hana-bold text-gray-900 text-sm">
                계좌번호
              </span>
              {errors.account && (
                <span className="font-hana-regular text-hana-red text-xs">
                  {errors.account}
                </span>
              )}
            </div>
            <input
              type="text"
              inputMode="numeric"
              maxLength={16}
              value={accountNumber}
              onChange={(e) => {
                setAccountNumber(formatAccountNumber(e.target.value));
                setRecipientName('');
                setRecipientRelation('');
              }}
              onFocus={() => setShowAccounts(true)}
              placeholder="110-123-456789"
              className="rounded-xl bg-[#EFEBE7] px-4 py-3 font-hana-regular text-gray-900 text-sm placeholder:text-hana-gray-400 focus:outline-none focus:ring-2 focus:ring-hana-main/30"
            />

            {showAccounts && accounts.length > 0 && (
              <div className="absolute top-full z-30 mt-1 max-h-[120px] w-full overflow-y-auto rounded-xl bg-white shadow-lg">
                {accounts.map((acc) => (
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

        <div className="mt-auto px-6 pt-4 pb-4">
          <BlessActionButton onClick={handleNext}>
            다음 단계로
          </BlessActionButton>
        </div>
      </div>
    </div>
  );
}
