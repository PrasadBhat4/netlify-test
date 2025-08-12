import CaseSummary from '@/app/components/CaseStudy/Internal/CaseSummary';
import Container from '@/app/components/Common/Container';
import Share from '@/app/components/Blog/Internal/Share';
import TestimonialSection from '@/app/components/CaseStudy/Internal/TestimonialSection';
import Bullets from '@/app/components/CaseStudy/Internal/Bullets';
import Stats from '@/app/components/CaseStudy/Internal/Stats';
import Conclusion from '@/app/components/CaseStudy/Internal/Conclusion';
import BodyContent from '@/app/components/CaseStudy/Internal/CaseBody';
import { generateSocialLinks } from '@/app/lib/utils';
import { CaseLayoutProps } from '@/app/lib/types';

const BodyComponents: Record<string, React.ComponentType<{ data: any; isLast?: boolean }>> = {
  'casestudy.stats': Stats,
  'casestudy.conclusion': Conclusion,
  'casestudy.section-1': TestimonialSection,
  'casestudy.section-2': Bullets,
  'casestudy.section-3': BodyContent,
};

const CaseLayout: React.FC<CaseLayoutProps> = ({ caseSummary, sections, metadata }) => {
  const { socials, title, slug } = metadata;

  const socialLinks = generateSocialLinks(
    socials,
    'case-studies',
    slug,
    title,
    'social_share_case_study',
    'case_study'
  );
  return (
    <Container className='my-6'>
      <div className='flex flex-col lg:flex-row gap-14'>
        <div className='lg:w-auto hidden lg:block'>
          <div className='sticky top-[7rem]'>
            {caseSummary && <CaseSummary data={caseSummary} />}
            {socials && socials.length > 0 && (
              <Share
                text='Share'
                links={socialLinks}
                className='mb-6 md:my-3 max-w-[24rem] '
                iconClassName='bg-neutral-0 p-4'
              />
            )}
          </div>
        </div>
        <div className='lg:flex-1 space-y-8'>
          {sections?.map((section, index) => {
            const isLast = index === sections.length - 1;
            // eslint-disable-next-line no-underscore-dangle
            const Component = BodyComponents[section.__component];
            if (!Component) return null;
            return (
              // eslint-disable-next-line no-underscore-dangle
              <div key={`${section.id}-${section.__component}`} className={index === 0 ? 'mb-16' : 'my-16'}>
                <Component data={section} isLast={isLast} />
              </div>
            );
          })}
        </div>
        <div className='lg:hidden'>
          <CaseSummary data={caseSummary} />
          <Share links={socialLinks} className='mb-6 mt-4 md:my-3  max-w-[24rem]' iconClassName='bg-neutral-0 p-4' />
        </div>
      </div>
    </Container>
  );
};

export default CaseLayout;
