'use client';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export default function Login() {
  return (
    <form>
      <h1 className="pt-24 text-center font-hana-medium text-5xl text-hana-light-mint">
        로그인
      </h1>
      <FieldGroup className="flex flex-col items-center pt-24">
        <Field>
          <FieldLabel
            className="px-1 pb-3 text-hana-gray-600 text-xl"
            htmlFor="fieldgroup-name"
          >
            전화번호
          </FieldLabel>
          <Input
            id="fieldgroup-phone"
            placeholder="010-0000-0000"
            className="p-5 pt-7 pb-7 text-2xl placeholder:text-gray-300"
          />
        </Field>
        <Field className="pt-10">
          <FieldLabel
            className="px-1 pb-3 text-hana-gray-600 text-xl"
            htmlFor="fieldgroup-email"
          >
            비밀번호
          </FieldLabel>
          <Input
            id="fieldgroup-password"
            type="password"
            className="p-5 pt-7 pb-7 text-2xl"
          />
        </Field>
        <Field className="items-center pt-10">
          <Button
            type="reset"
            variant="outline"
            className="h-15 rounded-2xl bg-hana-gray-200 text-2xl hover:bg-hana-gray-300"
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
