import { twMerge as tm } from 'tailwind-merge';
import Card from '@/app/components/Home/Features/Cards/Base';
import StrapiImage from '@/app/components/Common/StrapiImage';
import Bullets from '@/app/components/Common/Bullets';
import Button from '@/app/components/Common/Button';

interface Props {
  data: any;
  index: number;
}

const Big = ({ data = {}, index }: Readonly<Props>) => (
  <Card
    className={tm(
      `flex flex-col gap-12 sm:gap-8 md:gap-10 lg:gap-12 w-full min-h-full`,
      `${index === 6 ? 'md:flex-row-reverse' : 'md:flex-row'}`
    )}>
    <div className='w-full space-y-4'>
      <h2
        className={`${
          index === 6 ? 'lg:max-w-[34.2rem]' : ''
        } font-bold font-heading text-heading-sm-sm lg:text-heading-md`}>
        {data.Title}
      </h2>
      <p className='text-body-md-sm lg:text-body-md'>{data.Description} </p>
      <Bullets items={data.Bullets} className='mt-4 space-y-3' />
      {data?.Button && (
        <Button
          text={data.Button.Text}
          variant='primary'
          href={data.Button.Url}
          isExternal={data.Button.isExternal}
          arrowPosition='right'
          className='w-full md:w-auto !mt-8 h-14 !text-[14px]'
        />
      )}
    </div>
    <StrapiImage
      src={data?.ImageXL?.data?.attributes?.url}
      alt={data?.ImageXL?.data?.attributes?.alternativeText ?? ''}
      width={580}
      height={368}
      className='hidden xl:block rounded-[1.25rem] max-h-[368px]'
    />
    <StrapiImage
      src={data?.ImageLG?.data?.attributes?.url}
      alt={data?.ImageLG?.data?.attributes?.alternativeText ?? ''}
      width={index === 6 ? 413 : 580}
      height={368}
      className='hidden lg:max-xl:block rounded-[1.25rem] max-h-[368px]'
    />
    <StrapiImage
      src={data?.ImageMD?.data?.attributes?.url}
      alt={data?.ImageMD?.data?.attributes?.alternativeText ?? ''}
      width={index === 6 ? 413 : 375}
      height={368}
      className='hidden md:max-lg:block rounded-[1.25rem] max-h-[368px] max-w-[50%]'
    />
    <StrapiImage
      src={data?.ImageMD?.data?.attributes?.url}
      alt={data?.ImageMD?.data?.attributes?.alternativeText ?? ''}
      width={295}
      height={368}
      className='block w-full !object-contain md:hidden rounded-[1.25rem] max-h-[368px]'
    />
  </Card>
);

export default Big;
