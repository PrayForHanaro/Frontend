import type { BibleVerse } from '../_types';

type BibleVerseBoxProps = {
  verse: BibleVerse;
};

export default function BibleVerseBox({ verse }: BibleVerseBoxProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F9E9B6] via-[#D9B15C] to-[#A87817] px-6 py-7 shadow-sm">
      <p className="text-center font-hana-bold text-[#3E2B08] text-base leading-relaxed">
        {verse.text}
      </p>
      <p className="mt-3 text-right font-hana-medium text-[#6B4F15] text-xs">
        — {verse.reference}
      </p>
    </div>
  );
}
