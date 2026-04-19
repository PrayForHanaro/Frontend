'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/ui/cmm/Header';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { formatPhoneNumber } from '@/lib/formatters';

/**
 * @page: 로그인 페이지 입니다.
 * @description: 로그인 페이지 입니다.
 * @author: 이정수
 * @date: 2026-04-13
 */

export default function Login() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const routeToHome = () => {
    if (phoneNumber.trim() && password.trim()) {
      router.push('/onboarding/church/pending');
    }
  };
  const handleReset = () => {
    setPhoneNumber('');
    setPassword('');
  };

  const isFormValid = phoneNumber.trim() && password.trim();
  return (
    <div className="relative min-h-full">
      <Header content="로그인하기" />
      <form className="min-h-full">
        {/* <h1 className="pt-24 text-center font-hana-medium text-3xl text-hana-light-mint">
          로그인
        </h1> */}
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
              name="phoneNumber"
              type="text"
              inputMode="numeric"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(formatPhoneNumber(e.target.value))
              }
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white p-5 pt-7 pb-7 text-2xl"
            />
          </Field>
        </FieldGroup>
        <Field className="absolute bottom-1 items-center pt-10">
          <Button
            type="reset"
            variant="outline"
            className="h-15 rounded-2xl bg-hana-gray-200 text-2xl hover:bg-hana-gray-300"
            onClick={handleReset}
          >
            초기화
          </Button>
          <Button
            type="button"
            disabled={!isFormValid}
            className={`h-15 rounded-2xl text-2xl ${
              isFormValid
                ? 'bg-hana-linear-deep-green-end hover:bg-hana-linear-deep-green'
                : 'cursor-not-allowed bg-hana-gray-300 text-hana-gray-500'
            }`}
            onClick={routeToHome}
          >
            시작하기
          </Button>
        </Field>
      </form>
    </div>
  );
}
