import Nav from '@/components/ui/cmm/Nav';
import { getTargets } from '@/lib/api/bless';
import AddTargetButton from '../_components/add-target-button';
import BlessHeader from '../_components/bless-header';
import TargetListItem from '../_components/target-list-item';

const USER_NAME = '순범';

export default async function BlessIntervalList() {
  const targets = await getTargets();

  return (
    <div className="relative h-full w-full">
      <div className="scrollbar-hide flex h-full flex-col overflow-y-auto bg-hana-bless-bg pb-[70px]">
        <BlessHeader
          greeting={`안녕하세요, ${USER_NAME}님.`}
          title="적금 가입으로"
          subtitle="사랑하는 사람에게 기도와 마음을 전해보세요."
        />

        <div className="mx-5 h-1 rounded-full bg-hana-bless-progress" />

        <p className="px-5 pt-5 pb-2 font-hana-medium text-gray-900 text-sm">
          {USER_NAME}님이 기도드리며 적금하는 사람들이에요
        </p>

        <div className="space-y-3 px-5 pt-2">
          {targets.length > 0 ? (
            targets.map((target) => (
              <TargetListItem key={target.id} target={target} />
            ))
          ) : (
            <div className="rounded-2xl bg-white py-10 text-center shadow-sm">
              <p className="text-hana-gray-400 text-sm">
                아직 기도 중인 분이 없어요.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center py-4">
          <AddTargetButton />
        </div>
      </div>
      <Nav />
    </div>
  );
}
