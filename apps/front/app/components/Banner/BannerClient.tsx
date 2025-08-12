'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Button from '@/app/components/Common/Button';

interface Announcement {
  Text: string;
  Button: {
    Text: string;
    Url: string;
    isExternal: boolean;
  };
  isClosable?: boolean;
}

interface BannerProps {
  announcement: Announcement;
}

const BannerClient = ({ announcement }: BannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    try {
      const isDismissed = localStorage.getItem('announcementDismissed') === 'true';
      setIsVisible(!isDismissed);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error accessing localStorage:', error);
      setIsVisible(true);
    }
  }, []);

  if (!isVisible || pathname === '/ide') return null;

  return (
    <div className=' flex justify-between items-center bg-black dark:bg-orange-500 gap-5 z-50'>
      <div className='flex flex-col sm:flex-row relative items-center justify-center md:flex-row gap-2 md:gap-12 font-medium text-xl bg-gradient-to-r from-[#F2B8EB] to-[#64DDD5] dark:from-transparent dark:to-transparent dark:text-white bg-clip-text text-transparent flex-grow'>
        <span className='text-center md:mt-0 text-body-md'>{announcement?.Text}</span>
        <Button
          text={announcement?.Button?.Text}
          href={announcement?.Button?.Url}
          variant='primary'
          arrowPosition='right'
          className='h-6 dark:bg-white dark:text-black m-3 !text-[16px] py-4 px-6 font-medium'
          isExternal={announcement?.Button?.isExternal}
          overrideTextSize
        />
      </div>

      {announcement?.isClosable && (
        <button
          type='button'
          className='text-white dark:text-black ml-auto absolute right-1 top-4 md:top-4 xl:top-4 md:right-4 xl:right-6'
          aria-label='Close announcement'
          onClick={() => {
            localStorage.setItem('announcementDismissed', 'true');
            setIsVisible(false);
          }}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'>
            <line x1='18' y1='6' x2='6' y2='18' />
            <line x1='6' y1='6' x2='18' y2='18' />
          </svg>
        </button>
      )}
    </div>
  );
};

export default BannerClient;
