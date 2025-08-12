'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';
import Container from '@/app/components/Common/Container';
import Button from '@/app/components/Common/Button';
import ShapeImage from '@/app/components/Common/ShapeImage';
import StrapiImage from '@/app/components/Common/StrapiImage';
import { StrapiButton, StrapiVsExtensionHero } from '@/app/lib/types';
import Capsule from '@/app/components/Common/Heroes/Capsule';
import VideoHeroComponent from '@/app/components/Extension/Hero/VideoHeroComponent';
import VideoHeroComponentHome from '@/app/components/Common/Heroes/Home/videoHeroComponent';
import Tooltip from '@/app/components/Common/Tooltip';

interface Props {
  data: StrapiVsExtensionHero;
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
    <Container className='lg:pb-[3.625rem] mt-20 md:mt-16'>
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
            {data?.Title}
          </h6>
          <p className='text-center max-w-[40.75rem] mt-2 lg:mt-6 text-subtitle lg:text-body-lg text-neutral-900 dark:text-neutral-0'>
            {data?.Description}
          </p>
          <div className='flex flex-col gap-x-6 justify-center items-center mt-6 w-full'>
            <div className='flex flex-col gap-2 w-full md:flex-row md:w-auto'>
              {data?.Buttons?.map((button: StrapiButton, index: number) => (
                <React.Fragment key={button.id}>
                  {index === 0 && (
                    <div className='flex flex-col items-center justify-center'>
                      <Button
                        text={button?.Text}
                        variant='primary'
                        href={button?.Url}
                        isExternal={button?.isExternal}
                        arrowPosition='right'
                        className='w-full md:w-auto'
                        onClick={() => trackButtonClicks('user_click')}
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
                  )}
                  {index === 1 && (
                    <div className='flex flex-col justify-center items-center'>
                      <Button
                        text={button?.Text}
                        variant='secondary'
                        href={button?.Url}
                        isExternal={button?.isExternal}
                        className='mb-8 w-full md:w-auto md:mb-0'
                        onClick={() => trackButtonClicks('user_click')}
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
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className='flex  gap-2 mt-8 justify-center items-center'>
              {data?.LeftContentText && (
                <b className='flex text-body-sm-sm text-center text-neutral-900 dark:text-neutral-0 gap-3.5 '>
                  {data?.LeftContentText}
                  <div className=' hidden w-4 h-px md:block md:w-px md:h-4 bg-neutral-900 dark:bg-neutral-0 m-auto' />
                </b>
              )}
              {data?.MiddleContentText && (
                <p className='text-body-sm-sm text-center text-neutral-900 dark:text-neutral-0 ml-1'>
                  {data?.MiddleContentText}
                </p>
              )}
              {data?.CenterImage_Icon?.data && (
                <StrapiImage
                  src={data?.CenterImage_Icon?.data?.attributes?.url}
                  width={17}
                  height={17}
                  alt={data?.Image?.data?.attributes?.alternativeText || 'extension icon'}
                />
              )}
              {data?.RightContentText && (
                <div className='flex items-center gap-4'>
                  {data.RightContentText.map((item, index) => (
                    <React.Fragment key={`${item.Text}-${item.Logo?.data?.attributes?.url}`}>
                      <Link
                        href={item?.LogoHref}
                        target={item?.isExternal ? '_blank' : '_self'}
                        onClick={() => trackButtonClicks('user_click')}>
                        <div className='flex relative items-center justify-center '>
                          {item.Logo?.data && (
                            <StrapiImage
                              src={item.Logo.data.attributes.url}
                              width={46}
                              height={46}
                              alt={item.Logo.data.attributes.alternativeText || 'IDE logo'}
                              className={`${
                                index === 0 ? '' : 'dark:invert'
                              } object-contain object-center m-auto cursor-pointer peer`}
                            />
                          )}
                          <Tooltip text={item.Text} className='w-fit absolute top-7 ml-[-40px]' />
                        </div>
                      </Link>

                      {index < data.RightContentText.length - 1 && (
                        <div className='hidden w-4 h-px md:block md:w-px md:h-4 bg-neutral-900 dark:bg-neutral-0 m-auto' />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
            <div className='flex flex-col gap-4 items-center mt-4 text-center md:mt-6 md:flex-row'>
              {data?.Description_1 && (
                <>
                  <p className='font-semibold text-body-lg-sm lg:text-body-lg text-neutral-900 dark:text-neutral-0'>
                    {data?.Description_1}
                  </p>
                  {data?.Description_2 && (
                    <div className='hidden w-4 h-px md:block md:w-px md:h-4 bg-neutral-900 dark:bg-neutral-0' />
                  )}
                </>
              )}
              {data?.Description_2 && (
                <>
                  <p className='text-body-lg-sm lg:text-body-lg text-neutral-900 dark:text-neutral-0'>
                    {data?.Description_2}
                  </p>
                  {data?.Description_3 && (
                    <div className='hidden w-4 h-px md:block md:w-px md:h-4 bg-neutral-900 dark:bg-neutral-0' />
                  )}
                </>
              )}
              {data?.Description_3 && (
                <p className='text-body-lg-sm lg:text-body-lg text-neutral-900 dark:text-neutral-0'>
                  {data?.Description_3}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className='relative mt-12'>
          <Suspense fallback={<div>Loading...</div>}>
            {data?.VideoOrGif?.data || data?.VideoOrGifDark?.data ? (
              <VideoHeroComponent
                srcMp4={data?.VideoOrGif?.data?.attributes?.url}
                srcMp4Dark={data?.VideoOrGifDark?.data?.attributes?.url}
              />
            ) : (
              <VideoHeroComponentHome
                srcWebm='/homevideo.webm'
                srcMp4='/homevideo.mp4'
                srcWebmDark='/homevideo-dark.webm'
                srcMp4Dark='/homevideo-dark.mp4'
              />
            )}
          </Suspense>

          {data?.Image?.data && (
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

          <div className='hidden absolute -top-30 -right-[8.3rem] -z-10 lg:block'>
            <ShapeImage shape='rabbit-xl' h={200} w={180} />
          </div>

          <div className='hidden absolute -left-36 -bottom-20 -z-10 lg:block'>
            <ShapeImage shape='notes' h={400} w={400} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
