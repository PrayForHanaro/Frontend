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
  id: number;
  category: ActivityCategory;
  title: string;
  location: string;
  schedule: string;
  currentCount: number;
  maxCount: number;
  point: number;
  isApplied: boolean;
  isOwner: boolean;
  status: 'RECRUITING' | 'CLOSED' | 'CANCELLED';
};

export const ACTIVITY_LIST: ActivityItem[] = [
  {
    id: 1,
    category: '봉사모집',
    title: '토요 급식 봉사자 모집',
    location: '성동구 ○○교회',
    schedule: '4.12(토) 오전 10시',
    currentCount: 3,
    maxCount: 10,
    point: 50,
    isApplied: true,
    isOwner: false,
    status: 'RECRUITING',
  },
  {
    id: 2,
    category: '동행찾기',
    title: '봄꽃 구경 겸 나들이 가요^^',
    location: '종로구 ○○공원',
    schedule: '4월 둘째 주',
    currentCount: 15,
    maxCount: 30,
    point: 30,
    isApplied: false,
    isOwner: false,
    status: 'RECRUITING',
  },
  {
    id: 3,
    category: '교회행사',
    title: '교회 정원 가꾸기',
    location: '마포구 ○○교회',
    schedule: '4.19(토) 오후 2시',
    currentCount: 5,
    maxCount: 8,
    point: 20,
    isApplied: true,
    isOwner: false,
    status: 'RECRUITING',
  },
];

export const MY_ACTIVITY_LIST: ActivityItem[] = [
  {
    id: 1,
    category: '봉사모집',
    title: '토요 급식 봉사자 모집',
    location: '성동구 ○○교회',
    schedule: '4.12(토) 오전 10시',
    currentCount: 3,
    maxCount: 10,
    point: 50,
    isApplied: true,
    isOwner: true,
    status: 'RECRUITING',
  },
  {
    id: 2,
    category: '동행찾기',
    title: '봄꽃 구경 겸 나들이 가요^^',
    location: '종로구 ○○공원',
    schedule: '4월 둘째 주',
    currentCount: 15,
    maxCount: 30,
    point: 30,
    isApplied: true,
    isOwner: true,
    status: 'RECRUITING',
  },
  {
    id: 3,
    category: '교회행사',
    title: '교회 정원 가꾸기',
    location: '마포구 ○○교회',
    schedule: '4.19(토) 오후 2시',
    currentCount: 5,
    maxCount: 8,
    point: 20,
    isApplied: true,
    isOwner: true,
    status: 'CANCELLED',
  },
];
