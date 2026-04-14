'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { BIBLE_VERSES } from '@/constants/bible';
import { IMAGE_PATH } from '@/constants/images';
import { formatCurrency } from '@/lib/formatters';

/**
 * @page: 어플 처음 접속 화면입니다.
 * @description: 어플 처음 접속 화면입니다.
 * @author: 이정수
 * @date: 2026-04-13
 */

type BibleVerse = (typeof BIBLE_VERSES)[number];

export default function CheckIn() {
  //TODO 하나은행과 함께 적금한 금액 불러와서 뿌려주기
  const totalGiving = 5092810;
  const [wordOfTheDay, setWordOfTheDay] = useState<BibleVerse | null>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * BIBLE_VERSES.length);
    setWordOfTheDay(BIBLE_VERSES[randomIndex]);
  }, []);

  const router = useRouter();

  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const startXRef = useRef(0);
  const currentXRef = useRef(0);

  const TRIGGER_DISTANCE = 100;
  const MAX_DRAG = 160;

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    startXRef.current = e.clientX;
    currentXRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;

    const deltaX = e.clientX - startXRef.current;
    const clamped = Math.max(0, Math.min(deltaX, MAX_DRAG));

    currentXRef.current = clamped;
    setDragX(clamped);
  };

  const onPointerEnd = () => {
    if (!dragging) return;
    setDragging(false);

    if (currentXRef.current >= TRIGGER_DISTANCE) {
      setDragX(window.innerWidth);

      setTimeout(() => {
        router.push('/onboarding/auth/login');
      }, 240);
    } else {
      setDragX(0);
    }
  };

  return (
    <div className="-m-3 relative min-h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)] bg-gradient-to-b from-hana-checkin-green-t to-hana-checkin-green-b">
      <div className="absolute inset-0 p-3">
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="font-hana-medium text-hana-white text-xl">
            하나은행이 함께한 헌금
          </h1>
          <h1 className="pt-4 font-hana-bold text-2xl text-white">
            {`₩${formatCurrency(totalGiving)}`}
          </h1>
          <Image
            src={IMAGE_PATH.ONBOARDING_CHECKIN}
            alt="하나은행 마스코트"
            width={300}
            height={300}
            className="mx-3 mt-5 mb-2 animate-hanabot-float object-contain"
            priority
          />

          {wordOfTheDay && (
            <>
              <h1 className="whitespace-pre-line pt-4 text-center font-hana-medium text-hana-white text-xl">
                {wordOfTheDay.text}
              </h1>
              <h1 className="pt-4 font-hana-medium text-hana-white text-l">
                {`- ${wordOfTheDay.ref}`}
              </h1>
            </>
          )}
        </div>
        <div className="absolute bottom-6 left-0 w-full text-center text-white">
          {`>> 밀어서 넘기기`}
        </div>
      </div>

      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        className="absolute inset-0 touch-none"
        style={{
          transform: `translateX(${dragX}px)`,
          transition: dragging ? 'none' : 'transform 240ms ease',
        }}
      ></div>
    </div>
  );
}
