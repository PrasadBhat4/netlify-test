'use client';

import { useRef } from 'react';
import { useScroll } from 'framer-motion';

import Words from '@/app/components/AboutUs/AnimatedIntro/Words';

interface Props {
  data: string;
}

const AnimatedIntro = ({ data }: Readonly<Props>) => {
  const elementRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ['start 0.9', 'start 0.25'],
  });

  const words = data.split(' ');

  return (
    <h2 className='lg:max-w-[49.875rem] mt-12 md:mt-20 xl:mt-[9rem]' ref={elementRef}>
      {words?.map((word, index) => {
        const start = index / words.length;
        const end = start + 1 / words.length;
        return (
          <Words key={word} range={[start, end]} progress={scrollYProgress}>
            {word}
          </Words>
        );
      })}
    </h2>
  );
};

export default AnimatedIntro;
