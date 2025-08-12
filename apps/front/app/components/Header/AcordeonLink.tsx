'use client';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import Link from '@/app/components/Common/Link';

interface Props {
  parentLink: any;
  clickHandler?: () => void;
}

const AcordeonLink = ({ parentLink, clickHandler }: Readonly<Props>) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleParentClick = () => clickHandler && clickHandler();

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div className='overflow-hidden' tabIndex={0}>
      <div onClick={handleClick}>
        <Link
          text={parentLink.Link.Text}
          href='#'
          isExternal={parentLink.Link.isExternal}
          isParent
          withChevron
          isOpen={open}
          className={`body-lg-sm ${open ? 'font-semibold' : ''}`}
        />
      </div>

      <ul className={`${open ? 'max-h-full mt-4 ' : 'max-h-0'} space-y-5 transition-all duration-300 ease-linear`}>
        {parentLink.Submenu.map((item: any) => (
          // check these issues:
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
          <li key={item.id} className='flex items-center' onClick={handleParentClick}>
            <Link text={item.Text} href={item.Url} isExternal={item.isExternal} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AcordeonLink;
