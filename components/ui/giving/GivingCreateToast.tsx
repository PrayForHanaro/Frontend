'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * @page: 헌금 - 헌금 생성 토스트
 * @description: 헌금이 성공적으로 생성되었음을 알리는 토스트 컴포넌트입니다.
 * @author: typeYu
 * @date: 2026-04-15
 */

type GivingCreateToastProps = {
  triggerKey: number;
  message: string;
};

export default function GivingCreateToast({
  triggerKey,
  message,
}: GivingCreateToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  const animationFrameRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const removeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (triggerKey === 0) {
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
  }, [triggerKey]);

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
      <div className="rounded-2xl bg-hana-bless-icon-bg px-4 py-2 shadow-[0_10px_28px_rgba(0,0,0,0.2)] backdrop-blur-sm">
        <p className="whitespace-nowrap font-hana-main text-[14px] text-hana-dark-navy">
          {message}
        </p>
      </div>
    </div>
  );
}
