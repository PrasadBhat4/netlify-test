'use client';

import { motion } from 'framer-motion';
import fadeUpAnimation from '@/app/components/Common/FadeComponent/fadeUp';
import fadeRightAnimation from '@/app/components/Common/FadeComponent/fadeRight';
import fadeLeftAnimation from '@/app/components/Common/FadeComponent/fadeLeft';
import fadeBottomAnimation from '@/app/components/Common/FadeComponent/fadeBottom';

interface Props {
  children: JSX.Element | JSX.Element[];
  fadeType?: 'up' | 'right' | 'left' | 'bottom';
  className?: string;
}

const FadeComponent = ({ fadeType = 'up', className = '', children, ...props }: Readonly<Props>) => {
  const fade = {
    up: { ...fadeUpAnimation },
    right: { ...fadeRightAnimation },
    left: { ...fadeLeftAnimation },
    bottom: { ...fadeBottomAnimation },
  };

  return (
    <motion.div className={`${className}`} {...fade[fadeType]} {...props}>
      {children}
    </motion.div>
  );
};

export default FadeComponent;
