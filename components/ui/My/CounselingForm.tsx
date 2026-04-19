'use client';

import {
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Phone,
  UserRound,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

type CounselingFormValue = {
  name: string;
  birth: string;
  phone: string;
  assetType: string;
  need: string;
  date: string;
  time: string;
  region: string;
};

const TOTAL_STEPS = 3;

const STEP_TITLES = [
  {
    step: 1,
    title: '기본 정보 확인',
    description: '회원 정보를 불러왔어요. \n 수정 없이 바로 진행할 수 있어요.',
  },
  {
    step: 2,
    title: '상담 내용 선택',
    description: '상담에 필요한 항목만 간단히 선택해 주세요.',
  },
  {
    step: 3,
    title: '일정 선택',
    description: '희망하시는 상담 일시와 지역을 선택해 주세요.',
  },
] as const;

export default function CounselingForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<CounselingFormValue>({
    name: '김하나',
    birth: '196501025',
    phone: '010-1234-5678',
    assetType: '',
    need: '',
    date: '',
    time: '',
    region: '',
  });

  const currentStepMeta = STEP_TITLES[step - 1];

  const progressPercent = useMemo(() => {
    return (step / TOTAL_STEPS) * 100;
  }, [step]);

  const isStepOneValid = Boolean(form.name && form.birth && form.phone);
  const isStepTwoValid = Boolean(form.assetType && form.need);
  const isStepThreeValid = Boolean(form.date && form.time && form.region);

  const isNextDisabled =
    (step === 1 && !isStepOneValid) ||
    (step === 2 && !isStepTwoValid) ||
    (step === 3 && !isStepThreeValid);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handlePrevStep() {
    if (step === 1) {
      return;
    }

    setStep((prev) => prev - 1);
  }

  function handleNextStep() {
    if (step === TOTAL_STEPS) {
      if (!isStepThreeValid) {
        return;
      }

      handleSubmit();
      return;
    }

    if (step === 1 && !isStepOneValid) {
      return;
    }

    if (step === 2 && !isStepTwoValid) {
      return;
    }

    setStep((prev) => prev + 1);
  }

  function handleSubmit() {
    router.push('/mypage');
  }

  function handleCancel() {
    window.history.back();
  }

  return (
    <div className="px-4 py-8">
      <ProgressSection
        step={step}
        progressPercent={progressPercent}
        title={currentStepMeta.title}
        description={currentStepMeta.description}
      />

      {step === 1 ? <StepOne form={form} /> : null}
      {step === 2 ? <StepTwo form={form} onChange={handleChange} /> : null}
      {step === 3 ? <StepThree form={form} onChange={handleChange} /> : null}

      <div className="mt-8 flex gap-3">
        {step === 1 ? (
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 rounded-2xl border border-[#D9DEE3] bg-white py-4 font-hana-main text-base"
          >
            취소
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePrevStep}
            className="flex-1 rounded-2xl border border-[#D9DEE3] bg-white py-4 font-hana-main text-base"
          >
            이전
          </button>
        )}

        <button
          type="button"
          onClick={handleNextStep}
          disabled={isNextDisabled}
          className={`flex flex-1 items-center justify-center gap-1 rounded-2xl py-4 font-hana-main text-base ${
            isNextDisabled
              ? 'bg-[#DCEAE7] text-white'
              : 'bg-hana-main text-white hover:bg-hana-mint'
          }`}
        >
          <span>{step === TOTAL_STEPS ? '예약 신청' : '다음'}</span>
          {step !== TOTAL_STEPS ? <ChevronRight className="size-4" /> : null}
        </button>
      </div>
    </div>
  );
}

function ProgressSection({
  step,
  progressPercent,
  title,
  description,
}: {
  step: number;
  progressPercent: number;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {STEP_TITLES.map((item) => {
          const isActive = item.step <= step;

          return (
            <div
              key={item.step}
              className="flex flex-1 items-center last:flex-none"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`flex size-9 items-center justify-center rounded-full border font-semibold text-sm ${
                    isActive
                      ? 'border-hana-main bg-hana-main text-white'
                      : 'border-[#D9DEE3] bg-white text-hana-gray-400'
                  }`}
                >
                  {item.step}
                </div>

                <span
                  className={`mt-2 text-xs ${
                    isActive ? 'text-hana-black' : 'text-hana-gray-400'
                  }`}
                >
                  STEP {item.step}
                </span>
              </div>

              {item.step !== TOTAL_STEPS ? (
                <div className="mx-2 mb-5 h-[2px] flex-1 bg-[#EEF1F4]" />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-[#EEF1F4]">
        <div
          className="h-full rounded-full bg-hana-main transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="mt-5">
        <p className="font-hana-main font-semibold text-hana-black text-xl">
          {title}
        </p>
        <p className="mt-2 whitespace-pre-line font-hana-main text-hana-gray-500 text-sm leading-6">
          {description}
        </p>
      </div>
    </div>
  );
}

function StepOne({ form }: { form: CounselingFormValue }) {
  return (
    <div className="space-y-5">
      <ReadonlyField
        label="성명"
        value={form.name}
        icon={<UserRound className="size-4" />}
      />

      <ReadonlyField
        label="생년월일"
        value={formatBirth(form.birth)}
        icon={<CheckCircle2 className="size-4" />}
      />

      <ReadonlyField
        label="연락처"
        value={form.phone}
        icon={<Phone className="size-4" />}
      />

      <div className="rounded-2xl px-2 py-3">
        <p className="font-hana-main text-blue-500">
          현재 정보로 진행하시겠습니까?
        </p>
      </div>
    </div>
  );
}

function StepTwo({
  form,
  onChange,
}: {
  form: CounselingFormValue;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}) {
  return (
    <div className="space-y-5">
      <SelectField
        label="재산 종류"
        name="assetType"
        value={form.assetType}
        onChange={onChange}
        options={['금전', '금전 + 부동산', '부동산', '주식', '기타']}
      />

      <SelectField
        label="고객 니즈"
        name="need"
        value={form.need}
        onChange={onChange}
        options={[
          '상속분쟁 대비',
          '1인가구 및 노후케어',
          '본인 또는 부모의 치매 고민',
          '장애인 신탁',
          '부동산 관리처분',
          '기부',
          '가업승계',
          '기타',
        ]}
      />
    </div>
  );
}

function StepThree({
  form,
  onChange,
}: {
  form: CounselingFormValue;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5">
        <DateField
          label="상담 희망일"
          name="date"
          value={form.date}
          onChange={onChange}
        />

        <SelectField
          label="시간"
          name="time"
          value={form.time}
          onChange={onChange}
          options={[
            '09:00',
            '10:00',
            '11:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
          ]}
        />

        <SelectField
          label="상담 희망 지역"
          name="region"
          value={form.region}
          onChange={onChange}
          options={[
            '서울 강남',
            '서울 강북',
            '경기 북부',
            '경기 남부',
            '인천',
            '부산/경남/경북/대구/울산',
            '광주/전남/전북/제주',
            '대전/세종/충북/충남',
          ]}
        />
      </div>

      <div className="rounded-3xl border border-[#E6EBEF] bg-[#FAFBFC] p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-hana-main">
            <CalendarClock className="size-5" />
          </div>

          <div>
            <p className="font-hana-main font-semibold text-base text-hana-black">
              예약 신청 후 담당 센터에서
            </p>
            <p className="font-hana-main font-semibold text-base text-hana-main">
              연락을 드리겠습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReadonlyField({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="font-hana-main text-hana-gray-500 text-sm">{label}</p>

        <span className="rounded-full bg-[#EEF8F6] px-3 py-1 font-hana-main text-hana-main text-xs">
          자동 입력
        </span>
      </div>

      <div className="flex h-14 items-center gap-3 rounded-2xl border border-[#E6EBEF] bg-[#FAFBFC] px-4">
        <div className="text-hana-main">{icon}</div>
        <span className="font-hana-main text-base text-hana-black">
          {value}
        </span>
      </div>
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  options: string[];
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-hana-main text-hana-gray-500 text-sm"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`h-14 w-full rounded-2xl border px-4 font-hana-main text-base outline-none ${
          value
            ? 'border-[#D9DEE3] bg-white text-hana-black'
            : 'border-[#D9DEE3] bg-white text-hana-gray-400'
        }`}
      >
        <option value="">선택하세요</option>
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

function DateField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-hana-main text-hana-gray-500 text-sm"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          className="h-14 w-full rounded-2xl border border-[#D9DEE3] bg-white px-4 pr-12 font-hana-main text-base text-hana-black outline-none"
        />

        <div className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-4 text-hana-main">
          <MapPin className="size-0 opacity-0" />
          <CalendarClock className="size-5" />
        </div>
      </div>
    </div>
  );
}
function formatBirth(value: string) {
  if (value.length !== 8) {
    return value;
  }

  const year = value.slice(0, 4);
  const month = value.slice(4, 6);
  const date = value.slice(6, 8);

  return `${year}.${month}.${date}`;
}
