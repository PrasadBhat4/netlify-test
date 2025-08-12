import Image from 'next/image';
import StrapiImage from '@/app/components/Common/StrapiImage';
import { StrapiImage as StrapiImageType } from '@/app/lib/types';

export interface LogoLayoutCard {
  id: number;
  Title?: string;
  Description?: string;
  Image?: StrapiImageType;
  Image1?: StrapiImageType;
  Image2?: StrapiImageType;
  Image3?: StrapiImageType;
}

export interface LogoLayoutData {
  Title: string;
  Description: string;
  LogoLayoutCard: LogoLayoutCard[];
}

const LogoGuidelines = ({ data, showCloseIcon = false }: { data: LogoLayoutCard; showCloseIcon?: boolean }) => {
  return (
    <div>
      <div className='mt-10 '>
        {data?.Title && (
          <h2 className='flex text-heading-md-sm font-bold font-heading'>
            {data?.Title}
            {showCloseIcon && <Image src='/images/icons/closeBtn.svg' alt='close icon' height={32} width={32} />}
          </h2>
        )}
        {data?.Description && <p className='mt-4 text-body-xl-sm font-[400]'>{data?.Description}</p>}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 xl:gap-24'>
        {data.Image && (
          <StrapiImage
            src={data.Image.data?.attributes?.url}
            alt={data.Image.data?.attributes?.alternativeText}
            width={500}
            height={500}
            className='w-full h-auto'
          />
        )}
        {data.Image1 && (
          <StrapiImage
            src={data.Image1.data?.attributes?.url}
            alt={data.Image1.data?.attributes?.alternativeText}
            width={500}
            height={500}
            className='w-full h-auto'
          />
        )}
        {data.Image2 && (
          <StrapiImage
            src={data.Image2.data?.attributes?.url}
            alt={data.Image2.data?.attributes?.alternativeText}
            width={500}
            height={500}
            className='w-full h-auto'
          />
        )}
        {data.Image3 && (
          <StrapiImage
            src={data.Image3.data?.attributes?.url}
            alt={data.Image3.data?.attributes?.alternativeText}
            width={500}
            height={500}
            className='w-full h-auto'
          />
        )}
      </div>
    </div>
  );
};

export default LogoGuidelines;
