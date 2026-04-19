'use client';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/ui/cmm/Header';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { formatBirthDate, formatPhoneNumber } from '@/lib/formatters';

const CARRIERS = ['SKT', 'KT', 'LG U+'];

/**
 * @page: 회원가입 페이지입니다.
 * @description: 회원가입 페이지입니다.
 * @author: 이정수
 * @date: 2026-04-13
 */

export default function Signup() {
  const router = useRouter();

  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [carrier, setCarrier] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showCarrierDropdown, setShowCarrierDropdown] = useState(false);
  const [authStatus, setAuthStatus] = useState<
    'BEFORE_SEND' | 'SENT' | 'VERIFIED'
  >('BEFORE_SEND');

  const routeToIntro = () => {
    router.push('/onboarding/intro');
  };

  const handleReset = () => {
    setBirthDate('');
    setPhoneNumber('');
    setCarrier('');
    setVerificationCode('');
  };

  const isButtonEnabled = authStatus === 'VERIFIED';

  const handleSendVerification = () => {
    if (!phoneNumber || !carrier) {
      alert('전화번호와 통신사를 선택해주세요');
      return;
    }
    // TODO: API 호출로 인증번호 발송
    console.log('인증번호 발송:', { phoneNumber, carrier });
    if (authStatus === 'BEFORE_SEND') {
      alert('인증번호가 발송되었습니다.');
      setAuthStatus('SENT');
    } else if (authStatus === 'SENT') {
      alert('인증되었습니다.');
      setAuthStatus('VERIFIED');
    } else {
      alert('이미 인증이 완료되었습니다.');
    }
  };
  return (
    <div className="flex min-h-full flex-col">
      <Header content="회원가입" />
      <form className="scrollbar-hide flex flex-1 flex-col overflow-y-auto">
        {/* <h1 className="pt-15 text-center font-hana-medium text-3xl text-hana-light-mint">
          회원가입
        </h1> */}
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
              onChange={(e) => setBirthDate(formatBirthDate(e.target.value))}
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
              onChange={(e) =>
                setPhoneNumber(formatPhoneNumber(e.target.value))
              }
              placeholder="010-0000-0000"
              className="bg-white p-5 pt-7 pb-7 text-2xl placeholder:text-gray-300"
            />
          </Field>

          <div className="w-full pt-2">
            <Field>
              <FieldLabel
                className="px-1 pb-3 text-hana-gray-600 text-xl"
                htmlFor="fieldgroup-carrier"
              >
                통신사 선택
              </FieldLabel>
              <div className="relative w-full">
                <button
                  type="button"
                  id="fieldgroup-carrier"
                  onClick={() => setShowCarrierDropdown(!showCarrierDropdown)}
                  className="flex w-full items-center justify-between rounded-lg bg-white p-4 pt-5 pb-5 text-gray-300 text-lg"
                >
                  <span className={carrier ? 'text-gray-900' : 'text-gray-300'}>
                    {carrier || '통신사 선택'}
                  </span>
                  {showCarrierDropdown ? <ArrowUp /> : <ArrowDown />}
                </button>
                {showCarrierDropdown && (
                  <div className="absolute top-full right-0 left-0 z-10 mt-1 rounded-lg bg-white shadow-lg">
                    {CARRIERS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          setCarrier(c);
                          setShowCarrierDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-lg first:rounded-t-lg last:rounded-b-lg hover:bg-gray-100"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Field>
            <Field>
              <FieldLabel
                className="px-1 pt-5 pb-3 text-hana-gray-600 text-xl"
                htmlFor="fieldgroup-verification"
              >
                인증번호
              </FieldLabel>
              <div className="flex gap-3">
                <Input
                  id="fieldgroup-verification"
                  type="text"
                  placeholder="인증번호를 입력해주세요"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="flex-1 bg-white p-5 pt-7 pb-7 text-2xl placeholder:text-gray-300"
                />
                <Button
                  type="button"
                  onClick={handleSendVerification}
                  className={
                    authStatus === 'BEFORE_SEND'
                      ? `h-auto whitespace-nowrap rounded-xl bg-hana-light-mint px-4 py-4 font-hana-bold text-base text-white hover:bg-hana-light-mint/90`
                      : authStatus === 'SENT'
                        ? `h-auto whitespace-nowrap rounded-xl bg-red-500 px-4 py-4 font-hana-bold text-base text-white hover:bg-red-500/90`
                        : `h-auto cursor-not-allowed whitespace-nowrap rounded-xl bg-gray-400 px-4 py-4 font-hana-bold text-base text-white`
                  }
                >
                  {authStatus === 'BEFORE_SEND'
                    ? '인증번호 받기'
                    : authStatus === 'SENT'
                      ? '인증번호 확인'
                      : '인증 완료'}
                </Button>
              </div>
            </Field>
            <Field>
              <FieldLabel
                className="px-1 pt-5 pb-3 text-hana-gray-600 text-xl"
                htmlFor="fieldgroup-password"
              >
                비밀번호
              </FieldLabel>
              <Input
                id="fieldgroup-password"
                type="password"
                className="bg-white p-5 pt-7 pb-7 text-2xl placeholder:text-gray-300"
              />
            </Field>
          </div>
        </FieldGroup>
        <Field className="mt-auto items-center px-6 pt-10 pb-6">
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
            disabled={!isButtonEnabled}
            className={`h-15 rounded-2xl text-2xl transition-all ${
              isButtonEnabled
                ? 'bg-hana-linear-deep-green-end text-white hover:bg-hana-linear-deep-green'
                : 'cursor-not-allowed bg-hana-linear-deep-green-end/50 text-white/70'
            }`}
            onClick={routeToIntro}
          >
            회원가입하기
          </Button>
        </Field>
      </form>
    </div>
  );
}
