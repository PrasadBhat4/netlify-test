import StrapiImage from '@/app/components/Common/StrapiImage';
import { MemberType } from '@/app/lib/types';

interface Props {
  data: MemberType;
}

const Member = ({ data }: Readonly<Props>) => (
  <div className='max-w-[10rem] md:max-w-[10.9375rem] lg:max-w-[12.75rem] xl:max-w-[16.125rem]'>
    <StrapiImage
      src={data?.Image?.data?.attributes?.url}
      width={258}
      height={278}
      alt={`Avatar ${data?.Image?.data?.attributes?.alternativeText}`}
      className='hidden xl:block rounded-[1.875rem]'
    />
    <StrapiImage
      src={data?.Image?.data?.attributes?.url}
      width={204}
      height={220}
      alt={`Avatar ${data?.Image?.data?.attributes?.alternativeText}`}
      className='hidden rounded-3xl lg:max-xl:block'
    />
    <StrapiImage
      src={data?.Image?.data?.attributes?.url}
      width={175}
      height={188}
      alt={`Avatar ${data?.Image?.data?.attributes?.alternativeText}`}
      className='hidden md:max-lg:block rounded-[1.25rem]'
    />
    <StrapiImage
      src={data?.Image?.data?.attributes?.url}
      width={164}
      height={177}
      alt={`Avatar ${data?.Image?.data?.attributes?.alternativeText}`}
      className='md:hidden rounded-[1.25rem]'
    />
    <p className='mt-6 font-bold font-heading text-subtitle-sm lg:text-subtitle text-aqua-400 text-wrap'>
      {data?.Name}
    </p>
    <p className='text-body-md-sm lg:text-body-md text-wrap'>{data?.Position}</p>
  </div>
);

export default Member;
