'use client';

/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/control-has-associated-label */
import Image from 'next/image';
import { twMerge as tm } from 'tailwind-merge';
import Link from 'next/link';
import { NewsletterField } from '@/app/lib/types';
import Button from '@/app/components/Common/Button';

interface Props {
  data: NewsletterField;
  className?: string;
  inputClassName?: string;
}

const CtaHyperlink = ({ data, className = '' }: Readonly<Props>) => {
  return (
    <div className={tm('flex flex-col w-full lg:w-auto mb-12 lg:mt-0', className)}>
      <Button
        text={data?.Button?.Text}
        variant='primary'
        href={data?.Button?.Url || ''}
        isExternal={data?.Button?.isExternal}
        arrowPosition='right'
        className='w-full lg:w-auto mt-4'
      />
      {data?.Button?.Hyperlink && (
        <Link href={data?.Button?.Hyperlink?.HyperlinkUrl} className='flex gap-2 mt-4 font-semibold text-body-md'>
          <p className='flex justify-center'>
            {data?.Button?.Hyperlink?.Text} {data?.Button?.Hyperlink?.HyperlinkText}{' '}
          </p>
          <Image src='/images/icons/arrow-right-black.svg' width={28} height={28} alt='arrow' className='dark:invert' />
        </Link>
      )}
    </div>
  );
};

export default CtaHyperlink;
