import Link from 'next/link';
import Image from 'next/image';
import Button from '@/app/components/Common/Button';
import StrapiImage from '@/app/components/Common/StrapiImage';
import Markdown from '@/app/components/Common/Markdown';
import { StrapiSuccess } from '@/app/lib/types';

interface Props {
  success: StrapiSuccess;
}

const AVAILABLE_ICONS = ['x', 'linkedin', 'discord', 'reddit'];

const DEFAULT_SUCCESS: StrapiSuccess = {
  id: 'non-existing-id-for-success-component',
  Image: null,
  Title: 'Hooray!',
  Description: 'Your message has been sent. We’ll get back to you shortly.',
  Button: {
    id: 'non-existing-id-for-success-component-button',
    Text: 'Back to homepage',
    Url: '/',
    isExternal: false,
    Image: null,
  },
  SocialsTitle: 'In the meantime, follow along:',
  Socials: [
    {
      id: 'non-existing-id-for-success-component-socials-x',
      Text: 'X',
      Url: 'https://x.com/coderabbitai',
      isExternal: true,
      Image: null,
    },
    {
      id: 'non-existing-id-for-success-component-socials-linkedin',
      Text: 'LinkedIn',
      Url: 'https://www.linkedin.com/company/coderabbitai',
      isExternal: true,
      Image: null,
    },
    {
      id: 'non-existing-id-for-success-component-socials-discord',
      Text: 'Discord',
      Url: 'https://discord.gg/coderabbit',
      isExternal: true,
      Image: null,
    },
  ],
};

const Success = ({ success }: Readonly<Props>) => {
  const safeSucess = success ?? DEFAULT_SUCCESS;
  return (
    <div className='flex flex-col items-center justify-center w-full h-full bg-neutral-0 dark:bg-neutral-950 md:px-12 md:py-[6.5rem]'>
      {safeSucess?.Image?.data && (
        <StrapiImage
          src={safeSucess?.Image?.data?.attributes?.url}
          alt='success icon'
          width={80}
          height={80}
          className='object-cover'
        />
      )}

      <p className='mt-4 font-bold text-heading-md-sm lg:text-heading-md'>{safeSucess?.Title}</p>

      <Markdown className='max-w-[15rem] mt-4 text-body-md-sm lg:text-body-md' text={safeSucess?.Description} />
      {safeSucess?.Button && safeSucess?.Button?.Url && (
        <Button
          text={safeSucess?.Button?.Text}
          variant='secondary'
          href={safeSucess?.Button?.Url}
          arrowPosition='left'
          arrowRotation='left'
          className='max-w-[17.6875rem] mt-16'
        />
      )}
      <p className='mt-12 text-body-md-sm lg:text-body-md'>{safeSucess?.SocialsTitle}</p>
      {safeSucess?.Socials && safeSucess?.Socials.length > 0 && (
        <div className='flex mt-6 gap-x-6'>
          {safeSucess?.Socials.map(social => {
            const isAnExistingIcon = AVAILABLE_ICONS.includes(social?.Text?.toLowerCase());
            const hasImage = social?.Image?.data?.attributes?.url?.length > 0;
            return (
              <Link key={social?.id} href={`${social?.Url ?? '#'}`} target='_blank'>
                {isAnExistingIcon || hasImage ? (
                  <Image
                    src={
                      isAnExistingIcon
                        ? `/images/icons/${social?.Text?.toLowerCase()}-white.svg`
                        : social?.Image?.data?.attributes?.url
                    }
                    alt={`${social?.Text} icon`}
                    height={32}
                    width={32}
                    className={isAnExistingIcon ? 'invert dark:invert-0' : ''}
                  />
                ) : (
                  <span>{social?.Text}</span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Success;
