import { twMerge as tm } from 'tailwind-merge';
import Button from '@/app/components/Common/Button';
import Bullets from '@/app/components/Common/Bullets';
import { StrapiPlans } from '@/app/lib/types';

interface Props {
  data: StrapiPlans;
}

const RenderBullets = ({ data, boxClassBottom }: { data: StrapiPlans; boxClassBottom: string }) => {
  if (!data) return null;
  if ((!data.IncludesTitle || data?.IncludesTitle?.length === 0) && (!data.Bullets || data?.Bullets?.length === 0))
    return null;

  return (
    <div className={`${boxClassBottom}`}>
      <p className='mb-2 font-semibold text-body-md-sm lg:text-body-md'>{data.IncludesTitle}</p>
      <Bullets items={data.Bullets} />
    </div>
  );
};

const Plan = ({ data }: Readonly<Props>) => {
  if (!data) return null;
  if (!data.Title) return null;
  if (!data.Price) return null;

  const baseClass = `relative flex flex-col w-full md:max-lg:flex-row md:w-1/2 lg:w-1/3
  ${data.Recommended && 'mt-16 lg:my-0'}
  `;

  const recommendedPseudoElement = data.Recommended
    ? 'before:content-["Recommended"] before:absolute before:-z-10 before:-top-16 before:inset-x-0 before:px-6 lg:before:px-[1.78125rem] before:pt-4 before:h-[10rem] before:w-full before:md:max-lg:w-[48.2rem] before:bg-orange-pink before:dark:text-neutral-900 before:rounded-[2rem] before:text-body-lg-sm before:md:text-body-lg'
    : '';

  const boxClassTop = `min-h-[23.5rem] min-w-full p-8 rounded-[3rem] ${
    data.Recommended
      ? 'bg-neutral-0 dark:bg-neutral-900 border border-orange-500 md:max-lg:shadow-border md:max-lg:shadow-orange-500'
      : 'border border-cream-600 dark:border-neutral-700'
  }`;
  const boxClassBottom = `-mt-px min-h-[13.5rem] md:max-lg:min-h-[23.5rem] min-w-full p-8 rounded-[3rem] ${
    data.Recommended
      ? 'bg-neutral-0 dark:bg-neutral-900 border border-orange-500 shadow-border shadow-orange-500'
      : 'border border-cream-600 dark:border-neutral-700'
  }`;

  return (
    <div className={tm(baseClass, recommendedPseudoElement)}>
      <div className={`${boxClassTop}`}>
        <p className='font-semibold text-body-xl-sm lg:text-body-xl'>{data.Title}</p>
        <p className='mt-2 min-h-12 text-body-md-sm lg:text-body-md'>{data.Description}</p>
        <p className='mt-8 font-medium font-heading text-heading-xl-sm lg:text-heading-md'>{data.Price}</p>
        {data.Detail ? (
          <p className='mt-2 text-body-md-sm lg:text-body-md text-neutral-600 dark:text-neutral-400'>{data.Detail}</p>
        ) : (
          <div className='mt-2 min-h-12' />
        )}
        {data.Button && (
          <Button
            text={data.Button.Text}
            variant='secondary'
            href={data.Button.Url}
            isExternal={data.Button.isExternal}
            className='mt-8 w-full lg:w-auto'
            arrowPosition='right'
          />
        )}
      </div>
      <RenderBullets data={data} boxClassBottom={boxClassBottom} />
    </div>
  );
};

export default Plan;
