'use client';

import { useEffect, useRef, useState } from 'react';

type ProfileSectionProps = {
  name?: string | null;
  orgName?: string | null;
  profileUrl?: string | null;
  onProfileUploaded?: (nextProfileUrl: string) => void;
};

export default function ProfileSection({
  name,
  orgName,
  profileUrl,
  onProfileUploaded,
}: ProfileSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(profileUrl ?? null);
  const [isUploading, setIsUploading] = useState(false);

  const safeName =
    typeof name === 'string' && name.trim() ? name.trim() : '이름 없음';
  const safeOrgName =
    typeof orgName === 'string' && orgName.trim()
      ? orgName.trim()
      : '소속 교회 없음';

  useEffect(() => {
    setImage(profileUrl ?? null);
  }, [profileUrl]);

  function handleClick() {
    fileInputRef.current?.click();
  }

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/me/profile-image', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || '프로필 이미지 업로드에 실패했습니다.',
        );
      }

      const nextProfileUrl =
        typeof result.data === 'string'
          ? result.data
          : URL.createObjectURL(file);

      setImage(nextProfileUrl);
      onProfileUploaded?.(nextProfileUrl);
    } catch (error) {
      console.error(error);
      alert('프로필 이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleClick}
          aria-label="프로필 이미지 업로드"
          className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-100"
        >
          {image ? (
            <img
              src={image}
              alt={`${safeName} 프로필 이미지`}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="font-semibold text-gray-600 text-lg">
              {safeName.slice(0, 1)}
            </span>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-gray-900 text-lg">{safeName}</p>
          <p className="text-gray-500 text-sm">{safeOrgName}</p>
          <p className="mt-1 text-gray-400 text-xs">
            {isUploading ? '업로드 중...' : '프로필 이미지를 눌러 변경'}
          </p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        aria-label="프로필 이미지 파일 선택"
      />
    </section>
  );
}
