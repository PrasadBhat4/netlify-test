import { twMerge as tm } from 'tailwind-merge';
import Socials from '@/app/components/Footer/Socials';

interface Props {
  text?: string;
  links: any;
  className?: string;
  iconClassName?: string;
}

const Share = ({ text, links, className = '', iconClassName = '' }: Readonly<Props>) => (
  <div className={tm('w-full', className)}>
    {text && <h3 className='m-0 font-normal uppercase font-body text-body-sm-sm lg:text-body-sm'>{text}</h3>}
    <div
      className={tm(
        'flex gap-x-6 mt-[0.875rem] px-6 py-5',
        'bg-cream-400 dark:bg-neutral-900 rounded-[1.25rem] justify-around',
        iconClassName
      )}>
      <Socials links={links} />
    </div>
  </div>
);

export default Share;
