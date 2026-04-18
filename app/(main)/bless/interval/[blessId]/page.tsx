import { Heart } from 'lucide-react';
import BackButton from '@/components/ui/cmm/BackButton';
import { getMessages, getTarget } from '@/lib/api/bless';
import DetailButtons from '../../_components/detail-buttons';
import MessageHistoryItem from '../../_components/message-history-item';

const TOTAL_PRAYER_DAYS = 200;

export default async function BlessInterval({
  params,
}: {
  params: Promise<{ blessId: string }>;
}) {
  const { blessId } = await params;
  const target = await getTarget(blessId);

  if (!target) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <p className="font-hana-regular text-hana-gray-500">
          대상자를 찾을 수 없습니다.
        </p>
      </div>
    );
  }

  const messages = await getMessages(blessId);

  return (
    <div className="relative h-full w-full">
      <div className="scrollbar-hide relative flex h-full flex-col overflow-y-auto bg-hana-bless-bg pb-[70px]">
        <BackButton to="/bless/interval" />

        <div className="mt-4 mb-4 flex justify-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-hana-bless-progress">
            <Heart className="size-7 fill-white text-white" />
          </div>
        </div>

        <div className="mx-4 rounded-2xl border border-gray-200 bg-hana-bless-bg px-6 py-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <p className="font-hana-medium text-[#568F6E] text-sm">
              To. {target.name}
            </p>
            <h1 className="mt-1 font-hana-bold text-2xl text-[#568F6E]">
              {target.daysOfPrayer}일째
            </h1>
            <p className="font-hana-regular text-[#568F6E] text-sm">
              기도하고 있어요
            </p>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-hana-bless-progress"
              style={{
                width: `${Math.min((target.daysOfPrayer / TOTAL_PRAYER_DAYS) * 100, 100)}%`,
              }}
            />
          </div>

          <div className="mt-2 flex justify-between">
            <div>
              <p className="font-hana-regular text-[10px] text-hana-gray-400">
                달성률
              </p>
              <p className="font-hana-medium text-gray-700 text-xs">
                {target.totalAmount.toLocaleString()}원
              </p>
            </div>
            <div className="text-right">
              <p className="font-hana-regular text-[10px] text-hana-gray-400">
                매일 드리는 마음
              </p>
              <p className="font-hana-medium text-gray-700 text-xs">
                {target.dailyAmount.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 pt-4">
          <DetailButtons blessId={blessId} />
        </div>

        <div className="flex flex-1 flex-col gap-3 px-4 pt-4">
          {messages.map((msg, idx) => (
            <MessageHistoryItem
              key={msg.id}
              message={msg}
              dayNumber={target.daysOfPrayer - idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
