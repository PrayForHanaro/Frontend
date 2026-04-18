import type { BibleVerse } from '../_types';

type BibleVerseBoxProps = {
  verse: BibleVerse;
};

export default function BibleVerseBox({ verse }: BibleVerseBoxProps) {
  return (
    <div>
      <section
        id="잠언"
        className="relative mb-8 min-h-[190px] overflow-hidden rounded-[32px] bg-[#009697] p-8 text-white shadow-[#009697]/20 shadow-lg"
      >
        <div className="-top-12 -right-8 absolute h-48 w-48 animate-[slowFade_8s_infinite] rounded-full bg-white/20" />
        <div className="-bottom-16 -left-12 absolute h-64 w-64 animate-[slowFade_15s_infinite] rounded-full bg-black/10" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-32 w-32 animate-[slowFade_12s_infinite] rounded-full border border-white/20" />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="space-y-1">
            <p className="font-hana-bold text-white text-xl">{verse.text}</p>
          </div>

          <div className="mt-6">
            <div className="mt-2 flex items-baseline gap-1">
              {' '}
              — {verse.reference}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-hana-linear-deep-green-end via-hana-main to-hana-linear-deep-green px-6 py-7 shadow-sm">
//   <p className="text-center font-hana-bold text-[#3E2B08] text-base leading-relaxed">
//     {verse.text}
//   </p>
//   <p className="mt-3 text-right font-hana-medium text-[#6B4F15] text-xs">
//     — {verse.reference}
//   </p>
// </div>
