/**
 * @page: format 함수들을 모아놓은 유틸리티 파일입니다.
 * @description: format 함수들을 모아놓은 유틸리티 파일입니다.
 * @author: 이정수
 * @date: 2026-04-13
 */

//생년월일 포맷 함수 (예시: 1990.01.01)
export function formatBirthDate(value: string) {
  const numbersOnly = value.replace(/\D/g, '').slice(0, 8);

  if (numbersOnly.length <= 4) return numbersOnly;
  if (numbersOnly.length <= 6) {
    return `${numbersOnly.slice(0, 4)}.${numbersOnly.slice(4)}`;
  }
  return `${numbersOnly.slice(0, 4)}.${numbersOnly.slice(4, 6)}.${numbersOnly.slice(6, 8)}`;
}

//전화번호 포맷 함수 (예시: 010-0000-0000)
export function formatPhoneNumber(value: string) {
  const numbersOnly = value.replace(/\D/g, '').slice(0, 11);

  if (numbersOnly.length <= 3) return numbersOnly;
  if (numbersOnly.length <= 7) {
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
  }
  return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
}

//금액 포맷 함수 (예시: 1,000,000)
export function formatCurrency(value: number) {
  return value.toLocaleString('ko-KR');
}
