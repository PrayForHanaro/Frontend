'use client';

import Header from '@/components/ui/cmm/Header';
import Nav from '@/components/ui/cmm/Nav';
import CounselingForm from '@/components/ui/My/CounselingForm';

export default function CounselingPage() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="scrollbar-hide h-full overflow-y-auto px-4 pb-24">
        <div className="flex flex-col gap-4">
          <Header content="상담 예약" />

          <CounselingForm />
        </div>
      </div>
      <Nav />
    </div>
  );
}
