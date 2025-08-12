import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Container from '@/app/components/Common/Container';
import Dropdown from '@/app/components/Header/Dropdown';
import Logo from '@/app/components/Common/Logo';
import { getStrapiData } from '@/app/actions/getStrapiData';
import Button from '@/app/components/Common/Button';
import Link from '@/app/components/Common/Link';
import Banner from '@/app/components/Banner';

const MobileMenu = dynamic(() => import('@/app/components/Header/MobileMenu'), {
  ssr: false,
});

const Header = async () => {
  const strapiData = await getStrapiData('header');
  if (strapiData.data === null) return null;

  const navigation = strapiData.data?.attributes?.Navigation;
  const loginBtn = strapiData.data?.attributes?.Login;
  const getStartedBtn = strapiData.data?.attributes?.Button;

  return (
    <header className='sticky  w-full top-0 z-50 bg-cream-300 dark:bg-neutral-1000'>
      <Banner />
      <div className='pt-4 md:pb-8'>
        <Container>
          <div className='flex items-center justify-between'>
            <Logo />
            {navigation && (
              <div className='items-center justify-center hidden px-6 py-4 rounded-full lg:flex lg:gap-x-6 bg-neutral-0 dark:bg-neutral-900'>
                {navigation.map((nav: any) => {
                  return nav.hasSubmenu ? (
                    <Dropdown parentLink={nav} items={nav.Submenu} key={nav.id} />
                  ) : (
                    <Link text={nav.Link.Text} href={nav.Link.Url} isExternal={nav.Link.isExternal} key={nav.id} />
                  );
                })}
              </div>
            )}
            <div className='flex items-center gap-x-5 md:max-lg:ml-auto'>
              {loginBtn && (
                <Button
                  className='hidden md:block'
                  text={loginBtn.Text}
                  variant='buttonLink'
                  href={loginBtn.Url}
                  isExternal={loginBtn.isExternal}
                />
              )}
              {getStartedBtn && (
                <Button
                  className='hidden mt-6 md:inline-flex md:mt-0'
                  text={getStartedBtn.Text}
                  variant='secondary'
                  href={getStartedBtn.Url}
                  isExternal={getStartedBtn.isExternal}
                  arrowPosition='right'
                />
              )}
            </div>

            <Suspense>
              <MobileMenu navigation={navigation} loginBtn={loginBtn} getStartedBtn={getStartedBtn} />
            </Suspense>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
