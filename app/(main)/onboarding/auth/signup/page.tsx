'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import Header from '@/components/ui/cmm/Header';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { formatBirthDate, formatPhoneNumber } from '@/lib/formatters';

/**
 * @page: 회원가입 페이지입니다.
 * @description: 회원가입 페이지입니다.
 * @author: 이정수
 * @date: 2026-04-13
 */

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name,
          birthDate: birthDate.replaceAll('.', ''),
          phoneNumber: phoneNumber.replaceAll('-', ''),
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setErrorMessage(result.message || '회원가입에 실패했습니다.');
        return;
      }

      router.push('/onboarding/intro');
    } catch (_error) {
      setErrorMessage('회원가입 처리 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setName('');
    setBirthDate('');
    setPhoneNumber('');
    setPassword('');
    setErrorMessage('');
  }

  return (
    <div className="relative min-h-full">
      <Header content="회원가입" />

      <form className="min-h-full" onSubmit={handleSubmit}>
        <h1 className="pt-15 text-center font-hana-medium text-3xl text-hana-light-mint">
          회원가입
        </h1>

        <FieldGroup className="flex flex-col items-center pt-10 pb-40">
          <Field>
            <FieldLabel
              className="px-1 pb-3 text-hana-gray-600 text-xl"
              htmlFor="fieldgroup-name"
            >
              이름
            </FieldLabel>

            <Input
              id="fieldgroup-name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="성함을 적어주세요."
              className="bg-white p-5 pt-7 pb-7 text-2xl placeholder:text-gray-300"
            />
          </Field>

          <Field>
            <FieldLabel
              className="px-1 pb-3 text-hana-gray-600 text-xl"
              htmlFor="fieldgroup-birth"
            >
              생년월일
            </FieldLabel>

            <Input
              id="fieldgroup-birth"
              name="birthDate"
              type="text"
              inputMode="numeric"
              autoComplete="bday"
              placeholder="19xx.xx.xx"
              value={birthDate}
              onChange={(event) =>
                setBirthDate(formatBirthDate(event.target.value))
              }
              maxLength={10}
              className="bg-white p-5 pt-7 pb-7 text-2xl placeholder:text-gray-300"
            />
          </Field>

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
              onChange={(event) =>
                setPhoneNumber(formatPhoneNumber(event.target.value))
              }
              maxLength={13}
              placeholder="010-0000-0000"
              className="bg-white p-5 pt-7 pb-7 text-2xl placeholder:text-gray-300"
            />
          </Field>

          <Field>
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
              className="bg-white p-5 pt-7 pb-7 text-2xl placeholder:text-gray-300"
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
            {isSubmitting ? '처리중...' : '회원가입하기'}
          </Button>
        </Field>
      </form>
    </div>
  );
}
