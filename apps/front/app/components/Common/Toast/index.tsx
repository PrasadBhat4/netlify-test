'use client';

import { toast as hotToast } from 'react-hot-toast';
import Image from 'next/image';

type ToastType = 'success' | 'error';

const showCustomToast = (message: string, type: ToastType = 'success') => {
  return hotToast.custom(
    t => (
      <div
        className={`${
          t.visible ? 'animate-enter 1s ease' : 'animate-leave 1s ease forwards'
        } bg-cream-300 dark:bg-neutral-900 dark:text-neutral-0 text-neutral-900 px-6 py-3 rounded-[1.3rem] flex items-center gap-3
        shadow-[2px_2px_0_rgba(211,114,199,1)] dark:shadow-[2px_2px_0_#FF5722]
        border border-cream-600 dark:border-neutral-900 border-b-0 border-r-0
        `}>
        <div className='bg-teal-200 rounded-full p-0.5 flex items-center justify-center'>
          {type === 'error' ? (
            <Image
              src='/images/icons/close-white.svg'
              alt='Close'
              width={20}
              height={20}
              className='bg-orange-600 rounded-xl p-1'
            />
          ) : (
            <Image src='/images/icons/check.svg' alt='Check' width={20} height={20} />
          )}
        </div>
        <span className='font-medium'>{message}</span>
      </div>
    ),
    {
      duration: 3000,
      position: 'bottom-right',
    }
  );
};

export const toast = {
  ...hotToast,
  success: (message: string) => showCustomToast(message, 'success'),
  error: (message: string) => showCustomToast(message, 'error'),
};
