'use client';

import Image from 'next/image';
import { twMerge as tm } from 'tailwind-merge';
import { motion } from 'framer-motion';
import Markdown from '@/app/components/Common/Markdown';
import { FeatureItemType } from '@/app/lib/types';

interface Props {
  item: FeatureItemType;
  activeItem: number;
  index: number;
  clickHandler: (id: number) => void;
  className?: string;
}

const FeatureItem = ({ item, activeItem, index, clickHandler, className = '' }: Readonly<Props>) => {
  const open = activeItem === index;
  const parentAnimationVariants = {
    closed: { background: 'bg-transparent' },
    open: { background: 'bg-neutral-0' },
  };
  const childAnimationVarians = {
    closed: { opacity: 0, height: 0, marginTop: 0 },
    open: { opacity: 1, height: 'auto', marginTop: '1rem' },
  };
  const animate = open ? 'open' : 'closed';
  const transition = { duration: 0.5 };

  const handleClick = () => {
    clickHandler(index);
  };

  return (
    <motion.div
      className={tm(
        `px-4 py-3 md:p-4 lg:p-5 xl:p-6 rounded-2xl overflow-hidden cursor-pointer ${
          open ? 'bg-transparent' : 'bg-neutral-100 dark:bg-neutral-800'
        }`,
        className
      )}
      variants={parentAnimationVariants}
      initial='closed'
      animate={animate}
      transition={transition}
      onClick={handleClick}>
      <div className='flex items-center justify-between gap-x-4 min-h-6'>
        <p
          className={`font-bold font-heading text-[1rem] lg:text-subtitle ${
            open ? 'text-aqua-500' : 'text-neutral-900 dark:text-neutral-0'
          }`}>
          {item.Title}
        </p>
        <Image
          src={`/images/icons/${open ? 'arrow-right-aqua' : 'arrow-right-gray'}.svg`}
          alt='open close icon'
          width={24}
          height={24}
        />
      </div>
      <motion.div variants={childAnimationVarians} initial='closed' animate={animate} transition={transition}>
        <Markdown className='contents text-body-md-sm lg:text-body-md' text={item.Description} />
      </motion.div>
    </motion.div>
  );
};

export default FeatureItem;
