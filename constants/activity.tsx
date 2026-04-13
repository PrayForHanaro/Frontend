/**
 * @page: 소모임 문구
 * @description: 소모임 목록 상수 따로 뺀 것
 * @author: typeYu
 * @date: 2026-04-13
 */

export const BOARD_TABS = ['전체', '봉사모집', '동행찾기', '교회행사'] as const;

export type BoardTab = (typeof BOARD_TABS)[number];

export type ActivityCategory = Exclude<BoardTab, '전체'>;

export type ActivityItem = {
  category: ActivityCategory;
  title: string;
  location: string;
  schedule: string;
  currentCount: number;
  maxCount: number;
  point: number;
};

export const ACTIVITY_LIST: ActivityItem[] = [
  {
    category: '봉사모집',
    title: '토요 급식 봉사자 모집',
    location: '성동구 ○○교회',
    schedule: '4.12(토) 오전 10시',
    currentCount: 3,
    maxCount: 10,
    point: 50,
  },
  {
    category: '동행찾기',
    title: '성경읽기 21일 챌린지',
    location: '온라인',
    schedule: '4.15(화) ~ 5.5(월)',
    currentCount: 15,
    maxCount: 30,
    point: 30,
  },
  {
    category: '교회행사',
    title: '교회 정원 가꾸기',
    location: '마포구 ○○교회',
    schedule: '4.19(토) 오후 2시',
    currentCount: 5,
    maxCount: 8,
    point: 20,
  },
];
