'use client';

import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import Header from '@/components/ui/cmm/Header';
import DetailButtons from '../../_components/detail-buttons';
import MessageHistoryItem from '../../_components/message-history-item';
import type { BlessMessage, BlessTarget } from '../../_types';

const TOTAL_PRAYER_DAYS = 200;

const getPersonImage = (type: string) => {
  const IMAGE_PATH = {
    HOME_WOMAN: '/images/woman.png',
    HOME_BABY: '/images/baby.png',
    HOME_MAN: '/images/man.png',
  };
  switch (type) {
    case 'woman':
      return IMAGE_PATH.HOME_WOMAN;
    case 'baby':
      return IMAGE_PATH.HOME_BABY;
    default:
      return IMAGE_PATH.HOME_MAN;
  }
};

type BlessIntervalContent = {
  blessId: string;
  target: BlessTarget;
  messages: BlessMessage[];
};

export default function BlessInterval({
  params: paramsPromise,
}: {
  params: Promise<{ blessId: string }>;
}) {
  const [content, setContent] = useState<BlessIntervalContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      const params = await paramsPromise;
      const { blessId } = params;

      // sessionStorage에서 selectedPrayerPerson 가져오기
      let target: BlessTarget | null = null;
      const storedPerson = sessionStorage.getItem('selectedPrayerPerson');

      if (storedPerson) {
        try {
          target = JSON.parse(storedPerson);
        } catch (error) {
          console.error('selectedPrayerPerson 파싱 오류:', error);
        }
      }

      // selectedPrayerPerson이 없으면 homePrayerPeople에서 찾기
      if (!target) {
        try {
          const storedHomePeople = sessionStorage.getItem('homePrayerPeople');
          if (storedHomePeople) {
            const prayerPeople = JSON.parse(storedHomePeople);
            const foundPerson = prayerPeople.find(
              (person: {
                id: number;
                name: string;
                type: string;
                relation: string;
              }) => person.id.toString() === blessId,
            );
            if (foundPerson) {
              target = {
                id: foundPerson.id.toString(),
                name: foundPerson.name,
                relation: foundPerson.relation,
                avatar: getPersonImage(foundPerson.type),
                daysOfPrayer: Math.floor(Math.random() * 200) + 1,
                totalAmount: Math.floor(Math.random() * 1000000) + 10000,
                dailyAmount: Math.floor(Math.random() * 50000) + 1000,
              };
            }
          }
        } catch (error) {
          console.error('homePrayerPeople 파싱 오류:', error);
        }
      }

      if (target) {
        // Mock 메시지 데이터
        const mockMessages: BlessMessage[] = [
          {
            id: '1',
            targetId: blessId,
            date: '2024-01-15',
            dayOfWeek: '월',
            points: 1000,
            content: '오늘도 함께 기도합니다.',
          },
          {
            id: '2',
            targetId: blessId,
            date: '2024-01-14',
            dayOfWeek: '일',
            points: 1000,
            content: '건강하세요.',
          },
          {
            id: '3',
            targetId: blessId,
            date: '2024-01-13',
            dayOfWeek: '토',
            points: 1000,
            content: '행복하세요.',
          },
        ];

        setContent({ blessId, target, messages: mockMessages });
      }
      setIsLoading(false);
    };

    loadContent();
  }, [paramsPromise]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem('selectedPrayerPerson');
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <p className="font-hana-regular text-hana-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (!content?.target) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <p className="font-hana-regular text-hana-gray-500">
          대상자를 찾을 수 없습니다.
        </p>
      </div>
    );
  }

  const { blessId, target } = content;

  return (
    <div className="relative h-full w-full">
      <Header content="기도 적금" />
      <div className="scrollbar-hide relative flex h-full flex-col overflow-y-auto pt-10 pb-72">
        <div className="mt-4 mb-4 flex justify-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-hana-linear-deep-green">
            <Heart className="size-7 fill-white text-white" />
          </div>
        </div>

        <div className="mx-4 rounded-2xl bg-gradient-to-br from-hana-linear-deep-green-end to-hana-linear-deep-green px-6 py-6 text-white shadow-sm">
          <div className="flex flex-col items-center text-center">
            <p className="font-hana-medium text-sm opacity-90">
              To. {target.name}
            </p>
            <h1 className="mt-1 font-hana-bold text-2xl">
              {target.daysOfPrayer}일째
            </h1>
            <p className="font-hana-regular text-sm opacity-90">
              기도하고 있어요
            </p>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white"
              style={{
                width: `${Math.min((target.daysOfPrayer / TOTAL_PRAYER_DAYS) * 100, 100)}%`,
              }}
            />
          </div>

          <div className="mt-2 flex justify-between text-white/90">
            <div>
              <p className="font-hana-regular text-[10px]">달성률</p>
              <p className="font-hana-medium text-xs">
                {target.totalAmount.toLocaleString()}원
              </p>
            </div>
            <div className="text-right">
              <p className="font-hana-regular text-[10px]">매일 드리는 마음</p>
              <p className="font-hana-medium text-xs">
                {target.dailyAmount.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 pt-4">
          <DetailButtons blessId={blessId} />
        </div>

        <div className="flex flex-1 flex-col gap-3 px-4 pt-4">
          {content?.messages.map((msg: BlessMessage, idx: number) => (
            <MessageHistoryItem
              key={msg.id}
              message={msg}
              dayNumber={target.daysOfPrayer - idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
