'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import WhiteCard from '@/components/ui/cmm/WhiteCard';

type SetUpClientProps = {
  name: string;
  location: string;
};

export default function SetUpClient({ name, location }: SetUpClientProps) {
  const router = useRouter();

  function handleClick() {
    sessionStorage.setItem(
      'selectedChurch',
      JSON.stringify({
        name,
        location,
      }),
    );

    router.push('/onboarding/checkin');
  }

  return (
    <div className="relative min-h-full w-full">
      <h1 className="pt-24 text-center font-hana-medium text-3xl text-hana-light-mint">
        승인 완료!
      </h1>

      <div className="pt-40">
        <WhiteCard contents={name} description={location} isSelected={false} />
      </div>

      <div className="absolute bottom-1 w-full items-center pt-10">
        <Button
          type="button"
          className="h-15 w-full rounded-2xl bg-hana-linear-deep-green-end text-2xl hover:bg-hana-linear-deep-green"
          onClick={handleClick}
        >
          시작하기
        </Button>
      </div>
    </div>
  );
}
