'use client';

import { ImagePlus, X } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

/**
 * @page: 소모임 - 활동 이미지 입력 필드 컴포넌트
 * @description: 활동 이미지 입력 필드 컴포넌트입니다. 최대 3장의 이미지를 업로드할 수 있으며, 업로드된 이미지는 미리보기로 표시됩니다. 각 이미지에는 삭제 버튼이 있어 사용자가 이미지를 제거할 수 있습니다.
 * @author: typeYu
 * @date: 2026-04-14
 */

type ActivityImageFieldProps = {
  value: File[];
  onChangeValue: (nextValue: File[]) => void;
  maxCount?: number;
};

type PreviewItem = {
  file: File;
  previewUrl: string;
};

export default function ActivityImageField({
  value,
  onChangeValue,
  maxCount = 3,
}: ActivityImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewItems, setPreviewItems] = useState<PreviewItem[]>([]);

  useEffect(() => {
    const nextPreviewItems = value.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setPreviewItems(nextPreviewItems);

    return () => {
      nextPreviewItems.forEach((item) => {
        URL.revokeObjectURL(item.previewUrl);
      });
    };
  }, [value]);

  function handleOpenFilePicker() {
    inputRef.current?.click();
  }

  function handleChangeImage(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []);

    if (selectedFiles.length === 0) {
      return;
    }

    const nextFiles = [...value, ...selectedFiles].slice(0, maxCount);

    onChangeValue(nextFiles);
    event.target.value = '';
  }

  function handleRemoveImage(targetFile: File) {
    const nextFiles = value.filter((file) => file !== targetFile);

    onChangeValue(nextFiles);
  }

  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-bold font-hana-main text-[#222222] text-base">
        사진 (최대 {maxCount}장)
      </h2>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChangeImage}
        className="hidden"
      />

      <div className="flex flex-wrap gap-3">
        {previewItems.map((item) => (
          <div
            key={`${item.file.name}-${item.file.lastModified}`}
            className="relative h-28 w-28 overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white"
          >
            <img
              src={item.previewUrl}
              alt={item.file.name}
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              aria-label={`${item.file.name} 삭제`}
              onClick={() => handleRemoveImage(item.file)}
              className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/65"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>
        ))}

        {value.length < maxCount ? (
          <button
            type="button"
            aria-label="사진 추가"
            onClick={handleOpenFilePicker}
            className="flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-3xl border-2 border-[#C9C9C9] border-dashed bg-white text-[#B7B7B7] transition hover:bg-[#FAFAFA]"
          >
            <ImagePlus size={30} aria-hidden="true" />
            <span className="font-hana-main text-base">추가</span>
          </button>
        ) : null}
      </div>
    </section>
  );
}
