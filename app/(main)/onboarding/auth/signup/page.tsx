'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleReset = () => {
    setBirthDate('');
    setPhoneNumber('');
  };
  return (
    <form>
      <h1 className="pt-15 text-center font-hana-medium text-5xl text-hana-light-mint">
        회원가입
      </h1>
      <FieldGroup className="flex flex-col items-center pt-10">
        <Field>
          <FieldLabel
            className="px-1 pb-3 text-hana-gray-600 text-xl"
            htmlFor="fieldgroup-name"
          >
            이름
          </FieldLabel>
          <Input
            id="fieldgroup-name"
            placeholder="성함을 적어주세요."
            className="p-5 pt-7 pb-7 text-2xl placeholder:text-gray-300"
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
            id="birth-date"
            name="birthDate"
            type="text"
            inputMode="numeric"
            autoComplete="bday"
            placeholder="19xx.xx.xx"
            value={birthDate}
            onChange={(e) => setBirthDate(formatBirthDate(e.target.value))}
            maxLength={10}
            className="p-5 pt-7 pb-7 text-2xl placeholder:text-gray-300"
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
            onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
            placeholder="010-0000-0000"
            className="p-5 pt-7 pb-7 text-2xl placeholder:text-gray-300"
          />
        </Field>
        <Field>
          <FieldLabel
            className="px-1 pb-3 text-hana-gray-600 text-xl"
            htmlFor="fieldgroup-phone"
          >
            비밀번호
          </FieldLabel>
          <Input
            id="fieldgroup-password"
            type="password"
            className="p-5 pt-7 pb-7 text-2xl placeholder:text-gray-300"
          />
        </Field>
        <Field className="items-center pt-10">
          <Button
            type="reset"
            variant="outline"
            className="h-15 rounded-2xl bg-hana-gray-200 text-2xl hover:bg-hana-gray-300"
            onClick={handleReset}
          >
            초기화
          </Button>
          <Button
            type="submit"
            className="h-15 rounded-2xl bg-hana-linear-deep-green-end text-2xl hover:bg-hana-linear-deep-green"
          >
            시작하기
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
