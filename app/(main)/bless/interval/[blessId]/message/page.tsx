'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BackButton from '@/components/ui/cmm/BackButton';
import BibleVerseBox from '../../../_components/bible-verse-box';
import BlessActionButton from '../../../_components/bless-action-button';
import MessageTextarea from '../../../_components/message-textarea';
import { BIBLE_VERSES, getRandomVerse } from '../../../_data/bible-verses';

export default function BlessIntervalMessage() {
  const router = useRouter();
  const { blessId } = useParams<{ blessId: string }>();
  const [message, setMessage] = useState('');
  const [verse, setVerse] = useState(BIBLE_VERSES[0]);

  useEffect(() => {
    setVerse(getRandomVerse());
  }, []);

  const isMessageEmpty = message.trim().length === 0;

  const handleNext = () => {
    if (isMessageEmpty) return;
    router.push('/bless/interval/complete');
  };

  return (
    <div className="relative flex h-full flex-col bg-hana-bless-bg">
      <BackButton to={`/bless/interval/${blessId}`} />
      <div className="flex flex-1 flex-col gap-4 px-4 pt-14 pb-4">
        <BibleVerseBox verse={verse} />
        <MessageTextarea grow value={message} onChange={setMessage} />
        <BlessActionButton disabled={isMessageEmpty} onClick={handleNext}>
          다음 단계로
        </BlessActionButton>
      </div>
    </div>
  );
}
