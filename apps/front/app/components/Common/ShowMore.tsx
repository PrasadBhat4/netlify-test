'use client';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { twMerge as tm } from 'tailwind-merge';
import Button from '@/app/components/Common/Button';

interface Props {
  buttonText: string;
  clickHandler: () => void;
  isShowing?: boolean;
  className?: string;
}

const ShowMore = ({ buttonText, isShowing = false, clickHandler, className = '' }: Readonly<Props>) => {
  const onClickHandler = () => {
    clickHandler();
  };
  return (
    <div
      className={tm(
        'absolute inset-x-0 bottom-0 justify-center items-end h-[17rem] lg:h-[22.3125rem] xl:h-[19.4375rem] bg-gradient-to-t from-cream-300 from-40% dark:from-neutral-1000',
        `${isShowing ? 'hidden' : 'flex'}`,
        className
      )}
      onClick={onClickHandler}>
      <Button
        text={buttonText}
        variant='secondary'
        href='#'
        isExternal={false}
        className='w-[21.4375rem] md:w-[18.9375rem] lg:w-auto'
        noScroll
      />
    </div>
  );
};

export default ShowMore;
