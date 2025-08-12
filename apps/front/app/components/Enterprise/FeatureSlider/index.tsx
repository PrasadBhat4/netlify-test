/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { useState, useEffect } from 'react';
import StrapiImage from '@/app/components/Common/StrapiImage';
import Container from '@/app/components/Common/Container';
import InnerContainer from '@/app/components/Common/InnerContainer';
import FeatureItem from '@/app/components/Enterprise/FeatureSlider/FeatureItem';

interface Props {
  data: any;
}

const Features = ({ data = {} }: Readonly<Props>) => {
  const [activeItem, setActiveItem] = useState(0);

  const setActiveFeature = (id: number) => {
    setActiveItem(id);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeItem < data.Features.length - 1) {
        setActiveItem(activeItem + 1);
      } else {
        setActiveItem(0);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeItem, data]);

  return (
    <Container>
      <InnerContainer>
        <h2 className='font-bold text-center font-heading text-heading-lg-sm lg:text-heading-md'>{data.Title}</h2>
        <div className='flex flex-col md:flex-row gap-8 lg:gap-12 xl:gap-14 p-6 md:p-8 lg:p-12 xl:p-14 mt-10 md:mt-12 lg:mt-14 xl:mt-16 bg-neutral-0 dark:bg-neutral-900 border border-cream-600 dark:border-neutral-800 rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[4rem]'>
          <div className='flex flex-col flex-1 gap-2 lg:gap-4'>
            {data.Features.map((feature: any, index: number) => (
              <FeatureItem
                item={feature}
                activeItem={activeItem}
                index={index}
                key={feature.id}
                clickHandler={setActiveFeature}
              />
            ))}
          </div>
          {data.Features.map((feature: any, index: number) => (
            <div key={feature.id} className={index === activeItem ? 'block' : 'hidden'}>
              <StrapiImage
                src={feature?.ImageXL?.data?.attributes.url}
                alt={feature?.ImageXL?.data?.attributes.alternativeText ?? ''}
                width={614}
                height={517}
                className='hidden rounded-3xl xl:block'
              />
              <StrapiImage
                src={feature?.ImageLG?.data?.attributes.url}
                alt={feature?.ImageLG?.data?.attributes.alternativeText ?? ''}
                width={490}
                height={415}
                className='hidden lg:max-xl:block rounded-[1.25rem]'
              />
              <StrapiImage
                src={feature?.ImageMD?.data?.attributes.url}
                alt={feature?.ImageMD?.data?.attributes.alternativeText ?? ''}
                width={392}
                height={352}
                className='hidden md:max-lg:block rounded-[1.25rem]'
              />
              <StrapiImage
                src={feature?.ImageSM?.data?.attributes.url}
                alt={feature?.ImageSM?.data?.attributes.alternativeText ?? ''}
                width={392}
                height={300}
                className='block w-full max-h-[18.75rem] !object-contain md:hidden rounded-[1.25rem]'
              />
            </div>
          ))}
        </div>
      </InnerContainer>
    </Container>
  );
};

export default Features;
