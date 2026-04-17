import { Suspense } from 'react';
import SetUpClient from './set-up-client';

/**
 * @page: SetUpPage
 * @description: 교회 승인 완료 페이지, Suspense로 클라이언트 컴포넌트 감싸기
 * @author: typeYu
 * @date: 2026-04-17
 */

export default function SetUpPage() {
  return (
    <Suspense fallback={null}>
      <SetUpClient />
    </Suspense>
  );
}
