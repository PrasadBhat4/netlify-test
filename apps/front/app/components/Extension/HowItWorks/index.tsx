'use client';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import Image from 'next/image';
import Container from '@/app/components/Common/Container';
import InnerContainer from '@/app/components/Common/InnerContainer';
import StrapiImage from '@/app/components/Common/StrapiImage';
import Button from '@/app/components/Common/Button';
import ShapeImage from '@/app/components/Common/ShapeImage';

interface Props {
  data: any;
}

const HowItWorks = ({ data = {} }: Readonly<Props>) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = data?.Steps || [];

  if (steps?.length === 0) {
    return null;
  }

  return (
    <Container>
      <InnerContainer>
        <div className=' relative py-11 px-6 md:py-12 lg:px-12 lg:py-14 xl:p-14 border rounded-[2.5rem] md:max-xl:rounded-[3rem] xl:rounded-[3.5rem] bg-neutral-0 dark:bg-neutral-900 border-cream-600 dark:border-neutral-800'>
          <div className='relative flex flex-col items-center gap-2 md:flex-row md:justify-between'>
            <h2 className='font-bold text-center font-heading text-heading-sm-sm lg:text-heading-sm'>{data.Title}</h2>
            <div className='relative bg-cream-300 dark:bg-neutral-1000 mt-10 w-auto max-w-full md:max-w-[50%] md:mt-0 rounded-full bg-scroll overflow-x-auto overflow-y-hidden'>
              <div className='flex items-center px-5 py-3 rounded-full '>
                {steps?.map((step: any, index: number) => (
                  <p
                    className={`min-w-fit px-6 py-3 text-center cursor-pointer rounded-3xl text-body-md-sm md:text-body-md-sm lg:text-body-md text-neutral-900 dark:text-neutral-0 ${
                      activeStep === index ? 'font-semibold bg-aqua-500' : ''
                    }`}
                    key={step.id}
                    onClick={() => setActiveStep(index)}>
                    {step.Tab}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-10 mt-10 lg:flex-row xl:gap-12 lg:mt-12 xl:mt-14'>
            {steps[activeStep]?.Image?.data?.attributes ? (
              <div className='flex justify-center w-full h-full lg:w-[50%] md:max-h-[373px]'>
                <StrapiImage
                  src={steps?.[activeStep]?.Image?.data?.attributes?.url}
                  alt={steps?.[activeStep]?.Image?.data?.attributes?.alternativeText}
                  width={576}
                  height={432}
                  className='hidden w-full lg:block rounded-3xl'
                />
                <StrapiImage
                  src={steps?.[activeStep]?.Image?.data?.attributes?.url}
                  alt={steps?.[activeStep]?.Image?.data?.attributes?.alternativeText}
                  width={324}
                  height={244}
                  className='object-contain w-full lg:hidden rounded-3xl'
                />
              </div>
            ) : null}
            <div className='w-full lg:w-[50%]'>
              {steps[activeStep]?.Title && (
                <h3 className='font-semibold text-body-xl-sm lg:text-body-xl'>{steps[activeStep].Title}</h3>
              )}
              {steps[activeStep]?.Description && <p className='mt-4 text-body-md'>{steps[activeStep]?.Description}</p>}
              {steps[activeStep]?.Bullets && (
                <ul className='mt-6 space-y-4'>
                  {steps[activeStep]?.Bullets?.map((bullet: any) => (
                    <li className='flex items-start gap-2 list-none' key={bullet.id}>
                      <Image src='/images/icons/check.svg' alt='Arrow right' width={24} height={24} />
                      <p className='font-semibold text-body-md'>{bullet.Text}</p>
                    </li>
                  ))}
                </ul>
              )}
              {steps[activeStep]?.Cta && (
                <Button
                  className='mt-6 md:inline-flex'
                  text={steps[activeStep]?.Cta?.Text}
                  variant='secondary'
                  href={steps[activeStep]?.Cta?.Url}
                  isExternal={steps[activeStep]?.Cta?.isExternal}
                  arrowPosition='right'
                />
              )}
            </div>
          </div>
          <div className='hidden absolute -top-[7.8rem] -right-[4.1rem] -z-10 lg:block'>
            <ShapeImage shape='lock-md' h={170} w={133} />
          </div>

          <div className='hidden absolute -left-[8rem] -bottom-[3rem] -z-10 lg:block'>
            <ShapeImage shape='cloud' h={122} w={191} />
          </div>
        </div>
      </InnerContainer>
    </Container>
  );
};

export default HowItWorks;
