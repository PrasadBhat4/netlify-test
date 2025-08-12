/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from '@/app/components/Common/Container';
import Button from '@/app/components/Common/Button';
import { StrapiJoinUs } from '@/app/lib/types';

interface Props {
  data: StrapiJoinUs;
}

const JoinUs = ({ data }: Readonly<Props>) => {
  const scrollRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const translateY = useTransform(scrollYProgress, [0, 1], ['-150%', '-65%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], ['0', '0.5', '1']);

  return (
    <div className='relative' ref={scrollRef}>
      <Container className='!my-30 lg:!my-[10.5rem] xl:!my-[12.25rem]'>
        <motion.div
          className='hidden absolute inset-x-0 justify-center -z-10 lg:flex'
          style={{ y: translateY, opacity }}>
          <Image src='/images/aboutUs/joinus-circle-lg.png' alt='joinus circle' height={1034} width={1034} />
        </motion.div>
        <motion.div
          className='flex absolute inset-x-0 justify-center -z-10 lg:hidden'
          style={{ y: translateY, opacity }}>
          <Image src='/images/aboutUs/joinus-circle-sm.png' alt='joinus circle' height={698} width={698} />
        </motion.div>
        <div className='flex flex-col items-center sm:block text-center mx-auto max-w-[46.4375rem] md:max-w-[36rem] lg:max-w-[46.4375rem]'>
          <h2 className='font-bold font-heading text-heading-sm-sm sm:text-heading-md-sm lg:text-heading-lg xl:text-heading-xl mt-[-7rem]'>
            {data.Title}
          </h2>
          <p className='mt-2 md:mt-4 text-base md:text-body-xl-sm lg:text-body-xl'>{data.Description}</p>
          <Button
            text={data.Button.Text}
            variant='primary'
            href={data.Button.Url}
            isExternal={data.Button.isExternal}
            className='w-[14rem] md:w-auto mt-4 md:mt-8 text-body-sm md:text-body-lg-xs text-neutral-0 h-14 md:h-16'
            arrowPosition='right'
            overrideTextSize
          />
        </div>
      </Container>
    </div>
  );
};

export default JoinUs;
