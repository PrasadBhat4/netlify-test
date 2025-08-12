import Link from 'next/link';
import { twMerge as tm } from 'tailwind-merge';
import ShapeImage from '@/app/components/Common/ShapeImage';
import { Capsule as Capsuletype } from '@/app/lib/types';

const Capsule = ({ data, className = '' }: { data: Capsuletype; className?: string }) => (
  <Link href={data?.Url} target={data?.isExternal ? '_blank' : '_self'}>
    <div className='p-[1.5px] rounded-[5rem]  bg-gradient-to-r from-orange-500 to-pink-500 cursor-pointer'>
      <span
        className={tm(
          'w-fit px-6 py-[10px] flex gap-2 text-body-sm text-neutral-0 bg-neutral-900 rounded-[5rem]',
          className
        )}>
        <ShapeImage shape='rabbit' h={22} w={15} />
        {data.Text}
        <ShapeImage shape='rabbit' h={22} w={15} />
      </span>
    </div>
  </Link>
);

export default Capsule;
