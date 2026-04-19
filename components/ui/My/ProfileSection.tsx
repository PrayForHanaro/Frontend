'use client';

import { updateProfileImage } from '@/lib/user-api';
import { useRef, useState } from 'react';

export default function ProfileSection() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>(null);

  function handleClick() {
    fileInputRef.current?.click();
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 백엔드 가이드: multipart/form-data 단일 파일 전송 (BFF Proxy 호출)
      const result = await updateProfileImage(file);

      // 성공 시 미리보기 업데이트 (또는 서버에서 내려준 URL 사용 가능)
      const preview = URL.createObjectURL(file);
      setImage(preview);

      // TODO: 필요한 경우 전역 상태(사용자 정보) 업데이트 로직 추가
      console.log('Profile image updated successfully:', result);
    } catch (error) {
      console.error('업로드 실패', error);
      alert('프로필 이미지 업로드에 실패했습니다.');
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {/* 👇 클릭 가능 */}
      <div
        onClick={handleClick}
        className="flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200"
      >
        <img
          src={image || '/profile-default.png'}
          alt="profile"
          className="h-full w-full object-cover"
        />
      </div>

      {/* 숨겨진 input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
      />

      <span className="font-hana-bold text-lg">김성도</span>
      <span className="text-gray-400 text-sm">○○교회 성도</span>
    </div>
  );
}
