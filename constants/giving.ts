/**
 * @page: 헌금 문구
 * @description: 헌금 탭 상수
 * @author: typeYu
 * @date: 2026-04-14
 */

export const GIVING_TABS = ['정기 헌금', '연금 연계', '헌금 내역'] as const;

export type GivingTab = (typeof GIVING_TABS)[number];
