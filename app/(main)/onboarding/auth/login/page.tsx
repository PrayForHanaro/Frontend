'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import Header from '@/components/ui/cmm/Header';
import OnboardingWrapper from '@/components/ui/cmm/OnboardingWrapper';
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
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          phoneNumber: phoneNumber.replaceAll('-', ''),
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setErrorMessage(result.message || '로그인에 실패했습니다.');
        return;
      }

      router.push('/home');
    } catch (_error) {
      setErrorMessage('로그인 처리 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setPhoneNumber('');
    setPassword('');
    setErrorMessage('');
  }

  return (
    <OnboardingWrapper>
      <Header content="로그인하기" />
      <form
        className="flex h-full flex-col justify-between pt-10"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-10">
          <h1 className="text-center font-hana-medium text-3xl text-hana-light-mint">
            로그인
          </h1>

          <FieldGroup className="flex flex-col gap-6">
            <Field>
              <FieldLabel
                className="px-1 pb-2 text-hana-gray-600 text-lg"
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
                onChange={(event) =>
                  setPhoneNumber(formatPhoneNumber(event.target.value))
                }
                placeholder="010-0000-0000"
                maxLength={13}
                className="bg-white p-4 text-xl placeholder:text-gray-300"
              />
            </Field>

            <Field>
              <FieldLabel
                className="px-1 pb-2 text-hana-gray-600 text-lg"
                htmlFor="fieldgroup-password"
              >
                비밀번호
              </FieldLabel>

              <Input
                id="fieldgroup-password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="bg-white p-4 text-xl"
              />
            </Field>

            {errorMessage ? (
              <p className="text-center text-hana-red">{errorMessage}</p>
            ) : null}
          </FieldGroup>
        </div>

        <div className="flex flex-col gap-3 pb-5">
          <Button
            type="reset"
            variant="outline"
            className="h-15 w-full rounded-2xl bg-hana-gray-200 text-xl hover:bg-hana-gray-300"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            초기화
          </Button>

          <Button
            type="submit"
            className="h-15 w-full rounded-2xl bg-hana-linear-deep-green-end text-xl hover:bg-hana-linear-deep-green"
            disabled={isSubmitting}
          >
            {isSubmitting ? '처리중...' : '시작하기'}
          </Button>
        </div>
      </form>
    </OnboardingWrapper>
  );
}
