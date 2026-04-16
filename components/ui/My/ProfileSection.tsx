'use client';

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
      // 1️⃣ presigned URL 요청
      const res = await fetch('/api/presigned-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
        }),
      });

      const { url, fileUrl } = await res.json();

      // 2️⃣ S3 업로드
      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      // 미리보기 (S3 URL 대신 로컬 미리보기 추천)
      const preview = URL.createObjectURL(file);
      setImage(preview);

      // 서버에 저장
      await fetch('/api/profile/image', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: fileUrl }),
      });
    } catch (error) {
      console.error('업로드 실패', error);
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
