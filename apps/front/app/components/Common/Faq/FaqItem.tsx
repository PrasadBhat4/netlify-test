'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { twMerge as tm } from 'tailwind-merge';
import Markdown from '@/app/components/Common/Markdown';

export type QuestionType = {
  Question: string;
  Answer: string;
};

interface Props {
  item: QuestionType;
}

const FaqItem = ({ item }: Readonly<Props>) => {
  const [open, setOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [item.Answer]);

  const transition = {
    duration: 0.4,
    ease: [0.04, 0.62, 0.23, 0.98],
  };

  return (
    <motion.div
      className={`p-8 border shadow-faq shadow-[#D4D4D1/15] dark:shadow-none rounded-3xl lg:hover:border-pink-500 overflow-hidden lg:w-[50rem] xl:w-auto cursor-pointer ${
        open ? 'bg-neutral-0 dark:bg-neutral-900 border-aqua-500' : 'border-cream-600 dark:border-neutral-700'
      }`}
      onClick={() => setOpen(!open)}
      initial={false}
      animate={{
        backgroundColor: open ? 'var(--neutral-0)' : 'transparent',
      }}
      transition={transition}>
      <div className='flex items-start justify-between gap-x-4'>
        <h3
          className={`font-semibold text-body-sm-sm lg:text-body-md transition-colors duration-300 ${
            open ? 'text-aqua-500' : 'text-neutral-900 dark:text-neutral-0'
          }`}>
          {item.Question}
        </h3>
        <motion.div className='w-[24px]' animate={{ rotate: open ? 45 : 0 }} transition={transition}>
          {open ? (
            <svg viewBox='0 0 24 24' fill='none' className='w-6 h-6 text-aqua-500'>
              <path
                d='M5 12H19M12 5V19'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          ) : (
            <svg
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 text-text-neutral-900 dark:text-neutral-0'>
              <path d='M5 12H19' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
              <path d='M12 5V19' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: open ? contentHeight : 0,
          opacity: open ? 1 : 0,
          marginTop: open ? 16 : 0,
        }}
        transition={transition}
        style={{ overflow: 'hidden' }}>
        <div ref={contentRef}>
          <Markdown
            className={tm('max-w-full text-body-md-sm lg:text-body-md prose dark:prose-invert')}
            text={item.Answer}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FaqItem;
