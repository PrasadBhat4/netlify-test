import StrapiImage from '@/app/components/Common/StrapiImage';
import { StrapiImage as StrapiImageType } from '@/app/lib/types';
import { copyFileFromUrl, handleDownloadFile } from '@/app/lib/utils';

export interface BrandCardData {
  id: string;
  Title: string;
  Description: string;
  isDarkMode?: boolean;
  isIcon?: boolean;
  SvgIcon?: StrapiImageType;
  PngIcon?: StrapiImageType;
  Image?: StrapiImageType;
}

const Card = ({ data }: { data: BrandCardData }) => {
  return (
    <div className='mt-6 rounded-xl '>
      <div
        className={`flex items-center gap-4 ${
          data?.isDarkMode ? 'bg-neutral-900' : 'bg-neutral-0'
        } p-10 rounded-[1.5rem] h-52 justify-center`}>
        <StrapiImage
          src={data?.Image?.data?.attributes?.url}
          alt={data?.Image?.data?.attributes?.alternativeText}
          width={data.isIcon ? 84 : 280}
          height={data.isIcon ? 72 : 57}
        />
      </div>

      <div className='mt-10 '>
        {data?.Title && <h2 className='text-heading-sm-sm font-bold font-heading'>{data?.Title}</h2>}
        {data?.Description && <p className='mt-4 text-body-xl-sm  font-[400]'>{data?.Description}</p>}
        <div className='mt-4 flex items-center gap-12'>
          {data?.SvgIcon?.data && (
            <div className='flex items-center gap-2'>
              <span className=' text-body-lg-xs font-bold font-heading mr-2'>SVG</span>
              <div className='flex items-center justify-center gap-3'>
                <svg
                  role='button'
                  aria-label='Copy SVG to clipboard'
                  onClick={() => copyFileFromUrl(data.SvgIcon.data.attributes.url)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      copyFileFromUrl(data.SvgIcon.data.attributes.url);
                    }
                  }}
                  width='22'
                  height='22'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='stroke-orange-500  cursor-pointer'>
                  <path
                    d='M20 8H10C8.89543 8 8 8.89543 8 10V20C8 21.1046 8.89543 22 10 22H20C21.1046 22 22 21.1046 22 20V10C22 8.89543 21.1046 8 20 8Z'
                    stroke='#FF570A'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M4 16C2.9 16 2 15.1 2 14V4C2 2.9 2.9 2 4 2H14C15.1 2 16 2.9 16 4'
                    stroke='#FF570A'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <svg
                  onClick={() => handleDownloadFile(data.SvgIcon.data.attributes.url)}
                  xmlns='http://www.w3.org/2000/svg'
                  width='22'
                  height='22'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='stroke-orange-500  cursor-pointer'>
                  <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                  <polyline points='7 10 12 15 17 10' />
                  <line x1='12' x2='12' y1='15' y2='3' />
                </svg>
              </div>
            </div>
          )}
          {data?.PngIcon?.data && (
            <div className='flex items-center gap-2'>
              <span className=' text-body-lg-xs font-bold font-heading mr-2'>PNG</span>
              <div className=' flex items-center justify-center gap-3'>
                <svg
                  role='button'
                  aria-label='Download PNG'
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      copyFileFromUrl(data.PngIcon.data.attributes.url);
                    }
                  }}
                  onClick={() => copyFileFromUrl(data.PngIcon.data.attributes.url)}
                  width='22'
                  height='22'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='stroke-orange-500  cursor-pointer'>
                  <path
                    d='M20 8H10C8.89543 8 8 8.89543 8 10V20C8 21.1046 8.89543 22 10 22H20C21.1046 22 22 21.1046 22 20V10C22 8.89543 21.1046 8 20 8Z'
                    stroke='#FF570A'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M4 16C2.9 16 2 15.1 2 14V4C2 2.9 2.9 2 4 2H14C15.1 2 16 2.9 16 4'
                    stroke='#FF570A'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <svg
                  onClick={() => handleDownloadFile(data.PngIcon.data.attributes.url)}
                  xmlns='http://www.w3.org/2000/svg'
                  width='22'
                  height='22'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='stroke-orange-500  cursor-pointer'>
                  <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                  <polyline points='7 10 12 15 17 10' />
                  <line x1='12' x2='12' y1='15' y2='3' />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
