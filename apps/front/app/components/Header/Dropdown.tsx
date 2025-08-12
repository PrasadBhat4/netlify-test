'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useClickOutside } from '@/app/lib/hooks/useClickOutside';
import LinkComponent from '@/app/components/Common/Link';

interface Props {
  parentLink: any;
  items: any;
}

const Dropdown = ({ parentLink, items }: Readonly<Props>) => {
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const clickHandler = () => setOpen(!open);

  const focusHandler = () => setOpen(true);

  const blurHandler = () => setOpen(false);

  useClickOutside(dropdownRef, blurHandler);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className='relative flex items-center group' tabIndex={-1} ref={dropdownRef}>
      <LinkComponent
        text={parentLink.Link.Text}
        href='#'
        isExternal={parentLink.Link.isExternal}
        isParent
        withChevron
        isOpen={open}
        className={`text-neutral-900 dark:text-neutral-0 body-lg-sm ${open ? 'font-semibold' : ''}`}
        onMouseDown={clickHandler}
        onFocus={focusHandler}
        tabIndex={0}
      />
      <ul
        className={`hidden opacity-0 ${open ? 'group-focus-within:block group-focus-within:opacity-100' : ''}
        duration-300 ease-in-out absolute top-12 w-[23rem] rounded-2xl p-2 space-y-4 bg-neutral-0 dark:bg-neutral-900 shadow-default shadow-cream-600 dark:shadow-neutral-1000`}>
        {items.map((item: any) => (
          // check these issues:
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
          <li
            className=' group/link flex items-center  px-4 py-2 rounded-full cursor-pointer text-neutral-900 dark:text-neutral-0 hover:text-neutral-0 hover:bg-orange-pink focus-within:bg-pink-600'
            key={item.id}
            onClick={blurHandler}>
            <Link
              href={`${item.Url ?? '#'}`}
              target={item.isExternal ? '_blank' : '_self'}
              className=' w-full py-0.5 px-3 text-body-md rounded-full flex items-center gap-2  '>
              {item.Text}

              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className={`w-4 h-4 opacity-0  ${
                  item.isExternal ? 'group-hover/link:opacity-100' : 'group-hover/link:opacity-0'
                } `}>
                <path d='M15 3h6v6' />
                <path d='M10 14 21 3' />
                <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
