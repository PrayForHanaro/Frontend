'use client';

import { Send } from 'lucide-react';

type BlessHeaderProps = {
  title: string;
  subtitle?: string;
  greeting?: string;
};

export default function BlessHeader({
  title,
  subtitle,
  greeting,
}: BlessHeaderProps) {
  return (
    <div className="flex flex-col items-center px-6 pt-10 pb-8 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-hana-bless-icon-bg">
        <Send className="-rotate-12 size-6 text-hana-bless-icon" />
      </div>
      {greeting && (
        <p className="mb-1 font-hana-regular text-hana-gray-600 text-sm">
          {greeting}
        </p>
      )}
      <h1 className="font-hana-bold text-gray-900 text-xl">{title}</h1>
      {subtitle && (
        <p className="mt-2 font-hana-regular text-hana-gray-500 text-sm">
          {subtitle}
        </p>
      )}
    </div>
  );
}
