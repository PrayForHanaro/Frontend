'use client';

import { useState } from 'react';

import Header from '@/components/ui/cmm/Header';
import Nav from '@/components/ui/cmm/Nav';
import GivingToggle from '@/components/ui/giving/GivingToggle';
import type { GivingTab } from '@/constants/giving';

export default function GivingPage() {
  const [selectedTab, setSelectedTab] = useState<GivingTab>('정기 헌금');

  function renderContent() {
    if (selectedTab === '정기 헌금') {
      return <div>정기 헌금 섹션</div>;
    }

    if (selectedTab === '연금 연계') {
      return <div>연금 연계 섹션</div>;
    }

    return <div>헌금 내역 섹션</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Header content="헌금" />

      <GivingToggle selectedTab={selectedTab} onChangeTab={setSelectedTab} />

      {renderContent()}

      <Nav />
    </div>
  );
}
