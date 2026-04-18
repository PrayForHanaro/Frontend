'use client';

import {
  Bell,
  Church,
  FolderPlus,
  List,
  LockKeyhole,
  LogOut,
} from 'lucide-react';
import Header from '@/components/ui/cmm/Header';
import MenuItem from '@/components/ui/My/MenuItem';
import PointCard from '@/components/ui/My/PointCard';
import ProfileSection from '@/components/ui/My/ProfileSection';
import Section from '@/components/ui/My/Section';

export default function MyPage() {
  return (
    <div className="flex flex-col gap-6 pb-20">
      <Header content="마이페이지" />

      <ProfileSection />

      <PointCard />

      <Section title="신앙 활동">
        <MenuItem
          label="참여한 활동 목록"
          href="/mypage/activities/applied"
          icon={<List size={20} />}
        />
        <MenuItem
          label="내가 만든 활동"
          href="/mypage/activities/created"
          icon={<FolderPlus size={20} />}
        />
      </Section>

      <MenuItem
        label="유산 기부 신탁"
        subLabel="내 교회에 소중한 자산을 남기세요"
        href="/mypage/donation-trust"
        icon={<Church size={20} />}
      />

      <Section title="설정">
        <MenuItem label="알림 설정" icon={<Bell size={20} />} />

        <MenuItem label="약관 및 개인정보" icon={<LockKeyhole size={20} />} />
        <MenuItem
          label="로그아웃"
          isDanger={true}
          icon={<LogOut size={20} />}
        />
      </Section>
    </div>
  );
}
