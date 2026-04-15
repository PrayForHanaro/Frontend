'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { IMAGE_PATH } from '@/constants/images';

/**
 * @page: 인트로 페이지입니다.
 * @description: 인트로 페이지 입니다.
 * @author: 이정수
 * @date: 2026-04-13
 */

export default function OnboardingIntroPage() {
  const router = useRouter();
  const routeToLogin = () => {
    router.push(`/onboarding/auth/login`);
  };
  const routeToSignup = () => {
    router.push(`/onboarding/auth/signup`);
  };
  return (
    <div className="relative min-h-full">
      <h1 className="pt-24 text-center font-hana-bold text-3xl text-hana-light-mint">
        PRAY4HANA
      </h1>
      <div className="flex justify-center">
        <Image
          src={IMAGE_PATH.LOGO}
          alt="로고"
          width={300}
          height={300}
          className="mx-3 mt-5 mb-2 animate-hanabot-float object-contain"
          priority
        />
      </div>

      <Field className="absolute bottom-30 items-center pt-10">
        <Button
          type="button"
          className="h-15 rounded-2xl bg-hana-linear-deep-green-end text-2xl hover:bg-hana-linear-deep-green"
          onClick={routeToLogin}
        >
          로그인하기
        </Button>
        <Button
          type="button"
          className="h-15 rounded-2xl bg-hana-linear-deep-green-end text-2xl hover:bg-hana-linear-deep-green"
          onClick={routeToSignup}
        >
          회원가입하기
        </Button>
      </Field>
    </div>
  );
}
