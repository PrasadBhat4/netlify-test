'use client';

import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';
import Container from '@/app/components/Common/Container';
import Button from '@/app/components/Common/Button';
import ShapeImage from '@/app/components/Common/ShapeImage';
import { StrapiButton, StrapiHero } from '@/app/lib/types';
import VideoHeroComponent from './videoHeroComponent';
import Capsule from '@/app/components/Common/Heroes/Capsule';

interface Props {
  data: StrapiHero;
  variant?: string;
}

const Hero = ({ data, variant }: Readonly<Props>) => {
  const posthog = usePostHog();
  const trackButtonClicks = (eventName: string) => {
    if (posthog) {
      posthog.capture(eventName, {
        variant,
      });
    }
  };
  return (
    <Container className='lg:pb-[10.625rem] mt-[4.5rem] md:mt-16 xl:md:mt-16'>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col items-center w-full max-w-[69rem]'>
          {data?.Capsule && (
            <div className='relative w-fit h-fit pb-8'>
              <ShapeImage
                shape='star'
                h={140}
                w={140}
                className='absolute inset-0 -z-10 -top-16 -left-8 md:-left-16 lg:-left-16'
              />
              <Capsule data={data?.Capsule} />
            </div>
          )}
          <h6 className='font-bold text-balance text-center font-heading text-heading-lg-sm lg:text-heading-lg text-neutral-900 dark:text-neutral-0'>
            {data.Title}
          </h6>
          <p className='text-center max-w-[40.75rem] mt-2 lg:mt-6 text-subtitle lg:text-body-lg text-neutral-900 dark:text-neutral-0'>
            {data.Description}
          </p>
          <div className='flex flex-col gap-x-6 justify-center items-center mt-6 w-full'>
            <div className='flex flex-col gap-4 w-full text-center md:flex-row md:w-auto'>
              {data.Buttons.map((button: StrapiButton, index: number) => (
                <div key={button.id}>
                  <Button
                    text={button.Text}
                    variant={index === 0 ? 'primary' : 'secondary'}
                    href={button.Url}
                    isExternal={button.isExternal}
                    arrowPosition='right'
                    className={index === 0 ? 'w-full md:w-auto' : 'mb-8 w-full md:w-auto md:mb-0'}
                    onClick={() => trackButtonClicks('homepage_CTA_click')}
                  />
                  {button?.Hyperlink && (
                    <div className='flex pt-3 gap-1 items-center justify-center'>
                      <p className='font-semibold '>{button?.Hyperlink?.Text}</p>
                      <Link
                        className='font-semibold underline'
                        href={button?.Hyperlink?.HyperlinkUrl}
                        target={button?.Hyperlink?.isExternal ? '_blank' : '_self'}>
                        {button?.Hyperlink?.HyperlinkText}
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className='flex flex-col gap-4 items-center mt-4 text-center md:mt-6 md:flex-row'>
              {data.Description_1 && (
                <>
                  <p className='font-semibold text-body-lg-sm lg:text-body-lg text-neutral-900 dark:text-neutral-0'>
                    {data.Description_1}
                  </p>
                  {data.Description_2 && (
                    <div className='hidden w-4 h-px md:block md:w-px md:h-4 bg-neutral-900 dark:bg-neutral-0' />
                  )}
                </>
              )}
              {data.Description_2 && (
                <>
                  <p className='text-body-lg-sm lg:text-body-lg text-neutral-900 dark:text-neutral-0'>
                    {data.Description_2}
                  </p>
                  {data.Description_3 && (
                    <div className='hidden w-4 h-px md:block md:w-px md:h-4 bg-neutral-900 dark:bg-neutral-0' />
                  )}
                </>
              )}
              {data.Description_3 && (
                <p className='text-body-lg-sm lg:text-body-lg text-neutral-900 dark:text-neutral-0'>
                  {data.Description_3}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className='relative mt-12'>
          <Suspense fallback={<div>Loading...</div>}>
            <VideoHeroComponent
              srcWebm='/homevideo.webm'
              srcMp4='/homevideo.mp4'
              srcWebmDark='/homevideo-dark.webm'
              srcMp4Dark='/homevideo-dark.mp4'
            />
          </Suspense>

          {data?.Image?.data && !data.LottieLG && (
            <div className='rounded-[1.25rem] w-[90vw] max-w-[518px] md:hidden'>
              <Image
                src={data?.Image?.data?.attributes?.url}
                alt='hero background'
                height={800}
                width={769}
                className='object-cover'
                priority
                sizes='(min-width: 834px) 0vw, 55vw'
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </div>
          )}

          <div className='hidden absolute top-20 -left-44 -z-10 lg:block'>
            <ShapeImage shape='halfmoon-opposite2' h={200} w={180} />
          </div>

          <div className='hidden absolute -right-36 -bottom-40 -z-10 lg:block'>
            <ShapeImage shape='circle-square1' h={400} w={400} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
