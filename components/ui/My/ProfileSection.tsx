'use client';

import { Camera } from 'lucide-react';
import Image from 'next/image';
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

      if (!res.ok) {
        throw new Error('presigned-url 요청 실패');
      }

      const { url, fileUrl } = await res.json();

      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      const preview = URL.createObjectURL(file);
      setImage(preview);

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
      <div className="relative h-20 w-20">
        <button
          type="button"
          onClick={handleClick}
          aria-label="프로필 이미지 업로드"
          className="h-full w-full cursor-pointer overflow-hidden rounded-full bg-gray-200 ring-[#1ea698] ring-[3px] ring-offset-2"
        >
          <Image
            src={image || '/profile-default.png'}
            alt="profile"
            fill
            className="object-cover"
            sizes="80px"
            unoptimized={!!image}
          />
        </button>

        <div className="absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full bg-hana-main">
          <Camera size={14} className="text-white" />
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
      />

      <span className="font-hana-bold text-lg">김하나</span>
      <span className="text-gray-400 text-sm">하나 교회 성도</span>
    </div>
  );
}
