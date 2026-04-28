'use client';

import { ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * @page: 소모임 - 하나 모임통장 배너 컴포넌트
 * @description: 광고 배너 컴포넌트입니다. 클릭 시 하나은행 모임통장 안내 페이지로 이동하며 x표시로 삭제할 수 있습니다.
 * @author: typeYu
 * @date: 2026-04-18
 */

type ActivityAdBannerProps = {
  onClick?: () => void;
  isFixed?: boolean;
  isVisible?: boolean;
};

type ActivityAdBannerContentProps = {
  onClick?: () => void;
  isFixed: boolean;
  isVisible: boolean;
};

const NAV_HEIGHT = 70;
const BANNER_GAP = 12;
const BANNER_BOTTOM_OFFSET = NAV_HEIGHT + BANNER_GAP;

function ActivityAdBannerContent({
  onClick,
  isFixed,
  isVisible,
}: ActivityAdBannerContentProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setIsDismissed(false);
    }
  }, [isVisible]);

  const isRendered = isVisible && !isDismissed;

  function handleClose(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setIsDismissed(true);
  }

  return (
    <div
      className={`z-[60] mb-8 transition-all duration-500 ease-out ${
        isFixed
          ? '-translate-x-1/2 fixed left-1/2 w-[calc(100vw-24px)] max-w-98.25'
          : 'relative w-full'
      } ${
        isRendered
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      style={
        isFixed
          ? {
              bottom: `calc(env(safe-area-inset-bottom, 0px) + ${BANNER_BOTTOM_OFFSET}px)`,
            }
          : undefined
      }
    >
      <div className="relative mb-[5px] w-full border-2 border-[#56A99E] bg-white px-2 py-4 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
        <button
          type="button"
          onClick={onClick}
          className="block w-full cursor-pointer text-left"
          aria-label="모임 통장 안내 배너"
        >
          <div className="flex items-stretch justify-between gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="/singanddance.svg"
                alt="모임 통장 안내 캐릭터"
                width={52}
                height={52}
                className="h-13! w-13! max-w-none shrink-0"
              />

              <div className="flex flex-col gap-1">
                <p className="font-bold font-hana-main text-[#111111] text-[17px]">
                  <span className="text-hana-main">모임 통장</span>이
                  필요하신가요?
                </p>

                <p className="font-hana-main font-medium text-[#222222] text-[14px]">
                  최대 <span className="text-hana-main">연 2.5%</span> 금리가
                  적용돼요
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-end gap-0.5 self-end text-hana-gray-600">
              <span className="font-hana-main text-[14px]">바로가기</span>
              <ChevronRight size={16} aria-hidden="true" />
            </div>
          </div>
        </button>

        <button
          type="button"
          aria-label="배너 닫기"
          onClick={handleClose}
          className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full text-hana-gray-500 transition hover:bg-[#F3F4F6] hover:text-[#333333]"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default function ActivityAdBanner({
  onClick,
  isFixed = true,
  isVisible = true,
}: ActivityAdBannerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isFixed) {
    return (
      <ActivityAdBannerContent
        onClick={onClick}
        isFixed={false}
        isVisible={isVisible}
      />
    );
  }

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <ActivityAdBannerContent onClick={onClick} isFixed isVisible={isVisible} />,
    document.body,
  );
}
