'use client';

import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * @page: 소모임 - 활동 장소 입력 필드 컴포넌트
 * @description: 활동 장소 입력 필드 컴포넌트입니다. 장소 입력 필드와 주소 검색 버튼으로 구성되어 있습니다. 주소 검색 버튼 클릭 시 다음 우편번호 서비스가 제공하는 주소 검색 창이 열리며, 사용자가 주소를 선택하면 입력 필드에 선택한 주소가 자동으로 입력됩니다.
 * @author: typeYu
 * @date: 2026-04-14
 */

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: {
        oncomplete: (data: {
          address: string;
          roadAddress: string;
          jibunAddress: string;
          zonecode: string;
          buildingName: string;
        }) => void;
      }) => {
        open: () => void;
      };
    };
  }
}

type ActivityLocationFieldProps = {
  value: string;
  onChangeValue: (nextValue: string) => void;
  placeholder?: string;
};

const DAUM_POSTCODE_SCRIPT_URL =
  '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

export default function ActivityLocationField({
  value,
  onChangeValue,
  placeholder = '장소를 입력하세요',
}: ActivityLocationFieldProps) {
  const [isScriptReady, setIsScriptReady] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${DAUM_POSTCODE_SCRIPT_URL}"]`,
    );

    if (existingScript) {
      setIsScriptReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = DAUM_POSTCODE_SCRIPT_URL;
    script.async = true;
    script.onload = () => setIsScriptReady(true);
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  function handleOpenAddressSearch() {
    if (!window.daum?.Postcode) {
      return;
    }

    new window.daum.Postcode({
      oncomplete(data) {
        const nextAddress =
          data.roadAddress || data.address || data.jibunAddress || '';
        onChangeValue(nextAddress);
      },
    }).open();
  }

  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-bold font-hana-main text-[#222222] text-base">
        장소 *
      </h2>

      <div className="relative w-full">
        <input
          type="text"
          value={value}
          readOnly
          onClick={handleOpenAddressSearch}
          placeholder={placeholder}
          className="w-full cursor-pointer rounded-md border border-[#E5E7EB] bg-white p-4 pr-14 font-hana-main text-[#222222] text-base outline-none placeholder:text-[#9CA3AF]"
          aria-label="장소 입력"
        />

        <button
          type="button"
          onClick={handleOpenAddressSearch}
          disabled={!isScriptReady}
          aria-label="주소 검색 열기"
          className={`-translate-y-1/2 absolute top-1/2 right-4 ${
            isScriptReady
              ? 'cursor-pointer text-[#A4A4A4]'
              : 'cursor-not-allowed text-[#D1D5DB]'
          }`}
        >
          <MapPin size={24} aria-hidden="true" strokeWidth={2.2} />
        </button>
      </div>
    </section>
  );
}
