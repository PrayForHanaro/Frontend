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
    <div className="min-h-screen bg-[#F7F8FA]">
      <Header content="회원가입" />
      <form onSubmit={handleSubmit} className="px-5 pt-6">
        <FieldGroup>
          <Field>
            <FieldLabel>이름</FieldLabel>
            <Input
              aria-label="이름"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="이름을 입력해주세요"
              className="bg-white p-5 pt-7 pb-7 text-2xl placeholder:text-gray-300"
            />
          </Field>

          <Field>
            <FieldLabel>생년월일</FieldLabel>
            <Input
              aria-label="생년월일"
              value={birthDate}
              onChange={(event) =>
                setBirthDate(formatBirthDate(event.target.value))
              }
              maxLength={10}
              placeholder="YYYY.MM.DD"
              className="bg-white p-5 pt-7 pb-7 text-2xl placeholder:text-gray-300"
            />
          </Field>

          <Field>
            <FieldLabel>전화번호</FieldLabel>
            <Input
              aria-label="전화번호"
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
            <FieldLabel>비밀번호</FieldLabel>
            <Input
              aria-label="비밀번호"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호를 입력해주세요"
              className="bg-white p-5 pt-7 pb-7 text-2xl placeholder:text-gray-300"
            />
          </Field>
        </FieldGroup>

        {errorMessage ? (
          <p className="mt-4 text-red-500 text-sm">{errorMessage}</p>
        ) : null}

        <div className="mt-8 flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            초기화
          </Button>
          <Button type="submit" className="flex-1" disabled={isSubmitting}>
            {isSubmitting ? '처리중...' : '회원가입하기'}
          </Button>
        </div>
      </form>
    </div>
  );
}
