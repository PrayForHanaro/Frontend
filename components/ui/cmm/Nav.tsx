'use client';

import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IMAGE_PATH } from '@/constants/images';

/**
 * @page: Nav
 * @description: <div className="relative h-full w-full"> <Nav /> </div> 로 사용해주어야 화면 하단에 들어갑니다.
 * @author: 이승빈
 * @date: 2026-04-13
 */

const NAV_ITEMS = [
  { id: 'home', label: '홈', icon: IMAGE_PATH.NAV_HOME, href: '/home' },
  { id: 'giving', label: '헌금', icon: IMAGE_PATH.NAV_GIVING, href: '/giving' },
  {
    id: 'activity',
    label: '활동',
    icon: IMAGE_PATH.NAV_ACTIVITY,
    href: '/activity',
  },
  { id: 'mypage', label: 'My', icon: IMAGE_PATH.NAV_MY, href: '/mypage' },
] as const;

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className="absolute bottom-0 left-0 flex w-full justify-center">
      <nav className="h-[70px] w-[393px] rounded-t-2xl border-hana-gray-200 border-t bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex h-full items-center justify-around px-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href as Route}
                className="flex w-full flex-col items-center justify-center gap-1 transition-all active:scale-95"
              >
                <div className="relative h-7 w-7">
                  <Image
                    src={`${item.icon}_${isActive ? 'activate' : 'inActivate'}.svg`}
                    alt={item.label}
                    fill
                    className={`object-contain ${item.id === 'giving' ? 'translate-y-[1px] scale-90' : ''}`}
                  />
                </div>
                <span
                  className={`font-hana-medium text-[11px] ${isActive ? 'text-hana-main' : 'text-hana-gray-600'}`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
