'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/**
 * @page: 소모임 - 활동 참여 토스트 컴포넌트
 * @description: 활동 참여 토스트 컴포넌트입니다. 활동 참여 신청이 완료되었을 때 하단에 나타나는 토스트로, 2초 후에 사라집니다.
 * @author: typeYu
 * @date: 2026-04-14
 */

const ACTIVITY_JOIN_TOAST_KEY = 'activityJoinToast';

export default function ActivityJoinToast() {
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  const animationFrameRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const removeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (pathname !== '/activity') {
      return;
    }

    const shouldShowToast = sessionStorage.getItem(ACTIVITY_JOIN_TOAST_KEY);

    if (shouldShowToast !== 'true') {
      return;
    }

    setIsRendered(true);

    animationFrameRef.current = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });

    hideTimerRef.current = window.setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    removeTimerRef.current = window.setTimeout(() => {
      setIsRendered(false);
      sessionStorage.removeItem(ACTIVITY_JOIN_TOAST_KEY);
    }, 2400);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
      }

      if (removeTimerRef.current !== null) {
        window.clearTimeout(removeTimerRef.current);
      }
    };
  }, [pathname]);

  if (!isRendered) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      className={`-translate-x-1/2 pointer-events-none fixed bottom-20 left-1/2 z-[60] px-4 transition-all duration-300 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="rounded-2xl border-2 border-hana-dark-navy bg-white px-5 py-3 shadow-[0_10px_28px_rgba(0,0,0,0.2)] backdrop-blur-sm">
        <p className="whitespace-nowrap font-hana-main text-[14px] text-hana-dark-navy">
          참여 신청이 완료되었습니다.
        </p>
      </div>
    </div>
  );
}
