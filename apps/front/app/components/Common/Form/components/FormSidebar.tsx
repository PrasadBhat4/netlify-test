import { twMerge as tm } from 'tailwind-merge';
import { formatString } from '@/app/lib/utils';
import Bullets from '@/app/components/Common/Bullets';

interface Props {
  title: string;
  titleClassName?: string;
  highlightedTitle?: boolean;
  description: string;
  descriptionClassName?: string;
  listTitle: string;
  bullets: any;
  bulletsClassName?: string;
  className?: string;
}

const FormSidebar = ({
  title,
  titleClassName = '',
  highlightedTitle = false,
  description,
  descriptionClassName = '',
  listTitle,
  bullets,
  bulletsClassName = '',
  className = '',
}: Readonly<Props>) => (
  <div className={tm('w-full max-w-[41.25rem]', className)}>
    {title && (
      <h2
        className={tm('font-bold font-heading text-heading-md-sm lg:text-heading-md', titleClassName)}
        dangerouslySetInnerHTML={{
          __html: formatString(title, 4, title.length, highlightedTitle ? 'color' : 'bold'),
        }}
      />
    )}
    {description && <p className={tm('text-heading-sm-sm md:text-heading-sm', descriptionClassName)}>{description}</p>}
    <div className={tm('flex flex-col mt-14', bulletsClassName)}>
      {listTitle && <h3 className='font-bold text-subtitle text-aqua-500'>{listTitle}</h3>}
      {bullets && <Bullets items={bullets} className='mt-6 space-y-4 font-semibold' />}
    </div>
  </div>
);

export default FormSidebar;
