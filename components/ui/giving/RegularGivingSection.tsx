'use client';

import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

import ScheduleAddModal from '@/components/ui/cmm/ScheduleAddModal';
import GivingCreateToast from '@/components/ui/giving/GivingCreateToast';
import RegularGivingCard from '@/components/ui/giving/RegularGivingCard';

/**
 * @page: 헌금 - 정기 헌금
 * @description: 사용자의 정기 헌금 일정을 보여주는 섹션 컴포넌트입니다. 사용자는 이 섹션에서 정기 헌금 일정을 추가, 수정, 활성화/비활성화할 수 있습니다.
 * @author: typeYu
 * @date: 2026-04-15
 */

type RegularGivingItem = {
  id: number;
  givingType: string;
  churchName: string;
  amount: number;
  nextWithdrawalDate: string;
  accountName: string;
  accountNumber: string;
  isEnabled: boolean;
};

const CASH_TYPE_OPTIONS = [
  { label: '십일조', value: 'tithe' },
  { label: '감사헌금', value: 'thanks' },
  { label: '주일헌금', value: 'sunday' },
] as const;

const ACCOUNT_OPTIONS = [
  { label: '하나 헌금통장 (****1234)', value: 'hana-giving-1234' },
  { label: '하나 생활통장 (****5678)', value: 'hana-life-5678' },
] as const;

const INITIAL_GIVING_ITEMS: RegularGivingItem[] = [
  {
    id: 1,
    givingType: '십일조',
    churchName: '하나 교회',
    amount: 300000,
    nextWithdrawalDate: '4월 20일',
    accountName: '하나 헌금통장',
    accountNumber: '****1234',
    isEnabled: true,
  },
  {
    id: 2,
    givingType: '감사헌금',
    churchName: '하나 교회',
    amount: 100000,
    nextWithdrawalDate: '5월 10일',
    accountName: '하나 생활통장',
    accountNumber: '****5678',
    isEnabled: true,
  },
];

function formatDateToKorean(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function parseAccountLabel(label: string) {
  const cleanedLabel = label.replace(')', '');
  const [accountName, accountNumber = '****0000'] = cleanedLabel.split(' (');

  return {
    accountName,
    accountNumber,
  };
}

export default function RegularGivingSection() {
  const [isGivingModalOpen, setIsGivingModalOpen] = useState(false);
  const [givingItems, setGivingItems] =
    useState<RegularGivingItem[]>(INITIAL_GIVING_ITEMS);
  const [toastTriggerKey, setToastTriggerKey] = useState(0);

  const [cashTypeValue, setCashTypeValue] = useState('');
  const [startDate, setStartDate] = useState('2026-04-16');
  const [endDate, setEndDate] = useState('2026-04-16');
  const [accountValue, setAccountValue] = useState('');

  const orderedGivingItems = useMemo(() => {
    return [...givingItems].sort((leftItem, rightItem) => {
      if (leftItem.isEnabled === rightItem.isEnabled) {
        return 0;
      }

      return leftItem.isEnabled ? -1 : 1;
    });
  }, [givingItems]);

  function handleOpenGivingModal() {
    setIsGivingModalOpen(true);
  }

  function handleCloseGivingModal() {
    setIsGivingModalOpen(false);
  }

  function handleToggleGiving(id: number) {
    setGivingItems((previousItems) =>
      previousItems.map((item) =>
        item.id === id ? { ...item, isEnabled: !item.isEnabled } : item,
      ),
    );
  }

  function handleSubmitGivingSchedule() {
    const selectedCashType =
      CASH_TYPE_OPTIONS.find((option) => option.value === cashTypeValue)
        ?.label ?? '헌금';

    const selectedAccountLabel =
      ACCOUNT_OPTIONS.find((option) => option.value === accountValue)?.label ??
      '하나 헌금통장 (****0000)';

    const { accountName, accountNumber } =
      parseAccountLabel(selectedAccountLabel);

    const newGivingItem: RegularGivingItem = {
      id: Date.now(),
      givingType: selectedCashType,
      churchName: '하나 교회',
      amount: 30000,
      nextWithdrawalDate: formatDateToKorean(startDate),
      accountName,
      accountNumber,
      isEnabled: true,
    };

    setGivingItems((previousItems) => [newGivingItem, ...previousItems]);
    setIsGivingModalOpen(false);
    setToastTriggerKey((previousValue) => previousValue + 1);

    setCashTypeValue('');
    setStartDate('2026-04-16');
    setEndDate('2026-04-16');
    setAccountValue('');
  }

  return (
    <>
      <div className="mb-10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-hana-main text-[18px] text-hana-black">
            내 정기 헌금
          </h2>

          <button
            type="button"
            aria-label="새 헌금 일정 추가"
            onClick={handleOpenGivingModal}
            className="flex size-9 items-center justify-center rounded-full bg-hana-main text-white transition-opacity hover:opacity-90"
          >
            <Plus size={18} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>

        {orderedGivingItems.map((item) => (
          <RegularGivingCard
            key={item.id}
            givingType={item.givingType}
            churchName={item.churchName}
            amount={item.amount}
            nextWithdrawalDate={item.nextWithdrawalDate}
            accountName={item.accountName}
            accountNumber={item.accountNumber}
            isEnabled={item.isEnabled}
            onToggle={() => handleToggleGiving(item.id)}
            onEdit={() => console.log('edit', item.id)}
          />
        ))}
      </div>

      <ScheduleAddModal
        isOpen={isGivingModalOpen}
        type="cash"
        cashTypeValue={cashTypeValue}
        startDate={startDate}
        endDate={endDate}
        accountValue={accountValue}
        cashTypeOptions={CASH_TYPE_OPTIONS.map((option) => ({
          label: option.label,
          value: option.value,
        }))}
        accountOptions={ACCOUNT_OPTIONS.map((option) => ({
          label: option.label,
          value: option.value,
        }))}
        isSubmitDisabled={
          !cashTypeValue || !startDate || !endDate || !accountValue
        }
        onClose={handleCloseGivingModal}
        onChangeCashType={setCashTypeValue}
        onChangeStartDate={setStartDate}
        onChangeEndDate={setEndDate}
        onChangeAccount={setAccountValue}
        onSubmit={handleSubmitGivingSchedule}
      />

      <GivingCreateToast
        triggerKey={toastTriggerKey}
        message="헌금 정기 이체가 생성되었습니다."
      />
    </>
  );
}
