import Container from '@/app/components/Common/Container';
import Navigation from '@/app/components/Footer/Navigation';
import Newsletter from '@/app/components/Common/Form/Newsletter';
import Socials from '@/app/components/Footer/Socials';
import ThemeMode from '@/app/components/Footer/ThemeModeToggler';
import TermsPrivacyCopy from '@/app/components/Footer/TermsPrivacyCopy';
import ShapeImage from '@/app/components/Common/ShapeImage';
import Logo from '@/app/components/Common/Logo';
import { getStrapiData } from '@/app/actions/getStrapiData';
import LocaleSwitcher from '@/app/components/i18n/LocaleSwitcher';

const SHOW_TRANSLATION_DROPDOWN = process.env.NEXT_PUBLIC_FEATURE_FLAG_TRANSLATION === 'true';
const SHOW_DARK_MODE = process.env.NEXT_PUBLIC_FEATURE_FLAG_DARK_MODE === 'true';

const Footer = async () => {
  const strapiData = await getStrapiData('footer');
  if (strapiData.data === null) return null;

  const navigation = strapiData.data?.attributes?.Navigation;
  const newsletter = strapiData.data?.attributes?.Newsletter;
  const socials = strapiData.data?.attributes?.Socials;
  const terms = strapiData.data?.attributes?.Terms;
  const privacy = strapiData.data?.attributes?.Privacy;
  const copyright = strapiData.data?.attributes?.Copyright;

  return (
    <footer className=' bg-cream-300 dark:bg-neutral-900 '>
      <Container className='relative pb-4 pt-14 md:pb-12 md:pt-14 lg:pt-[7.5rem]'>
        <div>
          <div className='flex flex-col md:flex-row md:justify-between md:gap-x-12'>
            <div className='justify-between lg:flex gap-x-36'>
              <div className='hidden md:flex md:flex-col'>
                <Logo />
                {SHOW_DARK_MODE && <ThemeMode className='hidden mt-auto lg:flex' />}
              </div>
              <div className='flex-col hidden mt-8 lg:flex lg:mt-0'>
                <div className='flex gap-x-12'>{navigation && <Navigation navigation={navigation} />}</div>
                <div className='flex flex-col md:flex-row md:items-center gap-y-3 md:gap-x-2 mt-14 lg:mt-24'>
                  <TermsPrivacyCopy terms={terms} privacy={privacy} copyright={copyright} />
                </div>
                {SHOW_TRANSLATION_DROPDOWN && (
                  <div className='flex items-center mt-6'>
                    <LocaleSwitcher />
                  </div>
                )}
              </div>

              <div className='hidden md:flex lg:hidden items-center mt-4 gap-x-4'>
                {socials && <Socials links={socials.Socials} />}
              </div>
            </div>

            <div className='flex flex-col gap-y-8'>
              {newsletter && <Newsletter data={newsletter} className='[&>form>label]:mt-0 ' />}
              <div className='items-center hidden lg:flex gap-x-6'>
                {socials && <Socials links={socials.Socials} />}
              </div>
            </div>
          </div>

          <div className='flex flex-col lg:hidden md:flex-row md:justify-between md:gap-x-12'>
            <div className='flex mt-8 gap-x-12'>{navigation && <Navigation navigation={navigation} />}</div>
            <div className='mt-14 md:hidden block'>
              <Logo />
              <div className='flex items-center mt-4 gap-x-4'>{socials && <Socials links={socials.Socials} />}</div>
            </div>
            {/* Shapes */}
            <div className='items-center hidden md:flex'>
              <ShapeImage shape='code-shape-sm' h={149} w={372} />
            </div>
          </div>
        </div>

        <div className='flex flex-col lg:hidden md:flex-row md:items-center gap-y-3 md:gap-x-2 mt-14'>
          <TermsPrivacyCopy terms={terms} privacy={privacy} copyright={copyright} />
          {SHOW_DARK_MODE && <ThemeMode className='hidden mt-5 ml-auto md:max-lg:flex' />}
          {SHOW_TRANSLATION_DROPDOWN && (
            <div className='flex items-center mb-8 mt-14'>
              <LocaleSwitcher />
            </div>
          )}
        </div>
        {SHOW_DARK_MODE && <ThemeMode className='mt-8 ml-auto md:hidden' />}

        {/* Shapes */}
        <div className='flex items-center justify-center lg:absolute lg:right-0 lg:bottom-0'>
          <ShapeImage shape='code-shape-sm' h={149} w={372} className='hidden lg:max-xl:flex' />
          <ShapeImage shape='code-shape' h={200} w={600} className='hidden xl:flex' />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
