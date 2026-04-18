'use client';

import Header from '@/components/ui/cmm/Header';
import CounselingForm from '@/components/ui/My/CounselingForm';

export default function CounselingPage() {
  return (
    <div className="flex flex-col gap-4">
      <Header content="상담 예약" />

      <CounselingForm />
    </div>
  );
}
