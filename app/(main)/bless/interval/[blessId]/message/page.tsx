'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BackButton from '@/components/ui/cmm/BackButton';
import Nav from '@/components/ui/cmm/Nav';
import { createMessage } from '@/lib/api/bless';
import BibleVerseBox from '../../../_components/bible-verse-box';
import BlessActionButton from '../../../_components/bless-action-button';
import MessageTextarea from '../../../_components/message-textarea';
import { BIBLE_VERSES, getRandomVerse } from '../../../_data/bible-verses';

export default function BlessIntervalMessage() {
  const router = useRouter();
  const { blessId } = useParams<{ blessId: string }>();
  const [message, setMessage] = useState('');
  const [verse, setVerse] = useState(BIBLE_VERSES[0]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setVerse(getRandomVerse());
  }, []);

  const isMessageEmpty = message.trim().length === 0;

  const handleNext = async () => {
    if (isMessageEmpty || submitting) return;
    setSubmitting(true);
    try {
      await createMessage(blessId, message.trim());
      router.push('/bless/interval/complete');
    } catch {
      alert('메시지 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
      setSubmitting(false);
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="scrollbar-hide h-full overflow-y-auto bg-hana-bless-bg px-4 pb-24">
        <BackButton to={`/bless/interval/${blessId}`} />
        <div className="flex flex-col gap-4 pt-20">
          <BibleVerseBox verse={verse} />
          <MessageTextarea
            value={message}
            onChange={setMessage}
            className="h-[400px]"
          />
          <BlessActionButton
            disabled={isMessageEmpty || submitting}
            onClick={handleNext}
          >
            다음 단계로
          </BlessActionButton>
        </div>
      </div>
      <Nav />
    </div>
  );
}
