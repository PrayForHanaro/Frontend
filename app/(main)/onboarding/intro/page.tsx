'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import OnboardingWrapper from '@/components/ui/cmm/OnboardingWrapper';
import { Field } from '@/components/ui/field';
import { IMAGE_PATH } from '@/constants/images';

export default function OnboardingIntroPage() {
  const router = useRouter();
  const routeToLogin = () => {
    router.push(`/onboarding/auth/login`);
  };
  const routeToSignup = () => {
    router.push(`/onboarding/auth/signup`);
  };
  return (
    <OnboardingWrapper>
      <div className="relative flex h-full flex-col items-center justify-between">
        <div className="flex flex-col items-center pt-10">
          <h1 className="text-center font-hana-bold text-3xl text-hana-light-mint">
            PRAY4HANA
          </h1>
          <Image
            src={IMAGE_PATH.LOGO}
            alt="로고"
            width={300}
            height={300}
            className="mx-3 mt-5 mb-2 animate-hanabot-float object-contain"
            priority
          />
        </div>

        <Field className="w-full gap-3 pb-5">
          <Button
            type="button"
            className="h-15 w-full rounded-2xl bg-hana-linear-deep-green-end text-2xl hover:bg-hana-linear-deep-green"
            onClick={routeToLogin}
          >
            로그인하기
          </Button>
          <Button
            type="button"
            className="h-15 w-full rounded-2xl bg-hana-linear-deep-green-end text-2xl hover:bg-hana-linear-deep-green"
            onClick={routeToSignup}
          >
            회원가입하기
          </Button>
        </Field>
      </div>
    </OnboardingWrapper>
  );
}
