'use client';

import Header from '@/components/ui/cmm/Header';
import Nav from '@/components/ui/cmm/Nav';
import MenuItem from '@/components/ui/My/MenuItem';
import PointCard from '@/components/ui/My/PointCard';
import ProfileSection from '@/components/ui/My/ProfileSection';
import Section from '@/components/ui/My/Section';

export default function MyPage() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="scrollbar-hide h-full overflow-y-auto px-4 pb-24">
        <div className="flex flex-col gap-6">
          <Header content="마이페이지" />

          <ProfileSection />

          <PointCard />

          <Section title="신앙 활동">
            <MenuItem
              label="참여한 활동 목록"
              href="/mypage/activities/applied"
            />
            <MenuItem
              label="내가 만든 활동"
              href="/mypage/activities/created"
            />
          </Section>

          <Section title="기부">
            <MenuItem
              label=" 유산 기부 신탁"
              subLabel="내 교회에 소중한 자산을 남기세요"
              href="/mypage/donation-trust"
            />
          </Section>

          <div className="flex flex-col gap-1">
            <MenuItem label="알림 설정" />
            <MenuItem label="약관 및 개인정보" />
            <MenuItem label="로그아웃" />
          </div>
        </div>
      </div>
      <Nav />
    </div>
  );
}
