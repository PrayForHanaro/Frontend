import { Trophy } from 'lucide-react';

/**
 * @page: 소모임 - 태그
 * @description: 태그 컴포넌트 - 동행찾기, 교회행사, 봉사모집, 포인트 네 가지 구분.
 *               포인트는 다른 분들도 사용 가능
 * @author: typeYu
 * @date: 2026-04-13
 */

type CategoryTagLabel = '동행찾기' | '교회행사' | '봉사모집' | '포인트';

type CategoryTagProps = {
  label: CategoryTagLabel;
  text?: string;
};

type TagStyle = {
  textColor: string;
  backgroundColor: string;
  emoji?: string;
};

const TAG_STYLE_MAP: Record<CategoryTagLabel, TagStyle> = {
  동행찾기: {
    emoji: '🌱',
    textColor: '#29A35C',
    backgroundColor: '#DEF7E9',
  },
  교회행사: {
    emoji: '⛪',
    textColor: '#112640',
    backgroundColor: '#F7EFDE',
  },
  봉사모집: {
    emoji: '❤️‍🔥',
    textColor: '#C74D4F',
    backgroundColor: '#F7DEDE',
  },
  포인트: {
    textColor: '#C7A24D',
    backgroundColor: '#F7EFDE',
  },
};

export default function CategoryTag({ label, text }: CategoryTagProps) {
  const tagStyle = TAG_STYLE_MAP[label];
  const content = text ?? label;

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-3 py-2 font-bold font-hana-main text-sm leading-none"
      style={{
        color: tagStyle.textColor,
        backgroundColor: tagStyle.backgroundColor,
      }}
    >
      {label === '포인트' ? (
        <Trophy size={12} strokeWidth={1.8} aria-hidden="true" />
      ) : (
        <span aria-hidden="true">{tagStyle.emoji}</span>
      )}
      <span>{content}</span>
    </span>
  );
}
