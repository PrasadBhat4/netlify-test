import StrapiImage from '@/app/components/Common/StrapiImage';
import { StrapiImage as StrapiImageType } from '@/app/lib/types';

export interface ColorPaletteData {
  Color: string;
  ColorName: string;
  Hex: string;
  Rgb: string;
  Cmyk: string;
  id: string;
  Title: string;
  Description: string;
  isDarkMode?: boolean;
  Image?: StrapiImageType;
}

const ColorPalette = ({ data }: { data: ColorPaletteData }) => {
  return (
    <div className={`flex flex-col space-y-4 ${data?.Title ? '' : 'mt-12'}`}>
      {data?.Title && <p className='font-semibold text-body-xl min-w-max'>{data?.Title}</p>}

      {data?.Image && (
        <div className='w-full h-32 rounded-lg overflow-hidden'>
          <StrapiImage
            src={data?.Image?.data?.attributes?.url}
            alt={data?.Image?.data?.attributes?.alternativeText}
            width={300}
            height={128}
            className='w-full h-full object-contain'
          />
        </div>
      )}
      <div className='text-white space-y-1'>
        {data?.Color && <p className='text-body-lg-xs font-semibold dark:text-white text-neutral-900'>{data?.Color}</p>}
        {data?.ColorName && (
          <p className='text-body-md-sm font-normal dark:text-white text-neutral-900'>{data?.ColorName}</p>
        )}
        {data?.Hex && <p className='text-body-md-sm font-normal text-neutral-400'>{data?.Hex}</p>}
        {data?.Rgb && <p className='text-body-md-sm font-normal text-neutral-400'>{data?.Rgb}</p>}
        {data?.Cmyk && <p className='text-body-md-sm font-normal text-neutral-400'>{data?.Cmyk}</p>}
      </div>
    </div>
  );
};

export default ColorPalette;
