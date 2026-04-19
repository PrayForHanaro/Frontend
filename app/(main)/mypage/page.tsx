'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/ui/cmm/Header';
import Nav from '@/components/ui/cmm/Nav';
import MenuItem from '@/components/ui/My/MenuItem';
import PointCard from '@/components/ui/My/PointCard';
import ProfileSection from '@/components/ui/My/ProfileSection';
import Section from '@/components/ui/My/Section';

type MyPageData = {
  name: string;
  profileUrl: string | null;
  orgName: string;
  pointSum: number;
  role: string;
};

export default function MyPage() {
  const [data, setData] = useState<MyPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchMyPage() {
      try {
        setLoading(true);
        setErrorMessage('');

        const response = await fetch('/api/me', {
          cache: 'no-store',
        });

        const result = await response.json();

        if (!response.ok || !result.success || !result.data) {
          throw new Error(
            result.message || '마이페이지 정보를 불러오지 못했습니다.',
          );
        }

        setData(result.data);
      } catch (error) {
        console.error(error);
        setErrorMessage('마이페이지 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchMyPage();
  }, []);

  function handleProfileUploaded(nextProfileUrl: string) {
    setData((prevData) => {
      if (!prevData) {
        return prevData;
      }

      return {
        ...prevData,
        profileUrl: nextProfileUrl,
      };
    });
  }

  return (
    <div className="flex flex-col gap-6 pb-20">
      <Header content="마이페이지" />

      {loading ? (
        <div className="px-4 text-gray-500 text-sm">불러오는 중...</div>
      ) : errorMessage ? (
        <div className="px-4 text-red-500 text-sm">{errorMessage}</div>
      ) : data ? (
        <>
          <ProfileSection
            name={data.name}
            orgName={data.orgName}
            profileUrl={data.profileUrl}
            onProfileUploaded={handleProfileUploaded}
          />

          <PointCard pointSum={data.pointSum} />

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
              label="유산 기부 신탁"
              subLabel="내 교회에 소중한 자산을 남기세요"
              href="/mypage/donation-trust"
            />
          </Section>

          <Section title="내 정보">
            <MenuItem label="이름" subLabel={data.name} />
            <MenuItem label="소속 교회" subLabel={data.orgName} />
            <MenuItem label="권한" subLabel={data.role} />
          </Section>

          <MenuItem label="알림 설정" />
          <MenuItem label="약관 및 개인정보" />
          <MenuItem label="로그아웃" />
        </>
      ) : null}

      <Nav />
    </div>
  );
}
