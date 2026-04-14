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
      <div className="flex h-full flex-col overflow-y-auto bg-hana-bless-bg pb-[70px]">
        <BlessHeader
          greeting={`안녕하세요, ${USER_NAME}님.`}
          title="적금 가입으로"
          subtitle="사랑하는 사람에게 기도와 마음을 전해보세요."
        />

        <div className="mx-5 h-1 rounded-full bg-hana-bless-progress" />

        <p className="px-5 pt-5 pb-2 font-hana-medium text-gray-900 text-sm">
          {USER_NAME}님이 기도드리며 적금하는 사람들이에요
        </p>

        <div className="flex flex-col">
          {targets.map((target) => (
            <TargetListItem key={target.id} target={target} />
          ))}
        </div>

        <div className="flex justify-center py-4">
          <AddTargetButton />
        </div>
      </div>
      <Nav />
    </div>
  );
}
