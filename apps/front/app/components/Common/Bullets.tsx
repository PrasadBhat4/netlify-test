import Image from 'next/image';
import { twMerge as tm } from 'tailwind-merge';
import { StrapiBullet } from '@/app/lib/types';

interface Props {
  items: StrapiBullet[];
  className?: string;
}

const Bullets = ({ items, className = '' }: Readonly<Props>) => (
  <ul className={tm('space-y-2', className)}>
    {items?.map((bullet: StrapiBullet) => (
      <li className='flex items-start gap-2 list-none' key={bullet.id}>
        <Image src='/images/icons/check.svg' alt='Arrow right' width={24} height={24} />
        <p className='text-body-md-sm lg:text-body-md'>{bullet.Text}</p>
      </li>
    ))}
  </ul>
);

export default Bullets;
