'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Container from '@/app/components/Common/Container';
import AcordeonLink from '@/app/components/Header/AcordeonLink';
import Logo from '@/app/components/Common/Logo';
import Button from '@/app/components/Common/Button';
import Link from '@/app/components/Common/Link';

interface Props {
  navigation: any;
  loginBtn: any;
  getStartedBtn: any;
}

const MobileMenu = ({ navigation, loginBtn, getStartedBtn }: Readonly<Props>) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className='lg:hidden'>
      <Image
        src='/images/icons/menu.svg'
        alt='menu'
        width={40}
        height={40}
        className='ml-4 cursor-pointer lg:hidden dark:hidden'
        onClick={handleClick}
      />
      <Image
        src='/images/icons/menu-white.svg'
        alt='menu'
        width={40}
        height={40}
        className='hidden ml-4 cursor-pointer dark:inline lg:hidden'
        onClick={handleClick}
      />
      <div
        className={`fixed inset-0 w-screen py-4 md:py-8 bg-cream-300 dark:bg-neutral-1000 ${
          open ? 'translate-y-0' : '-translate-y-full'
        } transition-all duration-1000 ease-in-out`}>
        <Container>
          <div className='flex items-center justify-between'>
            <Logo />
            <Image
              src='/images/icons/close.svg'
              alt='close menu'
              width={40}
              height={40}
              className='cursor-pointer dark:hidden'
              onClick={handleClick}
            />
            <Image
              src='/images/icons/close-white.svg'
              alt='close menu'
              width={40}
              height={40}
              className='hidden cursor-pointer dark:inline'
              onClick={handleClick}
            />
          </div>
          <div
            className={`flex flex-col mt-4 space-y-6 ${
              open ? 'opacity-100' : 'opacity-0'
            } transition-all ease-linear delay-1000`}>
            {navigation && (
              <div className='flex flex-col gap-y-6'>
                {navigation.map((nav: any) => {
                  return nav.hasSubmenu ? (
                    <AcordeonLink parentLink={nav} key={nav.id} clickHandler={handleClick} />
                  ) : (
                    <Link
                      key={nav.id}
                      text={nav.Link.Text}
                      href={nav.Link.Url}
                      isExternal={nav.Link.isExternal}
                      onClick={handleClick}
                    />
                  );
                })}
              </div>
            )}
            <div className='w-full h-px my-0 bg-cream-600' />
            {loginBtn && (
              <Link
                text={loginBtn.Text}
                href={loginBtn.Url}
                isExternal={loginBtn.isExternal}
                className='font-semibold'
              />
            )}
            {getStartedBtn && (
              <Button
                className='w-full !mt-8 md:!mt-[4.5rem]'
                text={getStartedBtn.Text}
                variant='secondary'
                href={getStartedBtn.Url}
                isExternal={getStartedBtn.isExternal}
                arrowPosition='right'
              />
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MobileMenu;
