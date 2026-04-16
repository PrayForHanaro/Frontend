'use client';

import { useState } from 'react';

export default function CounselingForm() {
  const [form, setForm] = useState({
    name: '김성도',
    birth: '19990101',
    phone: '010-1234-5678',
    assetType: '',
    need: '',
    date: '',
    time: '',
    region: '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    console.log(form);
    // 👉 다음 화면(동의 페이지) 이동
  }

  return (
    <div className="flex flex-col gap-5 px-4 py-6">
      <h1 className="font-bold text-hana-main text-lg">상담 예약</h1>

      {/* 이름 */}
      <div>
        <label className="text-gray-600 text-sm">성명</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border bg-white p-3"
        />
      </div>

      {/* 생년월일 */}
      <div>
        <label className="text-gray-600 text-sm">생년월일</label>
        <input
          name="birth"
          value={form.birth}
          onChange={handleChange}
          placeholder="예) 19990101"
          className="mt-1 w-full rounded-xl border bg-white p-3"
        />
      </div>

      {/* 연락처 */}
      <div>
        <label className="text-gray-600 text-sm">연락처</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border bg-white p-3"
        />
      </div>

      {/* 재산종류 */}
      <div>
        <label className="text-gray-600 text-sm">재산종류</label>
        <select
          name="assetType"
          value={form.assetType}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border bg-white p-3"
        >
          <option value="">선택하세요</option>
          <option>금전</option>
          <option>금전 + 부동산</option>
          <option>부동산</option>
          <option>주식</option>
          <option>기타</option>
        </select>
      </div>

      {/* 고객니즈 */}
      <div>
        <label className="text-gray-600 text-sm">고객니즈</label>
        <select
          name="need"
          value={form.need}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border bg-white p-3"
        >
          <option value="">선택하세요</option>
          <option>상속분쟁 대비</option>
          <option>1인가구 및 노후케어</option>
          <option>본인 또는 부모의 치매 고민</option>
          <option>장애인 신탁</option>
          <option>부동산 관리처분</option>
          <option>기부</option>
          <option>가업승계</option>
          <option>기타</option>
        </select>
      </div>

      {/* 상담 희망일 */}
      <div>
        <label className="text-gray-600 text-sm">상담희망일시</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border bg-white p-3"
        />
      </div>

      {/* 시간 */}
      <div>
        <label className="text-gray-600 text-sm">시간</label>
        <select
          name="time"
          value={form.time}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border bg-white p-3"
        >
          <option value="">시간 선택</option>
          <option>09:00</option>
          <option>10:00</option>
          <option>11:00</option>
          <option>13:00</option>
          <option>14:00</option>
          <option>15:00</option>
          <option>16:00</option>
          <option>17:00</option>
        </select>
      </div>

      {/* 상담 지역 */}
      <div>
        <label className="text-gray-600 text-sm">상담희망지역</label>
        <select
          name="region"
          value={form.region}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border bg-white p-3"
        >
          <option value="">선택하세요</option>
          <option>서울 강남</option>
          <option>서울 강북</option>
          <option>경기 북부</option>
          <option>경기 남부</option>
          <option>인천</option>
          <option>부산/경남/경북/대구/울산</option>
          <option>광주/전남/전북/제주</option>
          <option>대전/세종/충북/충남</option>
        </select>
      </div>

      {/* 버튼 */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={handleSubmit}
          className="flex-1 rounded-xl bg-hana-main py-3 text-white"
        >
          확인
        </button>

        <button className="hana- flex-1 rounded-xl border py-3 text-gray-500">
          취소
        </button>
      </div>
    </div>
  );
}
