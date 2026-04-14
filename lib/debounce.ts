/**
 * @page: 검색 시에 사용되는 디바운스 함수입니다.
 * @description: 검색 시에 사용되는 디바운스 함수입니다.
 * any 타입 사용에 대한 리팩토링 필요합니다.
 * @author: 이정수
 * @date: 2026-04-14
 */

export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T, // T는 함수 타입, 매개변수와 반환 타입이 있는 함수
  delay: number,
) {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise((resolve) => {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        const result = fn(...args); // 함수 실행
        resolve(result); // 함수 실행 결과 반환
      }, delay);
    });
  };
}

export function useDebounce<T extends (...args: any[]) => any>(
  fn: T, // T는 함수 타입
  delay: number,
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  const debouncedFn = debounce(fn, delay);
  return debouncedFn;
}
