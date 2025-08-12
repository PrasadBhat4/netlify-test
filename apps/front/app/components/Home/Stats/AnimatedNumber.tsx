'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface Props {
  number: number;
  unit: string;
  direction?: 'up' | 'down';
}

const AnimatedNumber = ({ number, unit, direction = 'up' }: Readonly<Props>) => {
  const elementRef = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? number : 0);
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100,
  });
  const isInView = useInView(elementRef, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === 'down' ? 0 : number);
    }
    // Check this issue:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motionValue, isInView]);

  useEffect(
    () =>
      springValue.on('change', (latest: any) => {
        if (elementRef.current) {
          elementRef.current.textContent = Intl.NumberFormat('en-US').format(latest.toFixed(0));
        }
      }),
    [springValue]
  );

  return (
    <div className='flex items-center'>
      <span className='font-bold font-heading text-heading-xl-sm lg:text-heading-xl' ref={elementRef}>
        {number}
      </span>
      <span className='font-bold font-heading text-heading-xl-sm lg:text-heading-xl'>{unit}</span>
    </div>
  );
};

export default AnimatedNumber;
