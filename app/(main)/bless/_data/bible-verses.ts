import type { BibleVerse } from '../_types';

export const BIBLE_VERSES: BibleVerse[] = [
  {
    text: '네 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라',
    reference: '잠언 3:5',
  },
  {
    text: '여호와는 나의 목자시니 내게 부족함이 없으리로다',
    reference: '시편 23:1',
  },
  {
    text: '항상 기뻐하라 쉬지 말고 기도하라 범사에 감사하라',
    reference: '데살로니가전서 5:16-18',
  },
  {
    text: '너희가 내 이름으로 무엇이든지 내게 구하면 내가 행하리라',
    reference: '요한복음 14:14',
  },
  {
    text: '두려워하지 말라 내가 너와 함께 함이라 놀라지 말라 나는 네 하나님이 됨이라',
    reference: '이사야 41:10',
  },
  {
    text: '여호와를 기뻐하라 그가 네 마음의 소원을 이루어 주시리로다',
    reference: '시편 37:4',
  },
  {
    text: '내가 진실로 너희에게 이르노니 너희가 기도할 때에 무엇이든지 믿고 구하는 것은 다 받으리라',
    reference: '마가복음 11:24',
  },
  {
    text: '강하고 담대하라 두려워하지 말며 놀라지 말라 네가 어디로 가든지 네 하나님 여호와가 너와 함께 하느니라',
    reference: '여호수아 1:9',
  },
];

export function getRandomVerse(): BibleVerse {
  const index = Math.floor(Math.random() * BIBLE_VERSES.length);
  return BIBLE_VERSES[index];
}
