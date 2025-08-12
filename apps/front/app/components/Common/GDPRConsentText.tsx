import Link from 'next/link';
import { cn } from '@/lib/utils';

type GDPRConsentTextProps = {
  type?: 'form' | 'signup';
  className?: string;
};

export const GDPRConsentText: React.FC<GDPRConsentTextProps> = ({ type = 'form', className }) => {
  return (
    <p className={cn('text-body-sm-md mt-8', className)}>
      By {type === 'form' ? 'submitting this form' : 'signing up'} you agree to our{' '}
      <Link
        target='_blank'
        rel='noopener noreferrer'
        className='text-orange-500/80 hover:text-orange-500'
        href='/terms-of-service'>
        Terms of Use
      </Link>{' '}
      and{' '}
      <Link
        target='_blank'
        rel='noopener noreferrer'
        className='text-orange-500/80 hover:text-orange-500'
        href='/privacy-policy'>
        Privacy Policy
      </Link>
    </p>
  );
};
