'use client';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { twMerge as tm } from 'tailwind-merge';
import { INITIAL_ACTIVE_CATEGORY } from '@/app/lib/constants';

interface Props {
  categories: string[];
  categoryHandler: (category: string) => void;
  withBackground?: boolean;
  className?: string;
  defaultCategory?: string;
  isCaseStudyFilter?: boolean;
}

const CategoriesFilter = ({
  categories = [],
  categoryHandler,
  withBackground = false,
  className = '',
  defaultCategory = '',
  isCaseStudyFilter = false,
}: Readonly<Props>) => {
  const [activeCategory, setActiveCategory] = useState(defaultCategory || INITIAL_ACTIVE_CATEGORY);
  const searchParams = useSearchParams();
  const tags = searchParams.get('tags');

  useEffect(() => {
    if (defaultCategory) {
      setActiveCategory(defaultCategory);
    } else if (tags) {
      setActiveCategory(tags);
    } else {
      setActiveCategory(INITIAL_ACTIVE_CATEGORY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags, defaultCategory]);

  const filterContaienrClass = `filters-scroll scrollbar-container flex items-center justify-start md:justify-center gap-3 md:gap-6 px-6 rounded-[1.25rem] ${
    withBackground && 'bg-cream-400 dark:bg-neutral-900'
  } overflow-x-scroll lg:overflow-auto`;
  const baseFilterTextClass = tm(
    'flex items-center justify-center px-6 py-4 cursor-pointer text-neutral-900 dark:text-neutral-0',
    isCaseStudyFilter ? 'font-bold text-body-xl' : 'text-body-md'
  );

  const activeFilterTextClass = tm('border-b-2 border-aqua-500', !isCaseStudyFilter && 'font-semibold text-aqua-500');

  const clickHandler = (category: string) => {
    setActiveCategory(category);
    categoryHandler(category);
  };

  return (
    <div
      className={tm(
        `relative rounded-[1.25rem] overflow-hidden`,
        !isCaseStudyFilter &&
          `after:content-[''] after:absolute after:right-0 after:top-0 after:z-10 after:h-[5.5rem] after:w-[5.25rem] after:bg-gradient-to-r after:from-transparent after:to-cream-400 after:dark:to-neutral-900 after:pointer-events-none`,
        className
      )}>
      <div className={filterContaienrClass}>
        {
          Array.from(categories).map((category: any) => (
            <p
              className={tm(
                baseFilterTextClass,
                String(activeCategory).trim().toLowerCase() === String(category).trim().toLowerCase() &&
                  activeFilterTextClass
              )}
              onClick={() => clickHandler(category)}
              key={category}>
              {category}
            </p>
          )) as any
        }
      </div>
    </div>
  );
};

export default CategoriesFilter;
