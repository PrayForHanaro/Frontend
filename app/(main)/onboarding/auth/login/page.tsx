'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import Header from '@/components/ui/cmm/Header';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { BFF_ENDPOINTS } from '@/lib/backend-endpoints';
import { formatphone } from '@/lib/formatters';

type LoginResponse = {
  success: boolean;
  message?: string;
};

/**
 * @page: 로그인 페이지 입니다.
 * @description: 로그인 페이지 입니다.
 * @author: 이정수
 * @date: 2026-04-13
 */

export default function LoginPage() {
  const router = useRouter();
  const [phone, setphone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      console.log(phone);
      const response = await fetch(BFF_ENDPOINTS.auth.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          phone: phone.replaceAll('-', ''),
          password,
        }),
      });

      const result = (await response.json()) as LoginResponse;

      if (!response.ok || !result.success) {
        setErrorMessage(result.message ?? '로그인에 실패했습니다.');
        return;
      }

      router.replace('/home');
    } catch {
      setErrorMessage('로그인 처리 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setphone('');
    setPassword('');
    setErrorMessage('');
  };

  return (
    <div className="relative min-h-full">
      <Header content="로그인하기" />

      <form className="min-h-full" onSubmit={handleSubmit}>
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
              name="phone"
              type="text"
              inputMode="numeric"
              value={phone}
              onChange={(event) => setphone(formatphone(event.target.value))}
              placeholder="010-0000-0000"
              maxLength={13}
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
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="bg-white p-5 pt-7 pb-7 text-2xl"
            />
          </Field>

          {errorMessage ? <p>{errorMessage}</p> : null}
        </FieldGroup>

        <Field className="absolute bottom-1 items-center pt-10">
          <Button
            type="reset"
            variant="outline"
            className="h-15 rounded-2xl bg-hana-gray-200 text-2xl hover:bg-hana-gray-300"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            초기화
          </Button>

          <Button
            type="submit"
            className="h-15 rounded-2xl bg-hana-linear-deep-green-end text-2xl hover:bg-hana-linear-deep-green"
            disabled={isSubmitting}
          >
            {isSubmitting ? '처리중...' : '시작하기'}
          </Button>
        </Field>
      </form>
    </div>
  );
}
