'use client';

import type { BibleVerse } from '../_types';

type BibleVerseBoxProps = {
  verse: BibleVerse;
};

export default function BibleVerseBox({ verse }: BibleVerseBoxProps) {
  return (
    <div className="rounded-2xl bg-white px-6 py-5">
      <p className="text-center font-hana-regular text-gray-700 text-sm leading-relaxed">
        &ldquo;{verse.text}&rdquo;
      </p>
      <p className="mt-2 text-right font-hana-regular text-hana-gray-600 text-xs">
        &mdash; {verse.reference}
      </p>
    </div>
  );
}
