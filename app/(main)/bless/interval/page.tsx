'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/ui/cmm/Header';
import { IMAGE_PATH } from '@/constants/images';
import AddTargetButton from '../_components/add-target-button';
import BlessHeader from '../_components/bless-header';
import TargetListItem from '../_components/target-list-item';
import type { BlessTarget } from '../_types';

const USER_NAME = '김하나';

const getPersonImage = (type: string) => {
  switch (type) {
    case 'woman':
      return IMAGE_PATH.HOME_WOMAN;
    case 'baby':
      return IMAGE_PATH.HOME_BABY;
    default:
      return IMAGE_PATH.HOME_MAN;
  }
};

export default function BlessIntervalList() {
  const router = useRouter();
  const [targets, setTargets] = useState<BlessTarget[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // sessionStorage에서 homePrayerPeople 가져오기
    const storedPrayerPeople = sessionStorage.getItem('homePrayerPeople');
    if (storedPrayerPeople) {
      try {
        const prayerPeople = JSON.parse(storedPrayerPeople);
        // homePrayerPeople을 BlessTarget 형식으로 변환
        const formattedTargets: BlessTarget[] = prayerPeople.map(
          (person: {
            id: number;
            name: string;
            type: string;
            relation: string;
          }) => ({
            id: person.id.toString(),
            name: person.name,
            relation: person.relation,
            avatar: getPersonImage(person.type),
            daysOfPrayer: Math.floor(Math.random() * 200) + 1,
            totalAmount: Math.floor(Math.random() * 1000000) + 10000,
            dailyAmount: Math.floor(Math.random() * 50000) + 1000,
          }),
        );
        setTargets(formattedTargets);
      } catch (error) {
        console.error('prayerPeople 파싱 오류:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const handleSelectTarget = (target: BlessTarget) => {
    sessionStorage.setItem('selectedPrayerPerson', JSON.stringify(target));
    router.push(`/bless/interval/${target.id}`);
  };

  return (
    <div className="relative h-full w-full">
      <Header content="기도 적금" />
      <div className="scrollbar-hide flex h-full flex-col overflow-y-auto bg-hana-bless-bg pb-[70px]">
        <BlessHeader
          greeting={`안녕하세요, ${USER_NAME}님.`}
          title="기도와 함께하는 적금"
          subtitle="사랑하는 사람에게 기도와 마음을 전해보세요."
        />

        <div className="mx-5 h-1 rounded-full bg-hana-bless-progress" />

        <p className="px-5 pt-5 pb-2 font-hana-medium text-gray-900 text-sm">
          {USER_NAME}님이 기도드리는 사람들이에요
        </p>

        <div className="space-y-3 px-5 pt-2">
          {!isLoading && targets.length > 0 ? (
            targets.map((target) => (
              <TargetListItem
                key={target.id}
                target={target}
                onSelect={handleSelectTarget}
              />
            ))
          ) : isLoading ? (
            <div className="rounded-2xl bg-white py-10 text-center shadow-sm">
              <p className="text-hana-gray-400 text-sm">로딩 중...</p>
            </div>
          ) : (
            <div className="rounded-2xl bg-white py-10 text-center shadow-sm">
              <p className="text-hana-gray-400 text-sm">
                아직 기도 중인 분이 없어요.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center py-4">
          <AddTargetButton />
        </div>
      </div>
    </div>
  );
}
