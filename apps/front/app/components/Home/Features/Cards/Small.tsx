/* eslint-disable react/jsx-no-useless-fragment */
import { twMerge as tm } from 'tailwind-merge';
import Card from '@/app/components/Home/Features/Cards/Base';
import StrapiImage from '@/app/components/Common/StrapiImage';
import Bullets from '@/app/components/Common/Bullets';

interface Props {
  data: any;
  index: number;
}

const Small = ({ data = {}, index }: Readonly<Props>) => (
  <Card
    className={tm(
      `flex gap-6 flex-col md:max-lg:flex-row w-full min-h-full bg-neutral-0 dark:bg-neutral-900 `,
      `
        ${index === 1 ? 'lg:flex-col-reverse order-first lg:order-none' : ''}
        ${index === 2 ? 'lg:flex-col' : ''}
        ${index === 5 ? 'lg:flex-col-reverse' : ''}
      `
    )}
    isBlack>
    <div className={`${index === 1 ? 'mb-auto' : ''}`}>
      <h2 className='font-bold text-neutral-900 dark:text-neutral-0 font-heading text-subtitle max-w-[12.5rem]'>
        {data.Title}
      </h2>
      <p className='mt-4 text-neutral-900 dark:text-neutral-0 text-body-md-sm lg:text-body-md'>{data.Description} </p>
      <Bullets items={data.Bullets} className='mt-4 space-y-3 text-neutral-900 dark:text-neutral-0' />
    </div>

    {index === 1 ? (
      <div className='min-w-fit max-w-[12.25rem]'>
        <StrapiImage
          src={data?.ImageXL?.data?.attributes?.url}
          alt={data?.ImageXL?.data?.attributes?.alternativeText ?? ''}
          width={172}
          height={125}
          className='hidden xl:block rounded-[1.25rem]'
        />
        <StrapiImage
          src={data?.ImageLG?.data?.attributes?.url}
          alt={data?.ImageLG?.data?.attributes?.alternativeText ?? ''}
          width={172}
          height={125}
          className='hidden lg:max-xl:block rounded-[1.25rem]'
        />
        <StrapiImage
          src={data?.ImageMD?.data?.attributes?.url}
          alt={data?.ImageMD?.data?.attributes?.alternativeText ?? ''}
          width={254}
          height={186}
          className='hidden md:max-lg:block rounded-[1.25rem]'
        />
        <StrapiImage
          src={data?.ImageSM?.data?.attributes?.url}
          alt={data?.ImageSM?.data?.attributes?.alternativeText ?? ''}
          width={250}
          height={183}
          className='max-h-[23rem] !object-contain md:hidden rounded-[1.25rem]'
        />
      </div>
    ) : (
      <></>
    )}
    {index === 2 ? (
      <div className='relative lg:-left-12 lg:-bottom-12 lg:-mt-12 min-w-[19.875rem] min-h-[15.5rem]'>
        <StrapiImage
          src={data?.ImageXL?.data?.attributes?.url}
          alt={data?.ImageXL?.data?.attributes?.alternativeText ?? ''}
          width={318}
          height={248}
          className='hidden xl:block rounded-[1.25rem]'
        />
        <StrapiImage
          src={data?.ImageLG?.data?.attributes?.url}
          alt={data?.ImageLG?.data?.attributes?.alternativeText ?? ''}
          width={318}
          height={248}
          className='hidden lg:max-xl:block rounded-[1.25rem]'
        />
        <StrapiImage
          src={data?.ImageMD?.data?.attributes?.url}
          alt={data?.ImageMD?.data?.attributes?.alternativeText ?? ''}
          width={318}
          height={248}
          className='hidden md:max-lg:block rounded-[1.25rem]'
        />
        <StrapiImage
          src={data?.ImageSM?.data?.attributes?.url}
          alt={data?.ImageSM?.data?.attributes?.alternativeText ?? ''}
          width={318}
          height={248}
          className='block md:hidden rounded-[1.25rem]'
        />
      </div>
    ) : (
      <></>
    )}
    {index === 5 ? (
      <div className='min-w-fit max-w-[12.25rem]'>
        <StrapiImage
          src={data?.ImageXL?.data?.attributes?.url}
          alt={data?.ImageXL?.data?.attributes?.alternativeText ?? ''}
          width={125}
          height={125}
          className='hidden xl:block rounded-[1.25rem]'
        />
        <StrapiImage
          src={data?.ImageLG?.data?.attributes?.url}
          alt={data?.ImageLG?.data?.attributes?.alternativeText ?? ''}
          width={125}
          height={125}
          className='hidden lg:max-xl:block rounded-[1.25rem]'
        />
        <StrapiImage
          src={data?.ImageMD?.data?.attributes?.url}
          alt={data?.ImageMD?.data?.attributes?.alternativeText ?? ''}
          width={196}
          height={196}
          className='hidden md:max-lg:block rounded-[1.25rem]'
        />
        <StrapiImage
          src={data?.ImageSM?.data?.attributes?.url}
          alt={data?.ImageSM?.data?.attributes?.alternativeText ?? ''}
          width={196}
          height={196}
          className='max-h-[23rem] !object-contain md:hidden rounded-[1.25rem]'
        />
      </div>
    ) : (
      <></>
    )}
  </Card>
);

export default Small;
