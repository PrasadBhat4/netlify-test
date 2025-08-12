import { twMerge as tm } from 'tailwind-merge';
import Card from '@/app/components/Home/Features/Cards/Base';
import StrapiImage from '@/app/components/Common/StrapiImage';
import Bullets from '@/app/components/Common/Bullets';

interface Props {
  data: any;
  index: number;
}

const Medium = ({ data = {}, index }: Readonly<Props>) => (
  <Card
    className={tm(
      `
      flex flex-col gap-8 w-full lg:max-w-[46.875rem] xl:max-w-[65.875rem]
      min-h-full
    `,
      `${index === 3 ? 'md:flex-row-reverse' : 'md:flex-row'}`
    )}>
    <div className='space-y-4'>
      <h2 className='font-bold font-heading text-heading-sm-sm lg:text-subtitle'>{data.Title}</h2>
      <p className='text-body-md-sm lg:text-body-md'>{data.Description} </p>
      <Bullets items={data.Bullets} className='mt-4 space-y-3' />
    </div>
    <StrapiImage
      src={data?.ImageXL?.data?.attributes?.url}
      alt={data?.ImageXL?.data?.attributes?.alternativeText ?? ''}
      width={694}
      height={368}
      className='hidden xl:block rounded-[1.25rem]'
    />
    <StrapiImage
      src={data?.ImageLG?.data?.attributes?.url}
      alt={data?.ImageLG?.data?.attributes?.alternativeText ?? ''}
      width={390}
      height={368}
      className='hidden lg:max-xl:block rounded-[1.25rem]'
    />
    <StrapiImage
      src={data?.ImageMD?.data?.attributes?.url}
      alt={data?.ImageMD?.data?.attributes?.alternativeText ?? ''}
      width={410}
      height={368}
      className='hidden md:max-lg:block rounded-[1.25rem]'
    />
    <StrapiImage
      src={data?.ImageSM?.data?.attributes?.url}
      alt={data?.ImageSM?.data?.attributes?.alternativeText ?? ''}
      width={410}
      height={368}
      className='block w-full max-h-[23rem] !object-contain md:hidden rounded-[1.25rem]'
    />
  </Card>
);

export default Medium;
