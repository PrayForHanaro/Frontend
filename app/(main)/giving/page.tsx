'use client';

import { useState } from 'react';

import Header from '@/components/ui/cmm/Header';
import GivingHistorySection from '@/components/ui/giving/GivingHistorySection';
import GivingToggle from '@/components/ui/giving/GivingToggle';
import PensionLinkedSection from '@/components/ui/giving/PensionLinkedSection';
import RegularGivingSection from '@/components/ui/giving/RegularGivingSection';
import type { GivingTab } from '@/constants/giving';

export default function GivingPage() {
  const [selectedTab, setSelectedTab] = useState<GivingTab>('정기 헌금');

  return (
    <div className="flex flex-col gap-4">
      <Header content="헌금" />

      <GivingToggle selectedTab={selectedTab} onChangeTab={setSelectedTab} />

      {selectedTab === '정기 헌금' && <RegularGivingSection />}
      {selectedTab === '연금 연계' && <PensionLinkedSection />}
      {selectedTab === '헌금 내역' && <GivingHistorySection />}
    </div>
  );
}
