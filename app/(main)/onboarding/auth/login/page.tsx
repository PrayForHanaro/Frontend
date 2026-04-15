'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Header from '@/components/ui/cmm/Header';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

/**
 * @page: 로그인 페이지 입니다.
 * @description: 로그인 페이지 입니다.
 * @author: 이정수
 * @date: 2026-04-13
 */

export default function Login() {
  const router = useRouter();
  const routeToHome = () => {
    router.push('/home');
  };
  return (
    <div className="relative min-h-full">
      <Header content="로그인하기" />
      <form className="min-h-full">
        <h1 className="pt-24 text-center font-hana-medium text-3xl text-hana-light-mint">
          로그인
        </h1>
        <FieldGroup className="flex flex-col items-center pt-24">
          <Field>
            <FieldLabel
              className="px-1 pb-3 text-hana-gray-600 text-xl"
              htmlFor="fieldgroup-phone"
            >
              전화번호
            </FieldLabel>
            <Input
              id="fieldgroup-phone"
              placeholder="010-0000-0000"
              className="bg-white p-5 pt-7 pb-7 text-2xl placeholder:text-gray-300"
            />
          </Field>
          <Field className="pt-10">
            <FieldLabel
              className="px-1 pb-3 text-hana-gray-600 text-xl"
              htmlFor="fieldgroup-password"
            >
              비밀번호
            </FieldLabel>
            <Input
              id="fieldgroup-password"
              type="password"
              className="bg-white p-5 pt-7 pb-7 text-2xl"
            />
          </Field>
        </FieldGroup>
        <Field className="absolute bottom-1 items-center pt-10">
          <Button
            type="reset"
            variant="outline"
            className="h-15 rounded-2xl bg-hana-gray-200 text-2xl hover:bg-hana-gray-300"
          >
            초기화
          </Button>
          <Button
            type="button"
            className="h-15 rounded-2xl bg-hana-linear-deep-green-end text-2xl hover:bg-hana-linear-deep-green"
            onClick={routeToHome}
          >
            시작하기
          </Button>
        </Field>
      </form>
    </div>
  );
}
