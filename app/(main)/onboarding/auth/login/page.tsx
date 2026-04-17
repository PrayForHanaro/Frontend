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

/**
 * @page: 로그인 페이지
 * @description: 로그인 호출 로직 추가
 * @author: typeYu
 * @date: 2026-04-17
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
    <div className="min-h-screen bg-[#F7F8FA]">
      <Header title="로그인" />
      <form onSubmit={handleSubmit} className="px-5 pt-6">
        <FieldGroup>
          <Field>
            <FieldLabel>전화번호</FieldLabel>
            <Input
              aria-label="전화번호"
              value={phoneNumber}
              onChange={(event) =>
                setPhoneNumber(formatPhoneNumber(event.target.value))
              }
              placeholder="010-0000-0000"
              maxLength={13}
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
          <p className="mt-4 text-sm text-red-500">{errorMessage}</p>
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
            {isSubmitting ? '처리중...' : '시작하기'}
          </Button>
        </div>
      </form>
    </div>
  );
}
