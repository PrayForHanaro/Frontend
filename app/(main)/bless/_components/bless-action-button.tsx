'use client';

import { cn } from '@/lib/utils';

type BlessActionButtonProps = {
  variant?: 'primary' | 'outline' | 'secondary';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function BlessActionButton({
  variant = 'primary',
  className,
  disabled,
  onClick,
  children,
}: BlessActionButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'w-full rounded-xl py-3.5 font-hana-bold text-base transition-colors disabled:opacity-50',
        variant === 'primary' && 'bg-hana-main text-white active:bg-hana-mint',
        variant === 'outline' &&
          'border border-hana-main bg-white text-hana-main active:bg-hana-light-green',
        variant === 'secondary' &&
          'bg-hana-mint text-white active:bg-hana-linear-deep-green',
        className,
      )}
    >
      {children}
    </button>
  );
}
