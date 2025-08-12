'use client';

import { motion, MotionValue } from 'framer-motion';

interface Props {
  range: [number, number];
  progress: MotionValue<number>;
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Words = ({ range, progress, children }: Readonly<Props>) => {
  // TOD0: Uncomment the following line to use opacity transformation
  // const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <motion.span
      className='inline-block mr-2 font-medium text-orange-500 font-heading text-heading-md-sm lg:text-heading-md'
      // style={{ opacity }}
    >
      {children}
    </motion.span>
  );
};

export default Words;
